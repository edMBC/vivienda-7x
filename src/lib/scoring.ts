const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export interface ScoreRequest {
  Afiliacion: string;
  Rango_Edad: string;
  Personas_a_Cargo: number;
  Segmento_Caja: string;
  Segmento_Familia: string;
  Piramide_Empresas: string;
  Proyecto: string;
  Valor_Vivienda: number;
  Entidad_Financiera: string;
}

export interface ScoreResponse {
  score: number;
  semaforo: "VERDE" | "AMARILLO" | "ROJO";
}

export interface Proyecto {
  id: number;
  nombre: string;
  ubicacion: string;
  vlr_min: number;
  vlr_max: number;
  vlr_m: number;
}

export function mapLeadToFeatures(lead: {
  isAfiliado: boolean;
  rangoEdad?: string;
  personasCargo: number;
  proyectoInteres: string;
  segmentoFamilia?: string;
  piramideEmpresas?: string;
  segmentoCaja?: string;
}): ScoreRequest {
  const isAfiliado = lead.isAfiliado;
  const rangoEdad = lead.rangoEdad || "36-45";
  const personasCargo = lead.personasCargo;
  const segmentoFamilia = lead.segmentoFamilia || deriveSegmentoFamilia(personasCargo);
  const piramideEmpresas = lead.piramideEmpresas || (isAfiliado ? "TAU" : "XI");
  const segmentoCaja = lead.segmentoCaja || deriveSegmentoCaja(isAfiliado, rangoEdad, personasCargo);

  return {
    Afiliacion: isAfiliado ? "Afiliado" : "No_Afiliado",
    Rango_Edad: rangoEdad,
    Personas_a_Cargo: personasCargo,
    Segmento_Caja: segmentoCaja,
    Segmento_Familia: segmentoFamilia,
    Piramide_Empresas: piramideEmpresas,
    Proyecto: lead.proyectoInteres || "Bosques de Arrayan",
    Valor_Vivienda: 200_000_000,
    Entidad_Financiera: isAfiliado ? "Colsubsidio" : "Banco",
  };
}

function deriveSegmentoFamilia(personasCargo: number): string {
  if (personasCargo === 0) return "Sin Grupo";
  if (personasCargo === 1) return "Pareja Conyugal";
  if (personasCargo === 2) return "Nuclear Integrada";
  return "Ampliada";
}

function deriveSegmentoCaja(isAfiliado: boolean, rangoEdad: string, personasCargo: number): string {
  if (!isAfiliado) return "Basico";
  if ((rangoEdad === "20-35") && personasCargo <= 1) return "Joven";
  if (rangoEdad === "36-45") return "Medio";
  return "Basico";
}

export async function scoreLead(features: ScoreRequest): Promise<ScoreResponse> {
  const res = await fetch(`${API_BASE}/api/score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(features),
  });
  if (!res.ok) throw new Error(`Score API error: ${res.status}`);
  return res.json();
}

export async function getProyectos(): Promise<Proyecto[]> {
  const res = await fetch(`${API_BASE}/api/proyectos`);
  if (!res.ok) throw new Error(`Proyectos API error: ${res.status}`);
  return res.json();
}

export async function scoreBatch(leads: ScoreRequest[]): Promise<ScoreResponse[]> {
  const res = await fetch(`${API_BASE}/api/score/batch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ leads }),
  });
  if (!res.ok) throw new Error(`Score batch API error: ${res.status}`);
  const data = await res.json();
  return data.results;
}
