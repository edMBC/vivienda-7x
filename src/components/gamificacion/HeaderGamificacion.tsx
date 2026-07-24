"use client";

import { Chip, Progress } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderGamificacionProps {
  puntosAcumulados: number;
  progresoTotal: number;
}

export default function HeaderGamificacion({
  puntosAcumulados,
  progresoTotal,
}: HeaderGamificacionProps) {
  // Mensajes de calor humano según el avance del viaje
  const obtenerFraseEmocional = () => {
    if (progresoTotal === 0) return "¡Empecemos a trazar tu futuro!";
    if (progresoTotal <= 40) return "¡Qué gran inicio! Cimientos seguros.";
    if (progresoTotal <= 80) return "¡Vas increíble! Tu hogar toma forma.";
    return "¡Estás a un paso de las llaves!";
  };

  return (
    <div className="space-y-3 w-full">
      {/* Barra Superior con Identidad y Calor Humano */}
      <header className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200/60 shadow-xs">
        <div className="flex items-center gap-3">
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-xl flex-shrink-0 shadow-xs"
          >
            🏡
          </motion.div>
          <div>
            <h1 className="text-sm font-black text-[#575756] tracking-tight leading-none">
              El Camino a Casa
            </h1>
            <p className="text-[10px] text-[#0067b1] font-extrabold uppercase tracking-wider mt-1">
              Colsubsidio con tu familia
            </p>
          </div>
        </div>
        <Chip className="bg-[#ffd000] text-slate-900 font-black text-xs border border-amber-300 shadow-2xs">
          ★ {puntosAcumulados} Pts
        </Chip>
      </header>

      {/* Barra de Progreso Emocional Dinámica */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/60 shadow-2xs space-y-2">
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider">
          <AnimatePresence mode="wait">
            <motion.span 
              key={obtenerFraseEmocional()}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="text-slate-600 font-extrabold lowercase first-letter:uppercase"
            >
              {obtenerFraseEmocional()}
            </motion.span>
          </AnimatePresence>
          <span className="text-[#0067b1] font-mono">{Math.round(progresoTotal)}%</span>
        </div>
        <Progress 
          value={progresoTotal} 
          color="warning" 
          className="h-2.5" 
          radius="full" 
        />
      </div>
    </div>
  );
}