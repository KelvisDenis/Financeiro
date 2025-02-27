"use client"; // Importante para usar estado no Next.js

import { useState } from "react";
import "./globals.css"; // Importa o CSS

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <html lang="pt">
      <body>
        {/* Navbar */}
        <nav className="navbar">
          <div className="logo">Meu Financeiro</div>
          <div className="links">
            <a href="/">Dashboard</a>
            <a href="/receitas">Receitas</a>
            <a href="/despesas">Despesas</a>
            <a href="/relatorios">Relatórios</a>
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
        <main className={`main-content ${sidebarOpen ? "shift" : ""}`}>{children}</main>

        {/* Footer */}
        <footer className="footer">© 2025 - Meu Financeiro</footer>
      </body>
    </html>
  );
}
