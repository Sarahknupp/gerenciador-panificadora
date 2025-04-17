import { useState, useEffect } from "react";

export default function FinanceiroPanel() {
  const [movs, setMovs] = useState([]);
  const [tipo, setTipo] = useState("entrada");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [saldo, setSaldo] = useState(null);
  const [previsao, setPrevisao] = useState(null);

  useEffect(() => {
    carregar();
  }, []);

  const carregar = async () => {
    const res = await fetch("http://localhost:8000/financeiro");
    setMovs(await res.json());

    const saldoRes = await fetch("http://localhost:8000/financeiro/saldo");
    setSaldo(await saldoRes.json());

    const prevRes = await fetch("http://localhost:8000/financeiro/previsao");
    setPrevisao(await prevRes.json());
  };

  const registrar = async () => {
    await fetch("http://localhost:8000/financeiro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipo, valor: parseFloat(valor), descricao, data }),
    });
    setTipo("entrada"); setValor(""); setDescricao(""); setData("");
    carregar();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>💰 Financeiro</h2>

      <div>
        <label>Tipo:</label>
        <select value={tipo} onChange={e => setTipo(e.target.value)}>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
        <input type="number" placeholder="Valor" value={valor} onChange={e => setValor(e.target.value)} />
        <input placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
        <input type="date" value={data} onChange={e => setData(e.target.value)} />
        <button onClick={registrar}>Registrar</button>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>📊 Movimentações</h3>
        <ul>
          {movs.map((m, i) => (
            <li key={i}>
              {m.tipo === "entrada" ? "⬆️" : "⬇️"} R$ {m.valor.toFixed(2)} — {m.descricao} ({m.data})
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 20 }}>
        <h4>💵 Saldo Atual: R$ {saldo?.saldo_atual.toFixed(2)}</h4>
        {previsao && (
          <div>
            <h5>📅 Previsão até {previsao.proxima_data}</h5>
            <p>Entradas: R$ {previsao.previsto_entrada.toFixed(2)}</p>
            <p>Saídas: R$ {previsao.previsto_saida.toFixed(2)}</p>
            <strong>Saldo projetado: R$ {previsao.saldo_projetado.toFixed(2)}</strong>
          </div>
        )}
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={() => window.open("http://localhost:8000/financeiro/export/json", "_blank")}>📥 Exportar JSON</button>
        <button onClick={() => window.open("http://localhost:8000/financeiro/export/csv", "_blank")} style={{ marginLeft: 10 }}>📥 Exportar CSV</button>
      </div>
    </div>
  );
}