"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardBody, CardHeader, Button, Progress, Chip, Image, Divider } from "@nextui-org/react";

export interface Proyecto {
  id: number;
  nombre: string;
  zona: string;
  imagen: string;
  precio: string;
  scoreRequerido: number;
  viabilidadActual: number;
  estado: string;
  descripcion: string;
  faltante: string;
}

// Mock de 4 proyectos reales basados en tu documento de 22
const PROYECTOS_MOCK: Proyecto[] = [
  {
    id: 1,
    nombre: "Bosques de Arrayán",
    zona: "Bogotá Sur",
    imagen: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800",
    precio: "Desde 120 SMMLV",
    scoreRequerido: 85,
    viabilidadActual: 95,
    estado: "¡Tu casa te espera!",
    descripcion: "Un entorno tranquilo donde tus hijos podrán jugar y crecer seguros. Excelente conectividad.",
    faltante: "Todo está alineado. Solo requieres formalizar tu firma para separar tu hogar."
  },
  {
    id: 2,
    nombre: "La Macarena",
    zona: "Bogotá",
    imagen: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    precio: "Desde 135 SMMLV",
    scoreRequerido: 90,
    viabilidadActual: 75,
    estado: "Meta a la vista",
    descripcion: "Acabados hermosos e iluminación natural para crear nuevos recuerdos en familia.",
    faltante: "Estás muy cerca. Un pequeño ajuste en tu plan de ahorro o sumar un subsidio PAC lo hará posible."
  },
  {
    id: 3,
    nombre: "Reserva de Guayacán",
    zona: "Municipios Norte",
    imagen: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
    precio: "Desde 150 SMMLV",
    scoreRequerido: 95,
    viabilidadActual: 50,
    estado: "Plan de Futuro",
    descripcion: "Respirar aire puro y disfrutar de la tranquilidad fuera del ruido de la ciudad.",
    faltante: "Con nuestro Plan Semilla, te guiaremos paso a paso para que alcances esta meta en los próximos meses."
  },
  {
    id: 4,
    nombre: "Verde Esperanza",
    zona: "Municipios Sur",
    imagen: "https://images.unsplash.com/photo-1583608205776-bfd35f6d9f83?auto=format&fit=crop&q=80&w=800",
    precio: "Desde 110 SMMLV",
    scoreRequerido: 70,
    viabilidadActual: 100,
    estado: "¡Tu casa te espera!",
    descripcion: "El inicio perfecto. Un hogar acogedor diseñado para tu comodidad diaria.",
    faltante: "¡Viabilidad total! Tienes tu cupo asegurado gracias a tu esfuerzo y trayectoria."
  }
];

interface FaseResultadosProps {
  onSeleccionarLlave: (proyecto: Proyecto) => void;
}

