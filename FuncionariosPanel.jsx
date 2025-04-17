import { useState, useEffect } from 'react';
import { logAberturaModulo, funcionarioDefaults } from './funcionarios/utils';

export default function FuncionariosPanel() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cargo, setCargo] = useState("");
  const [salario, setSalario] = useState(funcionarioDefaults.salarioMinimo);

  const [valeValor, setValeValor] = useState("");
  const [valeMotivo, setValeMotivo] = useState("");

  const [advertMotivo, setAdvertMotivo] = useState("");

  const [funcIdSelecionado, setFuncIdSelecionado] = useState(null);

  const cadastrarFuncionario = async () => {
    const novo = { nome, cpf, cargo, salario: parseFloat(salario) };
    await fetch("http://localhost:8000/funcionarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novo)
    });
    setNome(""); setCpf(""); setCargo(""); setSalario("");
    carregarFuncionarios();
  };

  const registrarVale = async () => {
    if (!funcIdSelecionado || !valeValor) return;
    await fetch("http://localhost:8000/funcionarios/vale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        funcionario_id: funcIdSelecionado,
        valor: parseFloat(valeValor),
        motivo: valeMotivo
      })
    });
    setValeValor(""); setValeMotivo(""); setFuncIdSelecionado(null);
    alert("Vale registrado!");
  };

  const registrarAdvertencia = async () => {
    if (!funcIdSelecionado || !advertMotivo) return;
    await fetch("http://localhost:8000/funcionarios/advertencia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        funcionario_id: funcIdSelecionado,
        motivo: advertMotivo,
        data: new Date().toISOString()
      })
    });
    setAdvertMotivo(""); setFuncIdSelecionado(null);
    alert("Advertência registrada!");
  };

  const carregarFuncionarios = async () => {
    const res = await fetch("http://localhost:8000/funcionarios");
    const data = await res.json();
    setFuncionarios(data);
  };

  useEffect(() => {
    logAberturaModulo();
    console.log('Salário mínimo padrão:', funcionarioDefaults.salarioMinimo);
    carregarFuncionarios();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>👩‍🍳 Funcionários</h2>

      <div style={{ marginBottom: 10 }}>
        <button onClick={() => window.open("http://localhost:8000/funcionarios/export/json", "_blank")}>📥 Exportar JSON</button>
        <button onClick={() => window.open("http://localhost:8000/funcionarios/export/csv", "_blank")} style={{ marginLeft: 10 }}>📥 Exportar CSV</button>
      </div>

      <div>
        <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
        <input placeholder="CPF" value={cpf} onChange={e => setCpf(e.target.value)} />
        <input placeholder="Cargo" value={cargo} onChange={e => setCargo(e.target.value)} />
        <input type="number" placeholder="Salário" value={salario} onChange={e => setSalario(e.target.value)} />
        <button onClick={cadastrarFuncionario}>Cadastrar</button>
      </div>

      <h3>📋 Lista de Funcionários</h3>
      <ul>
        {funcionarios.map((f) => (
          <li key={f.id}>
            {f.nome} ({f.cargo}) - R$ {f.salario.toFixed(2)}{" "}
            <button onClick={() => setFuncIdSelecionado(f.id)}>Selecionar</button>
            <a href={`/documentos_links/${f.id}`} style={{ marginLeft: 10 }} target="_blank" rel="noreferrer">📂 Documentos</a>
          </li>
        ))}
      </ul>

      {funcIdSelecionado && (
        <div style={{ marginTop: 20 }}>
          <h4>Funcionário ID: {funcIdSelecionado}</h4>
          <div>
            <h5>💳 Registrar Vale</h5>
            <input type="number" placeholder="Valor" value={valeValor} onChange={e => setValeValor(e.target.value)} />
            <input placeholder="Motivo" value={valeMotivo} onChange={e => setValeMotivo(e.target.value)} />
            <button onClick={registrarVale}>Registrar Vale</button>
          </div>

          <div style={{ marginTop: 10 }}>
            <h5>⚠️ Registrar Advertência</h5>
            <input placeholder="Motivo" value={advertMotivo} onChange={e => setAdvertMotivo(e.target.value)} />
            <button onClick={registrarAdvertencia}>Registrar Advertência</button>
          </div>
        </div>
      )}
    </div>
  );
}