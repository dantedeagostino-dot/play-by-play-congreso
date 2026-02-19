"use client";

import React from "react";
import { AnalysisEvent } from "./Timeline";

interface DashboardProps {
    events: AnalysisEvent[];
}

export default function Dashboard({ events }: DashboardProps) {
    // Calcular métricas
    const totalEvents = events.length;

    const posturaCounts = events.reduce((acc, curr) => {
        acc[curr.postura] = (acc[curr.postura] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const temaCounts = events.reduce((acc, curr) => {
        acc[curr.tema_principal] = (acc[curr.tema_principal] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Ordenar temas por frecuencia
    const topTemas = Object.entries(temaCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

    const maxPostura = Math.max(...Object.values(posturaCounts), 1);
    const maxTema = Math.max(...Object.values(temaCounts), 1);

    return (
        <div className="space-y-6">
            {/* Resumen General */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <div className="text-slate-400 text-sm">Intervenciones</div>
                    <div className="text-3xl font-bold text-blue-400">{totalEvents}</div>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <div className="text-slate-400 text-sm">A Favor</div>
                    <div className="text-3xl font-bold text-green-400">{posturaCounts["A Favor"] || 0}</div>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <div className="text-slate-400 text-sm">En Contra</div>
                    <div className="text-3xl font-bold text-red-400">{posturaCounts["En Contra"] || 0}</div>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <div className="text-slate-400 text-sm">Neutral/Abs</div>
                    <div className="text-3xl font-bold text-yellow-400">
                        {(posturaCounts["Neutral"] || 0) + (posturaCounts["Abstención"] || 0)}
                    </div>
                </div>
            </div>

            {/* Gráfico de Posturas (Barras simples) */}
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-slate-100 mb-4">Distribución de Posturas</h3>
                <div className="space-y-3">
                    {Object.entries(posturaCounts).map(([postura, count]) => (
                        <div key={postura} className="space-y-1">
                            <div className="flex justify-between text-sm text-slate-300">
                                <span>{postura}</span>
                                <span>{count} ({Math.round((count / totalEvents) * 100)}%)</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2.5">
                                <div
                                    className={`h-2.5 rounded-full ${postura === "A Favor" ? "bg-green-500" :
                                            postura === "En Contra" ? "bg-red-500" : "bg-yellow-500"
                                        }`}
                                    style={{ width: `${(count / totalEvents) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                    {totalEvents === 0 && <p className="text-slate-500 text-sm">Sin datos aún.</p>}
                </div>
            </div>

            {/* Gráfico de Temas (Barras simples) */}
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-slate-100 mb-4">Temas Más Debatidos</h3>
                <div className="space-y-3">
                    {topTemas.map(([tema, count]) => (
                        <div key={tema} className="space-y-1">
                            <div className="flex justify-between text-sm text-slate-300">
                                <span className="truncate pr-2">{tema}</span>
                                <span>{count}</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2.5">
                                <div
                                    className="bg-blue-500 h-2.5 rounded-full"
                                    style={{ width: `${(count / maxTema) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                    {totalEvents === 0 && <p className="text-slate-500 text-sm">Sin datos aún.</p>}
                </div>
            </div>
        </div>
    );
}
