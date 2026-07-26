"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Chip } from "@nextui-org/react";

interface Lead {
  id: string;
  nombre: string;
  documento: string;
  proyecto: string;
  score: number;
  status: "verde" | "amarillo" | "rojo";
  fuente: "afiliado" | "app";
  rangoEdad?: string;
  personasCargo?: number | string;
  segmentoCaja?: string;
  segmentoFamilia?: string;
  piramideEmpresas?: string;
  tipoAhorro?: string;
  ubicacion?: string;
}

interface DetallesLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
}

export default function DetallesLeadModal({ isOpen, onClose, lead }: DetallesLeadModalProps) {
  if (!lead) return null;

  const colorScore = lead.status === "rojo" ? "danger" : lead.status === "amarillo" ? "warning" : "success";

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      backdrop="blur" 
      size="md" 
      scrollBehavior="inside" // Permite hacer scroll interno si la pantalla es muy pequeña
      className="bg-white text-slate-800 rounded-3xl border border-slate-200 shadow-2xl mx-4 my-auto max-h-[90vh]"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 pt-5 px-5 sm:px-6 border-b border-slate-100">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                Ficha de Asignación Habitacional
              </span>
              <h2 className="text-base font-black text-slate-800 tracking-tight truncate">
                {lead.nombre}
              </h2>
            </ModalHeader>

            <ModalBody className="px-5 sm:px-6 py-4 space-y-4 text-xs font-medium">
              
              <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200/70 rounded-2xl flex-wrap gap-2">
                <div>
                  <p className="text-slate-400 text-[9px] uppercase font-black tracking-wider">Score Analítico ML</p>
                  <p className="font-mono text-xl font-black text-slate-800 mt-0.5">{lead.score}%</p>
                </div>
                <Chip color={colorScore} variant="flat" className="font-black uppercase tracking-wider text-[10px]">
                  Semáforo {lead.status}
                </Chip>
              </div>

              <div className="space-y-2 pb-2">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1">
                  Variables de Perfilamiento
                </h4>
                
                {/* Responsive Grid: 1 columna en móvil, 2 en pantallas más grandes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { label: "Documento", val: lead.documento || "Sin Documento" },
                    { label: "Proyecto Destino", val: lead.proyecto, color: "text-[#0067b1]" },
                    { label: "Rango de Edad", val: lead.rangoEdad || "20-35 años" },
                    { label: "Personas a Cargo", val: lead.personasCargo ?? "1 Dependiente" },
                    { label: "Composición Familiar", val: lead.segmentoFamilia || "Sin Grupo" },
                    { label: "Segmento Subsidio", val: lead.segmentoCaja || "Joven Digital" },
                    { label: "Categoría Empresa", val: lead.piramideEmpresas || "Sector TAU" },
                    { label: "Canal de Captura", val: lead.fuente === "app" ? "📱 Gamificación" : "🏢 Formulario" },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
                      <p className="text-slate-400 text-[9px] uppercase font-bold">{item.label}</p>
                      <p className={`font-extrabold mt-0.5 truncate ${item.color || "text-slate-700"}`}>
                        {item.val}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </ModalBody>

            <ModalFooter className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100">
              <Button 
                className="w-full font-black text-xs uppercase tracking-wider h-11 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl"
                onPress={onClose}
              >
                Cerrar Ficha
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}