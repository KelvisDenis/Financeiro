"use client"; 

import { useEffect, useState } from "react";
import "./globals.css"; // Importa o CSS
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();


  useEffect(() => {
    let validationLog= localStorage.getItem("isLoggedIn")
    console.log("verificando: "+ validationLog === "true")
    // Verifique se o usuário está autenticado
    const isAuthenticated = validationLog === "true"; // Aqui você pode verificar o login de outras formas
    setIsLoggedIn(isAuthenticated);

    // Se não estiver logado, redireciona para a página de login
    if (!isAuthenticated && router.pathname !== "Login") {
      router.push("/Login");
    }
  }, [router.pathname]);

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
              <Link href={"/Login"} onClick={handleLogout}>Sair</Link>
            ) : (
              <Link href="/Login">Login</Link>
            )}
            <Link href="/relatorios">Configuração</Link>
          </div>
          {/* Ícone de hambúrguer */}
          <button className="hamburger" onClick={toggleSidebar}>
            ☰
          </button>
        </nav>

        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <Link href="/">🏠 Home</Link>
          <Link href="/receitas">💰 Receitas</Link>
          <Link href="/despesas">📉 Despesas</Link>
          <Link href="/relatorios">📊 Relatórios</Link>
          <Link href="/Login" onClick={handleLogout}>Sair</Link>
        </aside>

        {/* Conteúdo Principal */}
        <main className={`main-content ${sidebarOpen ? "hide-when-sidebar" : ""}`}>{children}</main>

        {/* Footer */}
        <footer className="footer">© 2025 - Meu Financeiro</footer>
      </body>
    </html>
  );
}
