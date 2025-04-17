from pydantic import BaseModel
from typing import List

class ItemVenda(BaseModel):
    nome: str
    valor: float
    quantidade: int

class Venda(BaseModel):
    itens: List[ItemVenda]
    desconto: float
    forma_pagamento: str
    valor_pago: float
    data: str