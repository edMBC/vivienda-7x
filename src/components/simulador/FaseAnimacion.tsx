"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Progress } from "@nextui-org/react";

interface FaseAnimacionProps {
  onCompletado: () => void;
}

export default function FaseAnimacion({ onCompletado }: FaseAnimacionProps) {
  const [mensajeCarga, setMensajeCarga] = useState("Cimentando las bases de tu sueño...");

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setMensajeCarga("Cruzando tus aportes con los subsidios (PAC)...");
    }, 1500);

    const timer2 = setTimeout(() => {
      setMensajeCarga("Buscando las mejores opciones en nuestros 22 proyectos...");
    }, 3000);

    const timer3 = setTimeout(() => {
      onCompletado();
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onCompletado]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center space-y-8 my-auto py-12"
    >
      <div className="relative w-44 h-44">
        <motion.svg
          viewBox="0 0 100 100"
          className="w-full h-full stroke-[#0067b1]"
          fill="none"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Estructura Techo y Paredes */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
            d="M 10 50 L 50 15 L 90 50 M 20 50 L 20 90 L 80 90 L 80 50 M 40 90 L 40 60 L 60 60 L 60 90"
          />
          {/* Chimenea */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 2, ease: "easeOut" }}
            d="M 70 30 L 70 15 L 80 15 L 80 40"
          />
        </motion.svg>
      </div>

      <motion.h2
        key={mensajeCarga}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-bold text-[#575756] text-center max-w-xs leading-snug"
      >
        {mensajeCarga}
      </motion.h2>

      <Progress size="sm" isIndeterminate color="primary" className="max-w-xs" />
    </motion.div>
  );
}