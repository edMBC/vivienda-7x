"use client";

import { useEffect, useState } from "react";
import { Chip } from "@nextui-org/react";

interface DashboardHeaderProps {
  puntosTotales: number;
  onLogout: () => void;
}

export default function DashboardHeader({ puntosTotales, onLogout }: DashboardHeaderProps) {
  const [saludo, setSaludo] = useState({ titulo: "Bienvenido, Asesor", sub: "Ecosistema de asignación y movilidad habitacional" });

  useEffect(() => {
    const hora = new Date().getHours();
    if (hora >= 5 && hora < 12) {
      setSaludo({
        titulo: "¡A conquistar la mañana, José Manuel!",
        sub: "Sala Norte • Convirtiendo ahorros en llaves."
      });
    } else if (hora >= 12 && hora < 18) {
      setSaludo({
        titulo: "¡Mantén el impulso, José Manuel!",
        sub: "Sala Norte • Semáforo comercial activo."
      });
    } else {
      setSaludo({
        titulo: "¡Excelente jornada, José Manuel!",
        sub: "Consolidando los cierres y metas del día."
      });
    }
  }, []);

  return (
    <header className="flex flex-wrap justify-between items-center gap-3 p-3 sm:p-4">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-slate-700 shrink-0 shadow-sm border border-blue-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-[#0067b1]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12" />
          </svg>
        </div>
        <div className="min-w-0">
          <h1 className="text-sm sm:text-base font-black text-slate-800 tracking-tight leading-tight truncate">
            {saludo.titulo}
          </h1>
          <p className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5 truncate">
            {saludo.sub}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
        <Chip className="bg-amber-50 text-amber-700 font-black text-xs border border-amber-200/80 shadow-sm">
          {puntosTotales} VIP
        </Chip>
        <button 
          className="flex items-center gap-1.5 bg-white border-2 border-red-200 hover:border-red-400 hover:bg-red-50 text-red-500 hover:text-red-600 font-black text-[10px] sm:text-[11px] uppercase tracking-wider px-3 py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
          onClick={onLogout}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0110.5 3h6a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0116.5 21h-6a2.25 2.25 0 01-2.25-2.25V15m-3 0l3-3m0 0l-3-3m3 3H3" />
          </svg>
          <span className="hidden xs:inline">Salir</span>
        </button>
      </div>
    </header>
  );
}