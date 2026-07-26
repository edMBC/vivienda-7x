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
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [xpPopup, setXpPopup] = useState<{ visible: boolean; x: number; y: number; puntos: number; id: string } | null>(null);

  if (esRutaRescate) {
    return (
      <Card className="w-full max-w-sm bg-gradient-to-b from-slate-50 to-white shadow-xl border-t-8 border-slate-700 p-2 rounded-3xl text-center animate-in zoom-in-95">
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
          <div className="bg-white/60 border border-slate-200/60 p-4 rounded-2xl text-left space-y-2 text-xs font-bold text-slate-600 shadow-inner">
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
    if (nombreInput.trim() && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        // FIRMA RESPETADA: string, string
        onSeleccionarCarta("nombre", nombreInput.trim());
        setPasoActual((prev) => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  // Función corregida: Recibe el evento para las físicas, pero envía los datos crudos al backend
  const seleccionarOpcionInteractiva = (e: React.MouseEvent<HTMLButtonElement>, opcId: string, categoria: string, valor: string, puntos: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Feedback físico en móviles reales
    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(40);
    }

    // Calcular posición de la partícula XP
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setXpPopup({ visible: true, x, y, puntos: puntos || 50, id: opcId });
    
    setTimeout(() => {
      setXpPopup(null);
      // FIRMA RESPETADA: string, string (Justo como lo espera FlujoNoAfiliados)
      onSeleccionarCarta(categoria, valor);
      setPasoActual((prev) => prev + 1);
      setIsAnimating(false);
    }, 500);
  };

  const totalSteps = dimensiones.length;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    },
    exit: { opacity: 0, scale: 0.8, filter: "blur(4px)", transition: { duration: 0.3 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.5, rotate: -10 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 250, damping: 18 }
    }
  };

  return (
    <div className="w-full max-w-sm flex flex-col gap-4">
      
      {/* Vector Hogar: Estilo Dibujo Infantil (Intacto) */}
      <Card className="w-full bg-white border-2 border-slate-200/60 shadow-sm rounded-3xl overflow-hidden">
        <CardBody className="p-0 h-48 flex items-center justify-center relative bg-gradient-to-b from-blue-50/30 to-white/80">
          
          <svg viewBox="0 0 200 150" className="w-full h-full drop-shadow-sm">
            {/* 2. Cimientos */}
            <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} d="M 10 135 Q 50 142 100 133 T 190 135" stroke={datosJugador.rangoSalarial ? "#22c55e" : "#cbd5e1"} strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* 3. Estructura */}
            <AnimatePresence>
              {datosJugador.rangoEdad && (
                <motion.path initial={{ pathLength: 0, fill: "rgba(253, 230, 138, 0)" }} animate={{ pathLength: 1, fill: "rgba(253, 230, 138, 1)" }} transition={{ duration: 1 }} d="M 45 134 L 48 65 L 140 68 L 136 133 Z" stroke="#334155" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </AnimatePresence>
            {/* 8. Techo */}
            <AnimatePresence>
              {datosJugador.ubicacion && (
                <motion.path initial={{ opacity: 0, y: -20, rotate: -5 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ type: "spring", bounce: 0.6 }} d="M 30 70 L 95 15 L 155 75 Z" fill="#ef4444" stroke="#334155" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </AnimatePresence>
            {/* 4. Puerta */}
            <AnimatePresence>
              {datosJugador.personasCargo && (
                <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                  <path d="M 82 133 L 84 85 L 110 87 L 106 133" fill="#a78bfa" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="102" cy="110" r="2.5" fill="#334155" />
                </motion.g>
              )}
            </AnimatePresence>
            {/* 5. Ventanas */}
            <AnimatePresence>
              {datosJugador.segmentoFamilia && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  <path d="M 55 85 L 75 83 L 73 103 L 53 105 Z" fill="#93c5fd" stroke="#334155" strokeWidth="2.5" strokeLinejoin="round" />
                  <path d="M 64 84 L 63 104 M 54 94 L 74 93" stroke="#334155" strokeWidth="2.5" />
                  <path d="M 115 88 L 132 86 L 130 105 L 113 107 Z" fill="#93c5fd" stroke="#334155" strokeWidth="2.5" strokeLinejoin="round" />
                  <path d="M 123 87 L 121 106 M 114 97 L 131 96" stroke="#334155" strokeWidth="2.5" />
                </motion.g>
              )}
            </AnimatePresence>
            {/* 7. Chimenea */}
            <AnimatePresence>
              {datosJugador.tipoAhorro && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <path d="M 118 45 L 118 20 L 130 22 L 132 55" fill="#f97316" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <motion.path d="M 125 15 Q 110 5 130 -5 T 120 -20" stroke="#94a3b8" strokeWidth="3" fill="none" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0.8 }} animate={{ pathLength: 1, opacity: 0 }} transition={{ duration: 2, repeat: Infinity }} />
                </motion.g>
              )}
            </AnimatePresence>
            {/* 6. Sol */}
            <AnimatePresence>
              {datosJugador.piramideEmpresas && (
                <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
                  <circle cx="170" cy="25" r="12" fill="#fbbf24" stroke="#334155" strokeWidth="3" />
                  <path d="M 170 5 L 170 0 M 170 45 L 170 50 M 150 25 L 145 25 M 190 25 L 195 25 M 155 10 L 150 5 M 185 40 L 190 45 M 155 40 L 150 45 M 185 10 L 190 5" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
                </motion.g>
              )}
            </AnimatePresence>
            {/* 1. Familia */}
            <AnimatePresence>
              {datosJugador.nombre && (
                <motion.g initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring" }}>
                  <circle cx="25" cy="100" r="4.5" fill="#fca5a5" stroke="#334155" strokeWidth="2.5" />
                  <path d="M 25 104 L 25 120 M 25 110 L 15 115 M 25 110 L 35 105 M 25 120 L 18 134 M 25 120 L 30 133" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="115" r="3" fill="#86efac" stroke="#334155" strokeWidth="2.5" />
                  <path d="M 12 118 L 12 128 M 12 122 L 7 125 M 12 122 L 17 120 M 12 128 L 9 135 M 12 128 L 15 134" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.g>
              )}
            </AnimatePresence>
          </svg>
          
          <div className="absolute bottom-2 right-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-pulse"></span>
            Creando hogar
          </div>
        </CardBody>
      </Card>

      {/* BARRA DE PROGRESO INMERSIVA */}
      <div className="relative px-2 py-4 mt-2">
        <div className="absolute top-1/2 left-4 right-4 h-1.5 bg-slate-200/60 rounded-full -translate-y-1/2 z-0 shadow-inner" />
        <motion.div 
          className="absolute top-1/2 left-4 h-1.5 bg-gradient-to-r from-[#0067b1] via-[#38bdf8] to-[#ffd000] rounded-full -translate-y-1/2 z-0"
          initial={{ width: "0%" }}
          animate={{ width: `${(pasoActual / (totalSteps - 1)) * 100}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <div className="relative z-10 flex justify-between items-center">
          {Array.from({ length: totalSteps }, (_, i) => {
            const esPasado = pasoActual > i;
            const esActual = pasoActual === i;
            return (
              <motion.div 
                key={i} 
                initial={false}
                animate={{ scale: esActual ? 1.2 : 1, y: esActual ? -3 : 0 }}
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center font-black text-[10px] sm:text-xs transition-colors duration-400 ${
                  esPasado ? "bg-[#0067b1] border-[#0067b1] text-white shadow-md" : esActual ? "bg-[#ffd000] border-amber-300 text-slate-900 shadow-[0_0_15px_rgba(251,191,36,0.5)]" : "bg-white border-slate-200 text-slate-300"
                }`}
              >
                {esPasado ? <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> : i + 1}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* TEXTO NARRATIVO */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={pasoActual}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="text-center px-4 min-h-[44px] flex items-center justify-center"
        >
          <p className="text-xs sm:text-sm font-bold text-slate-600 leading-relaxed tracking-tight">
            {dimActual?.narrativa || "¡Tu hogar virtual está completamente construido!"}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* INTERFAZ DE DECISIÓN GAMIFICADA */}
      <div className="min-h-[170px] flex items-center justify-center mt-2 perspective-[1000px]">
        <AnimatePresence mode="wait">
          {!viajeTerminado ? (
            <motion.div 
              key={pasoActual}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="w-full"
            >
              {dimActual.categoria === "intro" ? (
                <motion.div variants={cardVariants}>
                  <Button
                    size="lg"
                    className="w-full font-black text-white bg-gradient-to-r from-[#0067b1] to-[#00528f] h-14 rounded-2xl text-xs uppercase tracking-wider shadow-[0_8px_20px_rgba(0,103,177,0.3)] transition-all overflow-hidden relative group"
                    onClick={() => setPasoActual(1)}
                  >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
                    {dimActual.opciones[0].etiqueta}
                  </Button>
                </motion.div>
              ) : esNombreStep ? (
                <motion.div variants={cardVariants} className="w-full space-y-3 bg-white p-5 rounded-3xl shadow-lg border border-slate-100 transform-gpu">
                  <div className="space-y-2">
                    <label className="block text-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Nombre del Jugador
                    </label>
                    <input
                      type="text"
                      placeholder="Firma tu plano aquí..."
                      value={nombreInput}
                      onChange={(e) => setNombreInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleNombreSubmit()}
                      className="w-full h-14 text-center text-xl font-black text-[#0067b1] placeholder:font-normal placeholder:text-slate-300 rounded-2xl border-2 border-slate-100 hover:border-[#0067b1] focus:border-[#0067b1] outline-none transition-all shadow-inner bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    className={`w-full font-black h-14 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md border-b-4 active:border-b-0 active:translate-y-[4px] ${
                      nombreInput.trim() ? "text-slate-900 bg-[#ffd000] border-amber-500 hover:bg-amber-400" : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                    }`}
                    onClick={handleNombreSubmit}
                    disabled={!nombreInput.trim() || isAnimating}
                  >
                    Guardar
                  </motion.button>
                </motion.div>
              ) : (
                <div className={`w-full grid ${dimActual.opciones.length <= 4 ? "grid-cols-2" : "grid-cols-2"} gap-3`}>
                  {dimActual.opciones.map((opc) => (
                    <motion.button
                      key={opc.id}
                      variants={cardVariants}
                      whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
                      whileTap={{ scale: 0.9, rotate: -2 }}
                      // CORRECCIÓN VITAL: Pasamos los datos crudos al backend como Deiver configuró
                      onClick={(e) => seleccionarOpcionInteractiva(e, opc.id, dimActual.categoria, opc.valor, opc.puntos || 50)}
                      disabled={isAnimating}
                      className={`group relative p-3.5 bg-white border-2 border-slate-100 rounded-2xl flex flex-col justify-between text-left h-28 sm:h-32 shadow-md transition-all overflow-hidden transform-gpu border-b-4 active:border-b-2 active:translate-y-[2px] ${
                        xpPopup?.id === opc.id ? "ring-4 ring-amber-400 border-amber-400 bg-amber-50" : "hover:border-[#0067b1] hover:border-b-[#00528f]"
                      }`}
                    >
                      <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider block transition-colors w-fit border ${
                        xpPopup?.id === opc.id ? "bg-[#ffd000] text-slate-900 border-amber-400" : "text-slate-500 bg-slate-50 border-slate-200/60 group-hover:text-[#0067b1] group-hover:bg-blue-50 group-hover:border-blue-100"
                      }`}>
                        {opc.etiqueta}
                      </span>
                      
                      <p className={`text-[11px] font-extrabold leading-tight line-clamp-3 pt-2 ${
                        xpPopup?.id === opc.id ? "text-slate-800" : "text-slate-400 group-hover:text-slate-700"
                      }`}>
                        {opc.descripcion}
                      </p>

                      <AnimatePresence>
                        {xpPopup?.visible && xpPopup.id === opc.id && (
                          <motion.div
                            initial={{ opacity: 1, y: xpPopup.y, x: xpPopup.x, scale: 0.5 }}
                            animate={{ opacity: 0, y: xpPopup.y - 60, scale: 1.5 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="absolute pointer-events-none z-50 font-black text-amber-500 text-lg drop-shadow-md"
                            style={{ left: 0, top: 0 }}
                          >
                            +{xpPopup.puntos}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.6 }}
              className="w-full relative"
            >
              <div className="absolute -inset-2 bg-[#ffd000] rounded-3xl blur-xl opacity-40 animate-pulse" />
              
              <Button
                size="lg"
                className="w-full relative font-black text-white bg-gradient-to-r from-emerald-500 to-emerald-600 h-16 rounded-3xl text-sm uppercase tracking-widest shadow-[0_10px_25px_rgba(16,185,129,0.4)] border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 transition-all"
                onClick={onFinalizarConstruccion}
              >
                Abrir Puertas al Simulador
                <motion.span 
                  animate={{ x: [0, 5, 0] }} 
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="ml-2 text-xl"
                >
                  🗝️
                </motion.span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}