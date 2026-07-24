"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Button, RadioGroup, Radio, Chip } from "@nextui-org/react";

interface FaseMisionesProps {
  onCompletado: (datos: any) => void;
}

export default function FaseMisiones({ onCompletado }: FaseMisionesProps) {
  const [mision, setMision] = useState(1);
  const [datosPerfil, setDatosPerfil] = useState({ ingresos: "", familia: "", ahorro: "" });
  const [recompensas, setRecompensas] = useState<string[]>([]);

  const misiones = [
    {
      id: 1,
      titulo: "Misión 1: El Poder Adquisitivo",
      narrativa: "Todo gran castillo necesita un tesoro que lo respalde. ¿Con qué recursos cuenta tu gremio (hogar) mensualmente?",
      campo: "ingresos",
      opciones: [
        { val: "hasta_2", label: "Hasta 2 Monedas (SMMLV) - ¡Máximo Subsidio!" },
        { val: "entre_2_4", label: "Entre 2 y 4 Monedas (SMMLV)" },
        { val: "mas_4", label: "Más de 4 Monedas (SMMLV)" },
      ],
      recompensaNombre: "💎 Gema de Viabilidad",
    },
    {
      id: 2,
      titulo: "Misión 2: El Gremio Familiar",
      narrativa: "Los salones de tu nuevo hogar deben tener el tamaño exacto. ¿Cuántos aventureros conforman tu grupo?",
      campo: "familia",
      opciones: [
        { val: "1", label: "Lobo Solitario (Proyecto Independiente)" },
        { val: "2", label: "Dúo Dinámico (2 personas)" },
        { val: "3_mas", label: "El Gremio Completo (3 o más personas)" },
      ],
      recompensaNombre: "🛡️ Escudo de Espacios",
    },
    {
      id: 3,
      titulo: "Misión 3: El Cofre de Ahorros",
      narrativa: "Para abrir las puertas doradas, necesitamos saber qué hay en tu cofre inicial. ¿Tienes reservas guardadas?",
      campo: "ahorro",
      opciones: [
        { val: "nada", label: "Mi cofre está vacío (Quiero el Plan Semilla)" },
        { val: "poco", label: "Tengo un botín inicial (Cesantías/Ahorros)" },
        { val: "listo", label: "Tengo la llave maestra (Cuota Inicial lista)" },
      ],
      recompensaNombre: "🔑 Llave de Prioridad",
    },
  ];

  const misionActual = misiones[mision - 1];

  // Nivel de desenfoque del fondo según la misión
  const blurNivel = mision === 1 ? "blur-xl" : mision === 2 ? "blur-md" : "blur-sm";
  const opacidadFondo = mision === 1 ? "opacity-30" : mision === 2 ? "opacity-60" : "opacity-90";

  const handleCompletarMision = () => {
    // Agregar la recompensa al inventario
    setRecompensas((prev) => [...prev, misionActual.recompensaNombre]);

    if (mision < 3) {
      setMision(mision + 1);
    } else {
      setTimeout(() => {
        onCompletado(datosPerfil);
      }, 800);
    }
  };

  return (
    <div className="relative min-h-[80vh] w-full flex items-center justify-center p-4">
      
      {/* Fondo Dinámico que se revela (Roleplay Visual) */}
      <div 
        className={`absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center transition-all duration-1000 ease-in-out ${blurNivel} ${opacidadFondo} z-0`}
      />
      <div className="absolute inset-0 bg-slate-900/40 z-0" />

      <div className="relative z-10 w-full max-w-2xl mx-auto space-y-6 mt-12">
        
        {/* Inventario de Recompensas (Flotante Arriba) */}
        <div className="absolute -top-16 left-0 right-0 flex justify-center gap-3 z-20">
          <AnimatePresence>
            {recompensas.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -20, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
              >
                <Chip className="bg-[#ffd000] text-[#575756] font-extrabold shadow-lg px-2">
                  {rec}
                </Chip>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mision}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
          >
            <Card className="p-8 shadow-2xl border-t-8 border-[#0067b1] bg-white/90 backdrop-blur-xl rounded-3xl">
              
              <div className="text-center space-y-2 mb-8">
                <span className="text-[#0067b1] font-black tracking-widest uppercase text-sm">
                  {misionActual.titulo}
                </span>
                <p className="text-xl font-bold text-[#575756] leading-relaxed">
                  "{misionActual.narrativa}"
                </p>
              </div>

              <RadioGroup
                value={datosPerfil[misionActual.campo as keyof typeof datosPerfil]}
                onValueChange={(val) =>
                  setDatosPerfil({ ...datosPerfil, [misionActual.campo]: val })
                }
                className="gap-4"
              >
                {misionActual.opciones.map((opc) => (
                  <Radio
                    key={opc.val}
                    value={opc.val}
                    classNames={{
                      base: "border-2 border-slate-200 hover:border-[#0067b1] bg-white p-4 rounded-2xl max-w-full flex-row-reverse justify-between transition-all duration-300 shadow-sm cursor-pointer",
                      label: "font-bold text-slate-700 text-base",
                    }}
                  >
                    {opc.label}
                  </Radio>
                ))}
              </RadioGroup>

              <Button
                size="lg"
                className="w-full mt-8 font-black bg-[#0067b1] text-white rounded-2xl h-16 text-lg shadow-xl hover:bg-[#00528f] transition-transform active:scale-95"
                onClick={handleCompletarMision}
                isDisabled={!datosPerfil[misionActual.campo as keyof typeof datosPerfil]}
              >
                {mision === 3 ? "¡Reclamar el Tesoro Final! 🏆" : "Reclamar Recompensa y Avanzar ⚔️"}
              </Button>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}