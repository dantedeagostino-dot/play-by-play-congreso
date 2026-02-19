import random
import datetime
import json
import asyncio

# Temas y posturas para simulación
TEMAS = [
    "Flexibilización de jornada laboral",
    "Fondo de cese laboral",
    "Período de prueba extendido",
    "Derecho a huelga vs. esencialidad",
    "Bloqueos sindicales como causal de despido",
    "Simplificación registral"
]

ORADORES = [
    "Dip. Mario Negri (UCR)",
    "Dip. Máximo Kirchner (UP)",
    "Dip. José Luis Espert (LLA)",
    "Dip. Myriam Bregman (FIT)",
    "Dip. Rodrigo de Loredo (UCR)",
    "Dip. Cristian Ritondo (PRO)"
]

POSTURAS = ["A Formar", "En Contra", "Abstención", "Neutral"]

async def analyze_chunk_simulation():
    """
    Simula el análisis de un fragmento de discurso.
    En producción, esto recibiría audio/texto y llamaría a OpenAI/LangChain.
    """
    await asyncio.sleep(random.uniform(5, 12))  # Simula tiempo de procesamiento y pausas naturales

    timestamp = datetime.datetime.now().isoformat()
    orador = random.choice(ORADORES)
    tema = random.choice(TEMAS)
    postura = random.choice(POSTURAS)
    
    # Generar síntesis basada en postura
    if postura == "A Favor":
        sintesis = f"Argumenta que {tema.lower()} dinamizará el empleo y reducirá la litigiosidad."
    elif postura == "En Contra":
        sintesis = f"Sostiene que {tema.lower()} vulnera derechos adquiridos y precariza al trabajador."
    else:
        sintesis = f"Plantea interrogantes técnicos sobre la implementación de {tema.lower()}."

    return {
        "timestamp": timestamp,
        "orador": orador,
        "tema_principal": tema,
        "postura": postura,
        "sintesis_argumento": sintesis
    }
