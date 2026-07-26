# Vivienda 7x — Ecosistema Inteligente de Asignación Habitacional

Un sistema de **scoring inteligente** y gamificado diseñado para conectar a los ciudadanos con su vivienda ideal en menos de 2 minutos. Creado para la Hackathon Colsubsidio 2026.

---

## 1. El Problema

Colsubsidio Vivienda cuenta con **21 proyectos de vivienda** y múltiples perfiles de afiliados, pero el proceso actual de asignación habitacional es manual y subjetivo. Los asesores comerciales no cuentan con una herramienta predictiva en tiempo real que les indique qué vivienda es la más viable para cada perfil, lo que genera:

- Tiempos prolongados de asesoría por cliente.
- Asignaciones que no hacen "match" con la realidad financiera del afiliado.
- Pérdida de oportunidades de cierre comercial por falta de datos estructurados.

---

## 2. La Solución

**Vivienda 7x** resuelve esto combinando un modelo predictivo de **Machine Learning** con una experiencia de usuario (UX) **gamificada e inmersiva**. El sistema evalúa el perfil del prospecto en milisegundos y le sugiere un *Top 7* de proyectos viables bajo un sistema de semaforización.

### Beneficios Clave
- **Match Inmediato:** Cruce de 9 variables sociodemográficas y financieras con las características de 21 proyectos.
- **Semaforización de Viabilidad:** Clasifica prospectos en Verdes (Cierres), Amarillos (Semillas/Ahorro) y Rojos (Incubación).
- **Gamificación para Asesores:** Sistema de recompensas en el CRM donde contactar a 2 leads en estado "Amarillo" desbloquea automáticamente un lead en estado "Verde".

---

## 3. Estructuras de Flujo

El ecosistema se divide en 3 rutas principales interconectadas:

### 3.1. Flujo para Afiliados (Rápido)
1. **Validación:** El usuario ingresa su documento en la landing page.
2. **Cruce BD:** El sistema consulta la base de afiliados en Supabase.
3. **Auto-completado:** Se extraen automáticamente 7 *features* clave (Edad, Personas a cargo, Segmento Caja, Segmento Familia, etc.).
4. **Scoring y Match:** El motor ML evalúa las 21 viviendas y devuelve las opciones ordenadas por viabilidad.
5. **Captura:** El usuario escoge su proyecto y el *Lead* ingresa al CRM del asesor.

### 3.2. Flujo para No Afiliados (Gamificado)
1. **Viaje Digital:** El usuario recorre 8 "Estaciones" interactivas (Nombre, Ingresos, Edad, Núcleo Familiar, Tipo de Ahorro, Zona preferida).
2. **Micro-interacciones:** Selección mediante *flashcards* animadas que suman puntos de experiencia virtual.
3. **Scoring:** Al finalizar, el motor ML procesa los datos ingresados manualmente.
4. **Conversión:** Se muestra el Top 7 de proyectos y se captura el *Lead* para la sala de ventas.

### 3.3. Dashboard del Asesor (CRM Operativo)
1. **Tablero Táctico:** Visualización de Leads filtrados por el algoritmo (App vs Afiliados).
2. **Semáforo de Gestión:**
   - 🟢 **VERDE (≥ 70%):** Alta viabilidad → Entregar llaves y firma.
   - 🟡 **AMARILLO (55% - 69%):** Viabilidad media → Madurar ahorro por WhatsApp.
   - 🔴 **ROJO (< 55%):** Baja viabilidad → Activar Agente IA / Incubar prospecto.
3. **Acción Directa:** Integración nativa con WhatsApp con mensajes pre-redactados y registro de acompañamiento automático.

---

## 4. Motor de Machine Learning

El cerebro del sistema es un modelo de clasificación calibrado para operaciones financieras de vivienda de interés social (VIS).

- **Algoritmo:** GradientBoosting Classifier (`scikit-learn`).
- **Target:** Compra efectiva de vivienda (1 = compró, 0 = no compró).
- **Métrica de Precisión:** ROC-AUC = **0.742**.
- **Calibración Analítica:** Función Sigmoid (`score = 1 / (1 + exp(-8 * (raw - 0.85)))`).
- **Tiempo de Inferencia:** < 50ms por Lead.

### Features de Entrada (9 Variables)
1. Afiliación (Afiliado / No Afiliado)
2. Rango de Edad
3. Personas a Cargo
4. Segmento Caja (Joven / Medio / Básico)
5. Segmento Familia (Sin Grupo / Pareja / Nuclear / Ampliada)
6. Pirámide de Empresas (TAU / GAMMA / Independiente)
7. Proyecto Objetivo (21 opciones)
8. Valor de la Vivienda (COP)
9. Entidad Financiera

---

## 5. Arquitectura Técnica

El stack tecnológico está orientado al alto rendimiento y despliegue continuo (Serverless).

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript.
- **Estilos & UI:** Tailwind CSS 4, NextUI 2, Framer Motion.
- **Backend / ML API:** Python, FastAPI, Pandas, Numpy.
- **Base de Datos:** Supabase (PostgreSQL) para persistencia de Leads y perfiles.
- **Package Manager:** pnpm.

---

## 6. Configuración y Despliegue Local

### Requisitos
- Node.js 18+
- pnpm instalado (`npm install -g pnpm`)
- Python 3.9+
- Proyecto en Supabase configurado.

### Instalación

1. **Clonar el repositorio:**
```bash
git clone [https://github.com/tu-usuario/frontend-7x.git](https://github.com/tu-usuario/frontend-7x.git)
cd frontend-7x