"use client";

import { NextUIProvider } from "@nextui-org/react";
import { LeadProvider } from "@/context/LeadContext";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <LeadProvider>
        {children}
      </LeadProvider>
    </NextUIProvider>
  );
}