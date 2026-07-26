"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Chip, Divider } from "@nextui-org/react";
import { Proyecto } from "./FaseResultados";

interface DetallesProyectoModalProps {
  isOpen: boolean;
  onClose: () => void;
  proyecto: Proyecto | null;
}

export default function DetallesProyectoModal({ isOpen, onClose, proyecto }: DetallesProyectoModalProps) {
  if (!proyecto) return null;

  // Generación de especificaciones habitacionales dinámicas según el proyecto
  const especificaciones = [
    { label: "Área Construida", val: "48 m² - 58 m²", icon: "📐" },
    { label: "Habitaciones", val: "2 a 3 Alcobas", icon: "🛏️" },
    { label: "Baños", val: "1 a 2 Baños", icon: "🚿" },
    { label: "Estrato", val: "Estrato 2 - 3", icon: "🏙️" },
    { label: "Subsidio Aplica", val: "PAC / Mi Casa Ya", icon: "🪙" },
    { label: "Entrega Estimada", val: "2026 - 2027", icon: "🔑" },
  ];

  const amenidades = [
    "🏊‍♂️ Piscina Infantil y Adultos",
    "🏋️‍♂️ Gimnasio Equipado",
    "🧸 Zona de Juegos para Niños",
    "🌳 Zonas Verdes y Senderos",
    "🎉 Salón Social Comunitario",
    "🐶 Zona Pet Friendly",
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      backdrop="blur"
      size="lg"
      scrollBehavior="inside"
      className="bg-white text-slate-800 rounded-3xl border border-slate-200 shadow-2xl mx-3 my-auto max-h-[90vh]"
    >
      <ModalContent>
        {(onClose) => (
          <>
            {/* Banner del Proyecto */}
            <div className="relative h-48 sm:h-56 w-full bg-slate-900 overflow-hidden flex flex-col justify-end p-5">
              <img
                src={proyecto.imagen}
                alt={proyecto.nombre}
                className="absolute inset-0 object-cover w-full h-full opacity-70"
                onError={(e) => {
                  e.currentTarget.src = "/images/propiedades/boseque_de_arrayan.png";
                }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />

              <div className="relative z-20 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#ffd000] bg-black/40 px-2.5 py-0.5 rounded-md border border-white/20 backdrop-blur-md">
                    {proyecto.zona}
                  </span>
                  <Chip size="sm" color="success" className="font-black text-[10px] uppercase">
                    VIS Disponible
                  </Chip>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                  {proyecto.nombre}
                </h2>
                <p className="text-xs font-bold text-blue-200">{proyecto.precio}</p>
              </div>
            </div>

            {/* Cuerpo de la Ficha Técnica */}
            <ModalBody className="px-5 sm:px-8 py-5 space-y-5 text-xs">
              
              {/* Concepto */}
              <div className="space-y-1">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Concepto del Proyecto
                </h4>
                <p className="text-slate-600 leading-relaxed font-medium text-xs sm:text-sm">
                  {proyecto.descripcion} Un espacio pensado para brindar seguridad, bienestar y valorización a tu inversión familiar con el respaldo directo de la Caja de Compensación Colsubsidio.
                </p>
              </div>

              <Divider className="opacity-60" />

              {/* Matriz de Especificaciones Tácticas */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Ficha Técnica y Espacios
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {especificaciones.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200/80 p-3 rounded-2xl flex flex-col justify-between space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <span className="text-sm">{item.icon}</span>
                        <span className="text-[9px] font-black uppercase tracking-wider">{item.label}</span>
                      </div>
                      <p className="font-black text-slate-800 text-xs truncate">{item.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenidades y Zonas Comunes */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Zonas Sociales y Beneficios
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-blue-50/50 border border-blue-100 p-3.5 rounded-2xl">
                  {amenidades.map((amenidad, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-700 font-bold text-[11px]">
                      <span>{amenidad}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Entorno y Ubicación */}
              <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-1.5 shadow-inner">
                <div className="flex items-center gap-2 text-[#ffd000]">
                  <span className="text-sm">📍</span>
                  <h4 className="text-xs font-black uppercase tracking-wider">Ubicación y Conectividad</h4>
                </div>
                <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                  Cercano a rutas principales de transporte, centros comerciales, colegios y redes de salud Colsubsidio. Diseñado para optimizar tus tiempos de desplazamiento diarios.
                </p>
              </div>

            </ModalBody>

            {/* Cierre correcto del bloque de acciones */}
            <ModalFooter className="px-5 sm:px-8 pb-5 pt-2 border-t border-slate-100">
              <Button
                className="w-full font-black text-xs uppercase tracking-wider h-12 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl"
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