export default function FaseResultados({ onSeleccionarLlave }: FaseResultadosProps) {
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<Proyecto>(PROYECTOS_MOCK[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-8 p-2 sm:p-4"
    >
      {/* Columna Izquierda: Galería de Hogares ( Stack en Mobile ) */}
      <div className="lg:col-span-7 space-y-6">
        <div className="mb-2 px-2 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-black text-[#575756] tracking-tighter leading-tight">
            Descubre tu <span className="text-[#0067b1]">próximo hogar</span>
          </h2>
          <p className="text-slate-600 mt-3 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
            Hemos analizado tu perfil y estas son las opciones donde vemos florecer tu futuro familiar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {PROYECTOS_MOCK.map((proyecto) => (
            <Card
              key={proyecto.id}
              isPressable
              onPress={() => setProyectoSeleccionado(proyecto)}
              className={`border-2 rounded-3xl overflow-hidden transition-all duration-300 ${
                proyectoSeleccionado.id === proyecto.id
                  ? "border-[#0067b1] shadow-2xl scale-[1.03] ring-8 ring-blue-50"
                  : "border-transparent hover:border-slate-200 hover:shadow-lg bg-white"
              }`}
            >
              <Image
                src={proyecto.imagen}
                alt={proyecto.nombre}
                className="object-cover h-48 sm:h-52 w-full rounded-none z-0"
              />
              <CardBody className="p-5 bg-white space-y-2">
                <div className="flex justify-between items-center">
                  <Chip size="sm" variant="flat" className="bg-blue-50 text-[#0067b1] font-bold uppercase text-[10px] tracking-widest px-2.5">
                    {proyecto.zona}
                  </Chip>
                  {proyecto.viabilidadActual >= 90 && (
                    <span className="text-2xl animate-pulse" title="Alta Viabilidad">❤️</span>
                  )}
                </div>
                <h3 className="font-extrabold text-[#575756] text-xl tracking-tight">{proyecto.nombre}</h3>
                <p className="text-sm font-semibold text-[#0067b1] mt-1">{proyecto.precio}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Columna Derecha: Tu Ruta hacia Casa ( Sticky en Desktop, Stack en Mobile ) */}
      <div className="lg:col-span-5 relative mt-6 lg:mt-0">
        <div className="lg:sticky lg:top-6">
          <Card className="shadow-2xl border-t-8 border-[#ffd000] overflow-visible rounded-3xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="bg-slate-50 border-b border-slate-100 flex flex-col items-start p-8 md:p-10 rounded-t-2xl">
              <Chip
                color={proyectoSeleccionado.viabilidadActual >= 90 ? "success" : proyectoSeleccionado.viabilidadActual >= 70 ? "warning" : "default"}
                variant="solid"
                className="mb-4 font-bold text-white shadow-sm px-3 py-1"
              >
                {proyectoSeleccionado.estado}
              </Chip>
              <h2 className="text-3xl md:text-4xl font-black text-[#575756] tracking-tighter">
                {proyectoSeleccionado.nombre}
              </h2>
              <p className="text-base text-slate-600 mt-4 leading-relaxed font-normal">
                {proyectoSeleccionado.descripcion}
              </p>
            </CardHeader>

            <CardBody className="p-8 md:p-10 space-y-8 bg-white rounded-b-3xl">
              
              {/* Termómetro de Propiedad Rediseñado */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <h4 className="font-extrabold text-[#0067b1] text-sm md:text-base uppercase tracking-wider flex items-center gap-2.5">
                    <span>🛤️</span> Tu meta personal de hogar
                  </h4>
                  <span className="text-4xl font-black text-slate-700 tracking-tight">
                    {proyectoSeleccionado.viabilidadActual}%
                  </span>
                </div>
                <div className="relative pt-2">
                  <Progress
                    value={proyectoSeleccionado.viabilidadActual}
                    color={
                      proyectoSeleccionado.viabilidadActual >= 90 ? "success" :
                      proyectoSeleccionado.viabilidadActual >= 70 ? "warning" : "default"
                    }
                    className="h-5"
                    radius="full"
                  />
                  {/* Marcas del termómetro */}
                  <div className="flex justify-between text-xs text-slate-400 mt-3 font-bold px-1 relative">
                    <span>Inicio</span>
                    <span>Ahorro</span>
                    <span>PAC</span>
                    <motion.span 
                      animate={{ y: [0, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="text-emerald-600 font-extrabold"
                    >
                      🏡 ¡Es tuya!
                    </motion.span>
                  </div>
                </div>
              </div>

              <Divider className="opacity-60" />

              {/* Feedback Accionable */}
              <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-6 rounded-2xl border border-blue-100/60 shadow-inner">
                <h4 className="text-sm md:text-base font-extrabold text-[#0067b1] flex items-center gap-2.5 mb-3">
                  <span>✨</span> ¿Qué sigue para lograrlo?
                </h4>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed font-medium">
                  {proyectoSeleccionado.faltante}
                </p>
              </div>

              {/* CTA Final Emocional */}
              <Button
                size="lg"
                className={`w-full font-extrabold shadow-xl text-white h-16 text-lg md:text-xl rounded-2xl transition-transform active:scale-95 transition-all duration-300 ${
                  proyectoSeleccionado.viabilidadActual >= 90
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-600 hover:to-emerald-500"
                    : "bg-gradient-to-r from-[#0067b1] to-blue-500 hover:from-[#00528f] hover:to-blue-600"
                }`}
                onClick={() => onSeleccionarLlave(proyectoSeleccionado)}
              >
                {proyectoSeleccionado.viabilidadActual >= 90
                  ? "¡Quiero las llaves de mi hogar!"
                  : "Hablemos para hacerlo realidad"}
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}