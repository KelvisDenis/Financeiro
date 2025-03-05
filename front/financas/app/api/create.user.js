



const fetchCreateUser = async (username, email, senha) => {
    const url = "http://192.168.100.8:4000/usuarios/create"
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({nome:username, email, senha }), // 🔹 Ajuste para o DTO do backend
      });
  
      if (!response.ok) {
        return {
          err: new Error("Erro ao criar usuario"),
          state: 400,
          result:false
        };
      }
  
      const data = await response.json(); // Recebe o token e o nome do usuário
      return data

    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert(error.message); // 🔹 Exibe uma mensagem de erro para o usuário
      return {
        err: new Error("Erro ao realizar cadastro"),
        state: 500,
        result:false
      }
    }
  };
export default fetchCreateUser;