"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Button, Progress, RadioGroup, Radio } from "@nextui-org/react";

interface FaseCasillasProps {
  onCompletado: (datos: any) => void;
}

export default function FaseCasillas({ onCompletado }: FaseCasillasProps) {
  const [pasoActual, setPasoActual] = useState(1);
  const [datosPerfil, setDatosPerfil] = useState({
    ingresos: "",
    familia: "",
    ahorro: ""
  });

  const casillas = [
    {
      id: 1,
      titulo: "Casilla de Ingresos 💰",
      pregunta: "¿Cuál es el rango salarial de tu hogar?",
      opciones: [
        { val: "hasta_2", label: "Hasta 2 SMMLV (Máximo beneficio VIS)" },
        { val: "entre_2_4", label: "Entre 2 y 4 SMMLV" },
        { val: "mas_4", label: "Más de 4 SMMLV" }
      ],
      campo: "ingresos"
    },
    {
      id: 2,
      titulo: "Casilla Familiar 👨‍👩‍👧",
      pregunta: "¿Cuántas personas conforman tu núcleo familiar?",
      opciones: [
        { val: "1", label: "Solo yo (Independiente)" },
        { val: "2", label: "2 personas" },
        { val: "3_mas", label: "3 o más personas" }
      ],
      campo: "familia"
    },
    {
      id: 3,
      titulo: "El Banco del Tablero 🏦",
      pregunta: "¿Cuentas con algún ahorro o cesantías actualmente?",
      opciones: [
        { val: "nada", label: "Aún no, quiero empezar el Plan Semilla" },
        { val: "poco", label: "Tengo un ahorro inicial (Menos del 10%)" },
        { val: "listo", label: "Tengo la cuota inicial lista" }
      ],
      campo: "ahorro"
    }
  ];

  const handleSiguiente = () => {
    if (pasoActual < 3) {
      setPasoActual(pasoActual + 1);
    } else {
      onCompletado(datosPerfil);
    }
  };

  const casillaActual = casillas[pasoActual - 1];

  return (
    <div className="w-full max-w-xl mx-auto p-4 space-y-6">
      {/* Progreso del Tablero */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold text-[#0067b1] uppercase tracking-wider">
          <span>Inicio</span>
          <span>Casilla {pasoActual} de 3</span>
          <span>Meta</span>
        </div>
        <Progress value={(pasoActual / 3) * 100} color="primary" className="h-3" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={pasoActual}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-8 shadow-xl border-t-4 border-[#ffd000] rounded-3xl bg-white">
            <h2 className="text-xl font-bold text-[#0067b1] mb-1">{casillaActual.titulo}</h2>
            <p className="text-2xl font-black text-[#575756] mb-8 leading-tight">
              {casillaActual.pregunta}
            </p>

            <RadioGroup
              value={datosPerfil[casillaActual.campo as keyof typeof datosPerfil]}
              onValueChange={(val) => setDatosPerfil({ ...datosPerfil, [casillaActual.campo]: val })}
              className="gap-4"
            >
              {casillaActual.opciones.map((opc) => (
                <Radio 
                  key={opc.val} 
                  value={opc.val}
                  classNames={{
                    base: "border-2 border-slate-100 hover:border-[#0067b1] bg-slate-50 p-4 rounded-xl max-w-full flex-row-reverse justify-between transition-colors",
                    label: "font-semibold text-slate-700 text-base"
                  }}
                >
                  {opc.label}
                </Radio>
              ))}
            </RadioGroup>

            <Button
              size="lg"
              className="w-full mt-8 font-black bg-[#0067b1] text-white rounded-xl h-14 text-lg"
              onClick={handleSiguiente}
              isDisabled={!datosPerfil[casillaActual.campo as keyof typeof datosPerfil]}
            >
              {pasoActual === 3 ? "Ver propiedades desbloqueadas 🔓" : "Avanzar casilla 🎲"}
            </Button>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}