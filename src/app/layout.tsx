import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LeadProvider } from '@/context/LeadContext';
import { Providers } from '@/app/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vivienda 7x',
  description: 'Motor de Asignación y Scoring',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <LeadProvider>
          <Providers>
            {/* Aquí inicia el frontend centralizado */}
            {children}
          </Providers>
        </LeadProvider>
      </body>
    </html>
  );
}