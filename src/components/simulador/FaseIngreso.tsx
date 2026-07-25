"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, Input, Button } from "@nextui-org/react";
import { findLeadByDocumento } from "@/lib/supabase";
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
      const leadRecord = await findLeadByDocumento(doc);

      if (leadRecord) {
        updateLead({
          nombre: leadRecord.nombre,
          isAfiliado: leadRecord.afiliacion === "Afiliado",
          rangoEdad: leadRecord.rango_edad,
          personasCargo: String(leadRecord.personas_a_cargo),
          segmentoCaja: leadRecord.segmento_caja,
          segmentoFamilia: leadRecord.segmento_familia,
          piramideEmpresas: leadRecord.piramide_empresas,
          proyectoInteres: leadRecord.proyecto,
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
              className="absolute inset-0 w-full h-full stroke-[#0067b1] z-10"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                d="M 20 50 L 50 50 M 50 50 A 10 10 0 1 0 50 30 A 10 10 0 1 0 50 50 M 20 50 L 20 60 M 28 50 L 28 57"
              />
              
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: 1.5, ease: "easeInOut" }}
                d="M 50 50 C 30 30, 10 60, 50 90 C 90 60, 70 30, 50 50 M 35 70 L 35 90 L 65 90 L 65 70"
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
          <Input
            size="lg"
            type="text"
            label="Tu número de documento"
            placeholder="Ej: CC 123456789"
            value={identificacion}
            onChange={(e) => { setIdentificacion(e.target.value); setError(""); setNoEncontrado(false); }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            variant="bordered"
            color={error ? "danger" : "primary"}
            errorMessage={error}
            classNames={{
              input: "text-center text-2xl font-black tracking-widest text-[#575756] placeholder:font-normal placeholder:tracking-normal",
              label: "text-center w-full text-slate-500 font-medium",
              inputWrapper: `h-16 rounded-2xl border-slate-200 hover:border-[#0067b1] focus-within:border-[#0067b1] ${error ? "border-red-400" : ""}`,
            }}
          />

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
