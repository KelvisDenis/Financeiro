"use client"; // No início do arquivo
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Table from "./components/Table";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
      const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(isAuthenticated);

      if (!isAuthenticated && router.pathname !== "/Login") {
        router.push("/Login");
      }
  }, [router]);

  const transactions = [
    { date: "27/02/2025", type: "Receita", description: "Salário", value: "R$ 5.000" },
    { date: "25/02/2025", type: "Despesa", description: "Aluguel", value: "R$ 1.500" },
    { date: "20/02/2025", type: "Despesa", description: "Supermercado", value: "R$ 800" },
    { date: "18/02/2025", type: "Receita", description: "Freelance", value: "R$ 1.200" },
    { date: "15/02/2025", type: "Saldo", description: "Saldo Atual", value: "R$ 3.900" },
  ];

  return (
    <div className="content-home">
      <h2>Bem-vindo ao Meu Financeiro</h2>
      <p>Gerencie suas receitas e despesas de forma simples!</p>
      <Table data={transactions} />
    </div>
  );
}
