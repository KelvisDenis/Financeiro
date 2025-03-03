"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import styles from "../Relatorio.module.css";
import { useRouter } from "next/navigation";
import { FaChartBar } from "react-icons/fa";

// Simulação de dados de relatório
const dadosRelatorio = [
  { name: "Janeiro", despesas: 1200, saldo: 5000 },
  { name: "Fevereiro", despesas: 800, saldo: 4500 },
  { name: "Março", despesas: 1500, saldo: 4000 },
  { name: "Abril", despesas: 1000, saldo: 4200 },
  { name: "Maio", despesas: 2000, saldo: 3800 },
];

export default function Relatorio() {
  const router = useRouter();
  const [filtroAno, setFiltroAno] = useState("2025");

  useEffect(() => {
    const checkLoginStatus = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (!isLoggedIn) handleLogout();
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/Login");
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <FaChartBar className={styles.icon} />
        <h2>Relatório Financeiro</h2>
      </div>

      {/* Linha separadora */}
      <hr className={styles.separator} />

      {/* Filtro de Ano */}
      <div className={styles.filterContainer}>
        <label>
          Ano:
          <select value={filtroAno} onChange={(e) => setFiltroAno(e.target.value)}>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </label>
      </div>

      {/* Gráfico Responsivo */}
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dadosRelatorio} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="despesas" fill="#e74c3c" name="Despesas" />
            <Bar dataKey="saldo" fill="#27ae60" name="Saldo" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
