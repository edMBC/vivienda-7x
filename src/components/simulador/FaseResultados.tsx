"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardBody, CardHeader, Button, Progress, Chip, Image, Divider, Spinner } from "@nextui-org/react";
import { useLead } from "@/context/LeadContext";
import { getProyectos, scoreLead, mapLeadToFeatures, Proyecto as ApiProyecto, ScoreResponse } from "@/lib/scoring";
import { saveLead } from "@/lib/supabase";

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

interface ProyectoConScore extends Proyecto {
  scoreResult: ScoreResponse | null;
  loading: boolean;
}

const IMAGENES: Record<string, string> = {
  "Bosques de Arrayan": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800",
  "Bosques de Turpial": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
  "La Macarena": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
  "Mongui": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
  "Pamplona": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800",
  "Reserva de Guayacan": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
  "Reserva de Saman": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800",
  "INARI": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
  "La Arboleda": "https://images.unsplash.com/photo-1583608205776-bfd35f6d9f83?auto=format&fit=crop&q=80&w=800",
  "Los Nogales": "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&q=80&w=800",
  "Karakali": "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=800",
  "Versalles": "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&q=80&w=800",
  "Abeto": "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=800",
  "Payande": "https://images.unsplash.com/photo-1583608205776-bfd35f6d9f83?auto=format&fit=crop&q=80&w=800",
  "Araucaria": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
  "Vibonce": "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&q=80&w=800",
  "Verde Esperanza": "https://images.unsplash.com/photo-1583608205776-bfd35f6d9f83?auto=format&fit=crop&q=80&w=800",
  "Maipore": "https://images.unsplash.com/photo-1600566752229-250ed79470f6?auto=format&fit=crop&q=80&w=800",
  "Bogota (General)": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
  "Municipios Norte": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
  "Municipios Sur": "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&q=80&w=800",
};

const ZONA_MAP: Record<string, string> = {
  "Bogota": "Bogota",
  "Municipios Norte": "Municipios Norte",
  "Municipios Sur": "Municipios Sur",
};

function formatPrice(vlr: number): string {
  const smmlv = Math.round(vlr / 1_300_000);
  return `Desde ${smmlv} SMMLV`;
}

function getScoreColor(score: number): "success" | "warning" | "danger" {
  if (score >= 0.70) return "success";
  if (score >= 0.40) return "warning";
  return "danger";
}

function getEstadoText(score: number): string {
  if (score >= 0.90) return "¡Tu casa te espera!";
  if (score >= 0.70) return "Buena opcion";
  if (score >= 0.50) return "Meta a la vista";
  return "Plan de Futuro";
}

function getFaltanteText(score: number): string {
  if (score >= 0.90) return "Todo esta alineado. Solo requieres formalizar tu firma para separar tu hogar.";
  if (score >= 0.70) return "Estas muy cerca. Un pequeno ajuste en tu plan de ahorro o sumar un subsidio PAC lo hara posible.";
  if (score >= 0.50) return "Con nuestro Plan Semilla, te guiaremos paso a paso para que alcances esta meta en los proximos meses.";
  return "Trabajemos juntos para mejorar tu perfil y acceder a mejores opciones.";
}

interface FaseResultadosProps {
  onSeleccionarLlave: (proyecto: Proyecto) => void;
}

