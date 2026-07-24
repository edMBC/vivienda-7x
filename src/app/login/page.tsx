"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, Button, Chip } from "@nextui-org/react";

// Imágenes reales de momentos de éxito: entrega de llaves, apretón de manos, familias felices
const IMAGENES_FONDO = [
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200", 
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200", 
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=1200", 
];

export default function LoginCommercial() {
  const router = useRouter();
  const [email, setEmail] = useState("asesor@colsubsidio.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  
  const [bgIndex, setBgIndex] = useState(0);
  const [saludo, setSaludo] = useState({ titulo: "¡Bienvenido, Asesor!", sub: "Ingresa al tablero de misiones." });

  // Carrusel suave de fondo
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % IMAGENES_FONDO.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Saludo inspiracional por franja horaria
  useEffect(() => {
    const hora = new Date().getHours();
    if (hora >= 5 && hora < 12) {
      setSaludo({
        titulo: "¡A conquistar la mañana, Asesor!",
        sub: "Cada acompañamiento de hoy acerca a una familia a sus llaves."
      });
    } else if (hora >= 12 && hora < 18) {
      setSaludo({
        titulo: "¡Avanza con fuerza, Asesor!",
        sub: "El tablero está activo. Vamos a cerrar la tarde con nuevos triunfos."
      });
    } else {
      setSaludo({
        titulo: "¡Excelente jornada, Asesor!",
        sub: "Consolida tus logros de hoy y prepara los cierres de mañana."
      });
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push("/asesor");
    }, 800);
  };

  return (
    <main className="min-h-screen bg-slate-900 flex flex-col lg:flex-row w-full overflow-x-hidden relative">
      
      {/* Background Emocional Dinámico */}
      <div 
        className="absolute inset-0 z-0 transition-all duration-1000 bg-cover bg-center" 
        style={{ backgroundImage: `url(${IMAGENES_FONDO[bgIndex]})` }} 
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-950/95 lg:bg-gradient-to-r lg:from-slate-950/95 lg:via-slate-900/85 lg:to-transparent pointer-events-none" />

      {/* Panel Izquierdo: Inspiración + Escalera de Reto y Recompensa */}
      <div className="w-full lg:w-5/12 flex flex-col justify-between p-6 sm:p-8 lg:p-12 text-white relative z-10 min-h-[40vh] lg:min-h-screen">
        
        <div className="space-y-4 lg:space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffd000] animate-pulse"></span>
            <span className="font-extrabold text-xs sm:text-sm tracking-widest uppercase opacity-90">
              Colsubsidio Vivienda
            </span>
          </div>

          <div className="space-y-2 lg:space-y-4">
            <div>
              <Chip className="bg-[#ffd000] text-[#575756] font-black uppercase tracking-widest text-[9px] sm:text-xs px-2.5 py-3 shadow-lg">
                Una llave, una familia.
              </Chip>
            </div>
            
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
              Tú abres puertas. <br className="hidden lg:inline" /> 
              <span className="text-[#ffd000]">El sistema te premia.</span>
            </h1>
            
            <p className="text-blue-100 text-xs sm:text-base leading-relaxed font-medium max-w-md opacity-90">
              Transforma la vida de familias y solteros. Guiar su traslado a nuestra Caja a clientes listos para firma.
            </p>
          </div>
        </div>

        {/* ESCALERA VISUAL DE RETO Y RECOMPENSA */}
        <div className="relative mt-6 lg:mt-0 bg-white/10 backdrop-blur-md border border-white/20 p-4 sm:p-5 rounded-2xl space-y-3">
          <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-blue-50">
            <span className="tracking-wide uppercase text-[10px] sm:text-xs">Escalera de Movilidad</span>
            <span className="text-[#ffd000] font-black bg-white/10 px-2 py-0.5 rounded-md text-[10px]">+150 Pts VIP</span>
          </div>

          {/* Gráfica de Escalones */}
          <div className="flex flex-col gap-2 py-1">
            
            {/* Escalón 1 */}
            <div className="flex items-center gap-3 bg-black/20 p-2 rounded-xl border border-white/10">
              <div className="w-6 h-6 rounded-lg bg-blue-500 font-black text-xs text-white flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div className="text-xs">
                <p className="font-extrabold text-slate-100">Paso 1: Acompaña la Movilidad</p>
                <p className="text-[10px] text-blue-200">Guía al prospecto a afiliarse a Colsubsidio.</p>
              </div>
            </div>

            {/* Escalón 2 */}
            <div className="flex items-center gap-3 bg-amber-500/20 p-2 rounded-xl border border-amber-400/40 translate-x-2">
              <div className="w-6 h-6 rounded-lg bg-[#ffd000] font-black text-xs text-slate-900 flex items-center justify-center flex-shrink-0 animate-pulse">
                2
              </div>
              <div className="text-xs">
                <p className="font-extrabold text-[#ffd000]">Paso 2: Suma Puntos de Racha</p>
                <p className="text-[10px] text-amber-100">Acumulas +50 pts por cada gestión efectiva.</p>
              </div>
            </div>

            {/* Escalón 3 */}
            <div className="flex items-center gap-3 bg-emerald-500/20 p-2 rounded-xl border border-emerald-400/40 translate-x-4">
              <div className="w-6 h-6 rounded-lg bg-emerald-500 font-black text-xs text-white flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                3
              </div>
              <div className="text-xs">
                <p className="font-extrabold text-emerald-400">Paso 3: ¡Desbloquea Cierre Verde!</p>
                <p className="text-[10px] text-emerald-100">El algoritmo te inyecta un lead prioritario listo para firma.</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Panel Derecho: Formulario Flotante de Acceso */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-4 sm:p-8 relative z-10 flex-grow">
        
        <div className="w-full max-w-sm space-y-4 sm:space-y-6 relative px-1 sm:px-0">
          
          {/* Header de Saludo */}
          <div className="text-center lg:text-left text-white space-y-1">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight drop-shadow-md">
              {saludo.titulo}
            </h2>
            <p className="text-xs text-slate-300 font-medium drop-shadow-sm">
              {saludo.sub}
            </p>
          </div>

          <Card className="w-full shadow-2xl border-t-6 border-[#0067b1] p-1 rounded-2xl bg-white/95 backdrop-blur-md">
            <CardBody className="p-4 sm:p-6">
              <form onSubmit={handleLogin} className="space-y-4">
                
                {/* Inputs Nativos sin Colisión de Textos */}
                <div className="space-y-3.5">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">
                      Correo Institucional
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 bg-slate-50 font-semibold text-slate-700 text-sm focus:border-[#0067b1] focus:bg-white outline-none transition-all"
                      required
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">
                      Contraseña
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 bg-slate-50 font-semibold text-slate-700 text-sm tracking-widest focus:border-[#0067b1] focus:bg-white outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full font-black text-white bg-gradient-to-r from-[#0067b1] to-[#00528f] hover:from-[#00528f] hover:to-blue-700 h-12 rounded-xl text-sm shadow-md transition-transform active:scale-95"
                    isLoading={loading}
                  >
                    Ingresar al Tablero de Misiones
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>

          <div className="text-center text-[10px] font-bold text-slate-300 drop-shadow-xs">
            Hackathon 2026 — Equipo 7x
          </div>

        </div>
      </div>

    </main>
  );
}