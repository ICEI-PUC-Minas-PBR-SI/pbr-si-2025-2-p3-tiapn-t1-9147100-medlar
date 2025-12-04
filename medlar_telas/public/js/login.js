
const BASE_URL = "http://localhost:3000"; // API backend

/**
 * Alterna entre as telas de login e esqueci a senha.
 */
function mostrarTela(idTela) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  const tela = document.getElementById(idTela);
  if (tela) {
    tela.classList.add("ativa");
    window.scrollTo(0, 0);
  }
}

/**
 * Faz login real contra o backend /api/login
 */
async function fazerLogin(email, senha) {
  let resposta;

  // 1) Erro de rede / servidor fora do ar
  try {
    resposta = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });
  } catch (e) {
    console.error("Erro de rede ou servidor:", e);
    // aqui é problema de conexão, não de senha/e-mail
    throw new Error(
      "Não foi possível conectar ao servidor. Verifique se o sistema está rodando e tente novamente."
    );
  }

  // 2) Tenta ler o JSON da resposta (mesmo em caso de erro 4xx/5xx)
  let data = {};
  try {
    data = await resposta.json();
  } catch (e) {
    // se não vier JSON, mantém data como {}
  }

  // 3) Se a resposta NÃO for 200..299, usamos a mensagem da API
  if (!resposta.ok) {
    const mensagem =
      data.error || "Falha ao fazer login. Tente novamente em alguns instantes.";
    throw new Error(mensagem);
  }

  // 4) Sucesso → retorna os dados do usuário
  return data; // { id, nome
}

/**
 * Inicializa listeners ao carregar a página
 */
document.addEventListener("DOMContentLoaded", function () {
  // inicia com a tela de login
  mostrarTela("tela-login");

  // alternar telas
  const linkEsqueci = document.getElementById("link-esqueci-senha");
  if (linkEsqueci) {
    linkEsqueci.addEventListener("click", (e) => {
      e.preventDefault();
      mostrarTela("tela-esqueci-senha");
    });
  }

  const linkVoltar = document.getElementById("link-voltar-login");
  if (linkVoltar) {
    linkVoltar.addEventListener("click", (e) => {
      e.preventDefault();
      mostrarTela("tela-login");
    });
  }

  // SUBMIT DO LOGIN
  const formLogin = document.querySelector("#tela-login form");
  if (formLogin) {
    formLogin.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const senha = document.getElementById("password").value.trim();

      if (!email || !senha) {
        alert("Preencha o e-mail e a senha.");
        return;
      }

      try {
        const usuario = await fazerLogin(email, senha);

        // =======================================================
        // NOVA REGRA: bloquear usuários pendentes ou rejeitados
        // =======================================================
        if (usuario.status === "pendente") {
          alert("⚠️ Seu cadastro ainda não foi aprovado pelo administrador.");
          return;
        }

        if (usuario.status === "rejeitado") {
          alert("❌ Seu cadastro foi rejeitado pelo administrador.");
          return;
        }
        // =======================================================

        // salva dados no localStorage
        localStorage.setItem("user_id", usuario.id); // Adiciona o ID do usuário separadamente para fácil acesso
        localStorage.setItem(
          "medlar_user",
          JSON.stringify({
            id: usuario.id, // Já está aqui, mas o item separado é mais fácil de usar.
            nome: usuario.nome,
            email: usuario.email,
            tipo: usuario.tipo,
            status: usuario.status
          })
        );

        alert(`✅ Login realizado com sucesso!\nBem-vindo(a), ${usuario.nome} (${usuario.tipo}).`);

        // =======================================================
        // REDIRECIONAMENTO
        // =======================================================
        let paginaDestino = "medlar-home.html"; // padrão

        if (usuario.tipo === "profissional") {
          paginaDestino = "home-profissional.html";
        } else if (usuario.tipo === "paciente") {
          paginaDestino = "home-paciente.html";
        }

        window.location.href = paginaDestino;
        // =======================================================

      } catch (err) {
        console.error(err);
        alert(err.message || "E-mail ou senha inválidos.");
      }
    });
  }

  // SUBMIT ESQUECI A SENHA
  const formRedefinir = document.querySelector("#tela-esqueci-senha form");
  if (formRedefinir) {
    formRedefinir.addEventListener("submit", (e) => {
      e.preventDefault();

      const emailRec = document.getElementById("email-redefinir").value.trim();
      if (!emailRec) {
        alert("Informe o e-mail para recuperação.");
        return;
      }

      alert("Instruções de redefinição de senha seriam enviadas (requer backend de e-mail).");
      mostrarTela("tela-login");
    });
  }
});
