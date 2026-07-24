"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import FaseIngreso from "@/components/simulador/FaseIngreso";
import FaseAnimacion from "@/components/simulador/FaseAnimacion";
import FaseResultados, { Proyecto } from "@/components/simulador/FaseResultados";
import FaseConfirmacion from "@/components/simulador/FaseConfirmacion";

export default function SimuladorAfiliadoPage() {
  const router = useRouter();
  const [fase, setFase] = useState<number>(0);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<Proyecto | null>(null);

  const handleSiguienteIngreso = (documento: string) => {
    setFase(1);
  };

  const handleAnimacionCompletada = () => {
    setFase(2);
  };

  const handleSeleccionarLlave = (proyecto: Proyecto) => {
    setProyectoSeleccionado(proyecto);
    setFase(3);
  };

  const handleReiniciar = () => {
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <AnimatePresence mode="wait">
        {fase === 0 && (
          <FaseIngreso key="fase0" onSiguiente={handleSiguienteIngreso} />
        )}

        {fase === 1 && (
          <FaseAnimacion key="fase1" onCompletado={handleAnimacionCompletada} />
        )}

        {fase === 2 && (
          <FaseResultados key="fase2" onSeleccionarLlave={handleSeleccionarLlave} />
        )}

        {fase === 3 && proyectoSeleccionado && (
          <FaseConfirmacion
            key="fase3"
            proyecto={proyectoSeleccionado}
            onReiniciar={handleReiniciar}
          />
        )}
      </AnimatePresence>
    </main>
  );
}