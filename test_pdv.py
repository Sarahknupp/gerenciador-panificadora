import pytest
from httpx import AsyncClient
from backend.main import app

@pytest.mark.asyncio
async def test_pdv_venda_e_filtro():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        venda = {
            "total": 100.0,
            "desconto": 10.0,
            "forma_pagamento": "Pix",
            "itens": [{"produto": "Pão Francês", "quantidade": 10}]
        }
        resp = await ac.post("/vendas", json=venda)
        assert resp.status_code == 200

        # Filtrar por forma de pagamento
        resp_filtro = await ac.get("/vendas?pagamento=Pix")
        assert resp_filtro.status_code == 200
        vendas = resp_filtro.json()
        assert any(v["forma_pagamento"] == "Pix" for v in vendas)