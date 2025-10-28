from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import json
import os

# ============================================================
# 📘 CONFIGURAÇÕES BÁSICAS DO FASTAPI
# ============================================================

app = FastAPI(
    title="Astromean API",
    description="Backend para o app de Astrologia (planetas, signos, casas, energia etc.)",
    version="1.0.0"
)

# ============================================================
# 🌍 CONFIGURAR CORS (para comunicação com o frontend Flutter/React)
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # depois pode limitar ex: ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================
# 📂 FUNÇÃO AUXILIAR PARA LER OS ARQUIVOS JSON
# ============================================================

BASE_PATH = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_PATH, "data")

def load_json(file_name: str):
    file_path = os.path.join(DATA_PATH, file_name)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail=f"Arquivo {file_name} não encontrado.")
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)

# ============================================================
# 🪐 MODELOS Pydantic
# ============================================================

class Planet(BaseModel):
    id: int
    name: str
    description: str = ""
    element: str = ""
    image: str = ""
    distance_from_sun: float = 0.0

class Sign(BaseModel):
    id: int
    name: str
    element: str
    quality: str
    polarity: str
    date_range: str
    ruling_planet: str

class House(BaseModel):
    id: int
    name: str
    life_area: str
    natural_sign: str
    ruling_planet: str

# ============================================================
# 🛠️ ENDPOINTS DE DADOS ASTROLÓGICOS
# ============================================================

@app.get("/api/planets", response_model=List[Planet])
async def get_planets():
    return load_json("planets.json")

@app.get("/api/signs", response_model=List[Sign])
async def get_signs():
    return load_json("signs.json")

@app.get("/api/houses", response_model=List[House])
async def get_houses():
    return load_json("houses.json")

# ============================================================
# ✅ ENDPOINT DE TESTE
# ============================================================

@app.get("/api/status")
async def status():
    return {"status": "ok", "message": "Astromean API is running 🚀"}

# ============================================================
# 🚀 ENTRYPOINT PARA EXECUTAR COM: python server.py
# ============================================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)
