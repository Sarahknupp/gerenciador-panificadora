import pytest
from httpx import AsyncClient
from fastapi import status
from backend.main import app

@pytest.mark.asyncio
async def test_financeiro_movimentacao_e_saldo():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        # Registra entrada
        entrada = {
            "tipo": "entrada",
            "valor": 2000.0,
            "descricao": "Venda do dia",
            "data": "2025-04-17"
        }
        resp_entrada = await ac.post("/financeiro", json=entrada)
        assert resp_entrada.status_code == status.HTTP_200_OK

        # Registra saída
        saida = {
            "tipo": "saida",
            "valor": 500.0,
            "descricao": "Conta de energia",
            "data": "2025-04-17"
        }
        resp_saida = await ac.post("/financeiro", json=saida)
        assert resp_saida.status_code == status.HTTP_200_OK

        # Verifica saldo
        resp_saldo = await ac.get("/financeiro/saldo")
        assert resp_saldo.status_code == status.HTTP_200_OK
        saldo = resp_saldo.json()["saldo_atual"]
        assert saldo == 1500.0