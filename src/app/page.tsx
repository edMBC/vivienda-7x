"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLead } from "@/context/LeadContext";
import { Button, Card, CardBody } from "@nextui-org/react";
import TerminosModal from "@/components/TerminosModal";

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

export default function Home() {
  const router = useRouter();
  const { updateLead } = useLead();
  
  const [modalAbierto, setModalAbierto] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [keyUnlocked, setKeyUnlocked] = useState(false);

  const proyectoCercano = {
    nombre: "Bosques de Arrayán",
    descripcion: "Espacios diseñados para que tu familia construya sus mejores recuerdos.",
    imagenUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2000",
  };

  const handleSeleccionAfiliacion = (isAfiliado: boolean) => {
    if (!termsAccepted) {
      setValidationError("Debes aceptar los términos para continuar.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    setValidationError("");
    updateLead({
      isAfiliado,
      proyectoInteres: proyectoCercano.nombre,
    });

    // Activar micro-animación de la llave antes de cambiar de ruta
    setKeyUnlocked(true);
    setTimeout(() => {
      if (isAfiliado) {
        router.push("/afiliado/simulador");
      } else {
        router.push("/gamificacion");
      }
    }, 600);
  };

  return (
    <main className="relative min-h-screen flex flex-col bg-slate-900 justify-between">
      
      {/* Imagen de Fondo Real y Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${proyectoCercano.imagenUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90 md:bg-gradient-to-r md:from-black/95 md:via-black/60 md:to-black/30 backdrop-blur-[1px] z-0" />

      {/* Header Superior */}
      <header className="relative z-20 w-full max-w-7xl mx-auto flex justify-between items-center p-4 sm:p-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffd000]"></span>
          <span className="text-white font-extrabold text-base sm:text-lg tracking-wide">
            Colsubsidio <span className="font-normal text-slate-300 hidden sm:inline">Vivienda</span>
          </span>
        </div>
        
        <Button
          size="sm"
          variant="faded"
          startContent={<ShieldIcon />}
          className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-md text-xs font-medium px-3"
          onClick={() => router.push("/login")}
        >
          Portal Asesores
        </Button>
      </header>

      {/* Layout de Contenido Principal (Estilo Compacto Mobile-First) */}
      <div className="relative z-10 flex-grow flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-8 gap-5 lg:gap-16">
        
        {/* Copy Emocional */}
        <div className="w-full lg:w-1/2 text-white space-y-2 sm:space-y-4 text-center lg:text-left">
          <span className="inline-block bg-[#ffd000] text-[#575756] font-black text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full uppercase tracking-widest shadow-md">
            Es hora de decir:
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-none text-white tracking-tight">
            Bienvenido <br className="hidden lg:inline"/> a <span className="text-[#ffd000]">casa</span>.
          </h1>
          <p className="text-slate-200 text-xs sm:text-base leading-relaxed font-medium max-w-sm mx-auto lg:mx-0 opacity-90">
            Descubre tus subsidios acumulados y proyectos ideales en una experiencia única en menos de 2 minutos.
          </p>
        </div>

        {/* Tarjeta Flotante Adaptativa */}
        <div className="w-full max-w-md lg:w-1/2">
          <Card className="w-full bg-white/95 backdrop-blur-xl shadow-2xl border-t-6 border-[#0067b1] p-1 sm:p-3 rounded-2xl overflow-hidden">
            <CardBody className="gap-3 p-3">
              
              {/* Flashcard con Imagen Real, Trazos Compactos y Micro-Animación de Llave */}
              <div className="relative rounded-xl overflow-hidden border border-slate-200/60 shadow-xs group aspect-[16/10] sm:aspect-[16/9]">
                {/* Render de la vivienda de fondo dentro de la flashcard */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${proyectoCercano.imagenUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-black/40" />

                {/* Contenido en la parte superior del mockup */}
                <div className="absolute top-2 left-2 right-2 flex justify-between items-center">
                  <span className="text-[9px] font-black text-[#575756] bg-[#ffd000] border border-amber-300 px-2 py-0.5 rounded-md shadow-sm uppercase tracking-wider">
                    Tu Match VIS
                  </span>
                  
                  {/* Micro-Indicador Inmersivo Compacto */}
                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md border border-white/20 px-2 py-0.5 rounded-full text-white">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-tight">En Vivo</span>
                  </div>
                </div>

                {/* Texto Inferior y Animación del Trazo de Llave */}
                <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between gap-4 text-white">
                  <div className="max-w-[75%]">
                    <h3 className="text-sm sm:text-base font-black tracking-tight leading-tight">
                      {proyectoCercano.nombre}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-200 font-medium line-clamp-1 opacity-90">
                      {proyectoCercano.descripcion}
                    </p>
                  </div>

                  {/* Icono de Llave / Candado con efecto de apertura interactivo */}
                  <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-lg border border-white/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-inner">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={2.5} 
                      stroke="currentColor" 
                      className={`w-4 h-4 text-[#ffd000] transition-transform duration-500 ${keyUnlocked ? "rotate-90 scale-110 text-emerald-400" : ""}`}
                    >
                      {keyUnlocked ? (
                        // Icono de Cerradura Abierta (Cierre Exitoso)
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h16.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      ) : (
                        // Icono de Llave Compacta (Listo para entrar)
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-.9.43-1.563A6 6 0 1121.75 8.25z" />
                      )}
                    </svg>
                  </div>
                </div>

              </div>

              {/* Botones de Selección */}
              <div className="space-y-2">
                <p className="text-[11px] sm:text-xs font-bold text-slate-500 text-center uppercase tracking-wider">
                  ¿Tienes afiliación activa a la caja?
                </p>

                <div className="grid grid-cols-1 gap-2">
                  <Button
                    size="lg"
                    className="w-full font-black text-white bg-[#0067b1] hover:bg-[#00528f] shadow-sm h-11 sm:h-12 rounded-xl text-sm transition-all"
                    onClick={() => handleSeleccionAfiliacion(true)}
                  >
                    Sí, soy Afiliado
                  </Button>
                  
                  <Button
                    size="lg"
                    className="w-full font-black text-[#575756] bg-slate-100 hover:bg-slate-200 border border-slate-200 h-11 sm:h-12 rounded-xl text-sm transition-all"
                    onClick={() => handleSeleccionAfiliacion(false)}
                  >
                    No estoy Afiliado
                  </Button>
                </div>
              </div>

              {/* UX de Términos y Condiciones */}
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-1.5">
                <div className="flex items-center gap-2.5">
                  
                  {/* Checkbox Customizado */}
                  <div className="relative flex items-center flex-shrink-0">
                    <input
                      type="checkbox"
                      id="terms-checkbox"
                      checked={termsAccepted}
                      onChange={(e) => {
                        setTermsAccepted(e.target.checked);
                        if (e.target.checked) setValidationError("");
                      }}
                      className="sr-only peer"
                    />
                    <div 
                      onClick={() => {
                        const nextState = !termsAccepted;
                        setTermsAccepted(nextState);
                        if (nextState) setValidationError("");
                      }}
                      className="w-4 h-4 border-2 border-slate-300 rounded flex items-center justify-center cursor-pointer transition-all peer-checked:bg-[#0067b1] peer-checked:border-[#0067b1]"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={3} 
                        stroke="currentColor" 
                        className={`w-2.5 h-2.5 text-white transition-opacity ${termsAccepted ? "opacity-100" : "opacity-0"}`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                  </div>

                  <div className="text-[10px] sm:text-xs text-slate-600 leading-tight font-medium select-none">
                    Acepto el tratamiento de datos.{" "}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setModalAbierto(true);
                      }}
                      className="text-[#0067b1] font-bold underline hover:text-[#004f88] inline-block cursor-pointer focus:outline-none"
                    >
                      Ver Términos y Condiciones
                    </button>
                  </div>
                </div>

                <div className="min-h-[14px]">
                  {validationError && (
                    <p className={`text-[10px] text-red-500 font-bold ml-6 transition-all ${isShaking ? 'translate-x-1' : ''}`}>
                      {validationError}
                    </p>
                  )}
                </div>
              </div>

            </CardBody>
          </Card>
        </div>

      </div>

      <footer className="relative z-20 text-center text-[10px] text-slate-400 py-2 w-full">
        © 2026 Colsubsidio Vivienda — Equipo 7x
      </footer>

      <TerminosModal 
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onAccept={() => {
          setTermsAccepted(true);
          setValidationError("");
        }}
      />

    </main>
  );
}