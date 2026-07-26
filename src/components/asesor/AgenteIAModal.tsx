"use client";

import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Progress } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";

interface Lead {
  id: string;
  nombre: string;
  documento: string;
  proyecto: string;
}

interface AgenteIAModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  onIncubarExitoso: () => void;
}

export default function AgenteIAModal({ isOpen, onClose, lead, onIncubarExitoso }: AgenteIAModalProps) {
  const [pasoSimulacion, setPasoSimulacion] = useState(0);
  const [progresoBarra, setProgresoBarra] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setPasoSimulacion(0);
      setProgresoBarra(0);
      return;
    }

    const t1 = setTimeout(() => { setPasoSimulacion(1); setProgresoBarra(35); }, 1500);
    const t2 = setTimeout(() => { setPasoSimulacion(2); setProgresoBarra(70); }, 3500);
    const t3 = setTimeout(() => { setPasoSimulacion(3); setProgresoBarra(100); }, 5500);

    const t4 = setTimeout(() => {
      onIncubarExitoso();
    }, 7000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isOpen]);

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      backdrop="blur" 
      size="sm"
      className="bg-white text-slate-800 rounded-3xl border border-slate-200 shadow-2xl mx-4 my-auto"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex items-center gap-3 pt-5 px-5 pb-2 border-b border-slate-100">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-xl shadow-2xs shrink-0">
                🤖
              </div>
              <div className="flex flex-col min-w-0">
                <h3 className="text-xs font-black text-purple-600 uppercase tracking-wider truncate">Monitor Asíncrono de IA</h3>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate">Rescate de Perfil</span>
              </div>
            </ModalHeader>
            
            <ModalBody className="px-5 py-4 text-xs font-medium space-y-4">
              
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-wider text-slate-400">
                  <span>{pasoSimulacion === 3 ? "✓ Proceso Completado" : "⚡ Analizando y Conversando"}</span>
                  <span className="font-mono text-purple-600">{progresoBarra}%</span>
                </div>
                <Progress value={progresoBarra} color="secondary" className="h-1.5" radius="full" />
              </div>

              {/* Contenedor responsivo del Chat */}
              <div className="space-y-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/60 h-auto min-h-[12rem] max-h-[45vh] overflow-y-auto flex flex-col justify-start font-sans">
                
                <div className="bg-slate-200/60 text-slate-600 p-2 rounded-xl text-[10.5px] max-w-[95%] font-semibold">
                  🔍 Score inferior al mínimo detectado. Iniciando canal de incubación con <strong>{lead?.nombre}</strong>...
                </div>

                <AnimatePresence>
                  {pasoSimulacion >= 1 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-purple-50 border border-purple-100 p-2.5 rounded-xl text-[11px] max-w-[90%] self-start text-purple-950 shadow-3xs"
                    >
                      🤖 <strong>Agente IA:</strong> <em>"Hola {lead?.nombre}, detectamos que tu capacidad actual requiere un empuje. Activemos un Plan Semilla de ahorro enfocado en {lead?.proyecto}. ¿Revisamos cifras?"</em>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {pasoSimulacion >= 2 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-blue-50 border border-blue-100 p-2.5 rounded-xl text-[11px] max-w-[90%] self-end text-blue-950 shadow-3xs"
                    >
                      📱 <strong>{lead?.nombre}:</strong> <em>"Me interesa congelar el valor de la vivienda. Configura mi débito automático por $180.000 mensuales."</em>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {pasoSimulacion >= 3 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-50 border border-emerald-100 p-2 rounded-xl text-[10.5px] max-w-[95%] text-emerald-800 font-bold self-center text-center shadow-3xs mt-2"
                    >
                      🎉 ¡Plan Semilla Vinculado! Perfil actualizado en BD.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Estado de carga inferior */}
              <div className="flex items-center justify-center h-4">
                {pasoSimulacion < 3 && (
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-widest animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" />
                    Perfilando en canal externo...
                  </div>
                )}
              </div>

            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}