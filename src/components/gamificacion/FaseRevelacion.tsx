"use client";

import { motion } from "framer-motion";
import { Card, CardBody, Button, Chip, Divider } from "@nextui-org/react";

interface FaseRevelacionProps {
  datosPerfil: any;
  onSolicitarMovilidad: () => void;
}

export default function FaseRevelacion({ datosPerfil, onSolicitarMovilidad }: FaseRevelacionProps) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden">
      
      {/* Fondo totalmente revelado (El Tesoro) */}
      <motion.div 
        initial={{ scale: 1.1, filter: "blur(10px)" }}
        animate={{ scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-0" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative z-10 w-full max-w-4xl mx-auto space-y-8 mt-20"
      >
        <div className="text-center space-y-4">
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="text-7xl drop-shadow-2xl"
          >
            🏰
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-lg">
            ¡Has desbloqueado el <span className="text-[#ffd000]">Nivel VIS</span>!
          </h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto font-medium drop-shadow-md">
            Tu inventario está lleno. Con las insignias que recolectaste, tienes el perfil exacto para conquistar proyectos como <strong className="text-white">Bosques de Arrayán</strong>.
          </p>
        </div>

        <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20">
          <CardBody className="p-8 md:p-12 flex flex-col items-center text-center space-y-8 relative">
            
            <div className="flex gap-4 justify-center flex-wrap">
              <Chip className="bg-white/20 text-white border border-white/30 font-bold backdrop-blur-md px-4 py-6 text-lg">💎 Gema de Viabilidad</Chip>
              <Chip className="bg-white/20 text-white border border-white/30 font-bold backdrop-blur-md px-4 py-6 text-lg">🛡️ Escudo de Espacios</Chip>
              <Chip className="bg-white/20 text-white border border-white/30 font-bold backdrop-blur-md px-4 py-6 text-lg">🔑 Llave de Prioridad</Chip>
            </div>

            <Divider className="bg-white/20 w-3/4 mx-auto" />

            <div className="space-y-4 max-w-2xl">
              <Chip className="bg-[#ffd000] text-[#575756] font-black tracking-widest uppercase text-sm px-4">
                El Último Paso del Héroe
              </Chip>
              <h3 className="text-2xl md:text-3xl font-black leading-tight text-white">
                Equípate con los Subsidios de Colsubsidio
              </h3>
              <p className="text-blue-100 font-medium leading-relaxed text-base md:text-lg">
                Para canjear tus insignias por una vivienda real, necesitas pertenecer al gremio. Gestionamos tu afiliación o traslado <strong className="text-[#ffd000]">sin costo, sin filas y en menos de 24 horas</strong>.
              </p>
            </div>

            <Button
              size="lg"
              className="w-full max-w-md font-black bg-[#ffd000] text-[#575756] shadow-[0_0_30px_rgba(255,208,0,0.4)] hover:bg-[#e6bb00] hover:scale-105 h-16 text-xl rounded-2xl transition-all"
              onClick={onSolicitarMovilidad}
            >
              ¡Afiliarme y Reclamar mi Casa!
            </Button>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}