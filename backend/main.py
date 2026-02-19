from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import json
import logging
from typing import List

from ingestion import AudioStream
from analysis import analyze_chunk_simulation

# Configuración
logger = logging.getLogger("main")
logging.basicConfig(level=logging.INFO)

app = FastAPI(title="Play by Play Congreso Backend")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todos para desarrollo y Vercel Preview
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gestor de Conexiones WebSocket
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        logger.info(f"Cliente conectado. Total: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        logger.info(f"Cliente desconectado. Total: {len(self.active_connections)}")

    async def broadcast(self, message: dict):
        # Convertir a JSON string para enviar
        json_msg = json.dumps(message)
        for connection in self.active_connections:
            try:
                await connection.send_text(json_msg)
            except Exception as e:
                logger.error(f"Error enviando mensaje: {e}")

manager = ConnectionManager()

# Background Task para Ingesta y Análisis
async def background_processing():
    stream = AudioStream("https://www.youtube.com/watch?v=BmDLmq7aeko")
    print("--- INICIANDO PIPELINE DE ANÁLISIS ---")
    
    # Ciclo de procesamiento continuo
    async for _ in stream.start():
        # 1. Obtener chunk de audio (simulado en stream.start)
        
        # 2. Analizar chunk (Simulación de LLM)
        result = await analyze_chunk_simulation()
        
        # 3. Log para verificación (Solicitud del usuario: 3 primeros objetos)
        # Nota: En producción esto sería menos verboso
        print(f"OUTPUT GENERADO: {json.dumps(result, indent=2, ensure_ascii=False)}")
        
        # 4. Enviar a frontend vía WebSocket
        await manager.broadcast(result)

@app.on_event("startup")
async def startup_event():
    # Iniciar la tarea en segundo plano sin bloquear
    asyncio.create_task(background_processing())

@app.get("/")
def read_root():
    return {"status": "online", "service": "Play by Play Backend"}

@app.websocket("/ws/live-feed")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Mantener la conexión viva, esperar mensajes del cliente si los hubiera
            # (Aunque en este caso es unidireccional Server -> Client mayormente)
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
