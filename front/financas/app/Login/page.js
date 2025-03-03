"use client";

import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import styles from "../Login.module.css"; // Importa o CSS local
import { useRouter } from "next/navigation";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); 


  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Senha:", password);
    // Aqui você pode adicionar a lógica de autenticação
    localStorage.setItem("isLoggedIn", "true")
    router.push("/"); 
    console.log("local" + localStorage.getItem("isLoggedIn"));
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-box"]}>
        <h2 className={styles["titleh2"]}>Meu Financeiro</h2>
        <form onSubmit={handleLogin}>
          <div className={styles["input-group"]}>
            <FaEnvelope className={styles.icon} />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles["input-group"]}>
            <FaLock className={styles.icon} />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles["login-btn"]}>
            Entrar
          </button>
        </form>
        <div className={styles["extra-links"]}>
          <a href="#">Esqueci minha senha</a>
          <a href="#">Criar conta</a>
        </div>
      </div>
    </div>
  );
}
