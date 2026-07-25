"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface LeadData {
  leadId: string;
  nombre: string;
  isAfiliado: boolean | null;
  proyectoInteres: string;
  rangoSalarial: string;
  rangoEdad: string;
  pacSubsidios: number;
  marcaFoco: boolean;
  personasCargo: string;
  ahorro: string;
  segmentoFamilia: string;
  piramideEmpresas: string;
  segmentoCaja: string;
}

interface LeadContextType {
  lead: LeadData;
  updateLead: (newData: Partial<LeadData>) => void;
  resetLead: () => void;
}

const defaultLeadState: LeadData = {
  leadId: "",
  nombre: "",
  isAfiliado: null,
  proyectoInteres: "",
  rangoSalarial: "",
  rangoEdad: "",
  pacSubsidios: 1,
  marcaFoco: false,
  personasCargo: "0",
  ahorro: "",
  segmentoFamilia: "",
  piramideEmpresas: "",
  segmentoCaja: "",
};

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export function LeadProvider({ children }: { children: ReactNode }) {
  const [lead, setLead] = useState<LeadData>(defaultLeadState);

  const updateLead = (newData: Partial<LeadData>) => {
    setLead((prev) => {
      const updated = { ...prev, ...newData };
      if (!updated.leadId && updated.nombre) {
        updated.leadId = `APP-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      }
      return updated;
    });
  };

  const resetLead = () => {
    setLead(defaultLeadState);
  };

  return (
    <LeadContext.Provider value={{ lead, updateLead, resetLead }}>
      {children}
    </LeadContext.Provider>
  );
}

export function useLead() {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error("useLead debe ser usado dentro de un LeadProvider");
  }
  return context;
}
