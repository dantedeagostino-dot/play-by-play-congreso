# Play by Play Congreso

Aplicación web de seguimiento analítico en tiempo real para la sesión legislativa de Modernización Laboral.

## Arquitectura

El proyecto está dividido en dos servicios principales:

1.  **Backend (`/backend`)**:
    *   **Framework**: FastAPI (Python 3.11+)
    *   **Función**: Ingesta de audio (yt-dlp), Simulación de análisis LLM, WebSocket Server.
    *   **Despliegue Recomendado**: Railway, Render, Fly.io (requiere persistencia para WebSocket y procesos de fondo).

2.  **Frontend (`/frontend`)**:
    *   **Framework**: Next.js 14+ (React, Tailwind CSS)
    *   **Función**: Dashboard de visualización en tiempo real.
    *   **Despliegue Recomendado**: Vercel.

## Instalación y Ejecución Local

### Prerrequisitos
- Python 3.11+
- Node.js 18+
- ffmpeg (opcional, recomendado para procesamiento de audio real)

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Ejecución Conjunta
Ejecutar el script `start_local.sh` (o equivalente en PowerShell) en la raíz del proyecto.

## Despliegue

### Frontend (Vercel)
1.  Conectar el repositorio a Vercel.
2.  Configurar el "Root Directory" a `frontend`.
3.  Agregar variable de entorno `NEXT_PUBLIC_WS_URL` apuntando a la URL del backend desplegado (ej. `wss://mi-backend.up.railway.app/ws/live-feed`).

### Backend (Railway/Render)
1.  Conectar el repositorio.
2.  Configurar el "Root Directory" a `backend`.
3.  Comando de inicio: `uvicorn main:app --host 0.0.0.0 --port $PORT`.

## Variables de Entorno

Crear un archivo `.env` en `backend/` si es necesario (actualmente no requerido para modo simulación).
En `frontend/`, usar `.env.local` para `NEXT_PUBLIC_WS_URL`.
