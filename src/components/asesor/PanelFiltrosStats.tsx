"use client";

interface Stats {
  total: number;
  desdeApp: number;
  verdes: number;
  amarillos: number;
  rojos: number;
}

interface PanelFiltrosStatsProps {
  stats: Stats;
  filtroEstado: string;
  setFiltroEstado: (filtro: "todos" | "amarillo" | "verde" | "rojo" | "app") => void;
  vistaModo: "lista" | "casillas";
  setVistaModo: (modo: "lista" | "casillas") => void;
}

export default function PanelFiltrosStats({ stats, filtroEstado, setFiltroEstado, vistaModo, setVistaModo }: PanelFiltrosStatsProps) {
  return (
    <div className="space-y-3.5 w-full">
      {/* Contadores Estadísticos Adaptables */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {[
          { label: "Total", val: stats.total, style: "bg-white border-slate-200 text-slate-800 col-span-2 sm:col-span-1" },
          { label: "📱 App", val: stats.desdeApp, style: "bg-purple-50 border-purple-200 text-purple-700" },
          { label: "Cierres", val: stats.verdes, style: "bg-emerald-50 border-emerald-200 text-emerald-700" },
          { label: "Semilla", val: stats.amarillos, style: "bg-amber-50 border-amber-200 text-amber-700" },
          { label: "Incubar", val: stats.rojos, style: "bg-red-50 border-red-200 text-red-700" },
        ].map((item, i) => (
          <div key={i} className={`p-3 rounded-2xl border backdrop-blur-md text-center shadow-sm ${item.style}`}>
            <p className="text-xl font-black leading-none">{item.val}</p>
            <p className="text-[9px] font-black uppercase tracking-wider mt-1.5 opacity-80">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Selector de Filtros y Agrupación */}
      <div className="flex flex-col lg:flex-row gap-3 w-full bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-center gap-1 flex-grow">
          {(["todos", "app", "amarillo", "verde", "rojo"] as const).map((tipo) => {
            const activeStyles: Record<string, string> = {
              todos: "bg-[#0067b1] text-white shadow-sm",
              app: "bg-purple-500 text-white shadow-sm",
              amarillo: "bg-amber-400 text-slate-900 shadow-sm",
              verde: "bg-emerald-500 text-white shadow-sm",
              rojo: "bg-red-500 text-white shadow-sm",
            };
            const etiquetas: Record<string, string> = {
              todos: "Todos", app: "App", amarillo: "Semilla", verde: "Verdes", rojo: "Rojos"
            };
            return (
              <button
                key={tipo}
                onClick={() => setFiltroEstado(tipo)}
                className={`py-2 px-2.5 rounded-xl text-[10px] uppercase tracking-wider font-extrabold transition-all text-center ${
                  filtroEstado === tipo ? activeStyles[tipo] : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                {etiquetas[tipo]}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 lg:w-44 justify-center w-full">
          <button 
            onClick={() => setVistaModo("lista")}
            className={`flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
              vistaModo === "lista" ? "bg-white text-[#0067b1] shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            📋 Filas
          </button>
          <button 
            onClick={() => setVistaModo("casillas")}
            className={`flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
              vistaModo === "casillas" ? "bg-white text-[#0067b1] shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            🔲 Grillas
          </button>
        </div>
      </div>
    </div>
  );
}