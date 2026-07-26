"use client";

import { Button, Chip } from "@nextui-org/react";

interface Lead {
  id: string;
  nombre: string;
  documento: string;
  proyecto: string;
  afiliado: boolean;
  score: number;
  status: "verde" | "amarillo" | "rojo";
  contactado: boolean;
  ultima_accion: string | null;
  bloqueado: boolean;
  fuente: "afiliado" | "app";
}

interface LeadCardRowProps {
  lead: Lead;
  index: number;
  onAbrirWhatsApp: (lead: Lead) => void;
  onAbrirAgenteIA: (lead: Lead) => void;
  onVerDetalles: (lead: Lead) => void;
  vistaModo: "lista" | "casillas";
}

export default function LeadCardRow({ 
  lead, 
  index, 
  onAbrirWhatsApp, 
  onAbrirAgenteIA, 
  onVerDetalles, 
  vistaModo 
}: LeadCardRowProps) {
  const esVerde = lead.status === "verde";
  const esAmarillo = lead.status === "amarillo";
  const esRojo = lead.status === "rojo";

  const modoGrid = vistaModo === "casillas";

  return (
    <div
      className={`p-4 rounded-2xl border transition-all flex relative overflow-hidden gap-3 ${
        modoGrid ? "flex-col justify-between h-auto min-h-[14rem] w-full" : "flex-col sm:flex-row sm:items-center justify-between"
      } ${
        lead.bloqueado 
          ? "bg-slate-100 border-slate-200 opacity-60 select-none" 
          : lead.contactado
          ? "bg-emerald-50/50 border-emerald-200 shadow-xs cursor-pointer hover:bg-emerald-50/80"
          : "bg-white border-slate-200 shadow-sm hover:border-[#0067b1] hover:shadow-md cursor-pointer"
      }`}
      onClick={() => !lead.bloqueado && onVerDetalles(lead)}
    >
      <div className="flex items-start gap-3 min-w-0 w-full">
        {/* LED semáforo táctico */}
        <div className="flex flex-col items-center justify-center shrink-0 gap-1 bg-slate-50 border border-slate-200 p-1 rounded-lg w-7 h-14">
          <span className={`w-2.5 h-2.5 rounded-full ${esRojo ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse" : "bg-slate-200"}`} />
          <span className={`w-2.5 h-2.5 rounded-full ${esAmarillo ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)] animate-pulse" : "bg-slate-200"}`} />
          <span className={`w-2.5 h-2.5 rounded-full ${esVerde && !lead.bloqueado ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-slate-200"}`} />
        </div>
        
        <div className="min-w-0 grow pl-1">
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">
            Lead #{index + 1} • {lead.fuente === "app" ? "📱 App" : lead.afiliado ? "Afiliado" : "No Afiliado"}
          </span>
          <h3 className="font-extrabold text-sm text-slate-800 truncate leading-tight">
            {lead.bloqueado ? "Asignación Reservada" : lead.nombre}
          </h3>
          <p className="text-[11px] font-bold text-[#0067b1] mt-0.5 truncate">
            {lead.proyecto} • <span className="text-slate-500 font-medium">{lead.documento}</span>
          </p>
        </div>
      </div>

      {/* Controles inferiores del Lead */}
      <div 
        className={`flex items-center justify-between gap-4 border-t border-slate-100 pt-3 ${modoGrid ? "w-full" : "sm:border-t-0 sm:pt-0 sm:justify-end sm:gap-6"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-[9px] font-black text-slate-400 uppercase tracking-wider flex-shrink-0">
          Score ML: <span className={`${esRojo ? "text-red-500" : esAmarillo ? "text-amber-500" : "text-emerald-500"} font-mono text-sm`}>{lead.score}%</span>
        </div>

        {lead.bloqueado ? (
          <Chip size="sm" className="bg-slate-200 text-slate-500 font-black text-[9px] uppercase tracking-wider">Bloqueado</Chip>
        ) : lead.contactado ? (
          <span className="inline-flex items-center gap-1 bg-emerald-600 text-white font-black text-[9px] uppercase tracking-wider px-2.5 py-1.5 rounded-lg shadow-sm">
            {lead.ultima_accion || "Gestionado"} ✓
          </span>
        ) : esRojo ? (
          <Button
            size="sm"
            className="font-black bg-linear-to-r from-purple-600 to-indigo-600 text-white text-[10px] uppercase tracking-wider h-8 rounded-xl px-3 flex items-center gap-1 shadow-sm hover:from-purple-700 hover:to-indigo-700 active:scale-95 transition-all flex-shrink-0"
            onClick={() => onAbrirAgenteIA(lead)}
          >
            🤖 Activar IA
          </Button>
        ) : (
          <Button
            size="sm"
            className={`font-black text-xs h-8 rounded-xl px-3 flex items-center gap-1.5 shadow-sm active:scale-95 transition-all flex-shrink-0 ${
              esAmarillo ? "bg-[#ffd000] text-slate-900" : "bg-emerald-600 text-white"
            }`}
            onClick={() => onAbrirWhatsApp(lead)}
          >
            {esAmarillo ? "Madurar" : "Cerrar"}
          </Button>
        )}
      </div>
    </div>
  );
}