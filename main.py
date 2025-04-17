from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from financeiro.routes import router as financeiro_router
from estoque.routes import router as estoque_router
from pdv.routes import router as pdv_router
from dashboard.routes import router as dashboard_router
from funcionarios.routes import router as funcionarios_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(financeiro_router)
app.include_router(estoque_router)
app.include_router(pdv_router)
app.include_router(dashboard_router)
app.include_router(funcionarios_router)