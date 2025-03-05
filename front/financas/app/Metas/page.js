"use client";

import { useState, useEffect } from "react";
import { PiCheckSquareOffset } from "react-icons/pi";
import styles from "../Metas.module.css";
import { useRouter } from "next/navigation";

const MetasData = [
  { valor: "200", description: "Computador", cofre: "R$ 5.000" },
  { valor: "5.000", description: "Celular", cofre: "R$ 1.200" },
  { valor: "1.200", description: "Tv", cofre: "R$ 500" },
  { valor: "500", description: "Roupas", cofre: "R$ 5.00" },
  { valor: "3.000", description: "Mouse", cofre: "R$ 1.000" },
  { valor: "980", description: "Moto", cofre: "R$ 200" },
];

export default function Metas() {
  const [feitas, setFeitas] = useState("10");
  const [aserem, setAserem] = useState("20");

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



  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <PiCheckSquareOffset className={styles.icon} />
        <div>
          <h2>Metas</h2>
          <p className={styles.saldo}>Concluídas: {aserem}</p>
          <p className={styles.saldo}>A serem concluídas: {feitas}</p>
        </div>
      </div>

      {/* Linha separadora */}
      <hr className={styles.separator} />


      {/* Lista de receitas filtradas */}
      <div className={styles.cardGrid}>
        {MetasData.length > 0 ? (
          MetasData.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardDate}>R${item.valor}</span>
              </div>
              <p className={styles.cardDescription}>{item.description}</p>
              <p className={styles.cardValue}>{item.cofre}</p>
            </div>
          ))
        ) : (
          <p className={styles.noTransactions}>Nenhuma receita registrada</p>
        )}
      </div>
    </div>
  );
}
