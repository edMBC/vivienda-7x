"use client";

import { useState } from "react";
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button,
  Checkbox
} from "@nextui-org/react";

interface TerminosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAceptar: () => void;
}

export default function TerminosModal({ isOpen, onClose, onAceptar }: TerminosModalProps) {
  const [aceptadoCheck, setAceptadoCheck] = useState(false);

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      scrollBehavior="inside"
      size="md"
      backdrop="blur"
      placement="bottom"
      // AQUÍ ESTABA EL ERROR: Faltaba bg-white para evitar la transparencia
      className="bg-white rounded-t-3xl sm:rounded-2xl mx-0 sm:mx-auto shadow-2xl" 
    >
      <ModalContent>
        {(actualClose) => (
          <>
            {/* CABEZOTE */}
            <ModalHeader className="flex flex-col gap-1 pt-4 px-6 pb-3 border-b border-slate-200 bg-slate-50 flex-shrink-0">
              <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto mb-3 sm:hidden" />
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#0067b1] rounded-xs inline-block"></span>
                <h2 className="text-base font-bold text-slate-900 tracking-tight leading-tight">
                  Términos y Protección de Datos
                </h2>
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest pl-3.5">
                Plataforma de Vivienda — Colsubsidio
              </p>
            </ModalHeader>

            {/* CUERPO (Ahora con fondo sólido gracias al contenedor padre) */}
            <ModalBody className="py-5 px-6 text-slate-700 text-xs space-y-4 font-normal leading-relaxed overflow-y-auto">
              <p className="text-slate-600 font-medium">
                Con el fin de procesar su perfilamiento, estimar los subsidios de vivienda de interés social (VIS) según la normativa vigente y gestionar su experiencia de usuario, los datos suministrados se regirán bajo las siguientes condiciones legales:
              </p>

              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-[12px] uppercase tracking-wide border-b border-slate-100 pb-1">
                  Cláusula Primera: Autorización (Ley 1581)
                </h3>
                <p className="text-slate-600 text-[11.5px] pl-1 text-justify">
                  El usuario otorga su autorización expresa, previa e informada a Colsubsidio para la recolección, almacenamiento, uso y cruce analítico de sus datos básicos, información de ingresos mensuales y conformación del núcleo familiar, con el único propósito de evaluar viabilidades habitacionales comerciales.
                </p>
              </div>

              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-slate-950 text-[12px] uppercase tracking-wide pb-1">
                  Cláusula Segunda: Exención Financiera
                </h3>
                <p className="text-slate-800 text-[11.5px] pl-1 text-justify font-medium">
                  El presente sistema opera exclusivamente como un motor estadístico de simulación y perfilamiento prioritario. <strong>Bajo ninguna circunstancia este ejercicio constituye una aprobación formal o estudio analítico de crédito hipotecario.</strong>
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-[12px] uppercase tracking-wide border-b border-slate-100 pb-1">
                  Cláusula Tercera: Finalidad del Perfilamiento
                </h3>
                <p className="text-slate-600 text-[11.5px] pl-1 text-justify">
                  La información recolectada se procesará con el objetivo de optimizar los tiempos de respuesta y atención. Los datos estructurados determinarán la prioridad de asignación y contacto dentro de los flujos de asesoría.
                </p>
              </div>

              {/* CHECKBOX */}
              <div className="pt-2 pb-2 pl-1">
                <Checkbox 
                  isSelected={aceptadoCheck} 
                  onValueChange={setAceptadoCheck}
                  radius="sm"
                  size="sm"
                  classNames={{
                    base: "items-start",
                    wrapper: "mt-0.5",
                    label: "text-[11.5px] font-bold text-slate-600 leading-tight select-none whitespace-normal text-justify"
                  }}
                >
                  Manifiesto que he leído y acepto los términos y el tratamiento de mis datos personales de acuerdo con las cláusulas anteriores.
                </Checkbox>
              </div>
            </ModalBody>

            {/* ACCIONES DEL BOTÓN */}
            <ModalFooter className="border-t border-slate-200 p-4 flex gap-2 bg-slate-50 flex-shrink-0 pb-6 sm:pb-4">
              <Button 
                variant="light" 
                className="font-bold text-slate-500 text-xs rounded-xl h-12 px-4"
                onClick={actualClose}
              >
                Cancelar
              </Button>
              <Button 
                isDisabled={!aceptadoCheck}
                className={`flex-grow font-bold rounded-xl text-xs uppercase tracking-wider h-12 transition-all ${
                  aceptadoCheck 
                    ? "bg-[#0067b1] text-white hover:bg-[#00528f] active:scale-95 shadow-md" 
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
                onClick={() => {
                  onAceptar();
                  actualClose();
                }}
              >
                Confirmar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}