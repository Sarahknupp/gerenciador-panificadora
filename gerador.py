from fpdf import FPDF
from backend.financeiro.service import listar_mov, calcular_saldo
from datetime import datetime
import hashlib
import os

RELATORIO_DIR = "relatorios"
os.makedirs(RELATORIO_DIR, exist_ok=True)

def gerar_relatorio_pdf():
    movimentos = listar_mov()
    saldo = calcular_saldo()
    agora = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    texto = f"RELATÓRIO FINANCEIRO\n\nData: {agora}\n\n"
    total_entrada = sum(m['valor'] for m in movimentos if m['tipo'] == 'entrada')
    total_saida = sum(m['valor'] for m in movimentos if m['tipo'] == 'saida')

    texto += f"Total de Entradas: R$ {total_entrada:.2f}\n"
    texto += f"Total de Saídas: R$ {total_saida:.2f}\n"
    texto += f"Saldo Atual: R$ {saldo:.2f}\n\n"
    texto += "Movimentações:\n"

    for m in movimentos:
        linha = f"{m['data']} — {'+' if m['tipo'] == 'entrada' else '-'}R$ {m['valor']:.2f} — {m['descricao']}"
        texto += linha + "\n"

    hash_assinatura = hashlib.md5(texto.encode()).hexdigest()
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    for linha in texto.splitlines():
        pdf.cell(200, 10, txt=linha, ln=True)
    pdf.set_font("Arial", size=8)
    pdf.cell(200, 10, txt=f"Assinatura digital: {hash_assinatura}", ln=True)

    caminho = os.path.join(RELATORIO_DIR, f"relatorio_financeiro_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf")
    pdf.output(caminho)
    return caminho