import { useEffect, useState } from "react";

export default function EstoquePanel() {
  const [estoque, setEstoque] = useState([]);
  const [alertas, setAlertas] = useState(null);
  const [filtroTipo, setFiltroTipo] = useState("");

  useEffect(() => {
    fetchEstoque();
    fetchAlertas();
  }, []);

  const fetchEstoque = async () => {
    const res = await fetch("http://localhost:8000/estoque");
    const data = await res.json();
    setEstoque(data);
  };

  const fetchAlertas = async () => {
    const res = await fetch("http://localhost:8000/estoque/alertas");
    const data = await res.json();
    setAlertas(data);
  };

  const filtrados = filtroTipo
    ? estoque.filter((p) => p.tipo === filtroTipo)
    : estoque;

  return (
    <div style={{ padding: 20 }}>
      <h2>📦 Estoque</h2>

      <div style={{ margin: '10px 0' }}>
        <button onClick={() => window.open("http://localhost:8000/estoque/export/json", "_blank")}>📥 Exportar JSON</button>
        <button onClick={() => window.open("http://localhost:8000/estoque/export/csv", "_blank")} style={{ marginLeft: 10 }}>📥 Exportar CSV</button>
      </div>


      <div>
        <label>Filtrar por tipo: </label>
        <select onChange={(e) => setFiltroTipo(e.target.value)}>
          <option value="">Todos</option>
          <option value="produção">Produção própria</option>
          <option value="revenda">Revenda</option>
        </select>
      </div>

      <h3>📋 Lista de Produtos</h3>
      <ul>
        {filtrados.map((p, i) => (
          <li key={i}>
            {p.nome} ({p.tipo}) — {p.quantidade} unidades
            {p.validade ? ` — validade: ${p.validade}` : ""}
          </li>
        ))}
      </ul>

      {alertas && (
        <>
          <h4>🚨 Alertas</h4>
          <ul>
            {alertas.baixo_estoque.map((p, i) => (
              <li key={`baixo-${i}`} style={{ color: "orange" }}>
                🔻 Baixo estoque: {p.nome} ({p.quantidade})
              </li>
            ))}
            {alertas.vencidos.map((p, i) => (
              <li key={`vencido-${i}`} style={{ color: "red" }}>
                ⚠️ Produto vencido: {p.nome} (validade: {p.validade})
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}