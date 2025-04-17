# 🥖 Gerenciador Panificadora

Sistema completo de gestão para panificadoras e confeitarias com produção própria e revenda de produtos.

---

## 📌 Funcionalidades

- ✅ PDV com controle de itens, descontos e formas de pagamento
- ✅ Controle de estoque por tipo (produção / revenda)
- ✅ Gestão de funcionários, vales, advertências e documentos com assinatura digital
- ✅ Módulo financeiro com entradas/saídas, previsão de caixa e relatórios em PDF
- ✅ Exportações em CSV e JSON
- ✅ Interface React com painel de navegação entre módulos

---

## 🚀 Como rodar

### 🔧 Backend (FastAPI)

```bash
cd painel_gerenciador_panificadora/backend
pip install -r requirements.txt  # ou instale fastapi, uvicorn, fpdf, qrcode
uvicorn main:app --reload
```

Acesse: http://localhost:8000/docs

---

### ⚛️ Frontend (React + Vite)

```bash
cd painel_gerenciador_panificadora/frontend
npm install
npm run dev
```

Acesse: http://localhost:3000

---

## 🧾 Relatórios e Exportações

- `GET /financeiro/relatorio/pdf` → Relatório financeiro assinado
- `GET /estoque/export/csv` → Exporta produtos
- `GET /vendas/export/json` → Exporta vendas
- ...

---

## 🤝 Contribuindo

Contribuições são bem-vindas!

1. Fork
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit e push
4. Crie um Pull Request ✨

---

## 📸 Interface

Em breve: screenshots...

---

## 📄 Licença

MIT