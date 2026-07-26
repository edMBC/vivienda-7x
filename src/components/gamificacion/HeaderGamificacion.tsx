"use client";

import { motion } from "framer-motion";

interface HeaderGamificacionProps {
  puntosAcumulados: number;
  progresoTotal: number;
}

export default function HeaderGamificacion({ puntosAcumulados, progresoTotal }: HeaderGamificacionProps) {
  return (
    <header className="w-full max-w-sm mx-auto bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl p-3.5 flex items-center justify-between shadow-xs relative z-30">
      
      {/* Marca / Identificación */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#0067b1]" />
          <span className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
            Mi Camino VIS
          </span>
        </div>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-3.5">
          Team 7x
        </p>
      </div>

      {/* Indicador de Puntuación Gamificada con Animación */}
      <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-200/50 px-3 py-1.5 rounded-xl shadow-3xs">
        <motion.span 
          key={puntosAcumulados}
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: [1.3, 1], rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="text-xs"
        >
          ✨
        </motion.span>
        <div className="text-right">
          <span className="block text-[9px] font-black text-amber-600 uppercase tracking-wider leading-none">
            Puntos
          </span>
          <span className="text-xs font-black text-slate-800 leading-none">
            {puntosAcumulados}
          </span>
        </div>
      </div>

    </header>
  );
}