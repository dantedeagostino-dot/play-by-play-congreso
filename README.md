# Play by Play Congreso

Aplicación web de seguimiento analítico en tiempo real para la sesión legislativa de Modernización Laboral.

## Arquitectura

El proyecto utiliza una estructura donde **Next.js (Frontend)** se encuentra en la raíz para facilitar el despliegue en Vercel, y el **Backend** en un subdirectorio dedicado.

1.  **Frontend (Raíz)**:
    *   **Framework**: Next.js 14+ (React, Tailwind CSS)
    *   **Función**: Dashboard de visualización en tiempo real.
    *   **Despliegue**: Vercel (Auto-detectado al conectar el repositorio).

2.  **Backend (`/backend`)**:
    *   **Framework**: FastAPI (Python 3.11+)
    *   **Función**: Ingesta de audio (yt-dlp), Simulación de análisis LLM, WebSocket Server.
    *   **Despliegue Recomendado**: Railway, Render, Fly.io (Root Directory: `backend`).

## Instalación y Ejecución Local

### Prerrequisitos
- Python 3.11+
- Node.js 18+

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
# En la raíz del proyecto
npm install
npm run dev
```

### Ejecución Conjunta
Ejecutar el script `start_local.sh` (o equivalente en PowerShell) en la raíz del proyecto.

## Despliegue

### Frontend (Vercel)
1.  Conectar el repositorio a Vercel.
2.  **Configuración Automática**: Vercel detectará Next.js en la raíz. No es necesario cambiar el "Root Directory".
3.  Agregar variable de entorno `NEXT_PUBLIC_WS_URL` apuntando a la URL del backend desplegado.

### Backend (Railway/Render)
1.  Conectar el repositorio.
2.  **Importante**: Configurar el "Root Directory" a `backend` en las settings del servicio.
3.  Comando de inicio: `uvicorn main:app --host 0.0.0.0 --port $PORT`.
