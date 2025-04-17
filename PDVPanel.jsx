import { useState } from 'react';

export default function PDVPanel() {
  const [itens, setItens] = useState([]);
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [forma, setForma] = useState("");
  const [desconto, setDesconto] = useState(0);
  const [pagamento, setPagamento] = useState(0);

  const adicionarItem = () => {
    if (nome && valor && quantidade > 0) {
      setItens([...itens, { nome, valor: parseFloat(valor), quantidade: parseInt(quantidade) }]);
      setNome(""); setValor(""); setQuantidade(1);
    }
  };

  const total = itens.reduce((acc, item) => acc + item.valor * item.quantidade, 0) - parseFloat(desconto || 0);
  const troco = parseFloat(pagamento || 0) - total;

  const finalizarVenda = async () => {
    const payload = {
      itens,
      desconto: parseFloat(desconto),
      forma_pagamento: forma,
      valor_pago: parseFloat(pagamento),
      data: new Date().toISOString()
    };
    await fetch("http://localhost:8000/pdv/venda", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    alert("Venda registrada com sucesso!");
    setItens([]); setDesconto(0); setPagamento(0); setForma("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>PDV - Ponto de Venda</h2>
      <div>
        <input placeholder="Produto" value={nome} onChange={e => setNome(e.target.value)} />
        <input type="number" placeholder="Valor unitário" value={valor} onChange={e => setValor(e.target.value)} />
        <input type="number" placeholder="Quantidade" value={quantidade} onChange={e => setQuantidade(e.target.value)} />
        <button onClick={adicionarItem}>Adicionar</button>
      </div>

      <h3>Itens da Venda</h3>
      <ul>
        {itens.map((item, i) => (
          <li key={i}>{item.quantidade}x {item.nome} - R$ {item.valor.toFixed(2)} cada</li>
        ))}
      </ul>

      <p>Desconto: <input type="number" value={desconto} onChange={e => setDesconto(e.target.value)} /></p>
      <p>Forma de Pagamento:
        <select value={forma} onChange={e => setForma(e.target.value)}>
          <option value="">Selecione</option>
          <option value="dinheiro">Dinheiro</option>
          <option value="pix">Pix</option>
          <option value="debito">Cartão Débito</option>
          <option value="credito">Cartão Crédito</option>
        </select>
      </p>
      <p>Valor Recebido: <input type="number" value={pagamento} onChange={e => setPagamento(e.target.value)} /></p>

      <h3>Total: R$ {total.toFixed(2)}</h3>
      <h4>Troco: R$ {troco > 0 ? troco.toFixed(2) : 0}</h4>

      <button disabled={!forma || pagamento < total} onClick={finalizarVenda}>
        Finalizar Venda
      </button>
    </div>
  );
}