"use client";

import { motion } from "framer-motion";
import { Card, CardBody, Button, Chip, Image } from "@nextui-org/react";

interface FaseDesbloqueoProps {
  datosPerfil: any;
  onSolicitarMovilidad: () => void;
}

export default function FaseDesbloqueo({ datosPerfil, onSolicitarMovilidad }: FaseDesbloqueoProps) {
  // Simulamos que el motor procesó los datosPerfil
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl mx-auto p-4 space-y-8"
    >
      <div className="text-center space-y-3">
        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
          className="text-6xl mb-4"
        >
          🏆
        </motion.div>
        <h1 className="text-4xl font-black text-[#575756] tracking-tight">
          ¡Has llegado a la meta!
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Basado en tus respuestas, hemos desbloqueado estos proyectos que se ajustan a tu capacidad.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Propiedad 1 */}
        <Card className="border-2 border-[#0067b1] shadow-xl rounded-3xl overflow-hidden bg-white relative">
          {/* Badge de "Casi Tuyo" */}
          <div className="absolute top-4 right-4 z-20">
            <Chip color="warning" variant="shadow" className="font-bold">✨ Ideal para ti</Chip>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800"
            className="h-48 w-full object-cover z-0"
            alt="Bosques"
          />
          <CardBody className="p-6 space-y-3">
            <h3 className="text-2xl font-black text-[#575756]">Bosques de Arrayán</h3>
            <p className="text-[#0067b1] font-bold">Desde 120 SMMLV</p>
            <p className="text-sm text-slate-500">
              Con tus ingresos declarados, el pago mensual se ajusta perfectamente a tu flujo de caja.
            </p>
          </CardBody>
        </Card>

        {/* Banner de Oferta de Movilidad (Traslado) */}
        <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-gradient-to-br from-[#0067b1] to-[#004f88] text-white">
          <CardBody className="p-8 flex flex-col justify-center h-full space-y-6 relative overflow-hidden">
            {/* Elemento gráfico de fondo */}
            <div className="absolute -right-10 -bottom-10 opacity-10 text-9xl">🚀</div>
            
            <Chip className="bg-[#ffd000] text-[#575756] font-black tracking-widest uppercase text-xs">
              Atajo Desbloqueado
            </Chip>
            
            <div className="space-y-3 relative z-10">
              <h3 className="text-3xl font-black leading-tight">
                Accede a los cupos VIS con prioridad
              </h3>
              <p className="text-blue-100 font-medium leading-relaxed">
                Los afiliados a Colsubsidio tienen la primera opción de compra y mayores subsidios. Te ayudamos a gestionar tu traslado de Caja de Compensación o afiliación como independiente <strong className="text-[#ffd000]">sin costo y en 24 horas</strong>.
              </p>
            </div>

            <Button
              size="lg"
              className="w-full font-black bg-[#ffd000] text-[#575756] shadow-xl hover:bg-[#e6bb00] h-16 text-lg rounded-2xl relative z-10 transition-transform active:scale-95"
              onClick={onSolicitarMovilidad}
            >
              Solicitar Ayuda en Movilidad
            </Button>
            <p className="text-xs text-center text-blue-200 opacity-80 z-10">Un asesor experto se encargará de todo el papeleo.</p>
          </CardBody>
        </Card>
      </div>
    </motion.div>
  );
}