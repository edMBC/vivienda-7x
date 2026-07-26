"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import FaseIngreso from "@/components/simulador/FaseIngreso";
import FaseAnimacion from "@/components/simulador/FaseAnimacion";
import FaseResultados, { Proyecto } from "@/components/simulador/FaseResultados";
import FaseConfirmacion from "@/components/simulador/FaseConfirmacion";
import { useLead } from "@/context/LeadContext";

export default function SimuladorAfiliadoPage() {
  const router = useRouter();
  const { lead } = useLead();
  const [fase, setFase] = useState<number>(0);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<Proyecto | null>(null);

  useEffect(() => {
    if (lead.isAfiliado === false && lead.nombre) {
      setFase(1);
    }
  }, [lead.isAfiliado, lead.nombre]);

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

  const handleNoEncontrado = () => {
    router.push("/gamificacion");
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <AnimatePresence mode="wait">
        {fase === 0 && (
          <FaseIngreso key="fase0" onSiguiente={handleSiguienteIngreso} onNoEncontrado={handleNoEncontrado} />
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
