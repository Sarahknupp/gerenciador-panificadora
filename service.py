from datetime import datetime, date

estoque = []

def registrar_produto(data):
    produto = data.copy()
    produto["id"] = len(estoque) + 1
    produto["data_registro"] = datetime.now().isoformat()
    estoque.append(produto)
    return produto

def listar_estoque():
    return estoque

def listar_alertas():
    hoje = date.today()
    alertas = {
        "baixo_estoque": [p for p in estoque if p["quantidade"] < 5],
        "vencidos": [p for p in estoque if p.get("validade") and p["validade"] < hoje.isoformat()]
    }
    return alertas