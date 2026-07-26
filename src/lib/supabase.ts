import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface AfiliadoRecord {
  id: string;
  documento: string;
  nombre: string;
  rango_edad: string;
  personas_a_cargo: number;
  segmento_caja: string;
  segmento_familia: string;
  piramide_empresas: string;
}

export async function findAfiliadoByDocumento(documento: string): Promise<AfiliadoRecord | null> {
  const { data, error } = await supabase
    .from("afiliados")
    .select("*")
    .eq("documento", documento)
    .single();

  if (error || !data) return null;
  return data as AfiliadoRecord;
}

export interface LeadRecord {
  id: string;
  documento: string;
  nombre: string;
  afiliacion: string;
  rango_edad: string;
  personas_a_cargo: number;
  segmento_caja: string;
  segmento_familia: string;
  piramide_empresas: string;
  proyecto: string;
  valor_vivienda: number;
  entidad_financiera: string;
  score: number | null;
  semaforo: string | null;
  contactado: boolean;
  ultima_accion: string | null;
  created_at: string;
}

export async function getAllLeads(): Promise<LeadRecord[]> {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as LeadRecord[];
}

export interface SaveLeadParams {
  documento: string;
  nombre: string;
  afiliacion: string;
  rango_edad: string;
  personas_a_cargo: number;
  segmento_caja: string;
  segmento_familia: string;
  piramide_empresas: string;
  proyecto: string;
  valor_vivienda: number;
  entidad_financiera: string;
  score: number | null;
  semaforo: string | null;
}

export async function saveLead(params: SaveLeadParams): Promise<boolean> {
  const { error } = await supabase
    .from("leads")
    .upsert(params, { onConflict: "documento" });
  return !error;
}

export async function updateLeadGestion(
  documento: string,
  contactado: boolean,
  ultima_accion: string | null
): Promise<boolean> {
  const { error } = await supabase
    .from("leads")
    .update({ contactado, ultima_accion })
    .eq("documento", documento);
  return !error;
}
