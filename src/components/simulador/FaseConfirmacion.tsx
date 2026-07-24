"use client";

import { motion } from "framer-motion";
import { Card, Button, Chip } from "@nextui-org/react";
import { Proyecto } from "./FaseResultados";

interface FaseConfirmacionProps {
  proyecto: Proyecto;
  onReiniciar: () => void;
}

export default function FaseConfirmacion({ proyecto, onReiniciar }: FaseConfirmacionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-lg text-center mx-auto"
    >
      <Card className="p-8 shadow-2xl border-t-8 border-emerald-500 overflow-visible relative">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
          <span className="text-4xl">🏡</span>
        </div>

        <div className="mt-10 space-y-6">
          <h1 className="text-3xl font-black text-[#575756]">
            ¡Estás a un paso de tu nuevo hogar!
          </h1>

          <p className="text-slate-600 leading-relaxed text-sm">
            Hemos guardado tu pre-selección para el proyecto <strong className="text-[#0067b1]">{proyecto.nombre}</strong>.
            <br /><br />
            Tu perfil ha ingresado a nuestra ruta prioritaria. Un experto comercial de Colsubsidio se comunicará contigo en <strong>menos de 24 horas</strong> para guiarte en el cierre financiero.
          </p>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex justify-center gap-6">
            <div className="flex flex-col items-center">
              <span className="text-xs text-slate-400 font-bold uppercase mb-1">Score Calculado</span>
              <Chip color="success" variant="flat" className="font-bold text-lg">{proyecto.viabilidadActual} pts</Chip>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-slate-400 font-bold uppercase mb-1">Estado de Solicitud</span>
              <Chip color="primary" variant="dot" className="border-none font-semibold">Enviado al Asesor</Chip>
            </div>
          </div>

          <Button
            size="lg"
            variant="bordered"
            className="w-full font-bold border-[#0067b1] text-[#0067b1] mt-4 hover:bg-blue-50"
            onClick={onReiniciar}
          >
            Volver al Inicio
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}