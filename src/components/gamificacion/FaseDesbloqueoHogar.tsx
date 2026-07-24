"use client";

import { motion } from "framer-motion";
import { Card, CardBody, Button, Chip, Image } from "@nextui-org/react";

interface FaseDesbloqueoHogarProps {
  datosPerfil: any;
  onSolicitarMovilidad: () => void;
}

export default function FaseDesbloqueoHogar({ datosPerfil, onSolicitarMovilidad }: FaseDesbloqueoHogarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl mx-auto p-4 space-y-8"
    >
      <div className="text-center space-y-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-6xl mb-2"
        >
          🏡✨
        </motion.div>
        <h1 className="text-3xl md:text-5xl font-black text-[#575756] tracking-tight">
          ¡Tu proyecto de hogar tomó forma!
        </h1>
        <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto font-medium">
          Con los datos que estructuramos juntos, estos son los proyectos en los que puedes aplicar inmediatamente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Proyecto Recomendado */}
        <Card className="border-2 border-[#0067b1] shadow-xl rounded-3xl overflow-hidden bg-white flex flex-col justify-between">
          <div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800"
                className="h-56 w-full object-cover z-0 rounded-none"
                alt="Proyecto Ideal"
              />
              <Chip color="warning" variant="solid" className="absolute top-4 right-4 z-20 font-extrabold shadow-md">
                ❤️ Tu mejor Match VIS
              </Chip>
            </div>
            <CardBody className="p-6 space-y-3">
              <h3 className="text-2xl font-black text-[#575756]">Bosques de Arrayán</h3>
              <p className="text-[#0067b1] font-extrabold text-lg">Desde 120 SMMLV</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Estructuramos las cuotas estimadas para que se acomoden a tus ingresos sin comprometer la tranquilidad de tu familia.
              </p>
            </CardBody>
          </div>
        </Card>

        {/* Tarjeta de Movilidad / Traslado Acompañado */}
        <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-gradient-to-br from-[#0067b1] to-[#004f88] text-white flex flex-col justify-between">
          <CardBody className="p-8 flex flex-col justify-between h-full space-y-6 relative">
            <div className="space-y-4 relative z-10">
              <Chip className="bg-[#ffd000] text-[#575756] font-extrabold tracking-widest uppercase text-xs">
                Acompañamiento Preferencial
              </Chip>
              <h3 className="text-3xl font-black leading-tight text-white">
                Te acompañamos a afiliarte o trasladarte a Colsubsidio
              </h3>
              <p className="text-blue-100 font-medium leading-relaxed text-sm md:text-base">
                Para acceder a los cupos prioritarios del 90% y asegurar tu subsidio, gestionamos tu afiliación o cambio de caja de compensación <strong className="text-[#ffd000]">100% gratis y sin trámites complicados</strong>.
              </p>
            </div>

            <div className="space-y-3 relative z-10">
              <Button
                size="lg"
                className="w-full font-black bg-[#ffd000] text-[#575756] shadow-xl hover:bg-[#e6bb00] h-16 text-lg rounded-2xl transition-transform active:scale-95"
                onClick={onSolicitarMovilidad}
              >
                Quiero que me acompañen con mi Afiliación
              </Button>
              <p className="text-xs text-center text-blue-200">
                Un asesor especializado te contactará en menos de 24 horas.
              </p>
            </div>
          </CardBody>
        </Card>

      </div>
    </motion.div>
  );
}