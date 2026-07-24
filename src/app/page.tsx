"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLead } from "@/context/LeadContext";
import { Button, Card, CardBody, Checkbox, useDisclosure } from "@nextui-org/react";
import TerminosModal from "@/components/TerminosModal";

export default function Home() {
  const router = useRouter();
  const { updateLead } = useLead();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [validationError, setValidationError] = useState("");

  const proyectoCercano = {
    nombre: "Bosques de Arrayán",
    macroZona: "Bogotá",
    descripcion: "El espacio donde tu familia escribirá su nueva historia.",
    imagenUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2000",
  };

  const handleSeleccionAfiliacion = (isAfiliado: boolean) => {
    if (!termsAccepted) {
      setValidationError("Es necesario aceptar los términos de tratamiento de datos para consultar tus beneficios.");
      return;
    }

    setValidationError("");
    updateLead({
      isAfiliado,
      proyectoInteres: proyectoCercano.nombre,
    });

    if (isAfiliado) {
      router.push("/afiliado/simulador");
    } else {
      router.push("/gamificacion");
    }
  };

  return (
    <main className="min-h-screen relative flex flex-col justify-between p-4 sm:p-6 lg:p-8 bg-slate-900">
      
      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 transform scale-105"
        style={{ backgroundImage: `url(${proyectoCercano.imagenUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 backdrop-blur-[2px]" />

      {/* Header Superior con Botón de Acceso Comercial */}
      <header className="relative z-20 w-full max-w-6xl mx-auto flex justify-between items-center py-2">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ffd000]"></span>
          <span className="text-white font-extrabold text-lg tracking-wide">
            Colsubsidio <span className="font-normal text-slate-300">Vivienda</span>
          </span>
        </div>
        
        <Button
          size="sm"
          variant="flat"
          className="bg-white/20 hover:bg-white/30 text-white font-semibold backdrop-blur-md border border-white/30"
          onClick={() => router.push("/login")}
        >
          🔐 Acceso Asesores
        </Button>
      </header>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto py-6">
        
        {/* Copy Emocional */}
        <div className="lg:col-span-6 text-white space-y-4 text-center lg:text-left px-2">
          <span className="inline-block bg-[#ffd000] text-[#575756] font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
            Tu Hogar Propio Empieza Aquí
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white tracking-tight">
            Cumple el sueño de tener tu <span className="text-[#ffd000]">propia casa</span>.
          </h1>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal max-w-md mx-auto lg:mx-0">
            En Colsubsidio te acompañamos a transformar tus ahorros y subsidios en las llaves de tu nuevo hogar.
          </p>
        </div>

        {/* Tarjeta de Decisión */}
        <div className="lg:col-span-6 w-full">
          <Card className="w-full bg-white/95 backdrop-blur-md shadow-2xl border-t-4 border-[#0067b1] p-2 sm:p-4 rounded-2xl">
            <CardBody className="gap-5">
              
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-[#0067b1] uppercase tracking-wider">
                    Ubicación Detectada: {proyectoCercano.macroZona}
                  </span>
                  <span className="text-[10px] font-semibold bg-blue-100 text-[#0067b1] px-2 py-0.5 rounded-md">
                    VIS
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-[#575756]">
                  {proyectoCercano.nombre}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {proyectoCercano.descripcion}
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-bold text-[#575756] text-center">
                  Para calcular tus beneficios y prioridad, dinos: <br />
                  <span className="text-[#0067b1]">¿Estás afiliado a Colsubsidio?</span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <Button
                    size="lg"
                    className="w-full font-bold text-white bg-[#0067b1] hover:bg-[#00528f] shadow-lg"
                    onClick={() => handleSeleccionAfiliacion(true)}
                  >
                    Sí, soy Afiliado
                  </Button>
                  
                  <Button
                    size="lg"
                    className="w-full font-bold text-[#575756] bg-[#ffd000] hover:bg-[#e5bc00] shadow-md"
                    onClick={() => handleSeleccionAfiliacion(false)}
                  >
                    No estoy Afiliado
                  </Button>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="flex items-start gap-2">
                  <Checkbox
                    isSelected={termsAccepted}
                    onValueChange={(checked) => {
                      setTermsAccepted(checked);
                      if (checked) setValidationError("");
                    }}
                    color="primary"
                    size="sm"
                    className="mt-0.5"
                  />
                  <label className="text-xs text-slate-600 leading-snug">
                    Acepto el tratamiento de mis datos personales.{" "}
                    <button
                      type="button"
                      onClick={onOpen}
                      className="text-[#0067b1] font-bold underline hover:text-[#004f88]"
                    >
                      Ver Términos y Condiciones
                    </button>
                  </label>
                </div>

                {validationError && (
                  <p className="text-xs text-red-600 font-medium pl-7">
                    {validationError}
                  </p>
                )}
              </div>

            </CardBody>
          </Card>
        </div>

      </div>

      <footer className="relative z-10 text-center text-xs text-slate-400 py-2">
        © 2026 Colsubsidio Vivienda — Equipo 7x
      </footer>

      <TerminosModal
        isOpen={isOpen}
        onClose={onClose}
        onAccept={() => setTermsAccepted(true)}
      />
    </main>
  );
}