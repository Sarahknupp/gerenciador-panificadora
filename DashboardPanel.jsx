import { useEffect, useState } from 'react';

export default function DashboardPanel() {
  const [resumo, setResumo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/dashboard/resumo")
      .then(res => res.json())
      .then(data => setResumo(data));
  }, []);

  if (!resumo) return <p>Carregando dashboard...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>📊 Dashboard Geral</h2>
      <div>
        <p><strong>💰 Caixa Atual:</strong> R$ {resumo.caixa.toFixed(2)}</p>
        <p><strong>🛍️ Total em Vendas:</strong> R$ {resumo.total_vendas.toFixed(2)}</p>
      </div>

      <h3>⚠️ Estoque Baixo</h3>
      {resumo.itens_estoque_baixo.length === 0 ? (
        <p>Tudo certo no estoque.</p>
      ) : (
        <ul>
          {resumo.itens_estoque_baixo.map((p, i) => (
            <li key={i}>{p.nome} ({p.tipo}) — {p.quantidade} unidades</li>
          ))}
        </ul>
      )}

      <h3>🏆 Top Produtos Vendidos</h3>
      {resumo.top_vendidos.length === 0 ? (
        <p>Nenhuma venda registrada.</p>
      ) : (
        <ol>
          {resumo.top_vendidos.map((item, i) => (
            <li key={i}>{item.nome} - {item.quantidade} unidades</li>
          ))}
        </ol>
      )}
    </div>
  );
}