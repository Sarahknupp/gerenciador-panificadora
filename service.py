from datetime import datetime

vendas = []

def registrar_venda(data):
    venda = data.copy()
    venda["id"] = len(vendas) + 1
    venda["data"] = datetime.now().isoformat()
    vendas.append(venda)
    return venda

def listar_vendas():
    return vendas

def filtrar_vendas(data_min=None, pagamento=None, valor_min=None):
    filtradas = vendas
    if data_min:
        filtradas = [v for v in filtradas if v["data"] >= data_min]
    if pagamento:
        filtradas = [v for v in filtradas if v["forma_pagamento"] == pagamento]
    if valor_min:
        filtradas = [v for v in filtradas if v["total"] >= valor_min]
    return filtradas