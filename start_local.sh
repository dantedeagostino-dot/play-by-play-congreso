#!/bin/bash

# Start Backend
echo "Starting Backend..."
cd backend

# Create venv if not exists
if [ ! -d "venv" ]; then
    echo "Creating venv..."
    python -m venv venv
fi

# Activate venv (Windows vs Linux)
if [ -f "venv/Scripts/activate" ]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi

# Install dependencies if needed (simple check)
pip install -r requirements.txt

# Run uvicorn in background
uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!

# Start Frontend
echo "Starting Frontend..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

# Handle shutdown
trap "kill $BACKEND_PID $FRONTEND_PID" EXIT

echo "Services started. Backend: :8000, Frontend: :3000"
echo "Press Ctrl+C to stop."
wait
