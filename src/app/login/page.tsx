"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardHeader, Input, Button, Chip } from "@nextui-org/react";

export default function LoginCommercial() {
  const router = useRouter();
  const [email, setEmail] = useState("asesor@colsubsidio.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulación de autenticación directa
    setTimeout(() => {
      setLoading(false);
      router.push("/asesor");
    }, 800);
  };

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-2 shadow-xl border-t-4 border-[#0067b1]">
        <CardHeader className="flex flex-col items-center text-center space-y-2 pt-6">
          <Chip color="primary" variant="flat" className="font-bold text-[#0067b1]">
            Portal Comercial VIP
          </Chip>
          <h1 className="text-2xl font-extrabold text-[#575756]">
            Ingreso de Asesores
          </h1>
          <p className="text-xs text-slate-500">
            Accede al motor de asignación en tiempo real para gestión de salas de venta.
          </p>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              label="Correo Institucional"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              label="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              color="primary"
              size="lg"
              className="w-full font-bold bg-[#0067b1] mt-2 shadow-md"
              isLoading={loading}
            >
              Iniciar Sesión en el Dashboard
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            Demo Reto Vivienda — Credenciales pre-cargadas para pruebas.
          </div>
        </CardBody>
      </Card>
    </main>
  );
}