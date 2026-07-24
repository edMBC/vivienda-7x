"use client";

import { motion } from "framer-motion";
import { Card, Button } from "@nextui-org/react";

interface FaseTableroProps {
  onIniciar: () => void;
}

export default function FaseTablero({ onIniciar }: FaseTableroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-lg mx-auto p-4"
    >
      <Card className="p-8 shadow-2xl border-t-8 border-[#0067b1] bg-white/95 backdrop-blur-md rounded-3xl text-center">
        <motion.div 
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-24 h-24 mx-auto bg-[#ffd000]/20 rounded-2xl flex items-center justify-center text-5xl mb-6 shadow-inner border border-[#ffd000]"
        >
          🎲
        </motion.div>
        
        <h1 className="text-3xl font-black text-[#575756] mb-3 leading-tight">
          El Camino a tu <br /><span className="text-[#0067b1]">Nueva Casa</span>
        </h1>
        <p className="text-slate-600 mb-8 font-medium">
          Aún no eres afiliado, ¡pero eso no te detiene! Avanza por las casillas de nuestro tablero, recolecta llaves y descubre las propiedades que puedes desbloquear.
        </p>

        <Button
          size="lg"
          className="w-full font-black bg-[#ffd000] text-[#575756] shadow-xl hover:bg-[#e6bb00] h-16 text-xl rounded-2xl transition-transform active:scale-95"
          onClick={onIniciar}
        >
          Lanzar los dados y avanzar
        </Button>
      </Card>
    </motion.div>
  );
}