"""
API de Scoring — Vivienda 7x
Sirve el modelo de ML vía FastAPI (optimizado para Serverless / Vercel).
"""
import pickle
import math
import os
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Vivienda 7x Scoring API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://vivienda-7x.vercel.app", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Carga del modelo segura para Serverless (Lazy Loading) ===
model_data = None

def get_model_data():
    global model_data
    if model_data is None:
        try:
            base = os.path.dirname(os.path.abspath(__file__))
            path = os.path.join(base, "data", "modelo_scoring.pkl")
            
            if not os.path.exists(path):
                raise FileNotFoundError(f"No se encontró el archivo del modelo en: {path}")
                
            with open(path, "rb") as f:
                model_data = pickle.load(f)
            print(f"Modelo cargado exitosamente: {model_data.get('nombre', 'Desconocido')}")
        except Exception as e:
            print(f"Error crítico cargando el modelo: {str(e)}")
            raise e
    return model_data


# === Proyectos del PDF (21) ===
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
    {"id": 21, "nombre": "Municipios Sur", "ubicacion": "Municipios Sur", "vlr_min": 145_000_000, "vlr_max": 195_000_000, "vlr_m": 170_000_000},
]


# === Endpoints ===
@app.get("/api/proyectos")
def get_proyectos():
    return PROYECTOS


class ScoreRequest(BaseModel):
    Afiliacion: str          # "Afiliado" | "No_Afiliado"
    Rango_Edad: str          # "20-35" | "36-45" | "46-55" | "55+" | "<19"
    Personas_a_Cargo: int    # 0-10
    Segmento_Caja: str       # "Joven" | "Basico" | "Medio" | "Alto"
    Segmento_Familia: str    # "Sin Grupo" | "Pareja Conyugal" | "Nuclear Integrada" | "Ampliada"
    Piramide_Empresas: str   # "TAU" | "GAMMA" | "RHO" | "NU" | "ZETA" | "ALPHA" | "IOTA" | "ETA" | "XI"
    Proyecto: str            # nombre del proyecto
    Valor_Vivienda: float    # COP
    Entidad_Financiera: str  # "Banco" | "Colsubsidio" | "Contado"


@app.post("/api/score")
def score_lead(req: ScoreRequest):
    try:
        data = get_model_data()
        modelo = data["modelo"]

        X = pd.DataFrame([{
            "Afiliacion": req.Afiliacion,
            "Rango_Edad": req.Rango_Edad,
            "Personas_a_Cargo": req.Personas_a_Cargo,
            "Segmento_Caja": req.Segmento_Caja,
            "Segmento_Familia": req.Segmento_Familia,
            "Piramide_Empresas": req.Piramide_Empresas,
            "Proyecto": req.Proyecto,
            "Valor_Vivienda": req.Valor_Vivienda,
            "Entidad_Financiera": req.Entidad_Financiera,
        }])

        proba = modelo.predict_proba(X)[0]
        p_compra = float(proba[0])
        
        calibrated = 1 / (1 + math.exp(-8 * (p_compra - 0.85)))
        score = round(calibrated, 4)

        semaforo = "VERDE" if score >= 0.70 else ("AMARILLO" if score >= 0.55 else "ROJO")

        return {"score": score, "semaforo": semaforo}

    except Exception as e:
        import traceback
        error_detallado = traceback.format_exc()
        print(f"ERROR CRITICO EN /api/score: {error_detallado}")
        # Esto enviará el error exacto a tu navegador para verlo de inmediato
        return {"error": str(e), "detalle": error_detallado}, 500


@app.post("/api/score/batch")
def score_batch(req: BatchScoreRequest):
    try:
        data = get_model_data()
        modelo = data["modelo"]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al cargar el modelo: {str(e)}")

    rows = []
    for lead in req.leads:
        rows.append({
            "Afiliacion": lead.Afiliacion,
            "Rango_Edad": lead.Rango_Edad,
            "Personas_a_Cargo": lead.Personas_a_Cargo,
            "Segmento_Caja": lead.Segmento_Caja,
            "Segmento_Familia": lead.Segmento_Familia,
            "Piramide_Empresas": lead.Piramide_Empresas,
            "Proyecto": lead.Proyecto,
            "Valor_Vivienda": lead.Valor_Vivienda,
            "Entidad_Financiera": lead.Entidad_Financiera,
        })

    X = pd.DataFrame(rows)
    probas = modelo.predict_proba(X)[:, 0]

    results = []
    for prob in probas:
        raw = float(prob)
        calibrated = 1 / (1 + math.exp(-8 * (raw - 0.85)))
        score = round(calibrated, 4)
        if score >= 0.70:
            sem = "VERDE"
        elif score >= 0.55:
            sem = "AMARILLO"
        else:
            sem = "ROJO"
        results.append({"score": score, "semaforo": sem})

    return {"results": results}


@app.get("/api/health")
def health():
    try:
        data = get_model_data()
        model_name = data.get("nombre") if data else None
        features = data.get("features") if data else None
    except Exception:
        model_name = None
        features = None

    return {
        "status": "ok",
        "model": model_name,
        "features": features,
    }