"use client";

import { useState } from "react";
import { Progress, Button } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";

interface PanelMetricasMisionesProps {
  amarillosContactados: number;
  metaAmarillos: number;
  stats: {
    total: number;
    verdes: number;
    amarillos: number;
    rojos: number;
  };
}

export default function PanelMetricasMisiones({ amarillosContactados, metaAmarillos, stats }: PanelMetricasMisionesProps) {
  const [llavesEntregadas, setLlavesEntregadas] = useState(12);
  const [efectoLlave, setEfectoLlave] = useState(false);

  const totalMovilidad = stats.total > 0 ? ((stats.verdes + stats.amarillos) / stats.total) * 100 : 0;

  const pVerdes = stats.total > 0 ? (stats.verdes / stats.total) * 100 : 0;
  const pAmarillos = stats.total > 0 ? (stats.amarillos / stats.total) * 100 : 0;
  const pRojos = stats.total > 0 ? (stats.rojos / stats.total) * 100 : 0;

  const registrarLlaveVirtual = () => {
    setLlavesEntregadas(prev => prev + 1);
    setEfectoLlave(true);
    setTimeout(() => setEfectoLlave(false), 1000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      
      {/* 1. VITRINA VIRTUAL DE LOGROS */}
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-5 flex flex-col justify-between shadow-lg relative overflow-hidden h-auto min-h-[11rem] md:h-48 gap-4">
        <div className="absolute top-[-10%] right-[-5%] text-7xl opacity-5 pointer-events-none select-none">🏆</div>
        <div className="space-y-1">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
            Vitrina de Logros VIP
          </span>
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">
            Llaves Entregadas
          </h3>
        </div>

        <div className="flex items-baseline gap-2 my-auto relative z-10">
          <AnimatePresence mode="wait">
            <motion.span 
              key={llavesEntregadas}
              initial={{ y: 15, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="text-4xl font-black text-[#0067b1] drop-shadow-sm"
            >
              {llavesEntregadas}
            </motion.span>
          </AnimatePresence>
          <span className="text-xs font-bold text-slate-500">Familias en su Hogar</span>
        </div>

        <Button
          size="sm"
          className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black text-[10px] uppercase tracking-wider rounded-xl shadow-md active:scale-95 transition-all"
          onClick={registrarLlaveVirtual}
        >
          {efectoLlave ? "¡Felicidades! 🎉" : "⚡ Registrar Entrega de Llave"}
        </Button>
      </div>

      {/* 2. GRÁFICA TOTAL DE MOVILIDAD HABITACIONAL */}
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-5 flex flex-col justify-between shadow-lg h-auto md:h-48 md:col-span-2 gap-4">
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
              Indicador de Impacto General
            </span>
            <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md shadow-xs">
              Eficiencia Comercial
            </span>
          </div>
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">
            Índice Total de Movilidad a la Caja
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center flex-grow">
          <div className="space-y-1.5">
            <div className="flex justify-between items-end text-xs font-bold text-slate-600">
              <span>Conversión General</span>
              <span className="font-mono text-emerald-600 text-sm font-black">{Math.round(totalMovilidad)}%</span>
            </div>
            <Progress value={totalMovilidad} color="success" className="h-2.5 shadow-inner" radius="full" />
            <p className="text-[9px] text-slate-400 font-medium leading-tight hidden sm:block">
              Porcentaje de prospectos activos en etapa Semilla y Cierres sobre la base de datos total.
            </p>
          </div>

          <div className="flex items-end justify-around h-20 bg-slate-50/60 border border-slate-100 rounded-2xl px-2 pt-4 relative mb-4 sm:mb-0">
            <div className="flex flex-col items-center group w-8 space-y-1">
              <div className="w-full bg-slate-200 rounded-t-md h-12 flex items-end overflow-hidden relative shadow-3xs">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${pVerdes || 5}%` }}
                  className="w-full bg-emerald-500"
                />
              </div>
              <span className="text-[9px] font-black text-emerald-600 font-mono">{stats.verdes}</span>
            </div>

            <div className="flex flex-col items-center group w-8 space-y-1">
              <div className="w-full bg-slate-200 rounded-t-md h-12 flex items-end overflow-hidden relative shadow-3xs">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${pAmarillos || 5}%` }}
                  className="w-full bg-amber-400"
                />
              </div>
              <span className="text-[9px] font-black text-amber-600 font-mono">{stats.amarillos}</span>
            </div>

            <div className="flex flex-col items-center group w-8 space-y-1">
              <div className="w-full bg-slate-200 rounded-t-md h-12 flex items-end overflow-hidden relative shadow-3xs">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${pRojos || 5}%` }}
                  className="w-full bg-red-500"
                />
              </div>
              <span className="text-[9px] font-black text-red-600 font-mono">{stats.rojos}</span>
            </div>

            <div className="absolute -bottom-5 left-0 right-0 flex justify-around text-[8px] font-black uppercase tracking-wider text-slate-400">
              <span className="w-8 text-center truncate">Cierres</span>
              <span className="w-8 text-center truncate">Semilla</span>
              <span className="w-8 text-center truncate">Incubar</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}