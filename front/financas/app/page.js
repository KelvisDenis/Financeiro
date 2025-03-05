"use client"; // No início do arquivo

import { useEffect, useState } from "react";
import Table from "./components/Table";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const username = localStorage.getItem("user")

  const router = useRouter();

    const checkLoginStatus = () => {
      let validationLog = localStorage.getItem("isLoggedIn");
      validationLog = validationLog === "true"
      if(!validationLog) handleLogout()
    };
  
    useEffect(() => {
      checkLoginStatus();
  
      // Adiciona um evento para escutar mudanças no localStorage
      const handleStorageChange = () => {
        checkLoginStatus();
      };
  
      window.addEventListener("storage", handleStorageChange);
  
      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }, []);
  
    const handleLogout = () => {
      localStorage.removeItem("isLoggedIn");
      router.push("/Login");
    };
  const transactions = [
    { date: "27/02/2025", type: "Receita", description: "Salário", value: "R$ 5.000" },
    { date: "25/02/2025", type: "Despesa", description: "Aluguel", value: "R$ 1.500" },
    { date: "20/02/2025", type: "Despesa", description: "Supermercado", value: "R$ 800" },
    { date: "18/02/2025", type: "Receita", description: "Freelance", value: "R$ 1.200" },
    { date: "15/02/2025", type: "Saldo", description: "Saldo Atual", value: "R$ 3.900" },
    { date: "11/02/2025", type: "Saldo", description: "Saldo Atual", value: "R$ 4.900" },
  ];

  return (
    <div className="content-home">
      <h2>Bem-vindo ao Meu Financeiro {username}</h2>
      <p>Gerencie suas receitas e despesas de forma simples!</p>
      <Table data={transactions} />
    </div>
  );
}
