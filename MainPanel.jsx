import { useState } from "react";
import DashboardPanel from "./DashboardPanel";
import PDVPanel from "./PDVPanel";
import EstoquePanel from "./EstoquePanel";
import FinanceiroPanel from "./FinanceiroPanel";
import FuncionariosPanel from "./FuncionariosPanel";

export default function MainPanel() {
  const [aba, setAba] = useState("Dashboard");

  const renderPainel = () => {
    switch (aba) {
      case "Dashboard": return <DashboardPanel />;
      case "PDV": return <PDVPanel />;
      case "Estoque": return <EstoquePanel />;
      case "Financeiro": return <FinanceiroPanel />;
      case "Funcionários": return <FuncionariosPanel />;
      default: return <DashboardPanel />;
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <nav style={{ marginBottom: 20 }}>
        {["Dashboard", "PDV", "Estoque", "Financeiro", "Funcionários"].map((mod) => (
          <button
            key={mod}
            onClick={() => setAba(mod)}
            style={{
              marginRight: 10,
              background: aba === mod ? "#4CAF50" : "#ccc",
              color: aba === mod ? "white" : "black",
              padding: "8px 16px",
              border: "none",
              borderRadius: 4,
            }}
          >
            {mod}
          </button>
        ))}
      </nav>
      {renderPainel()}
    </div>
  );
}