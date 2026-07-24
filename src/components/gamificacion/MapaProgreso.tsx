"use client";

import { Estacion } from "@/types/gamificacion";
import { motion } from "framer-motion";

interface MapaProgresoProps {
  estaciones: Estacion[];
}

export default function MapaProgreso({ estaciones }: MapaProgresoProps) {
  // Iconos representativos y humanos para cada paso del camino
  const iconosPasos = ["🧱", "📐", "👨‍👩‍👧‍👦", "🪙", "📍"];
  const nombresPasos = ["Cimientos", "Estructura", "Familia", "Ahorro", "Entorno"];

  return (
    <div className="bg-white p-3 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-1 shadow-2xs w-full select-none">
      {estaciones.map((e, idx) => {
        const completado = e.completada;

        return (
          <motion.div
            key={e.id}
            whileTap={{ scale: 0.95 }}
            className={`flex-1 py-2 px-1 rounded-xl border text-center transition-all duration-300 flex flex-col items-center justify-center gap-0.5 ${
              completado
                ? "bg-emerald-50 border-emerald-300 text-emerald-700 shadow-2xs ring-2 ring-emerald-100"
                : "bg-slate-50 border-slate-100 text-slate-400 opacity-70"
            }`}
          >
            <span className="text-xs">{completado ? "✨" : iconosPasos[idx]}</span>
            <span className="text-[8px] font-black uppercase tracking-tighter truncate w-full">
              {nombresPasos[idx]}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}