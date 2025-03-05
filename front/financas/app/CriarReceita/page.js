"use client";
import { useEffect, useState } from "react";
import "../CreateReceita.css"; // Importa o CSS
import { useRouter } from "next/navigation";

export default function CriarReceita() {
  const [tipo, setTipo] = useState("receita"); // Tipo de transação (receita/despesa)
  const [categoria, setCategoria] = useState(""); // Categoria da transação
  const [titulo, setTitulo] = useState(""); // Título da transação
  const [data, setData] = useState(""); // Data da transação
  const [titleOther, setTitleOther] = useState("");
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
  // Função para lidar com a mudança do tipo (Receita ou Despesa)
  const handleTipoChange = (e) => {
    setTipo(e.target.value);
    setCategoria(""); // Reseta a categoria ao mudar o tipo
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Criar Transação</h2>
      <form className="form">
        {/* Tipo de Transação */}
        <div className="form-group">
          <label htmlFor="tipo">Tipo</label>
          <select
            id="tipo"
            value={tipo}
            onChange={handleTipoChange}
            className="form-input"
          >
            <option value="receita">Receita</option>
            <option value="despesa">Despesa</option>
          </select>
        </div>

        {/* Categoria de Transação */}
        <div className="form-group">
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="form-input"
          >
            <option value="">Selecione a categoria</option>
            {tipo === "despesa" && (
              <>
                <option value="cartao">Cartão de Crédito</option>
                <option value="conta-luz">Conta de Luz</option>
                <option value="conta-agua">Conta de Água</option>
                <option value="alimentacao">Alimentação</option>
                <option value="transporte">Transporte</option>
                <option value="outros">Outros</option>
              </>
            )}
            {tipo === "receita" && (
              <>
                <option value="salario">Salário</option>
                <option value="venda">Venda</option>
                <option value="investimentos">Investimentos</option>
                <option value="outros">Outros</option>
              </>
            )}
          </select>
        </div>
        
        {categoria === "outros" &&  (
                  <div className="form-group">
                  <label htmlFor="titulo">Especifique categoria</label>
                  <input
                    type="text"
                    id="titulo"
                    value={titleOther}
                    onChange={(e) => setTitleOther(e.target.value)}
                    placeholder="Nome da categoria"
                    className="form-input"
                  />
                </div>
        )}
        {/* Título da Transação */}
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Nome da transação"
            className="form-input"
          />
        </div>

        {/* Data da Transação */}
        <div className="form-group">
          <label htmlFor="data">Data</label>
          <input
            type="date"
            id="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="form-input"
          />
        </div>

        {/* Botão de Submit */}
        <button type="submit" className="form-submit">
          Criar Transação
        </button>
      </form>
    </div>
  );
}
