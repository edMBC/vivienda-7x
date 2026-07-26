"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Spinner } from "@nextui-org/react";
import { getAllLeads, updateLeadGestion } from "@/lib/supabase";

// Submódulos Modulizados
import DashboardHeader from "@/components/asesor/DashboardHeader";
import PanelMetricasMisiones from "@/components/asesor/PanelMetricasMisiones";
import PanelFiltrosStats from "@/components/asesor/PanelFiltrosStats";
import LeadCardRow from "@/components/asesor/LeadCardRow";
import AgenteIAModal from "@/components/asesor/AgenteIAModal";
import DetallesLeadModal from "@/components/asesor/DetallesLeadModal";

interface Lead {
  id: string;
  nombre: string;
  documento: string;
  proyecto: string;
  afiliado: boolean;
  score: number;
  status: "verde" | "amarillo" | "rojo";
  contactado: boolean;
  ultima_accion: string | null;
  bloqueado: boolean;
  fuente: "afiliado" | "app";
  rangoEdad?: string;
  personasCargo?: number | string;
  segmentoCaja?: string;
  segmentoFamilia?: string;
  piramideEmpresas?: string;
}

export default function AsesorDashboard() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  const [leadActivo, setLeadActivo] = useState<Lead | null>(null);
  const [showAgenteIA, setShowAgenteIA] = useState(false);
  const [showDetallesModal, setShowDetallesModal] = useState(false);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  
  const [amarillosContactados, setAmarillosContactados] = useState(0);
  const metaAmarillos = 2;
  const [puntosTotales, setPuntosTotales] = useState(140);
  const [filtroEstado, setFiltroEstado] = useState<"todos" | "amarillo" | "verde" | "rojo" | "app">("todos");
  const [vistaModo, setVistaModo] = useState<"lista" | "casillas">("lista");
  const [notificacionDesbloqueo, setNotificacionDesbloqueo] = useState(false);

  useEffect(() => {
    async function loadLeads() {
      try {
        const dbLeads = await getAllLeads();
        if (dbLeads.length > 0) {
          const mapped = dbLeads.map((dbLead) => ({
            id: dbLead.id,
            nombre: dbLead.nombre,
            documento: dbLead.documento,
            proyecto: dbLead.proyecto,
            afiliado: dbLead.afiliacion === "Afiliado",
            score: Math.round((dbLead.score || 0) * 100),
            status: (dbLead.semaforo || "ROJO").toLowerCase() as "verde" | "amarillo" | "rojo",
            contactado: dbLead.contactado || false,
            ultima_accion: dbLead.ultima_accion || null,
            bloqueado: dbLead.semaforo === "VERDE",
            fuente: (dbLead.afiliacion === "Afiliado" ? "app" : "afiliado") as "afiliado" | "app",
            rangoEdad: dbLead.rango_edad,
            personasCargo: dbLead.personas_a_cargo,
            segmentoCaja: dbLead.segmento_caja,
            segmentoFamilia: dbLead.segmento_familia,
            piramideEmpresas: dbLead.piramide_empresas,
          }));
          setLeads(mapped);
        }
      } catch (err) {
        console.error(err);
      } finally { // <- Corregido el font-medium por finally
        setLoadingLeads(false);
      }
    }
    loadLeads();
  }, []);

  const handleRegistrarContacto = async () => {
    if (!leadActivo) return;
    const accionMap: Record<string, string> = { amarillo: "Madurar Ahorro", rojo: "Incubar Prospecto", verde: "Entregar Llaves" };
    const accion = accionMap[leadActivo.status] || "Contactado";

    await updateLeadGestion(leadActivo.documento, true, accion);

    let seDesbloqueoLeads = false;
    const leadsActualizados = leads.map((item) => {
      if (item.id === leadActivo.id) return { ...item, contactado: true, ultima_accion: accion };
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
      const idxVerde = leadsActualizados.findIndex((l) => l.status === "verde" && l.bloqueado);
      if (idxVerde !== -1) {
        leadsActualizados[idxVerde].bloqueado = false;
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
    let mensaje = lead.status === "amarillo"
      ? `¡Hola ${lead.nombre}! Te saludo de Colsubsidio Vivienda. Sigamos construyendo tu Plan Semilla de ahorro para tu casa en ${lead.proyecto}.`
      : `¡Hola ${lead.nombre}! Tu radicación prioritaria para ${lead.proyecto} está lista para firma.`;
    window.open(`https://api.whatsapp.com/send?phone=573000000000&text=${encodeURIComponent(mensaje)}`, "_blank");
    setLeadActivo(lead);
    onOpen();
  };

  const activarAgenteIA = (lead: Lead) => {
    setLeadActivo(lead);
    setShowAgenteIA(true);
  };

  const abrirDetalles = (lead: Lead) => {
    setLeadActivo(lead);
    setShowDetallesModal(true);
  };

  const finalizarIncubacionIA = async () => {
    if (!leadActivo) return;
    await updateLeadGestion(leadActivo.documento, true, "IA Semilla Activa");
    setLeads(prev => prev.map(l => l.id === leadActivo.id ? { ...l, contactado: true, ultima_accion: "IA Semilla Activa" } : l));
    setShowAgenteIA(false);
  };

  const leadsFiltrados = leads.filter((l) => {
    if (filtroEstado === "todos") return true;
    if (filtroEstado === "app") return l.fuente === "app";
    return l.status === filtroEstado;
  });

  const stats = {
    total: leads.length,
    desdeApp: leads.filter(l => l.fuente === "app").length,
    verdes: leads.filter(l => l.status === "verde").length,
    amarillos: leads.filter(l => l.status === "amarillo").length,
    rojos: leads.filter(l => l.status === "rojo").length,
  };

  return (
    // Aplicado bg-linear-to-br
    <main className="min-h-screen w-full bg-linear-to-br from-slate-100 via-blue-50/50 to-slate-200 p-4 sm:p-6 flex flex-col justify-between overflow-x-hidden space-y-4">
      {notificacionDesbloqueo && (
        <div className="fixed top-4 right-4 bg-emerald-600 text-white p-4 rounded-xl shadow-2xl z-50">¡Reto Cumplido! Lead liberado.</div>
      )}

      <div className="bg-white/70 border border-white/40 rounded-2xl p-1 backdrop-blur-md relative z-10">
        <DashboardHeader puntosTotales={puntosTotales} onLogout={() => router.push("/login")} />
      </div>

      {/* Aplicado grow en vez de flex-grow */}
      <div className="relative z-10 space-y-4 grow flex flex-col justify-start">
        <PanelMetricasMisiones amarillosContactados={amarillosContactados} metaAmarillos={metaAmarillos} stats={stats} />

        <PanelFiltrosStats stats={stats} filtroEstado={filtroEstado} setFiltroEstado={setFiltroEstado} vistaModo={vistaModo} setVistaModo={setVistaModo} />

        {/* Feed dinámico con acción de click para abrir detalles */}
        <div className={`grid gap-3 ${vistaModo === "casillas" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "grid-cols-1"}`}>
          {loadingLeads ? (
            <div className="col-span-full flex justify-center py-12"><Spinner color="primary" /></div>
          ) : (
            leadsFiltrados.map((lead, idx) => (
              <LeadCardRow 
                key={lead.id} 
                lead={lead} 
                index={idx} 
                onAbrirWhatsApp={abrirWhatsApp} 
                onAbrirAgenteIA={activarAgenteIA} 
                onVerDetalles={abrirDetalles} 
                vistaModo={vistaModo} 
              />
            ))
          )}
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" size="sm" className="rounded-2xl bg-white text-slate-800">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-[#0067b1] font-black pt-5 px-5">¿Registrar Acompañamiento?</ModalHeader>
              <ModalBody className="px-5">
                {leadActivo && <p className="text-xs bg-slate-50 p-3 rounded-xl font-semibold text-slate-600">{leadActivo.nombre}</p>}
              </ModalBody>
              <ModalFooter className="px-5 pb-6 flex flex-col gap-2">
                <Button className="bg-[#0067b1] text-white font-black" onPress={handleRegistrarContacto}>Confirmar Avance</Button>
                <Button variant="light" color="danger" onPress={onClose}>Regresar</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Modal del Agente Automático */}
      <AgenteIAModal isOpen={showAgenteIA} onClose={() => setShowAgenteIA(false)} lead={leadActivo} onIncubarExitoso={finalizarIncubacionIA} />

      {/* Modal de Detalles del Lead */}
      <DetallesLeadModal isOpen={showDetallesModal} onClose={() => setShowDetallesModal(false)} lead={leadActivo} />

      <footer className="text-center text-[10px] font-bold text-slate-400 w-full pt-2 relative z-10">Sala de Ventas Digital Colsubsidio — Team 7x</footer>
    </main>
  );
}