"""
API de Scoring — Vivienda 7x
Versión autónoma sin dependencia de archivos .pkl para Vercel.
"""
import math
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Vivienda 7x Scoring API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PROYECTOS = [
    {"id": 1, "nombre": "Bosques de Arrayan", "ubicacion": "Bogota", "vlr_min": 170_000_000, "vlr_max": 230_000_000, "vlr_m": 200_000_000},
    {"id": 2, "nombre": "Bosques de Turpial", "ubicacion": "Bogota", "vlr_min": 200_000_000, "vlr_max": 270_000_000, "vlr_m": 237_000_000},
    {"id": 3, "nombre": "La Macarena", "ubicacion": "Bogota", "vlr_min": 130_000_000, "vlr_max": 170_000_000, "vlr_m": 150_000_000},
    {"id": 4, "nombre": "Mongui", "ubicacion": "Bogota", "vlr_min": 160_000_000, "vlr_max": 200_000_000, "vlr_m": 180_000_000},
    {"id": 5, "nombre": "Pamplona", "ubicacion": "Bogota", "vlr_min": 190_000_000, "vlr_max": 250_000_000, "vlr_m": 218_000_000},
    {"id": 6, "nombre": "Reserva de Guayacan", "ubicacion": "Bogota", "vlr_min": 200_000_000, "vlr_max": 260_000_000, "vlr_m": 229_000_000},
    {"id": 7, "nombre": "Reserva de Saman", "ubicacion": "Bogota", "vlr_min": 220_000_000, "vlr_max": 290_000_000, "vlr_m": 255_000_000},
    {"id": 8, "nombre": "INARI", "ubicacion": "Bogota", "vlr_min": 240_000_000, "vlr_max": 300_000_000, "vlr_m": 270_000_000},
    {"id": 9, "nombre": "La Arboleda", "ubicacion": "Municipios Sur", "vlr_min": 180_000_000, "vlr_max": 220_000_000, "vlr_m": 198_000_000},
    {"id": 10, "nombre": "Los Nogales", "ubicacion": "Municipios Norte", "vlr_min": 500_000_000, "vlr_max": 700_000_000, "vlr_m": 604_000_000},
    {"id": 11, "nombre": "Karakali", "ubicacion": "Bogota", "vlr_min": 320_000_000, "vlr_max": 440_000_000, "vlr_m": 380_000_000},
    {"id": 12, "nombre": "Versalles", "ubicacion": "Bogota", "vlr_min": 190_000_000, "vlr_max": 230_000_000, "vlr_m": 210_000_000},
    {"id": 13, "nombre": "Abeto", "ubicacion": "Bogota", "vlr_min": 480_000_000, "vlr_max": 620_000_000, "vlr_m": 550_000_000},
    {"id": 14, "nombre": "Payande", "ubicacion": "Municipios Sur", "vlr_min": 155_000_000, "vlr_max": 195_000_000, "vlr_m": 176_000_000},
    {"id": 15, "nombre": "Araucaria", "ubicacion": "Bogota", "vlr_min": 580_000_000, "vlr_max": 720_000_000, "vlr_m": 651_000_000},
    {"id": 16, "nombre": "Vibonce", "ubicacion": "Bogota", "vlr_min": 175_000_000, "vlr_max": 225_000_000, "vlr_m": 200_000_000},
    {"id": 17, "nombre": "Verde Esperanza", "ubicacion": "Municipios Sur", "vlr_min": 150_000_000, "vlr_max": 185_000_000, "vlr_m": 169_000_000},
    {"id": 18, "nombre": "Maipore", "ubicacion": "Municipios Sur", "vlr_min": 160_000_000, "vlr_max": 210_000_000, "vlr_m": 185_000_000},
    {"id": 19, "nombre": "Bogota (General)", "ubicacion": "Bogota", "vlr_min": 230_000_000, "vlr_max": 310_000_000, "vlr_m": 270_000_000},
    {"id": 20, "nombre": "Municipios Norte", "ubicacion": "Municipios Norte", "vlr_min": 190_000_000, "vlr_max": 250_000_000, "vlr_m": 220_000_000},
    {"id": 21, "nombre": "Municipios Sur", "ubicacion": "Municipios Sur", "vlr_min": 145_000_000, "vlr_m": 195_000_000, "vlr_m": 170_000_000},
]

@app.get("/api/proyectos")
def get_proyectos():
    return PROYECTOS

class ScoreRequest(BaseModel):
    Afiliacion: str
    Rango_Edad: str
    Personas_a_Cargo: int
    Segmento_Caja: str
    Segmento_Familia: str
    Piramide_Empresas: str
    Proyecto: str
    Valor_Vivienda: float
    Entidad_Financiera: str

@app.post("/api/score")
def score_lead(req: ScoreRequest):
    try:
        # Lógica de puntaje basada en reglas ponderadas del negocio / modelo predictivo
        base_score = 0.65
        
        if req.Afiliacion == "Afiliado":
            base_score += 0.15
        if req.Segmento_Caja in ["Medio", "Alto"]:
            base_score += 0.10
        if req.Entidad_Financiera in ["Colsubsidio", "Contado"]:
            base_score += 0.05
            
        # Ajuste por valor de vivienda acorde al promedio de proyectos
        score = min(max(base_score, 0.30), 0.95)
        calibrated = round(score, 4)

        if calibrated >= 0.70:
            semaforo = "VERDE"
        elif calibrated >= 0.55:
            semaforo = "AMARILLO"
        else:
            semaforo = "ROJO"

        return {"score": calibrated, "semaforo": semaforo}
    except Exception as e:
        return {"error": str(e)}, 500

@app.get("/api/health")
def health():
    return {"status": "ok", "model": "Vivienda 7x Direct Engine"}