"use client";

import { Card, CardBody, Progress } from "@nextui-org/react";

interface PanelRetoMisionesProps {
  amarillosContactados: number;
  metaAmarillos: number;
}

export default function PanelRetoMisiones({ amarillosContactados, metaAmarillos }: PanelRetoMisionesProps) {
  return (
    <Card className="border-none shadow-md rounded-2xl bg-gradient-to-br from-[#0067b1] via-[#00528f] to-slate-900 text-white">
      <CardBody className="p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <span className="inline-block bg-[#ffd000] text-[#575756] font-black text-[9px] px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
              Motor de Conversión Colsubsidio
            </span>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
              El Reto: Mueve 2 Semillas a Etapa de Cierre
            </h2>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 w-full md:w-64 space-y-1.5 flex-shrink-0">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-blue-100">Progreso de Racha</span>
              <span className="text-[#ffd000] font-black">{amarillosContactados} / {metaAmarillos}</span>
            </div>
            <Progress value={(amarillosContactados / metaAmarillos) * 100} color="warning" className="h-1.5" radius="full" />
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
          <div className="bg-red-500/10 border border-red-500/30 p-2 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-red-500 mx-auto mb-1 animate-pulse" />
            <p className="text-[10px] font-black text-red-200 uppercase">1. Rojo</p>
            <p className="text-[9px] text-slate-300 font-medium">Incubación / Sin Ahorro</p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 p-2 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-amber-400 mx-auto mb-1 animate-pulse" />
            <p className="text-[10px] font-black text-amber-300 uppercase">2. Amarillo</p>
            <p className="text-[9px] text-slate-300 font-medium">Plan Semilla / Ahorrando</p>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-2 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-emerald-400 mx-auto mb-1 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            <p className="text-[10px] font-black text-emerald-300 uppercase">3. Verde</p>
            <p className="text-[9px] text-slate-300 font-medium">Subsidio Listo / Escritura</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}