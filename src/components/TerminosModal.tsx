"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface TerminosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export default function TerminosModal({
  isOpen,
  onClose,
  onAccept,
}: TerminosModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      scrollBehavior="inside"
      backdrop="blur"
      className="max-w-[95vw] sm:max-w-[600px] border-t-4 border-[#0067b1]"
    >
      <ModalContent>
        {(closeModal) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-[#0067b1] font-extrabold text-xl">
              Términos, Condiciones y Habeas Data
            </ModalHeader>
            <ModalBody className="text-sm text-[#575756] leading-relaxed gap-4">
              <p className="font-semibold text-gray-800">
                Autorización para el Tratamiento de Datos Personales
              </p>
              <p>
                Al continuar, autorizas expresamente a la Caja de Compensación Familiar
                Colsubsidio y a sus aliados estratégicos inmobiliarios para recolectar,
                almacenar y procesar tus datos personales conforme a la Ley 1581 de 2012
                (Habeas Data).
              </p>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-xs gap-2 flex flex-col">
                <span className="font-bold text-[#0067b1]">Finalidades del tratamiento:</span>
                <ul className="list-disc pl-4 space-y-1 text-gray-600">
                  <li>Validación de estado de afiliación y categoría de aportes.</li>
                  <li>Simulación de capacidad crediticia y estructuración del Plan de Ahorro y Crédito (PAC).</li>
                  <li>Cruce de verosimilitud para asignación prioritaria de vivienda VIS.</li>
                  <li>Contacto directo por parte de asesores comerciales especializados.</li>
                </ul>
              </div>
              <p className="text-xs text-gray-500">
                Tus datos no serán cedidos a terceros no vinculados con la gestión de tu subsidio y proyecto de vivienda.
              </p>
            </ModalBody>
            <ModalFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="light"
                color="danger"
                className="font-semibold"
                onPress={closeModal}
              >
                Cancelar
              </Button>
              <Button
                className="bg-[#0067b1] text-white font-bold px-6 shadow-md"
                onPress={() => {
                  onAccept();
                  closeModal();
                }}
              >
                Aceptar y Continuar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}