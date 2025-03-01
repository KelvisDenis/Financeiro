"use client"; 

import { useEffect, useState } from "react";
import "./globals.css"; // Importa o CSS

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Somente no cliente
      const isAuthenticated = localStorage.getItem("isLoggedIn") === true; // Verificação corrigida para a string "true"
      setIsLoggedIn(isAuthenticated);

      if (!isAuthenticated) {
        handleLogout(); // Se não estiver autenticado, redireciona para a tela de login
      }
    
  },[
    
  ]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); // Remove o item do localStorage
    router.push("/Login"); // Redireciona para a tela de login
  };
  return (
    <html lang="pt">
      <body>
        {/* Navbar */}
        <nav className="navbar">
          <div className="logo">Meu Financeiro</div>
          <div className="links">
            <a href="/">Home</a>
            {isLoggedIn ? (
              <button onClick={handleLogout}>Sair</button>
            ) : (
              <a href="/login">Login</a>
            )}
            <a href="/relatorios">Configuração</a>
          </div>
          {/* Ícone de hambúrguer */}
          <button className="hamburger" onClick={toggleSidebar}>
            ☰
          </button>
        </nav>

        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <a href="/">🏠 Home</a>
          <a href="/receitas">💰 Receitas</a>
          <a href="/despesas">📉 Despesas</a>
          <a href="/relatorios">📊 Relatórios</a>
        </aside>

        {/* Conteúdo Principal */}
        <main className={`main-content ${sidebarOpen ? "hide-when-sidebar" : ""}`}>{children}</main>

        {/* Footer */}
        <footer className="footer">© 2025 - Meu Financeiro</footer>
      </body>
    </html>
  );
}
