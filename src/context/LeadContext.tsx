"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// 1. Definimos las variables matemáticas y de negocio que vamos a recolectar
interface LeadData {
  isAfiliado: boolean | null;
  proyectoInteres: string;
  rangoSalarial: string;
  pacSubsidios: number;
  marcaFoco: boolean;
  personasCargo: string;
  ahorro: string;
}

// 2. Definimos la estructura del Contexto
interface LeadContextType {
  lead: LeadData;
  updateLead: (newData: Partial<LeadData>) => void;
  resetLead: () => void;
}

// Valores por defecto al iniciar la app
const defaultLeadState: LeadData = {
  isAfiliado: null,
  proyectoInteres: "",
  rangoSalarial: "",
  pacSubsidios: 1,
  marcaFoco: false,
  personasCargo: "0",
  ahorro: "",
};

const LeadContext = createContext<LeadContextType | undefined>(undefined);

// 3. Proveedor del Contexto (Este envuelve a toda la app en layout.tsx)
export function LeadProvider({ children }: { children: ReactNode }) {
  const [lead, setLead] = useState<LeadData>(defaultLeadState);

  // Función para ir inyectando datos fase por fase sin borrar los anteriores
  const updateLead = (newData: Partial<LeadData>) => {
    setLead((prev) => ({ ...prev, ...newData }));
  };

  // Función para limpiar el estado al terminar el proceso
  const resetLead = () => {
    setLead(defaultLeadState);
  };

  return (
    <LeadContext.Provider value={{ lead, updateLead, resetLead }}>
      {children}
    </LeadContext.Provider>
  );
}

// 4. Hook personalizado para usar el contexto en cualquier página
export function useLead() {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error("useLead debe ser usado dentro de un LeadProvider");
  }
  return context;
}