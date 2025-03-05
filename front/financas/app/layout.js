"use client"; 

import { useEffect, useState } from "react";
import "./globals.css"; // Importa o CSS
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AiFillSetting } from "react-icons/ai";
import { PiCheckFatFill } from "react-icons/pi";
import { FcPlus } from "react-icons/fc";




export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Defina um valor de breakpoint adequado
      console.log("valor do ismobile: "+ isMobile)
    };
  
    checkMobile(); // Verifica no carregamento
    window.addEventListener("resize", checkMobile); // Atualiza ao redimensionar
  
    return () => window.removeEventListener("resize", checkMobile);
  }, [])

  const checkLoginStatus = () => {
    const validationLog = localStorage.getItem("isLoggedIn");
    if (validationLog === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
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
  return (
    <html lang="pt">
      <body>
        {/* Navbar */}
        <nav className="navbar">
          <div className="logo">Meu Financeiro</div>
          <div className="links">
            <a href="/">Home</a>
            {isLoggedIn ? (
              <>
              <Link href={"/Login"} onClick={handleLogout}>Sair</Link>
              <div className="sidebar-item">
                  <Link href="/relatorios">
                  <AiFillSetting />
                    Configuração
                  </Link>
                </div>
                </>
            ) : (
              <>
                <Link href="/Login">Entrar</Link>
                <Link href="/Login">Cadastrar</Link>
              </>
            )}
          
          </div>
          {/* Ícone de hambúrguer */}
          <button className="hamburger" onClick={toggleSidebar}>
            ☰
          </button>
        </nav>

        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <Link href="/">🏠 Home</Link>
          <Link href="/CriarReceita">
          <div className="sidebar-item">
            <FcPlus/>
            Transação
          </div>
          </Link>
          <Link href="/Receitas">💰 Receitas/Saldo</Link>
          <Link href="/Despesas">📉 Despesas</Link>
          <Link href="/Metas">
          <PiCheckFatFill />Metas
          </Link>
          <Link href="/Relatorio">📊 Relatórios</Link> 
          {isMobile && (
            <>
              {isLoggedIn ? (
                <>
                <div className="sidebar-item">
                  <Link href="/relatorios">
                    <AiFillSetting />Configuração
                  </Link>
                </div>
                <Link href={"/Login"} onClick={handleLogout}>Sair</Link>
                </>
              ) : (
                <>
                  <Link href="/Login">Entrar</Link>
                  <Link href="/Login">Cadastrar</Link>
                </>
              )}
            </>
            )}
            

        </aside>

        {/* Conteúdo Principal */}
        <main className={`main-content ${sidebarOpen ? "hide-when-sidebar" : ""}`}>{children}</main>

        {/* Footer */}
        <footer className="footer">© 2025 - Meu Financeiro</footer>
      </body>
    </html>
  );
}
