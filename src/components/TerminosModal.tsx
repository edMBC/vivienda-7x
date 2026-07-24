"use client";

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center p-4 z-[99999]">
      {/* Fondo oscuro difuminado */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Caja de la Ventana Emergente */}
      <div className="relative bg-white w-full max-w-[600px] max-h-[85vh] rounded-3xl shadow-2xl border-t-8 border-[#0067b1] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-[100000]">
        
        {/* Cabecera */}
        <div className="p-6 border-b border-slate-100 flex-shrink-0">
          <h3 className="text-xl font-extrabold text-[#0067b1]">
            Términos, Condiciones y Habeas Data
          </h3>
        </div>

        {/* Cuerpo con Scroll Interno */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-[#575756] leading-relaxed">
          <p className="font-bold text-gray-800 text-base">
            Autorización para el Tratamiento de Datos Personales
          </p>
          <p>
            Al continuar, autorizas expresamente a la Caja de Compensación Familiar
            Colsubsidio y a sus aliados estratégicos inmobiliarios para recolectar,
            almacenar y procesar tus datos personales conforme a la Ley 1581 de 2012
            (Habeas Data).
          </p>
          
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2 shadow-inner">
            <span className="font-bold text-[#0067b1] block">Finalidades del tratamiento:</span>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li>Validación de estado de afectación y categoría de aportes.</li>
              <li>Simulación de capacidad crediticia y estructuración del Plan de Ahorro y Crédito (PAC).</li>
              <li>Cruce de verosimilitud para asignación prioritaria de vivienda VIS.</li>
              <li>Contacto directo por parte de asesores comerciales especializados.</li>
            </ul>
          </div>
          
          <p className="text-xs text-slate-400 font-medium">
            Tus datos no serán cedidos a terceros no vinculados con la gestión de tu subsidio y proyecto de vivienda.
          </p>
        </div>

        {/* Botones de Acción */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-end gap-3 flex-shrink-0">
          <button
            type="button"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-sm text-red-500 hover:bg-red-50 transition-colors focus:outline-none"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0067b1] hover:bg-[#00528f] text-white font-bold text-sm shadow-md transition-all active:scale-95 focus:outline-none"
            onClick={() => {
              onAccept();
              onClose();
            }}
          >
            Aceptar y Continuar
          </button>
        </div>

      </div>
    </div>
  );
}