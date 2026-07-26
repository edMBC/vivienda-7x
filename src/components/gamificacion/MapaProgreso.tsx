"use client";

import { motion } from "framer-motion";
import { Estacion } from "@/types/gamificacion";

interface MapaProgresoProps {
  estaciones: Estacion[];
}

export default function MapaProgreso({ estaciones }: MapaProgresoProps) {
  const completadasCount = estaciones.filter((e) => e.completada).length;
  const porcentajeReal = (completadasCount / estaciones.length) * 100;

  return (
    <div className="w-full max-w-sm mx-auto bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-2xl p-4 shadow-sm relative z-20 space-y-3">
      
      {/* Encabezado del Progreso */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-3 bg-[#0067b1] rounded-xs inline-block" />
          <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider">
            Progreso del Plano
          </span>
        </div>
        <span className="text-[10px] font-bold text-[#0067b1] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md font-mono">
          {Math.round(porcentajeReal)}%
        </span>
      </div>

      {/* Barra micrométrica de carga fluida */}
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#0067b1] to-[#38bdf8]"
          initial={{ width: "0%" }}
          animate={{ width: `${porcentajeReal}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Constelación de Nodos Minimalistas */}
      <div className="grid grid-cols-9 gap-1 justify-items-center pt-1">
        {estaciones.map((est, idx) => {
          const esActiva = est.completada;
          
          return (
            <div 
              key={est.id || idx} 
              className="flex flex-col items-center gap-1.5 w-full"
            >
              {/* Nodo circular estilizado */}
              <motion.div 
                initial={false}
                animate={{ 
                  scale: esActiva ? 1.15 : 1,
                  backgroundColor: esActiva ? "#0067b1" : "#f1f5f9"
                }}
                className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                  esActiva 
                    ? "border-blue-400 shadow-[0_0_6px_rgba(0,103,177,0.3)]" 
                    : "border-slate-200"
                }`}
              />
              
              {/* Identificador numérico sutil */}
              <span className={`text-[9px] font-mono font-black ${
                esActiva ? "text-[#0067b1]" : "text-slate-400"
              }`}>
                {idx + 1}
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
}