"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import HeaderGamificacion from "@/components/gamificacion/HeaderGamificacion";
import EstacionCard from "@/components/gamificacion/EstacionCard";
import MapaProgreso from "@/components/gamificacion/MapaProgreso";
import { Estacion, DimensionJuego } from "@/types/gamificacion";

export default function FlujoNoAfiliados() {
  const router = useRouter();

  const [datosJugador, setDatosJugador] = useState({
    rangoSalarial: "",
    rangoEdad: "",
    personasCargo: "",
    tipoAhorro: "",
    ubicacion: ""
  });

  const [esRutaRescate, setEsRutaRescate] = useState(false);

  const dimensiones: DimensionJuego[] = [
    {
      id: 0,
      categoria: "intro",
      titulo: "Comenzar Viaje",
      subtitulo: "Camino a casa",
      narrativa: "¡Hola! Queremos conocer tu historia para diseñar la combinación financiera y el hogar ideal para ti. ¿Empezamos el viaje?",
      opciones: [{ id: "i1", valor: "start", etiqueta: "Iniciar el Recorrido", descripcion: "", puntos: 0 }]
    },
    {
      id: 1,
      categoria: "rangoSalarial",
      titulo: "Ingresos",
      subtitulo: "Cimientos",
      narrativa: "Todo gran proyecto necesita una base sólida. Cuéntanos cuál es tu rango de ingresos para calcular tus subsidios de ley.",
      opciones: [
        { id: "s1", valor: "<= 2 SMMLV", etiqueta: "Nivel 1", descripcion: "Ingresos familiares hasta 2 salarios mínimos", puntos: 50 },
        { id: "s2", valor: "2 a 4 SMMLV", etiqueta: "Nivel 2", descripcion: "Ingresos familiares entre 2 y 4 salarios mínimos", puntos: 50 },
        { id: "s3", valor: "> 4 SMMLV", etiqueta: "Nivel 3", descripcion: "Ingresos familiares superiores a 4 salarios mínimos", puntos: 50 }
      ]
    },
    {
      id: 2,
      categoria: "rangoEdad",
      titulo: "Edad",
      subtitulo: "Estructura",
      narrativa: "Tu momento de vida nos ayuda a ajustar los plazos ideales de tu crédito de vivienda. ¿En qué rango te encuentras?",
      opciones: [
        { id: "e1", valor: "20 a 35", etiqueta: "Joven", descripcion: "Tengo entre 20 y 35 años de edad", puntos: 50 },
        { id: "e2", valor: "36 a 45", etiqueta: "Consolidado", descripcion: "Tengo entre 36 y 45 años de edad", puntos: 50 },
        { id: "e3", valor: "46 o más", etiqueta: "Maduro", descripcion: "Tengo 46 años o más de edad", puntos: 50 }
      ]
    },
    {
      id: 3,
      categoria: "personasCargo",
      titulo: "Núcleo",
      subtitulo: "Distribución",
      narrativa: "Los subsidios PAC priorizan los hogares consolidados. ¿Cuántas personas conformarán tu nuevo espacio?",
      opciones: [
        { id: "f1", valor: "0", etiqueta: "Individual", descripcion: "Viviré solo o no poseo dependientes en mi núcleo", puntos: 50 },
        { id: "f2", valor: "1 a 2", etiqueta: "Medio", descripcion: "Tengo 1 o 2 personas a cargo en mi grupo", puntos: 50 },
        { id: "f3", valor: "3 o más", etiqueta: "Familiar", descripcion: "Tengo 3 o más personas a cargo en mi hogar", puntos: 50 }
      ]
    },
    {
      id: 4,
      categoria: "tipoAhorro",
      titulo: "Ahorro",
      subtitulo: "Capital",
      narrativa: "El ahorro es el motor que asegura tu inmueble. Cuéntanos qué respaldo tienes acumulado al día de hoy.",
      opciones: [
        { id: "a1", valor: "Sin Ahorro", etiqueta: "Plan Semilla", descripcion: "No tengo ahorros y quiero iniciar desde cero", puntos: 50 },
        { id: "a2", valor: "Cesantías", etiqueta: "Respaldo", descripcion: "Tengo fondos guardados en mis cesantías", puntos: 50 },
        { id: "a3", valor: "Ahorro Programado", etiqueta: "Asegurado", descripcion: "Tengo una cuenta activa de ahorro para vivienda", puntos: 50 }
      ]
    },
    {
      id: 5,
      categoria: "ubicacion",
      titulo: "Zona",
      subtitulo: "Techo",
      narrativa: "¡Último paso! Elige el entorno regional donde te gustaría ver materializada la entrega de tus llaves.",
      opciones: [
        { id: "u1", valor: "Bogotá", etiqueta: "Bogotá", descripcion: "Localidades dentro del perímetro de la capital", puntos: 50 },
        { id: "u2", valor: "Norte", etiqueta: "Zona Norte", descripcion: "Proyectos en Chía, Cajicá o Zipaquirá", puntos: 50 },
        { id: "u3", valor: "Sur", etiqueta: "Zona Sur", descripcion: "Proyectos en Soacha, Ricaurte o Girardot", puntos: 50 }
      ]
    }
  ];

  const [estaciones, setEstaciones] = useState<Estacion[]>([
    { id: 1, completada: false },
    { id: 2, completada: false },
    { id: 3, completada: false },
    { id: 4, completada: false },
    { id: 5, completada: false }
  ]);

  const seleccionarCarta = (categoria: string, valor: string) => {
    if (categoria === "intro") return;

    if (categoria === "rangoSalarial" && valor === "> 4 SMMLV") {
      setEsRutaRescate(true);
      return;
    }

    setDatosJugador(prev => ({ ...prev, [categoria]: valor }));

    setEstaciones(prev => prev.map((e, idx) => {
      if (categoria === "rangoSalarial" && idx === 0) return { ...e, completada: true };
      if (categoria === "rangoEdad" && idx === 1) return { ...e, completada: true };
      if (categoria === "personasCargo" && idx === 2) return { ...e, completada: true };
      if (categoria === "tipoAhorro" && idx === 3) return { ...e, completada: true };
      if (categoria === "ubicacion" && idx === 4) return { ...e, completada: true };
      return e;
    }));
  };

  const progresoTotal = (estaciones.filter((e) => e.completada).length / estaciones.length) * 100;
  const puntosAcumulados = estaciones.filter((e) => e.completada).length * 50;

  return (
    <main className="min-h-screen bg-slate-50 p-4 flex flex-col justify-between w-full overflow-x-hidden space-y-4">
      <HeaderGamificacion puntosAcumulados={puntosAcumulados} progresoTotal={progresoTotal} />

      <div className="flex-grow flex items-center justify-center py-1">
        <EstacionCard 
          dimensiones={dimensiones}
          datosJugador={datosJugador}
          esRutaRescate={esRutaRescate}
          onSeleccionarCarta={seleccionarCarta}
          onFinalizarConstruccion={() => router.push("/afiliado/simulador")}
        />
      </div>

      <MapaProgreso estaciones={estaciones} />

      <footer className="text-center text-[9px] text-slate-400 w-full pt-1">
        Ecosistema Digital de Vivienda Colsubsidio — Equipo 7x
      </footer>
    </main>
  );
}