"use client";

import { useState, useEffect } from "react";
import { FaWallet } from "react-icons/fa";
import styles from "../Receitas.module.css";
import { useRouter } from "next/navigation";

const receitasData = [
  { date: "27/02/2025", description: "Salário", value: "R$ 5.000" },
  { date: "18/02/2025", description: "Freelance", value: "R$ 1.200" },
  { date: "10/02/2025", description: "Venda Online", value: "R$ 500" },
  { date: "07/02/2025", description: "Salário", value: "R$ 5.00" },
  { date: "01/02/2025", description: "Freelance", value: "R$ 1.000" },
  { date: "20/02/2025", description: "Venda Online", value: "R$ 200" },
];

export default function Receitas() {
  const [saldo, setSaldo] = useState("R$ 700.00");
  const [receita, setReceita] = useState("R$ 6.700");
  const [filtroMes, setFiltroMes] = useState(""); 
  const [filtroAno, setFiltroAno] = useState("");

  const router = useRouter();

  // Verifica login
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

  // Filtra as receitas com base no mês e ano selecionados
  const receitasFiltradas = receitasData.filter((item) => {
    const [day, month, year] = item.date.split("/");

    const matchMes = filtroMes === "" || month === filtroMes;
    const matchAno = filtroAno === "" || year === filtroAno;

    return matchMes && matchAno;
  });

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <FaWallet className={styles.icon} />
        <div>
          <h2>Receitas</h2>
          <p className={styles.saldo}>Receita: {receita}</p>
          <p className={styles.saldo}>Saldo: {saldo}</p>
        </div>
      </div>

      {/* Linha separadora */}
      <hr className={styles.separator} />

      {/* Filtro */}
      <div className={styles.filterContainer}>
        <label>
          Mês:
          <select value={filtroMes} onChange={(e) => setFiltroMes(e.target.value)}>
            <option value="">Todos</option>
            <option value="01">Janeiro</option>
            <option value="02">Fevereiro</option>
            <option value="03">Março</option>
            <option value="04">Abril</option>
            <option value="05">Maio</option>
            <option value="06">Junho</option>
            <option value="07">Julho</option>
            <option value="08">Agosto</option>
            <option value="09">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </select>
        </label>

        <label>
          Ano:
          <select value={filtroAno} onChange={(e) => setFiltroAno(e.target.value)}>
            <option value="">Todos</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </label>
      </div>

      {/* Lista de receitas filtradas */}
      <div className={styles.cardGrid}>
        {receitasFiltradas.length > 0 ? (
          receitasFiltradas.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardDate}>{item.date}</span>
              </div>
              <p className={styles.cardDescription}>{item.description}</p>
              <p className={styles.cardValue}>{item.value}</p>
            </div>
          ))
        ) : (
          <p className={styles.noTransactions}>Nenhuma receita registrada</p>
        )}
      </div>
    </div>
  );
}
