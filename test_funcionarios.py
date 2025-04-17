import pytest
from httpx import AsyncClient
from backend.main import app

@pytest.mark.asyncio
async def test_funcionario_cadastro_exportacao():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        data = {
            "nome": "João Silva",
            "cpf": "12345678900",
            "cargo": "Atendente",
            "salario": 1500.0
        }
        resp = await ac.post("/funcionarios", json=data)
        assert resp.status_code == 200
        funcionario = resp.json()
        assert funcionario["nome"] == "João Silva"

        # Verifica exportação CSV
        resp_csv = await ac.get("/funcionarios/export/csv")
        assert resp_csv.status_code == 200
        assert resp_csv.headers["content-type"] == "text/csv"