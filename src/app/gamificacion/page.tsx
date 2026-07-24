"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import FaseMisiones from "@/components/gamificacion/FaseMisiones";
import FaseRevelacion from "@/components/gamificacion/FaseRevelacion";

export default function GamificacionPage() {
  const router = useRouter();
  const [fase, setFase] = useState(1);
  const [datosPerfil, setDatosPerfil] = useState(null);

  const handleCompletarMisiones = (datos: any) => {
    setDatosPerfil(datos);
    setFase(2); // Pasa a la pantalla de revelación del tesoro
  };

  const handleSolicitarMovilidad = () => {
    // Redirige al login comercial o formulario de acompañamiento
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        {fase === 1 && (
          <FaseMisiones
            key="fase1"
            onCompletado={handleCompletarMisiones}
          />
        )}

        {fase === 2 && (
          <FaseRevelacion
            key="fase2"
            datosPerfil={datosPerfil}
            onSolicitarMovilidad={handleSolicitarMovilidad}
          />
        )}
      </AnimatePresence>
    </main>
  );
}