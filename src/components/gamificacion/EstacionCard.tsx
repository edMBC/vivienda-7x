"use client";

import { useState } from "react";
import { Card, CardBody, Button, Chip } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { DimensionJuego } from "@/types/gamificacion";

interface EstacionCardProps {
  dimensiones: DimensionJuego[];
  datosJugador: Record<string, string>;
  esRutaRescate: boolean;
  onSeleccionarCarta: (categoria: string, valor: string) => void;
  onFinalizarConstruccion: () => void;
  showNombreInput?: boolean;
}

export default function EstacionCard({
  dimensiones,
  datosJugador,
  esRutaRescate,
  onSeleccionarCarta,
  onFinalizarConstruccion,
  showNombreInput = false,
}: EstacionCardProps) {
  const [pasoActual, setPasoActual] = useState(0);
  const [nombreInput, setNombreInput] = useState("");

  if (esRutaRescate) {
    return (
      <Card className="w-full max-w-sm bg-white shadow-xl border-t-8 border-slate-700 p-2 rounded-3xl text-center animate-in zoom-in-95">
        <CardBody className="p-6 space-y-6">
          <div className="w-14 h-14 mx-auto bg-slate-50 rounded-full flex items-center justify-center border border-slate-200 text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Tu parada: Sede Principal</h2>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Al analizar tus cimientos vemos un perfil corporativo que excede el tope VIS digital. Te asignamos un pase prioritario para diseñar tu solución habitacional en oficinas.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl text-left space-y-2 text-xs font-bold text-slate-600 shadow-inner">
            <div className="flex justify-between items-center border-b pb-2"><span>Atención VIP</span><span className="text-[#0067b1]">Cubo Colsubsidio</span></div>
            <div className="flex justify-between items-center"><span>Código de Acceso</span><Chip size="sm" className="bg-[#ffd000] text-slate-900 font-black">7X-CAMINO</Chip></div>
          </div>
        </CardBody>
      </Card>
    );
  }

  const dimActual = dimensiones[pasoActual];
  const viajeTerminado = pasoActual >= dimensiones.length;

  const esNombreStep = showNombreInput && dimActual?.categoria === "nombre";

  const handleNombreSubmit = () => {
    if (nombreInput.trim()) {
      onSeleccionarCarta("nombre", nombreInput.trim());
      setPasoActual((prev) => prev + 1);
    }
  };

  const seleccionarOpcion = (valor: string) => {
    onSeleccionarCarta(dimActual.categoria, valor);
    setPasoActual((prev) => prev + 1);
  };

  const totalSteps = dimensiones.length;
  const progresoPasos = pasoActual;

  return (
    <div className="w-full max-w-sm flex flex-col gap-4">
      
      {/* Vector Hogar */}
      <Card className="w-full bg-white border border-slate-200/60 shadow-xs rounded-2xl overflow-hidden">
        <CardBody className="p-4 h-28 flex items-center justify-center relative bg-gradient-to-b from-slate-50 to-white">
          <svg viewBox="0 0 100 80" className="w-16 h-16 transition-all duration-300">
            <path d="M 15 65 L 85 65" stroke={datosJugador.rangoSalarial ? "#0067b1" : "#e2e8f0"} strokeWidth="4" strokeLinecap="round" />
            <rect x="25" y="35" width="50" height="30" fill={datosJugador.rangoEdad ? "#f8fafc" : "none"} stroke={datosJugador.rangoEdad ? "#0067b1" : "#e2e8f0"} strokeWidth="2.5" />
            {datosJugador.personasCargo && (
              <g className="animate-in fade-in">
                <rect x="44" y="48" width="12" height="17" fill="#575756" />
                <rect x="32" y="42" width="7" height="7" fill="#ffd000" rx="1" />
                <rect x="61" y="42" width="7" height="7" fill="#ffd000" rx="1" />
              </g>
            )}
            {datosJugador.tipoAhorro && (
              <rect x="66" y="18" width="6" height="12" fill="#575756" className="animate-in slide-in-from-bottom-1" />
            )}
            <polygon points="20,35 50,12 80,35" fill={datosJugador.ubicacion ? "#ffd000" : "none"} stroke={datosJugador.ubicacion ? "#ffd000" : "#e2e8f0"} strokeWidth="2.5" />
          </svg>
          <span className="absolute bottom-2 right-3 text-[8px] font-mono text-slate-400 uppercase tracking-widest font-bold">
            Tu plano ideal
          </span>
        </CardBody>
      </Card>

      {/* Barra de pasos */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/60 flex items-center justify-between gap-1 shadow-2xs relative">
        {Array.from({ length: totalSteps }, (_, i) => {
          const esPasado = pasoActual > i;
          const esActual = pasoActual === i;

          return (
            <div key={i} className="flex-1 flex items-center relative">
              <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center font-black text-[9px] sm:text-[10px] mx-auto transition-all ${
                esPasado ? "bg-emerald-500 border-emerald-500 text-white" :
                esActual ? "bg-[#ffd000] border-amber-400 text-slate-800 ring-4 ring-amber-100 scale-105" :
                "bg-slate-50 border-slate-200 text-slate-400"
              }`}>
                {esPasado ? "✓" : i + 1}
              </div>
              {i < totalSteps - 1 && <div className={`absolute left-[70%] right-[-30%] h-0.5 z-0 ${pasoActual > i ? "bg-emerald-400" : "bg-slate-100"}`} />}
            </div>
          );
        })}
      </div>

      {/* Texto narrativo */}
      <div className="text-center px-4 min-h-[50px] flex items-center justify-center">
        <p className="text-xs sm:text-sm font-bold text-slate-600 leading-relaxed">
          {dimActual?.narrativa || "¡Has llegado a la meta de tu recorrido!"}
        </p>
      </div>

      {/* Interfaz de decisión */}
      <div className="min-h-[150px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!viajeTerminado ? (
            <motion.div 
              key={pasoActual}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full"
            >
              {dimActual.categoria === "intro" ? (
                <Button
                  size="lg"
                  className="w-full font-black text-white bg-[#0067b1] hover:bg-[#00528f] h-14 rounded-2xl text-xs uppercase tracking-wider shadow-md animate-bounce"
                  onClick={() => setPasoActual(1)}
                >
                  {dimActual.opciones[0].etiqueta}
                </Button>
              ) : esNombreStep ? (
                <div className="w-full space-y-3">
                  <div className="space-y-2">
                    <label className="block text-center text-sm font-bold text-slate-500">
                      Tu nombre completo
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Carlos Andrés Martínez"
                      value={nombreInput}
                      onChange={(e) => setNombreInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleNombreSubmit()}
                      className="w-full h-14 text-center text-lg font-bold text-[#575756] placeholder:font-normal placeholder:text-slate-300 rounded-2xl border-2 border-slate-200 hover:border-[#0067b1] focus:border-[#0067b1] outline-none transition-all"
                    />
                  </div>
                  <Button
                    size="lg"
                    className="w-full font-black text-white bg-[#0067b1] hover:bg-[#00528f] h-14 rounded-2xl text-xs uppercase tracking-wider shadow-md"
                    onClick={handleNombreSubmit}
                    isDisabled={!nombreInput.trim()}
                  >
                    Guardar mi nombre
                  </Button>
                </div>
              ) : (
                <div className={`w-full flex ${dimActual.opciones.length <= 4 ? "grid grid-cols-2 gap-2" : "grid grid-cols-2 gap-2"}`}>
                  {dimActual.opciones.map((opc) => (
                    <button
                      key={opc.id}
                      onClick={() => seleccionarOpcion(opc.valor)}
                      className="p-3 bg-white border-2 border-slate-200 hover:border-[#0067b1] active:scale-95 rounded-2xl flex flex-col justify-between text-left h-24 sm:h-28 shadow-sm transition-all"
                    >
                      <span className="text-[9px] font-black text-[#0067b1] bg-blue-50/50 px-1.5 py-0.5 rounded uppercase tracking-wider block">
                        {opc.etiqueta}
                      </span>
                      <p className="text-[10px] font-extrabold text-slate-600 leading-tight line-clamp-3 pt-1">
                        {opc.descripcion}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full"
            >
              <Button
                size="lg"
                className="w-full font-black text-white bg-gradient-to-r from-emerald-500 to-emerald-600 h-14 rounded-2xl text-xs uppercase tracking-wider shadow-lg animate-pulse"
                onClick={onFinalizarConstruccion}
              >
                Ingresar a Ver Mi Casa Ideal
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