export default function FaseResultados({ onSeleccionarLlave }: FaseResultadosProps) {
  const { lead } = useLead();
  const [proyectos, setProyectos] = useState<ProyectoConScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<ProyectoConScore | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const apiProyectos = await getProyectos();

        const mapped: ProyectoConScore[] = apiProyectos.map((p) => ({
          id: p.id,
          nombre: p.nombre,
          zona: ZONA_MAP[p.ubicacion] || p.ubicacion,
          imagen: IMAGENES[p.nombre] || IMAGENES["Bosques de Arrayan"],
          precio: formatPrice(p.vlr_m),
          scoreRequerido: 70,
          viabilidadActual: 0,
          estado: "Cargando...",
          descripcion: `Un entorno ideal para tu familia en ${p.nombre}.`,
          faltante: "Analizando tu perfil...",
          scoreResult: null,
          loading: true,
        }));

        setProyectos(mapped);
        setProyectoSeleccionado(mapped[0]);

        const features = mapLeadToFeatures({
          isAfiliado: lead.isAfiliado === true,
          rangoEdad: lead.rangoEdad || "36-45",
          personasCargo: parseInt(lead.personasCargo) || 1,
          proyectoInteres: lead.proyectoInteres || "",
          segmentoFamilia: lead.segmentoFamilia,
          piramideEmpresas: lead.piramideEmpresas,
          segmentoCaja: lead.segmentoCaja,
        });

        const scored = await Promise.all(
          apiProyectos.map(async (p) => {
            const leadFeatures = { ...features, Proyecto: p.nombre, Valor_Vivienda: p.vlr_m / 10_000 };
            const result = await scoreLead(leadFeatures);
            return { nombre: p.nombre, result };
          })
        );

        setProyectos((prev) =>
          prev.map((proj) => {
            const s = scored.find((sc) => sc.nombre === proj.nombre);
            if (!s) return proj;
            return {
              ...proj,
              scoreResult: s.result,
              viabilidadActual: Math.round(s.result.score * 100),
              estado: getEstadoText(s.result.score),
              faltante: getFaltanteText(s.result.score),
              loading: false,
            };
          })
        );

        setProyectoSeleccionado((prev) => {
          if (!prev) return null;
          const s = scored.find((sc) => sc.nombre === prev.nombre);
          if (!s) return prev;
          return {
            ...prev,
            scoreResult: s.result,
            viabilidadActual: Math.round(s.result.score * 100),
            estado: getEstadoText(s.result.score),
            faltante: getFaltanteText(s.result.score),
            loading: false,
          };
        });

        const bestScore = scored.reduce((best, s) => s.result.score > best ? s.result.score : best, 0);
        const bestSemaforo = bestScore >= 0.70 ? "VERDE" : bestScore >= 0.40 ? "AMARILLO" : "ROJO";
        const bestProyecto = scored.find(s => s.result.score === bestScore)?.nombre || "";

        await saveLead({
          documento: lead.leadId,
          nombre: lead.nombre || "Sin nombre",
          afiliacion: lead.isAfiliado ? "Afiliado" : "No_Afiliado",
          rango_edad: lead.rangoEdad || "36-45",
          personas_a_cargo: parseInt(lead.personasCargo) || 0,
          segmento_caja: lead.segmentoCaja || "Basico",
          segmento_familia: lead.segmentoFamilia || "Sin Grupo",
          piramide_empresas: lead.piramideEmpresas || "XI",
          proyecto: bestProyecto,
          valor_vivienda: features.Valor_Vivienda,
          entidad_financiera: lead.isAfiliado ? "Colsubsidio" : "Banco",
          score: bestScore,
          semaforo: bestSemaforo,
        });
      } catch (err) {
        console.error("Error loading projects:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [lead]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Spinner size="lg" color="primary" />
        <p className="text-slate-500 font-bold">Analizando tu perfil con nuestro modelo de IA...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-8 p-2 sm:p-4"
    >
      <div className="lg:col-span-7 space-y-6">
        <div className="mb-2 px-2 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-black text-[#575756] tracking-tighter leading-tight">
            Descubre tu <span className="text-[#0067b1]">proximo hogar</span>
          </h2>
          <p className="text-slate-600 mt-3 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
            Nuestro modelo de IA analizo tu perfil y estas son las opciones donde vemos florecer tu futuro familiar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {proyectos.map((proyecto) => (
            <Card
              key={proyecto.id}
              isPressable
              onPress={() => setProyectoSeleccionado(proyecto)}
              className={`border-2 rounded-3xl overflow-hidden transition-all duration-300 ${
                proyectoSeleccionado?.id === proyecto.id
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
                  {proyecto.scoreResult && (
                    <Chip
                      size="sm"
                      color={getScoreColor(proyecto.scoreResult.score)}
                      variant="flat"
                      className="font-bold text-xs"
                    >
                      {proyecto.scoreResult.semaforo}
                    </Chip>
                  )}
                </div>
                <h3 className="font-extrabold text-[#575756] text-xl tracking-tight">{proyecto.nombre}</h3>
                <p className="text-sm font-semibold text-[#0067b1] mt-1">{proyecto.precio}</p>
                {proyecto.scoreResult && (
                  <p className="text-xs text-slate-400 font-bold">
                    Score: {Math.round(proyecto.scoreResult.score * 100)}%
                  </p>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      <div className="lg:col-span-5 relative mt-6 lg:mt-0">
        <div className="lg:sticky lg:top-6">
          <Card className="shadow-2xl border-t-8 border-[#ffd000] overflow-visible rounded-3xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="bg-slate-50 border-b border-slate-100 flex flex-col items-start p-8 md:p-10 rounded-t-2xl">
              <Chip
                color={proyectoSeleccionado?.scoreResult ? getScoreColor(proyectoSeleccionado.scoreResult.score) : "default"}
                variant="solid"
                className="mb-4 font-bold text-white shadow-sm px-3 py-1"
              >
                {proyectoSeleccionado?.estado}
              </Chip>
              <h2 className="text-3xl md:text-4xl font-black text-[#575756] tracking-tighter">
                {proyectoSeleccionado?.nombre}
              </h2>
              <p className="text-base text-slate-600 mt-4 leading-relaxed font-normal">
                {proyectoSeleccionado?.descripcion}
              </p>
            </CardHeader>

            <CardBody className="p-8 md:p-10 space-y-8 bg-white rounded-b-3xl">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <h4 className="font-extrabold text-[#0067b1] text-sm md:text-base uppercase tracking-wider flex items-center gap-2.5">
                    <span>Tu score con IA</span>
                  </h4>
                  <span className="text-4xl font-black text-slate-700 tracking-tight">
                    {proyectoSeleccionado?.viabilidadActual}%
                  </span>
                </div>
                <div className="relative pt-2">
                  <Progress
                    value={proyectoSeleccionado?.viabilidadActual || 0}
                    color={
                      (proyectoSeleccionado?.viabilidadActual || 0) >= 70 ? "success" :
                      (proyectoSeleccionado?.viabilidadActual || 0) >= 40 ? "warning" : "danger"
                    }
                    className="h-5"
                    radius="full"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-3 font-bold px-1 relative">
                    <span>Inicio</span>
                    <span>Ahorro</span>
                    <span>PAC</span>
                    <motion.span
                      animate={{ y: [0, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="text-emerald-600 font-extrabold"
                    >
                      Tu hogar!
                    </motion.span>
                  </div>
                </div>
              </div>

              <Divider className="opacity-60" />

              <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-6 rounded-2xl border border-blue-100/60 shadow-inner">
                <h4 className="text-sm md:text-base font-extrabold text-[#0067b1] flex items-center gap-2.5 mb-3">
                  <span>Que sigue para lograrlo?</span>
                </h4>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed font-medium">
                  {proyectoSeleccionado?.faltante}
                </p>
              </div>

              <Button
                size="lg"
                className={`w-full font-extrabold shadow-xl text-white h-16 text-lg md:text-xl rounded-2xl transition-transform active:scale-95 transition-all duration-300 ${
                  (proyectoSeleccionado?.viabilidadActual || 0) >= 70
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-600 hover:to-emerald-500"
                    : "bg-gradient-to-r from-[#0067b1] to-blue-500 hover:from-[#00528f] hover:to-blue-600"
                }`}
                onClick={() => proyectoSeleccionado && onSeleccionarLlave(proyectoSeleccionado)}
              >
                {(proyectoSeleccionado?.viabilidadActual || 0) >= 70
                  ? "Quiero las llaves de mi hogar!"
                  : "Hablemos para hacerlo realidad"}
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
