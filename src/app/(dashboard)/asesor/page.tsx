"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardBody,
  Button,
  Chip,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
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

  // Contador de la racha
  const [amarillosContactados, setAmarillosContactados] = useState(0);
  const metaAmarillos = 2; // Cada 2 amarillos gestionados, se desbloquea 1 verde
  const [puntosTotales, setPuntosTotales] = useState(140);

  // Estado inicial de la base de datos de leads
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
      telefono: "+57 310 987 6543"
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
      telefono: "+57 300 123 4567"
    },
    {
      id: 3,
      nombre: "María Fernanda Torres",
      proyecto: "Bosques de Arrayán",
      ingresos: "Hasta 2 SMMLV",
      afiliado: true,
      score: 95,
      status: "verde",
      empresa: "Grupo Éxito (Marca Foco)",
      contactado: false,
      bloqueado: true, // Bloqueado inicialmente
      telefono: "+57 315 555 0192"
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
      telefono: "+57 320 444 8811"
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
      telefono: "+57 311 222 3344"
    }
  ]);

  const [filtro, setFiltro] = useState("");

  const handleAbrirGestion = (lead: Lead) => {
    setLeadActivo(lead);
    onOpen();
  };

  const handleRegistrarContacto = () => {
    if (!leadActivo) return;

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
      }
    }

    setAmarillosContactados(nuevosAmarillos);
    setLeads(leadsActualizados);
    onOpenChange();
  };

  const leadsFiltrados = leads.filter(
    (l) =>
      l.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      l.proyecto.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Header Cálido y Cercano */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          {/* Icono cálido en lugar de imagen */}
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#ffd000] to-orange-300 flex items-center justify-center text-2xl shadow-inner">
            👋
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-[#575756] tracking-tight">
              ¡Buen día, José Manuel! ☕
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              Sala de Ventas Norte • Hoy ayudaremos a más familias
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <Chip color="warning" variant="flat" className="font-extrabold text-[#575756]">
            ⭐ {puntosTotales} Pts de Cierre
          </Chip>
          <Button size="sm" variant="light" color="danger" className="font-bold" onClick={() => router.push("/")}>
            Cerrar Sesión
          </Button>
        </div>
      </header>

      {/* BANNER GAMIFICADO: Enfoque en el impacto y recompensa */}
      <Card className="border-none shadow-xl rounded-3xl bg-gradient-to-br from-[#0067b1] to-[#004f88] text-white overflow-visible relative">
        <CardBody className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 text-center md:text-left max-w-xl relative z-10">
            <Chip className="bg-[#ffd000] text-[#575756] font-black uppercase tracking-widest text-xs">
              Tu Impacto del Día 🌟
            </Chip>
            <h2 className="text-3xl font-black text-white leading-tight">
              Guía a las familias del Plan Semilla y recibe grandes recompensas
            </h2>
            <p className="text-blue-100 font-medium text-sm md:text-base">
              Al orientar a <strong>2 prospectos amarillos</strong> para que mejoren su ahorro, el sistema te premiará liberando <strong>1 Lead Verde Prioritario</strong> directo para cierre y firma.
            </p>
          </div>

          {/* Progreso Visual de la Racha (Más suave) */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 w-full md:w-80 space-y-4 flex-shrink-0 z-10 shadow-lg">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-slate-100">Progreso de Desbloqueo</span>
              <span className="text-[#ffd000] text-xl font-black">{amarillosContactados} / {metaAmarillos}</span>
            </div>

            <Progress
              value={(amarillosContactados / metaAmarillos) * 100}
              color="warning"
              className="h-4"
              radius="full"
            />

            <p className="text-xs text-blue-100 text-center font-medium leading-relaxed">
              {amarillosContactados === 0 && "Inicia llamando a 2 prospectos amarillos para ganar tu primer premio verde."}
              {amarillosContactados === 1 && "¡Genial! Solo te falta guiar a 1 familia más para desbloquear un súper cierre."}
            </p>
          </div>
        </CardBody>
      </Card>

      {/* Muestras Estadísticas con mensajes cálidos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card className="border-t-4 border-amber-400 p-2 shadow-sm rounded-2xl hover:shadow-md transition-shadow">
          <CardBody className="text-center">
            <span className="text-3xl mb-2">🌱</span>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Familias por Nutrir</p>
            <h3 className="text-3xl font-black text-amber-500 my-1">2 Leads</h3>
            <p className="text-xs text-slate-400 font-medium">Suman +50 pts a tu meta</p>
          </CardBody>
        </Card>

        <Card className="border-t-4 border-emerald-400 p-2 shadow-sm rounded-2xl hover:shadow-md transition-shadow">
          <CardBody className="text-center">
            <span className="text-3xl mb-2">🔑</span>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Cierres Liberados</p>
            <h3 className="text-3xl font-black text-emerald-500 my-1">
              {leads.filter((l) => l.status === "verde" && !l.bloqueado).length} Disponibles
            </h3>
            <p className="text-xs text-slate-400 font-medium">Listos para que entregues llaves</p>
          </CardBody>
        </Card>

        <Card className="border-t-4 border-slate-300 p-2 shadow-sm rounded-2xl bg-slate-50">
          <CardBody className="text-center opacity-80">
            <span className="text-3xl mb-2">🎁</span>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Premios Ocultos</p>
            <h3 className="text-3xl font-black text-slate-500 my-1">
              {leads.filter((l) => l.status === "verde" && l.bloqueado).length} Prospectos
            </h3>
            <p className="text-xs text-slate-400 font-medium">Completa la racha para revelarlos</p>
          </CardBody>
        </Card>
      </div>

      {/* Tabla de Gestión */}
      <Card className="p-4 md:p-6 rounded-3xl shadow-md border border-slate-100 bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-black text-[#575756] tracking-tight">
              Acompañamiento a Familias
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Tu gestión de hoy transforma vidas. ¿A quién llamaremos primero?
            </p>
          </div>
          <Input
            placeholder="Buscar por nombre o proyecto..."
            className="w-full sm:w-72"
            variant="flat"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>

        <Table aria-label="Tabla de gestión de leads" className="min-w-full" removeWrapper>
          <TableHeader>
            <TableColumn className="bg-slate-50 text-slate-500">PROSPECTO</TableColumn>
            <TableColumn className="bg-slate-50 text-slate-500">PROYECTO IDEAL</TableColumn>
            <TableColumn className="bg-slate-50 text-slate-500">PUNTAJE</TableColumn>
            <TableColumn className="bg-slate-50 text-slate-500">ESTADO ACTUAL</TableColumn>
            <TableColumn className="bg-slate-50 text-slate-500">ACCIÓN</TableColumn>
          </TableHeader>
          <TableBody>
            {leadsFiltrados.map((lead) => (
              <TableRow key={lead.id} className={lead.bloqueado ? "opacity-50" : "hover:bg-blue-50/30 transition-colors"}>
                <TableCell>
                  <div className="py-2">
                    <p className="font-extrabold text-slate-700 text-base">
                      {lead.bloqueado ? "🎁 Familia Sorpresa (Bloqueada)" : lead.nombre}
                    </p>
                    <p className="text-xs text-slate-400 font-medium">
                      {lead.bloqueado ? "Atiende a 2 amarillos para revelar su nombre" : `Trabaja en: ${lead.empresa}`}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="font-bold text-[#0067b1]">{lead.proyecto}</TableCell>
                <TableCell className="font-black text-slate-600 text-lg">{lead.score} pts</TableCell>
                <TableCell>
                  {lead.bloqueado ? (
                    <Chip size="sm" className="font-bold bg-slate-200 text-slate-500 px-3">
                      🔒 Oculto
                    </Chip>
                  ) : (
                    <Chip
                      size="sm"
                      className={`font-extrabold px-3 shadow-sm text-white ${
                        lead.status === "verde" ? "bg-emerald-500" : lead.status === "amarillo" ? "bg-amber-500" : "bg-red-400"
                      }`}
                    >
                      {lead.status === "verde" ? "❤️ Listo para Cierre" : lead.status === "amarillo" ? "🌱 Plan Semilla" : "Nutrición"}
                    </Chip>
                  )}
                </TableCell>
                <TableCell>
                  {lead.bloqueado ? (
                    <Tooltip content="Faltan llamadas a prospectos Amarillos para desbloquear a esta familia" placement="left">
                      <Button size="sm" className="bg-slate-100 text-slate-400 font-bold cursor-not-allowed border border-slate-200">
                        Bloqueado
                      </Button>
                    </Tooltip>
                  ) : lead.contactado ? (
                    <Chip size="sm" color="success" variant="flat" className="font-bold border border-emerald-200">
                      ✅ Contactado
                    </Chip>
                  ) : (
                    <Button
                      size="sm"
                      className={`font-extrabold text-white shadow-md transition-transform active:scale-95 ${
                        lead.status === "amarillo"
                          ? "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 animate-pulse"
                          : "bg-gradient-to-r from-[#0067b1] to-blue-500 hover:from-[#00528f]"
                      }`}
                      onClick={() => handleAbrirGestion(lead)}
                    >
                      {lead.status === "amarillo" ? "🤝 Ayudar (+50 pts)" : "📞 Llamar Ahora"}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Modal de Gestión de Llamada - Tono Consultivo */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" className="rounded-3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-[#0067b1] font-black text-xl pt-8 px-8">
                Registro de Acompañamiento
              </ModalHeader>
              <ModalBody className="px-8 pb-4">
                {leadActivo && (
                  <div className="space-y-5">
                    <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Familia a contactar</p>
                      <h4 className="text-2xl font-black text-slate-700">{leadActivo.nombre}</h4>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xl">📱</span>
                        <p className="text-lg text-[#0067b1] font-extrabold">{leadActivo.telefono}</p>
                      </div>
                    </div>

                    <div className="space-y-1 px-1">
                      <p className="text-sm font-bold text-slate-500">Sueñan con vivir en:</p>
                      <p className="text-lg font-black text-slate-700">{leadActivo.proyecto}</p>
                    </div>

                    {leadActivo.status === "amarillo" && (
                      <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-amber-800 space-y-2 shadow-inner">
                        <p className="font-black text-sm flex items-center gap-2">
                          <span>💡</span> Tip para tu llamada:
                        </p>
                        <p className="text-sm font-medium leading-relaxed">
                          Felicítalos por haber dado el primer paso. Cuéntales que estructurando su ahorro programado hoy, asegurarán el precio de su vivienda en pocos meses.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </ModalBody>
              <ModalFooter className="px-8 pb-8 flex-col sm:flex-row gap-3">
                <Button color="danger" variant="light" onPress={onClose} className="font-bold w-full sm:w-auto">
                  Dejar para después
                </Button>
                <Button
                  className="bg-gradient-to-r from-[#0067b1] to-blue-500 text-white font-black shadow-lg w-full sm:w-auto"
                  onPress={handleRegistrarContacto}
                >
                  Registrar Gestión y Ganar Puntos
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </main>
  );
}