"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardBody, CardHeader, Button, Progress, Divider, Spinner } from "@nextui-org/react";
import { useLead } from "@/context/LeadContext";
import { getProyectos, scoreLead, mapLeadToFeatures, Proyecto as ApiProyecto, ScoreResponse } from "@/lib/scoring";
import { saveLead } from "@/lib/supabase";
import { getProyectoImagen } from "@/lib/proyectoImages"; 
import DetallesProyectoModal from "./DetallesProyectoModal"; // <-- NUEVA IMPORTACIÓN

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
  vlrM: number;
  loading: boolean;
}

const ZONA_MAP: Record<string, string> = {
  "Bogota": "Bogotá",
  "Municipios Norte": "Municipios Norte",
  "Municipios Sur": "Municipios Sur",
};

function formatPrice(vlr: number): string {
  const smmlv = Math.round(vlr / 1_300_000);
  return `Desde ${smmlv} SMMLV`;
}

function getEstadoText(score: number): string {
  if (score >= 0.90) return "¡Tu casa te espera!";
  if (score >= 0.70) return "Buena opción";
  if (score >= 0.50) return "Meta a la vista";
  return "Plan de Futuro";
}

function getFaltanteText(score: number): string {
  if (score >= 0.90) return "Todo está alineado. Solo requieres formalizar tu firma para separar tu hogar.";
  if (score >= 0.70) return "Estás muy cerca. Un pequeño ajuste en tu plan de ahorro o sumar un subsidio PAC lo hará posible.";
  if (score >= 0.50) return "Con nuestro Plan Semilla, te guiaremos paso a paso para que alcances esta meta en los próximos meses.";
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
  const [guardando, setGuardando] = useState(false);
  
  // Estado para controlar el modal de detalles del proyecto
  const [showDetallesModal, setShowDetallesModal] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const apiProyectos = await getProyectos();

        const features = mapLeadToFeatures({
          isAfiliado: lead.isAfiliado === true,
          rangoEdad: lead.rangoEdad || "36-45",
          personasCargo: lead.personasCargo !== undefined && lead.personasCargo !== "" ? parseInt(lead.personasCargo) : 1,
          proyectoInteres: lead.proyectoInteres || "",
          segmentoFamilia: lead.segmentoFamilia,
          piramideEmpresas: lead.piramideEmpresas,
          segmentoCaja: lead.segmentoCaja,
        });

        const scored = await Promise.all(
          apiProyectos.map(async (p) => {
            const leadFeatures = { ...features, Proyecto: p.nombre, Valor_Vivienda: p.vlr_m };
            const result = await scoreLead(leadFeatures);
            return { nombre: p.nombre, result, vlr_m: p.vlr_m };
          })
        );

        scored.sort((a, b) => b.result.score - a.result.score);
        const top5 = scored.slice(0, 7);

        const mapped: ProyectoConScore[] = top5.map((p, idx) => ({
          id: idx + 1,
          nombre: p.nombre,
          zona: ZONA_MAP[apiProyectos.find(ap => ap.nombre === p.nombre)?.ubicacion || ""] || "Bogotá",
          imagen: getProyectoImagen(p.nombre), 
          precio: formatPrice(p.vlr_m),
          scoreRequerido: 70,
          viabilidadActual: Math.round(p.result.score * 100),
          estado: getEstadoText(p.result.score),
          descripcion: `Un entorno ideal para tu familia en ${p.nombre}.`,
          faltante: getFaltanteText(p.result.score),
          scoreResult: p.result,
          vlrM: p.vlr_m,
          loading: false,
        }));

        setProyectos(mapped);
        setProyectoSeleccionado(mapped[0]);
      } catch (err) {
        console.error("Error loading projects:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [lead]);

  const handleSeleccionar = async () => {
    if (!proyectoSeleccionado || guardando) return;
    setGuardando(true);
    try {
      const score = proyectoSeleccionado.scoreResult?.score || 0;
      const semaforo = score >= 0.70 ? "VERDE" : score >= 0.55 ? "AMARILLO" : "ROJO";

      await saveLead({
        documento: lead.leadId,
        nombre: lead.nombre || "Sin nombre",
        afiliacion: lead.isAfiliado ? "Afiliado" : "No_Afiliado",
        rango_edad: lead.rangoEdad || "36-45",
        personas_a_cargo: lead.personasCargo !== undefined && lead.personasCargo !== "" ? parseInt(lead.personasCargo) : 0,
        segmento_caja: lead.segmentoCaja || "Basico",
        segmento_familia: lead.segmentoFamilia || "Sin Grupo",
        piramide_empresas: lead.piramideEmpresas || "XI",
        proyecto: proyectoSeleccionado.nombre,
        valor_vivienda: proyectoSeleccionado.vlrM,
        entidad_financiera: lead.isAfiliado ? "Colsubsidio" : "Banco",
        score,
        semaforo,
      });

      onSeleccionarLlave(proyectoSeleccionado);
    } catch (err) {
      console.error("Error saving lead:", err);
    } finally {
      setGuardando(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Spinner size="lg" color="primary" />
        <p className="text-slate-500 font-bold text-sm text-center px-4">
          Analizando tu perfil con nuestro motor de IA habitacional...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 p-3 sm:p-6"
    >
      {/* SECCIÓN IZQUIERDA: Grid de proyectos alternativos */}
      <div className="lg:col-span-7 space-y-6 order-2 lg:order-1 pt-4 lg:pt-0">
        <div className="mb-4 px-2 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#575756] tracking-tighter leading-tight">
            Descubre tu <span className="text-[#0067b1]">próximo hogar</span>
          </h2>
          <p className="text-slate-400 mt-2 sm:mt-3 text-xs sm:text-sm uppercase font-black tracking-widest">
            Simulador de Match Habitacional Inteligente
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {proyectos.map((proyecto) => (
            <Card
              key={proyecto.id}
              isPressable
              onPress={() => {
                setProyectoSeleccionado(proyecto);
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
              }}
              className={`border-2 rounded-3xl overflow-hidden transition-all duration-300 w-full bg-white ${
                proyectoSeleccionado?.id === proyecto.id
                  ? "border-[#0067b1] shadow-2xl scale-[1.02] bg-slate-50/50"
                  : "border-slate-100 hover:border-slate-200 hover:shadow-lg"
              }`}
            >
              <img
                src={proyecto.imagen}
                alt={proyecto.nombre}
                className="object-cover h-40 sm:h-48 w-full z-0 bg-slate-100 block transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = "/images/propiedades/boseque_de_arrayan.png";
                }}
              />
              <CardBody className="p-4 sm:p-5 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] sm:text-[10px] font-black text-[#0067b1] bg-blue-50 px-2 py-1 rounded-lg uppercase tracking-widest border border-blue-100">
                    {proyecto.zona}
                  </span>
                  {proyecto.scoreResult && (
                    <span className={`text-[10px] sm:text-[11px] font-black text-white px-2.5 py-1 rounded-lg shadow-xs ${
                      proyecto.scoreResult.score >= 0.70 ? "bg-emerald-600" :
                      proyecto.scoreResult.score >= 0.55 ? "bg-amber-500 text-slate-900" :
                      "bg-red-600"
                    }`}>
                      {proyecto.scoreResult.semaforo}
                    </span>
                  )}
                </div>
                <h3 className="font-extrabold text-[#575756] text-lg sm:text-xl tracking-tight leading-tight mt-1 truncate">{proyecto.nombre}</h3>
                <p className="text-xs sm:text-sm font-semibold text-[#0067b1]">{proyecto.precio}</p>
                {proyecto.scoreResult && (
                  <p className="text-[11px] sm:text-xs text-slate-400 font-bold">
                    Score Analítico: {Math.round(proyecto.scoreResult.score * 100)}%
                  </p>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* SECCIÓN DERECHA: Ficha principal fija del proyecto preseleccionado */}
      <div className="lg:col-span-5 relative order-1 lg:order-2">
        <div className="lg:sticky lg:top-6 w-full">
          <Card className="shadow-2xl border-none overflow-hidden rounded-3xl bg-white w-full">
            
            {/* Cabecera Inmersiva (Hero Header) */}
            <div className="relative h-44 sm:h-52 w-full bg-slate-900 flex flex-col justify-end p-6 overflow-hidden">
              <img 
                src={proyectoSeleccionado?.imagen} 
                alt={proyectoSeleccionado?.nombre}
                className="absolute inset-0 object-cover w-full h-full opacity-65"
                onError={(e) => {
                  e.currentTarget.src = "/images/propiedades/boseque_de_arrayan.png";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
              
              <div className="relative z-20 space-y-2">
                <span className={`inline-block font-black text-white shadow-md px-3 py-1 text-xs rounded-md tracking-wide uppercase ${
                  (proyectoSeleccionado?.scoreResult?.score || 0) >= 0.70 ? "bg-emerald-600" :
                  (proyectoSeleccionado?.scoreResult?.score || 0) >= 0.55 ? "bg-amber-500 text-slate-900" :
                  "bg-red-600"
                }`}>
                  {proyectoSeleccionado?.estado}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none break-words drop-shadow-md">
                  {proyectoSeleccionado?.nombre}
                </h2>
              </div>
            </div>

            {/* Cuerpo Analítico con Acciones de Exploración */}
            <CardBody className="p-6 sm:p-8 space-y-5 bg-white w-full">
              
              {/* CAJA DE SUGERENCIA SUAVE */}
              <div className="bg-blue-50/70 border border-blue-100 p-3 rounded-2xl">
                <p className="text-xs text-slate-600 leading-relaxed font-bold tracking-tight text-center">
                  ✨ Esto es una sugerencia del sistema, pero siempre te acompañamos en tu proceso.
                </p>
              </div>

              {/* BOTÓN "VER MÁS INFORMACIÓN" SOLICITADO */}
              <Button
                size="sm"
                variant="flat"
                className="w-full bg-slate-100 hover:bg-slate-200 text-[#0067b1] font-extrabold text-xs uppercase tracking-wider h-11 rounded-xl border border-slate-200/80 transition-all active:scale-95"
                onClick={() => setShowDetallesModal(true)}
              >
                🔍 Ver más información del proyecto
              </Button>

              {/* Indicadores de viabilidad */}
              <div className="space-y-2.5 pt-1">
                <div className="flex justify-between items-end">
                  <h4 className="font-extrabold text-[#0067b1] text-xs sm:text-sm uppercase tracking-wider">
                    Score de Compatibilidad
                  </h4>
                  <span className="text-3xl font-black text-slate-700 tracking-tight leading-none">
                    {proyectoSeleccionado?.viabilidadActual}%
                  </span>
                </div>
                <div className="relative pt-1">
                  <Progress
                    value={proyectoSeleccionado?.viabilidadActual || 0}
                    color={
                      (proyectoSeleccionado?.viabilidadActual || 0) >= 70 ? "success" :
                      (proyectoSeleccionado?.viabilidadActual || 0) >= 55 ? "warning" : "danger"
                    }
                    className="h-4"
                    radius="full"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-black uppercase tracking-wider px-1 relative">
                    <span>Inicio</span>
                    <span>Ahorro</span>
                    <span>PAC</span>
                    <motion.span
                      animate={{ y: [0, -2, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="text-emerald-600 font-black"
                    >
                      ¡Tu hogar!
                    </motion.span>
                  </div>
                </div>
              </div>

              <Divider className="opacity-50" />

              {/* Qué sigue */}
              <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                  ¿Cuál es el siguiente paso comercial?
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                  {proyectoSeleccionado?.faltante}
                </p>
              </div>

              {/* Botón de Selección Principal */}
              <Button
                size="lg"
                isLoading={guardando}
                className={`w-full font-black shadow-lg text-white h-14 text-sm sm:text-base rounded-2xl transition-transform active:scale-95 duration-300 uppercase tracking-wider ${
                  (proyectoSeleccionado?.viabilidadActual || 0) >= 70
                    ? "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600"
                    : "bg-gradient-to-r from-[#0067b1] to-blue-500 hover:from-[#00528f] hover:to-blue-600"
                }`}
                onClick={handleSeleccionar}
                disabled={guardando}
              >
                {(proyectoSeleccionado?.viabilidadActual || 0) >= 70
                  ? "¡Quiero las llaves de mi hogar!"
                  : "Hablemos para hacerlo realidad"}
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Modal de Información Completa del Proyecto */}
      <DetallesProyectoModal 
        isOpen={showDetallesModal} 
        onClose={() => setShowDetallesModal(false)} 
        proyecto={proyectoSeleccionado} 
      />

    </motion.div>
  );
}