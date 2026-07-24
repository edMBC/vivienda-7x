export interface OpcionCarta {
    id: string;
    valor: string;
    etiqueta: string;
    descripcion: string;
    puntos: number;
  }
  
  export interface DimensionJuego {
    id: number;
    categoria: "intro" | "rangoSalarial" | "rangoEdad" | "personasCargo" | "tipoAhorro" | "ubicacion";
    titulo: string;
    subtitulo: string;
    narrativa: string; // Frase cálida que guía el viaje
    opciones: OpcionCarta[];
  }
  
  export interface Estacion {
    id: number;
    completada: boolean;
  }