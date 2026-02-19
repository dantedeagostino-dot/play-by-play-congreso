"use client";

import React, { useEffect, useRef } from "react";

export interface AnalysisEvent {
    timestamp: string;
    orador: string;
    tema_principal: string;
    postura: string;
    sintesis_argumento: string;
}

interface TimelineProps {
    events: AnalysisEvent[];
}

export default function Timeline({ events }: TimelineProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom on new events
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [events]);

    return (
        <div className="flex flex-col h-full bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
            <div className="p-4 bg-slate-800 border-b border-slate-700">
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                    Live Feed: Cámara de Diputados
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-600">
                {events.length === 0 ? (
                    <div className="text-center text-slate-500 py-10 italic">
                        Esperando transmisión...
                    </div>
                ) : (
                    events.map((event, idx) => (
                        <div
                            key={`${event.timestamp}-${idx}`}
                            className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-mono text-slate-400">
                                    {new Date(event.timestamp).toLocaleTimeString()}
                                </span>
                                <span className={`text-xs px-2 py-1 rounded-full font-bold ${event.postura === "A Favor" ? "bg-green-900 text-green-300" :
                                        event.postura === "En Contra" ? "bg-red-900 text-red-300" :
                                            "bg-yellow-900 text-yellow-300"
                                    }`}>
                                    {event.postura}
                                </span>
                            </div>

                            <h3 className="text-lg font-semibold text-blue-400 mb-1">
                                {event.orador}
                            </h3>

                            <div className="mb-2">
                                <span className="text-xs uppercase tracking-wide text-slate-500">Tema:</span>
                                <span className="text-sm font-medium text-slate-300 ml-2">{event.tema_principal}</span>
                            </div>

                            <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-slate-600 pl-3">
                                {event.sintesis_argumento}
                            </p>
                        </div>
                    ))
                )}
                <div ref={bottomRef} />
            </div>
        </div>
    );
}
