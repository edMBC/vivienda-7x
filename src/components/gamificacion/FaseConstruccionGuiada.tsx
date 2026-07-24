"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Button, RadioGroup, Radio, Progress, Avatar } from "@nextui-org/react";

interface FaseConstruccionGuiadaProps {
  onCompletado: (datos: any) => void;
}

export default function FaseConstruccionGuiada({ onCompletado }: FaseConstruccionGuiadaProps) {
  const [paso, setPaso] = useState(1);
  const [datosPerfil, setDatosPerfil] = useState({
    ingresos: "",
    familia: "",
    ahorro: "",
  });

  const etapas = [
    {
      id: 1,
      guia: "¡Hola! Soy tu guía de vivienda. Vamos a cimentar juntos el plan para tu nuevo hogar. Primero, ¿cuál es el rango de ingresos de tu hogar?",
      mensajeProgreso: "Poniendo los cimientos de tu proyecto...",
      campo: "ingresos",
      opciones: [
        { val: "hasta_2", label: "Hasta 2 SMMLV (Máximo beneficio subsidio VIS)" },
        { val: "entre_2_4", label: "Entre 2 y 4 SMMLV" },
        { val: "mas_4", label: "Más de 4 SMMLV" },
      ],
    },
    {
      id: 2,
      guia: "¡Excelente! Los cimientos están firmes. Ahora levantemos las paredes y los espacios para quienes amas: ¿quiénes habitarán esta casa?",
      mensajeProgreso: "Levantando paredes y llenando de luz los espacios...",
      campo: "familia",
      opciones: [
        { val: "1", label: "Es mi proyecto personal (Independiente)" },
        { val: "2", label: "Somos 2 personas" },
        { val: "3_mas", label: "Somos 3 o más integrantes en la familia" },
      ],
    },
    {
      id: 3,
      guia: "¡Ya casi lo tenemos! Pongamos el techo y los detalles finales: ¿cuentas con algún ahorro o cuota inicial guardada?",
      mensajeProgreso: "Instalando el techo y los detalles de tu nuevo hogar...",
      campo: "ahorro",
      opciones: [
        { val: "nada", label: "Aún no, quiero empezar mi Plan Semilla" },
        { val: "poco", label: "Tengo un ahorro inicial (Cesantías / Banco)" },
        { val: "listo", label: "Tengo la cuota inicial lista o muy avanzada" },
      ],
    },
  ];

  const etapaActual = etapas[paso - 1];

  const handleSiguiente = () => {
    if (paso < 3) {
      setPaso(paso + 1);
    } else {
      onCompletado(datosPerfil);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
      
      {/* Guía Acompañante + Storytelling Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 flex flex-col md:flex-row items-center gap-5"
      >
        <Avatar
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
          className="w-16 h-16 md:w-20 md:h-20 text-large border-4 border-[#0067b1] shadow-md flex-shrink-0"
        />
        <div className="space-y-1 text-center md:text-left">
          <span className="text-xs font-black text-[#0067b1] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            Tu Asistente Colsubsidio
          </span>
          <p className="text-base md:text-lg font-bold text-[#575756] leading-snug mt-1">
            "{etapaActual.guia}"
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Columna Izquierda: La Casa Construyéndose Visualmente */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center bg-gradient-to-b from-blue-50/50 to-slate-100 p-8 rounded-3xl border border-blue-100 shadow-inner min-h-[320px]">
          
          <div className="relative w-48 h-48">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full stroke-[#0067b1]"
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Cimientos (Paso 1+) */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: paso >= 1 ? 1 : 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                d="M 15 85 L 85 85"
                className="stroke-[#575756]"
                strokeWidth="6"
              />

              {/* Muros y Estructura (Paso 2+) */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: paso >= 2 ? 1 : 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                d="M 25 85 L 25 50 L 75 50 L 75 85 M 40 85 L 40 65 L 60 65 L 60 85"
                className="stroke-[#0067b1]"
              />

              {/* Techo y Jardín (Paso 3) */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: paso >= 3 ? 1 : 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                d="M 15 50 L 50 20 L 85 50 M 65 30 L 65 18 L 75 18 L 75 38"
                className="stroke-[#ffd000]"
                strokeWidth="4"
              />
            </svg>

            {/* Brillo de finalización */}
            {paso === 3 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute top-2 right-6 text-3xl"
              >
                ✨
              </motion.div>
            )}
          </div>

          <p className="text-xs font-bold text-[#0067b1] mt-4 text-center">
            {etapaActual.mensajeProgreso}
          </p>
          <Progress value={(paso / 3) * 100} color="primary" className="h-2 mt-2 max-w-xs" />
        </div>

        {/* Columna Derecha: Pregunta de Co-Construcción */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={paso}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 md:p-8 shadow-xl border-t-6 border-[#ffd000] rounded-3xl bg-white">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest block mb-2">
                  Etapa {paso} de 3
                </span>

                <RadioGroup
                  value={datosPerfil[etapaActual.campo as keyof typeof datosPerfil]}
                  onValueChange={(val) =>
                    setDatosPerfil({ ...datosPerfil, [etapaActual.campo]: val })
                  }
                  className="gap-3 my-4"
                >
                  {etapaActual.opciones.map((opc) => (
                    <Radio
                      key={opc.val}
                      value={opc.val}
                      classNames={{
                        base: "border-2 border-slate-100 hover:border-[#0067b1] bg-slate-50 p-4 rounded-2xl max-w-full flex-row-reverse justify-between transition-all duration-200 cursor-pointer",
                        label: "font-semibold text-slate-700 text-sm md:text-base",
                      }}
                    >
                      {opc.label}
                    </Radio>
                  ))}
                </RadioGroup>

                <Button
                  size="lg"
                  className="w-full mt-6 font-extrabold bg-[#0067b1] text-white rounded-2xl h-15 text-lg shadow-lg hover:bg-[#00528f] transition-all"
                  onClick={handleSiguiente}
                  isDisabled={!datosPerfil[etapaActual.campo as keyof typeof datosPerfil]}
                >
                  {paso === 3 ? "Ver mi hogar construido 🏡" : "Avanzar a la siguiente etapa 🔨"}
                </Button>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}