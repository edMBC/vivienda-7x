import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zscykiolqjxpaksbabbt.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzY3lraW9scWp4cGFrc2JhYmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MjU0NjEsImV4cCI6MjA5NjAwMTQ2MX0.vGVWC7aYCoE3xAZs5BDqfin-KZiZbEYTR3YCTqK1uF8";

export const supabase = createClient(supabaseUrl, supabaseKey);

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
  created_at: string;
}

export async function findLeadByDocumento(documento: string): Promise<LeadRecord | null> {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("documento", documento)
    .single();

  if (error || !data) return null;
  return data as LeadRecord;
}

export async function getAllLeads(): Promise<LeadRecord[]> {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as LeadRecord[];
}

export async function updateLeadScore(
  documento: string,
  score: number,
  semaforo: string
): Promise<void> {
  await supabase
    .from("leads")
    .update({ score, semaforo })
    .eq("documento", documento);
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
