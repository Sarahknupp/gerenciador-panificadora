from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse, FileResponse
from .service import registrar_venda, listar_vendas, filtrar_vendas
import csv, json, tempfile

router = APIRouter(prefix="/vendas")

@router.post("")
def nova_venda(venda: dict):
    return registrar_venda(venda)

@router.get("")
def historico_vendas(
    data_min: str = Query(None),
    pagamento: str = Query(None),
    valor_min: float = Query(None)
):
    return filtrar_vendas(data_min, pagamento, valor_min)

@router.get("/export/json")
def exportar_json():
    return JSONResponse(content=listar_vendas())

@router.get("/export/csv")
def exportar_csv():
    temp = tempfile.NamedTemporaryFile(delete=False, suffix=".csv", mode="w", encoding="utf-8", newline="")
    writer = csv.writer(temp)
    writer.writerow(["ID", "Total", "Desconto", "Pagamento", "Data"])
    for v in listar_vendas():
        writer.writerow([v["id"], v["total"], v["desconto"], v["forma_pagamento"], v["data"]])
    temp.close()
    return FileResponse(temp.name, filename="vendas.csv", media_type="text/csv")