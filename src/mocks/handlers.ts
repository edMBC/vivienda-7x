import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/proyectos', () => {
    return HttpResponse.json([
      { id: 1, nombre: 'Bosques de Arrayán', ubicacion: 'Bogotá' },
      { id: 2, nombre: 'La Macarena', ubicacion: 'Bogotá' }
      // Aquí el equipo puede inyectar los 22 proyectos reales
    ]);
  }),
  
  http.post('/api/score', async ({ request }) => {
    const data = await request.json();
    // Simulación rápida de la ecuación de scoring
    const score = (data as any).isAfiliado ? 90 : 25;
    const status = score >= 75 ? 'verde' : 'rojo';
    
    return HttpResponse.json({ score, status });
  })
];