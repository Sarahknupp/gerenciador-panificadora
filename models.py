from pydantic import BaseModel
from typing import Optional
from datetime import date

class ProdutoEstoque(BaseModel):
    nome: str
    tipo: str  # produção ou revenda
    quantidade: int
    validade: Optional[date] = None