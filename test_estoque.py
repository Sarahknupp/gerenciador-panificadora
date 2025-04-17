import pytest
from httpx import AsyncClient
from backend.main import app
from datetime import date

@pytest.mark.asyncio
async def test_estoque_adicionar_e_alertas():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        produto = {
            "nome": "Leite",
            "tipo": "revenda",
            "quantidade": 2,
            "validade": date.today().isoformat()
        }
        resp = await ac.post("/estoque", json=produto)
        assert resp.status_code == 200

        # Verifica alertas
        resp_alerta = await ac.get("/estoque/alertas")
        assert resp_alerta.status_code == 200
        alertas = resp_alerta.json()
        assert any(p["nome"] == "Leite" for p in alertas["baixo_estoque"])