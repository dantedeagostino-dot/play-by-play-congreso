"use client";

import React, { useEffect, useState } from "react";
import Timeline, { AnalysisEvent } from "@/components/Timeline";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const [events, setEvents] = useState<AnalysisEvent[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Configurar WebSocket
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000/ws/live-feed";
    console.log(`Conectando a WebSocket: ${wsUrl}`);

    let socket: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout;

    const connect = () => {
      socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        console.log("WebSocket conectado");
        setConnected(true);
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          // Verificar si es un evento válido (tiene timestamp y orador)
          if (data.timestamp && data.orador) {
            setEvents((prev) => [...prev, data]);
          }
        } catch (error) {
          console.error("Error parseando mensaje WS:", error);
        }
      };

      socket.onclose = () => {
        console.log("WebSocket desconectado. Reintentando en 3s...");
        setConnected(false);
        reconnectTimeout = setTimeout(connect, 3000);
      };

      socket.onerror = (error) => {
        console.error("Error WebSocket:", error);
        socket?.close();
      };
    };

    connect();

    return () => {
      if (socket) socket.close();
      clearTimeout(reconnectTimeout);
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 p-6 sticky top-0 z-10 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Play by Play: Modernización Laboral
            </h1>
            <p className="text-slate-400 text-sm">H. Cámara de Diputados de la Nación</p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${connected ? "bg-green-900/50 text-green-400 border border-green-800" : "bg-red-900/50 text-red-400 border border-red-800"
              }`}>
              <span className={`w-2 h-2 rounded-full ${connected ? "bg-green-500 animate-pulse" : "bg-red-500"}`}></span>
              {connected ? "CONECTADO" : "DESCONECTADO"}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Dashboard (2/3 width on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Aquí iría el reproductor de video si tuviéramos uno embebido */}
          {/* YouTube Feed */}
          <div className="aspect-video bg-black rounded-lg border border-slate-800 flex items-center justify-center relative overflow-hidden group shadow-2xl">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/BmDLmq7aeko?autoplay=1&mute=1&playsinline=1"
              title="Transmisión en Vivo Cámara de Diputados"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>

          <Dashboard events={events} />
        </div>

        {/* Right Column: Timeline (1/3 width, sticky) */}
        <div className="lg:col-span-1 h-[600px] lg:h-[calc(100vh-8rem)] sticky top-24">
          <Timeline events={events} />
        </div>
      </div>
    </main>
  );
}
