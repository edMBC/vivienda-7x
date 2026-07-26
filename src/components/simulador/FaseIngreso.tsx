"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, Button } from "@nextui-org/react";
import { findAfiliadoByDocumento } from "@/lib/supabase";
import { useLead } from "@/context/LeadContext";

interface FaseIngresoProps {
  onSiguiente: (documento: string) => void;
  onNoEncontrado: () => void;
}

export default function FaseIngreso({ onSiguiente, onNoEncontrado }: FaseIngresoProps) {
  const [identificacion, setIdentificacion] = useState("");
  const [error, setError] = useState("");
  const [buscando, setBuscando] = useState(false);
  const [noEncontrado, setNoEncontrado] = useState(false);
  const { updateLead } = useLead();

  const handleSubmit = async () => {
    const doc = identificacion.trim();
    if (!doc) return;

    setBuscando(true);
    setError("");
    setNoEncontrado(false);

    try {
      const afiliado = await findAfiliadoByDocumento(doc);

      if (afiliado) {
        updateLead({
          nombre: afiliado.nombre,
          isAfiliado: true,
          rangoEdad: afiliado.rango_edad,
          personasCargo: String(afiliado.personas_a_cargo),
          segmentoCaja: afiliado.segmento_caja,
          segmentoFamilia: afiliado.segmento_familia,
          piramideEmpresas: afiliado.piramide_empresas,
        });
        onSiguiente(doc);
      } else {
        setNoEncontrado(true);
        setError("No encontramos tu documento en nuestra base de datos.");
      }
    } catch (err) {
      setError("No pudimos verificar tu documento. Intenta de nuevo.");
    } finally {
      setBuscando(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-lg mx-auto p-2"
    >
      <Card className="p-6 md:p-10 shadow-2xl border-t-8 border-[#ffd000] bg-white/95 backdrop-blur-md rounded-3xl overflow-visible">
        
        <div className="text-center space-y-6 mb-10 relative">
          <div className="relative w-28 h-28 mx-auto">
            
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-[#ffd000]/10 rounded-full shadow-inner z-0"
            />

            <motion.svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full z-10"
              fill="none"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Casa */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.2, ease: "easeInOut" }}
                d="M 50 15 L 15 45 L 15 85 L 85 85 L 85 45 Z"
                stroke="#0067b1"
              />
              {/* Puerta */}
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 1.2, ease: "easeInOut" }}
                d="M 40 85 L 40 62 L 60 62 L 60 85"
                stroke="#ffd000"
              />
              {/* Ventana */}
              <motion.rect
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 1.8, ease: "easeInOut" }}
                x="68" y="52" width="10" height="10" rx="1"
                stroke="#0067b1"
                strokeWidth="2.5"
              />
            </motion.svg>
          </div>

          <div className="space-y-3 px-2 md:px-4">
            <h1 className="text-3xl md:text-4xl font-black text-[#575756] tracking-tighter leading-tight">
              Hola, demos el <span className="text-[#0067b1]">primer paso</span>
            </h1>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-sm mx-auto">
              Sabemos que buscar casa es una gran decisión familiar. Compártenos tu documento y nosotros buscaremos los beneficios que ya has construido.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-center text-sm font-bold text-slate-500">
              Tu número de documento
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="123456789"
              value={identificacion}
              onChange={(e) => { setIdentificacion(e.target.value.replace(/[^0-9]/g, "")); setError(""); setNoEncontrado(false); }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className={`w-full h-16 text-center text-2xl font-black tracking-widest text-[#575756] placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-300 rounded-2xl border-2 outline-none transition-all ${
                error
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-200 hover:border-[#0067b1] focus:border-[#0067b1]"
              }`}
            />
            {error && (
              <p className="text-red-500 text-xs font-bold text-center mt-1">{error}</p>
            )}
          </div>

          {noEncontrado && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-3">
              <p className="text-red-600 font-bold text-sm text-center">
                Tu documento no está registrado como afiliado activo.
              </p>
              <p className="text-red-500 text-xs text-center">
                Si eres afiliado, verifica tu número. Si no eres afiliado, completa el proceso por el camino incorrecto.
              </p>
              <Button
                size="md"
                className="w-full font-bold bg-amber-500 text-white text-sm rounded-xl"
                onClick={onNoEncontrado}
              >
                No soy afiliado, quiero completar mis datos
              </Button>
            </div>
          )}

          <Button
            size="lg"
            className="w-full font-extrabold bg-[#0067b1] text-white shadow-xl hover:bg-[#00528f] transition-all h-16 text-lg rounded-2xl transition-transform active:scale-95"
            onClick={handleSubmit}
            isDisabled={!identificacion.trim() || buscando}
            isLoading={buscando}
          >
            {buscando ? "Buscando tu perfil..." : "Comenzar mi historia de hogar"}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
