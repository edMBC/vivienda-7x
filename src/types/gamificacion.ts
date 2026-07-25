export interface OpcionCarta {
    id: string;
    valor: string;
    etiqueta: string;
    descripcion: string;
    puntos: number;
  }
  
  export interface DimensionJuego {
    id: number;
    categoria: "intro" | "rangoSalarial" | "rangoEdad" | "personasCargo" | "tipoAhorro" | "ubicacion" | "nombre" | "segmentoFamilia" | "piramideEmpresas";
    titulo: string;
    subtitulo: string;
    narrativa: string;
    opciones: OpcionCarta[];
  }
  
  export interface Estacion {
    id: number;
    completada: boolean;
  }
