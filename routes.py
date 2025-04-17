from fastapi import APIRouter
from financeiro.service import listar_movimentacoes
from pdv.service import listar_vendas
from estoque.service import listar_estoque

router = APIRouter(prefix="/dashboard")

@router.get("/resumo")
def get_resumo_dashboard():
    # Total caixa (financeiro)
    caixa = sum(m['valor'] if m['tipo'] == 'entrada' else -m['valor'] for m in listar_movimentacoes())

    # Total vendas
    vendas = listar_vendas()
    total_vendas = sum(v['valor_total'] for v in vendas)

    # Produtos com estoque baixo
    estoque = listar_estoque()
    estoque_baixo = [p for p in estoque if p['quantidade'] < 5]

    # Produtos mais vendidos
    produto_contagem = {}
    for v in vendas:
        for item in v['itens']:
            chave = item['nome']
            produto_contagem[chave] = produto_contagem.get(chave, 0) + item['quantidade']

    top_vendidos = sorted(produto_contagem.items(), key=lambda x: x[1], reverse=True)[:5]

    return {
        "caixa": caixa,
        "total_vendas": total_vendas,
        "itens_estoque_baixo": estoque_baixo,
        "top_vendidos": [{"nome": nome, "quantidade": qtd} for nome, qtd in top_vendidos]
    }