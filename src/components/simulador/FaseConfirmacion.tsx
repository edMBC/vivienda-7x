"use client";

import { motion } from "framer-motion";
import { Card, Button, Chip, Divider } from "@nextui-org/react";
import { Proyecto } from "./FaseResultados";
import { useLead } from "@/context/LeadContext";

interface FaseConfirmacionProps {
  proyecto: Proyecto;
  onReiniciar: () => void;
}

export default function FaseConfirmacion({ proyecto, onReiniciar }: FaseConfirmacionProps) {
  const { lead } = useLead();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-2xl text-center mx-auto p-4 sm:p-6 lg:p-8"
    >
      <Card className="p-6 sm:p-10 shadow-2xl border-t-8 border-emerald-400 overflow-visible relative bg-linear-to-b from-white to-blue-50/40 rounded-[2rem]">
        
        {/* Isotipo de Celebración Flotante y Responsivo */}
        <motion.div 
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 w-24 h-24 sm:w-28 sm:h-28 bg-linear-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center border-4 sm:border-6 border-white shadow-xl"
        >
          <span className="text-4xl sm:text-5xl drop-shadow-sm">🎉</span>
        </motion.div>

        <div className="mt-12 sm:mt-14 space-y-6 sm:space-y-8">
          
          {/* Mensaje Principal Emotivo */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#575756] tracking-tight leading-tight">
              ¡Qué emoción! Ya dimos <br className="hidden sm:block" /> el primer gran paso 🏡
            </h1>
            <p className="text-xs sm:text-sm font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 inline-block px-4 py-1.5 rounded-full">
              Tu sueño habitacional está en marcha
            </p>
          </div>

          <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-medium max-w-lg mx-auto">
            Hemos reservado tu lugar especial para el proyecto <strong className="text-[#0067b1] font-extrabold">{proyecto.nombre}</strong>.
            <br /><br />
            Tu perfil es ideal y ya se encuentra en la ruta prioritaria. Un asesor experto de nuestra sala de ventas te contactará muy pronto para celebrar juntos y guiarte en el cierre.
          </p>

          {/* Bloque de Logros (Match y Estado) */}
          <div className="bg-white border border-blue-100 shadow-sm p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row justify-around items-center gap-4 sm:gap-6">
            <div className="flex flex-col items-center">
              <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mb-1.5">Tu Nivel de Match</span>
              <Chip color="success" variant="flat" className="font-black text-sm sm:text-base px-2 py-4">✨ {proyecto.viabilidadActual}% Compatible</Chip>
            </div>
            <div className="w-full sm:w-px h-px sm:h-12 bg-slate-200" />
            <div className="flex flex-col items-center">
              <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mb-1.5">Próximo Paso</span>
              <Chip color="primary" variant="flat" className="font-black text-[10px] sm:text-xs uppercase tracking-wider px-2 py-4">📞 Llamada del Asesor</Chip>
            </div>
          </div>

          <Divider className="opacity-40" />

          {/* Resumen del Perfil (Más amigable con Emojis) */}
          <div className="space-y-4 text-left bg-white/60 p-4 sm:p-6 rounded-2xl border border-slate-100">
            <h3 className="text-xs font-black text-[#0067b1] uppercase tracking-widest text-center sm:text-left">
              Lo que le contamos a tu asesor:
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { label: "Tu Nombre", val: lead.nombre || "No Registrado", icon: "👋" },
                { label: "Documento", val: lead.leadId || "No Registrada", icon: "🪪" },
                { label: "Hogar Soñado", val: proyecto.nombre, icon: "🔑", color: "text-[#0067b1]" },
                { label: "Tu Edad", val: lead.rangoEdad || "Mapeado por Sistema", icon: "⏳" },
                { label: "Tu Familia", val: lead.personasCargo ? `${lead.personasCargo} Personas a cargo` : "1 Persona a cargo", icon: "👨‍👩‍👧‍👦" },
                { label: "Tu Segmento", val: lead.segmentoCaja || "Joven Digital", icon: "🎯" },
                { label: "Beneficios Caja", val: lead.isAfiliado ? "¡Eres Afiliado!" : "Pronto Afiliado", icon: "🎁", color: lead.isAfiliado ? "text-emerald-600" : "text-amber-600" },
                { label: "Zona Elegida", val: proyecto.zona, icon: "📍" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
                  <div className="text-xl sm:text-2xl bg-blue-50 w-10 h-10 flex items-center justify-center rounded-lg shrink-0">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <span className="text-slate-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wide block">{item.label}</span>
                    <p className={`font-extrabold text-xs sm:text-sm mt-0.5 truncate ${item.color || "text-slate-700"}`}>
                      {item.val}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Acción de Cierre Suave */}
          <div className="pt-2">
            <Button
              size="lg"
              className="w-full sm:w-auto px-10 font-black bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs sm:text-sm uppercase tracking-wider h-12 sm:h-14 rounded-2xl transition-all active:scale-95"
              onClick={onReiniciar}
            >
              Volver al Inicio Seguro
            </Button>
          </div>
          
        </div>
      </Card>
    </motion.div>
  );
}