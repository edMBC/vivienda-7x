"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardBody,
  Button,
  Chip,
  Progress,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@nextui-org/react";

interface Lead {
  id: number;
  nombre: string;
  proyecto: string;
  ingresos: string;
  afiliado: boolean;
  score: number;
  status: "verde" | "amarillo" | "rojo";
  empresa: string;
  contactado: boolean;
  bloqueado: boolean;
  telefono: string;
}

export default function AsesorDashboard() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [leadActivo, setLeadActivo] = useState<Lead | null>(null);

  const [amarillosContactados, setAmarillosContactados] = useState(0);
  const metaAmarillos = 2;
  const [puntosTotales, setPuntosTotales] = useState(140);
  const [filtroEstado, setFiltroEstado] = useState<"todos" | "amarillo" | "verde">("todos");
  const [notificacionDesbloqueo, setNotificacionDesbloqueo] = useState(false);
  const [saludo, setSaludo] = useState({ titulo: "Bienvenido, Asesor", sub: "Ecosistema de asignación y movilidad habitacional" });

  useEffect(() => {
    const hora = new Date().getHours();
    if (hora >= 5 && hora < 12) {
      setSaludo({
        titulo: "¡A conquistar la mañana, José Manuel!",
        sub: "Sala Norte • Convirtiendo ahorros en llaves reales."
      });
    } else if (hora >= 12 && hora < 18) {
      setSaludo({
        titulo: "¡Mantén el impulso, José Manuel!",
        sub: "Sala Norte • El semáforo comercial está activo."
      });
    } else {
      setSaludo({
        titulo: "¡Excelente jornada, José Manuel!",
        sub: "Consolidando los cierres y metas del día."
      });
    }
  }, []);

  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 1,
      nombre: "Laura Sofía Gómez",
      proyecto: "Bosques de Turpial",
      ingresos: "Hasta 2 SMMLV",
      afiliado: false,
      score: 68,
      status: "amarillo",
      empresa: "Independiente",
      contactado: false,
      bloqueado: false,
      telefono: "573109876543"
    },
    {
      id: 2,
      nombre: "Andrés Felipe Castro",
      proyecto: "Bosques de Arrayán",
      ingresos: "Entre 2 y 4 SMMLV",
      afiliado: true,
      score: 72,
      status: "amarillo",
      empresa: "Nutresa",
      contactado: false,
      bloqueado: false,
      telefono: "573001234567"
    },
    {
      id: 3,
      nombre: "María Fernanda Torres",
      proyecto: "Bosques de Arrayán",
      ingresos: "Hasta 2 SMMLV",
      afiliado: true,
      score: 95,
      status: "verde",
      empresa: "Grupo Éxito",
      contactado: false,
      bloqueado: true,
      telefono: "573155550192"
    },
    {
      id: 4,
      nombre: "Carlos Eduardo Ruiz",
      proyecto: "La Macarena",
      ingresos: "Entre 2 y 4 SMMLV",
      afiliado: true,
      score: 88,
      status: "verde",
      empresa: "Bancolombia",
      contactado: false,
      bloqueado: true,
      telefono: "573204448811"
    },
    {
      id: 5,
      nombre: "Jorge Eliecer Silva",
      proyecto: "Monguí",
      ingresos: "Más de 4 SMMLV",
      afiliado: false,
      score: 35,
      status: "rojo",
      empresa: "Sin Convenio",
      contactado: false,
      bloqueado: false,
      telefono: "573112223344"
    }
  ]);

  const handleAbrirGestion = (lead: Lead) => {
    setLeadActivo(lead);
    onOpen();
  };

  const handleRegistrarContacto = () => {
    if (!leadActivo) return;

    let seDesbloqueoLeads = false;
    const leadsActualizados = leads.map((item) => {
      if (item.id === leadActivo.id) {
        return { ...item, contactado: true };
      }
      return item;
    });

    let nuevosAmarillos = amarillosContactados;

    if (leadActivo.status === "amarillo" && !leadActivo.contactado) {
      nuevosAmarillos += 1;
      setPuntosTotales((prev) => prev + 50); 
    }

    if (nuevosAmarillos >= metaAmarillos) {
      nuevosAmarillos = 0; 
      setPuntosTotales((prev) => prev + 150); 

      const indiceVerdeBloqueado = leadsActualizados.findIndex(
        (l) => l.status === "verde" && l.bloqueado
      );

      if (indiceVerdeBloqueado !== -1) {
        leadsActualizados[indiceVerdeBloqueado].bloqueado = false;
        seDesbloqueoLeads = true;
      }
    }

    setAmarillosContactados(nuevosAmarillos);
    setLeads(leadsActualizados);
    onOpenChange();

    if (seDesbloqueoLeads) {
      setNotificacionDesbloqueo(true);
      setTimeout(() => setNotificacionDesbloqueo(false), 5000);
    }
  };

  const abrirWhatsApp = (lead: Lead) => {
    let mensaje = "";
    if (lead.status === "amarillo") {
      mensaje = `¡Hola ${lead.nombre}! Te saludo de Colsubsidio Vivienda. Sigamos construyendo tu Plan Semilla de ahorro para congelar el valor de tu casa en ${lead.proyecto}. ¿Coordinamos los detalles?`;
    } else {
      mensaje = `¡Hola ${lead.nombre}! Tu radicación prioritaria para el proyecto ${lead.proyecto} está lista para la entrega de llaves y firma. Avancemos con el cierre formal del inmueble.`;
    }
    
    const url = `https://api.whatsapp.com/send?phone=${lead.telefono}&text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
    
    handleAbrirGestion(lead);
  };

  const leadsFiltrados = leads.filter((l) => {
    if (filtroEstado === "todos") return true;
    return l.status === filtroEstado;
  });

  return (
    <main className="min-h-screen bg-slate-50 p-3 sm:p-6 flex flex-col justify-between w-full overflow-x-hidden pb-20 sm:pb-8 space-y-4">
      
      {/* Notificación Flotante */}
      {notificacionDesbloqueo && (
        <div className="fixed top-4 right-4 left-4 sm:left-auto sm:w-96 bg-emerald-600 text-white p-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 border border-emerald-500 animate-in fade-in slide-in-from-top-5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-[#ffd000]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-.9.43-1.563A6 6 0 1121.75 8.25z" />
          </svg>
          <div>
            <p className="font-black text-sm">¡Semáforo en Verde!</p>
            <p className="text-xs text-emerald-100 font-medium">Has liberado una asignación de vivienda directa.</p>
          </div>
        </div>
      )}

      {/* Header con Botón de Cerrar Sesión */}
      <header className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200/60 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-[#0067b1]"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12" /></svg>
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-black text-[#575756] tracking-tight leading-tight">{saludo.titulo}</h1>
            <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">{saludo.sub}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Chip className="hidden sm:flex bg-amber-50 text-[#575756] font-black text-xs border border-amber-200/80">
            {puntosTotales} Pts VIP
          </Chip>
          <Button 
            size="sm" 
            variant="light" 
            color="danger" 
            className="font-bold text-xs" 
            onClick={() => router.push("/login")}
          >
            Cerrar Sesión
          </Button>
        </div>
      </header>

      {/* Banner del Desafío con la Leyenda Explicativa del Semáforo */}
      <Card className="border-none shadow-md rounded-2xl bg-gradient-to-br from-[#0067b1] via-[#00528f] to-slate-900 text-white">
        <CardBody className="p-4 sm:p-5 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <span className="inline-block bg-[#ffd000] text-[#575756] font-black text-[9px] px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
                Motor de Conversión Colsubsidio
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                El Reto: Mueve 2 Semillas a Etapa de Cierre
              </h2>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 w-full md:w-64 space-y-1.5 flex-shrink-0">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-blue-100">Progreso de Racha</span>
                <span className="text-[#ffd000] font-black">{amarillosContactados} / {metaAmarillos}</span>
              </div>
              <Progress value={(amarillosContactados / metaAmarillos) * 100} color="warning" className="h-1.5" radius="full" />
            </div>
          </div>

          {/* EXPLICACIÓN GRÁFICA DEL SEMÁFORO DEL PROYECTO */}
          <div className="pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
            <div className="bg-red-500/10 border border-red-500/30 p-2 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-red-500 mx-auto mb-1 animate-pulse" />
              <p className="text-[10px] font-black text-red-200 uppercase">1. Rojo</p>
              <p className="text-[9px] text-slate-300 font-medium">Incubación / Sin Ahorro</p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 p-2 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-amber-400 mx-auto mb-1 animate-pulse" />
              <p className="text-[10px] font-black text-amber-300 uppercase">2. Amarillo</p>
              <p className="text-[9px] text-slate-300 font-medium">Plan Semilla / Ahorrando</p>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-2 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-emerald-400 mx-auto mb-1 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              <p className="text-[10px] font-black text-emerald-300 uppercase">3. Verde</p>
              <p className="text-[9px] text-slate-300 font-medium">Subsidio Listo / Escritura</p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs w-full">
        <button onClick={() => setFiltroEstado("todos")} className={`flex-1 py-2 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all ${filtroEstado === "todos" ? "bg-[#0067b1] text-white shadow-xs" : "text-slate-500"}`}>Todos</button>
        <button onClick={() => setFiltroEstado("amarillo")} className={`flex-1 py-2 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all ${filtroEstado === "amarillo" ? "bg-amber-400 text-slate-900 shadow-xs" : "text-slate-500"}`}>Plan Semilla</button>
        <button onClick={() => setFiltroEstado("verde")} className={`flex-1 py-2 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all ${filtroEstado === "verde" ? "bg-emerald-500 text-white shadow-xs" : "text-slate-500"}`}>Cierres Directos</button>
      </div>

      {/* FEED DE TARJETAS */}
      <div className="space-y-2.5">
        {leadsFiltrados.map((lead, index) => {
          const esVerde = lead.status === "verde";
          const esAmarillo = lead.status === "amarillo";
          const esRojo = lead.status === "rojo";

          return (
            <div
              key={lead.id}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 relative overflow-hidden ${
                lead.bloqueado 
                  ? "bg-slate-100 border-slate-200/60 opacity-60 select-none" 
                  : lead.contactado
                  ? "bg-emerald-50/40 border-emerald-200"
                  : "bg-white border-slate-200 shadow-sm active:scale-[0.99] hover:border-[#0067b1]"
              }`}
            >
              
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-3 min-w-0 w-full">
                  
                  {/* MICRO-INDICADOR LED TIPO SEMÁFORO EN LÍNEA */}
                  <div className="flex flex-col items-center justify-center flex-shrink-0 gap-1 bg-slate-50 border border-slate-200 p-1 rounded-lg w-7 h-14">
                    <span className={`w-2.5 h-2.5 rounded-full ${esRojo ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)] animate-pulse" : "bg-slate-200"}`} />
                    <span className={`w-2.5 h-2.5 rounded-full ${esAmarillo ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.7)] animate-pulse" : "bg-slate-200"}`} />
                    <span className={`w-2.5 h-2.5 rounded-full ${esVerde && !lead.bloqueado ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" : "bg-slate-200"}`} />
                  </div>
                  
                  <div className="min-w-0 flex-grow pl-1">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">
                      Peldaño del Tablero {index + 1}
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-700 truncate leading-tight">
                      {lead.bloqueado ? "Cliente Bloqueado por Reto" : lead.nombre}
                    </h3>
                    <p className="text-[11px] font-bold text-[#0067b1] mt-0.5 truncate">
                      {lead.proyecto} • <span className="text-slate-400 font-medium">{lead.bloqueado ? "Completa la racha de amarillos" : lead.empresa}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Botones con Acciones Semánticas según el Semáforo */}
              <div className="w-full pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Score: <span className="text-slate-600 font-black text-xs">{lead.score}%</span>
                </div>

                {lead.bloqueado ? (
                  <Button size="sm" className="bg-slate-200 text-slate-400 font-black text-[10px] uppercase rounded-lg cursor-not-allowed">
                    🔒 Bloqueado
                  </Button>
                ) : lead.contactado ? (
                  <Chip size="sm" color="success" variant="flat" className="font-black text-[10px] uppercase border border-emerald-200">
                    Gestionado ✓
                  </Chip>
                ) : (
                  <Button
                    size="sm"
                    className={`font-black text-white text-xs h-9 rounded-xl px-4 flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 ${
                      esAmarillo ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 animate-pulse" : esRojo ? "bg-red-500 hover:bg-red-600" : "bg-emerald-600 hover:bg-emerald-700"
                    }`}
                    onClick={() => abrirWhatsApp(lead)}
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.006 5.284 5.296.001 11.82.001c3.161 0 6.131 1.23 8.366 3.465 2.235 2.236 3.461 5.207 3.46 8.371-.006 6.535-5.304 11.816-11.83 11.816-2.007 0-3.98-.51-5.742-1.483L0 24zm6.59-4.846c1.6.95 3.197 1.45 4.817 1.45a9.887 9.887 0 0 0 9.89-9.88 9.877 9.877 0 0 0-9.89-9.879A9.89 9.89 0 0 0 1.94 11.83a9.922 9.922 0 0 0 1.515 5.21l-1.001 3.653 3.737-.98c1.51.824 3.01 1.42 4.462 1.42z" />
                    </svg>
                    {esAmarillo && "Madurar Ahorro por WhatsApp"}
                    {esRojo && "Incubar Prospecto"}
                    {esVerde && "Entregar Llaves y Firma"}
                  </Button>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" className="rounded-2xl mx-4 bg-white text-slate-800 border-t-4 border-[#0067b1]" size="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-[#0067b1] font-black text-base pt-5 px-5 flex flex-col">
                <span>¿Registrar Acompañamiento?</span>
                <span className="text-[11px] text-slate-400 font-medium mt-0.5">Confirma el contacto para avanzar en la escalera de misiones.</span>
              </ModalHeader>
              <ModalBody className="px-5 pb-2">
                {leadActivo && (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                    <p className="font-black text-slate-700">{leadActivo.nombre}</p>
                    <p className="text-[#0067b1] font-bold mt-0.5">{leadActivo.proyecto}</p>
                  </div>
                )}
              </ModalBody>
              <ModalFooter className="px-5 pb-6 flex flex-col gap-2">
                <Button className="bg-[#0067b1] text-white font-black text-xs h-11 rounded-xl shadow-md" onPress={handleRegistrarContacto}>
                  Confirmar Avance del Semáforo
                </Button>
                <Button variant="light" color="danger" onPress={onClose} className="font-bold text-xs h-10">Regresar</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <footer className="text-center text-[9px] text-slate-400 pt-2 w-full">
        Sala de Ventas Digital Colsubsidio — Equipo 7x
      </footer>
    </main>
  );
}