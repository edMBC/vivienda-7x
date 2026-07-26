"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

interface InstruccionesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InstruccionesModal({ isOpen, onClose }: InstruccionesModalProps) {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="sm"
      backdrop="blur"
      placement="center"
      className="bg-gradient-to-b from-slate-50 to-white rounded-2xl mx-4 border border-slate-200/60 shadow-2xl"
    >
      <ModalContent>
        {() => (
          <>
            {/* Encabezado */}
            <ModalHeader className="flex flex-col gap-1 pt-6 px-6 pb-2 text-center">
              <div className="w-12 h-12 bg-blue-50 text-[#0067b1] rounded-2xl flex items-center justify-center mx-auto text-xl border border-blue-100 shadow-3xs mb-2">
                🏠
              </div>
              <h2 className="text-base font-black text-slate-900 tracking-tight uppercase">
                Construye Tu Casa Ideal
              </h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-0.5">
                Simulador Digital VIS
              </p>
            </ModalHeader>

            {/* Cuerpo Explicativo Rápido */}
            <ModalBody className="px-6 py-4 text-slate-600 text-xs space-y-4 font-medium leading-relaxed">
              <p className="text-slate-500 text-center text-[11.5px]">
                ¡Bienvenido al recorrido! Cada respuesta que elijas añadirá una pieza clave al plano digital de tu futuro hogar en tiempo real.
              </p>

              {/* Reglas del Juego */}
              <div className="space-y-2.5 pt-1">
                {/* Regla 1 */}
                <div className="flex items-start gap-3 p-2 bg-white rounded-xl border border-slate-100 shadow-3xs">
                  <span className="text-sm mt-0.5">🃏</span>
                  <div>
                    <h4 className="font-bold text-slate-800 text-[11.5px]">Juega las Flashcards</h4>
                    <p className="text-[10.5px] text-slate-500">Selecciona las cartas que mejor describan tu perfil financiero y familiar.</p>
                  </div>
                </div>

                {/* Regla 2 */}
                <div className="flex items-start gap-3 p-2 bg-white rounded-xl border border-slate-100 shadow-3xs">
                  <span className="text-sm mt-0.5">✨</span>
                  <div>
                    <h4 className="font-bold text-slate-800 text-[11.5px]">Acumula Beneficios</h4>
                    <p className="text-[10.5px] text-slate-500">Cada opción suma puntos de experiencia y calcula tu nivel de afiliación legal.</p>
                  </div>
                </div>

                {/* Regla 3 */}
                <div className="flex items-start gap-3 p-2 bg-white rounded-xl border border-slate-100 shadow-3xs">
                  <span className="text-sm mt-0.5">🗝️</span>
                  <div>
                    <h4 className="font-bold text-slate-800 text-[11.5px]">Match VIS Prioritario</h4>
                    <p className="text-[10.5px] text-slate-500">Al completar los 8 pasos obtendrás tu diagnóstico financiero y acceso al simulador.</p>
                  </div>
                </div>
              </div>
            </ModalBody>

            {/* Footer con Cerrado Fácil */}
            <ModalFooter className="p-4 pt-2">
              <Button 
                className="w-full font-black rounded-xl text-xs uppercase tracking-wider h-12 bg-[#0067b1] text-white hover:bg-[#00528f] active:scale-95 transition-all shadow-md"
                onClick={onClose}
              >
                ¡Comenzar a Jugar!
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}