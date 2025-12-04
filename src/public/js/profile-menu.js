// profile-menu.js
// Gerencia o menu de perfil do usuário logado

/**
 * Obtém os dados do usuário logado do localStorage
 */
function obterUsuarioLogado() {
  const usuarioJSON = localStorage.getItem("medlar_user");
  if (!usuarioJSON) {
    return null;
  }
  try {
    return JSON.parse(usuarioJSON);
  } catch (e) {
    console.error("Erro ao fazer parse dos dados do usuário:", e);
    return null;
  }
}

/**
 * Atualiza o menu de perfil com os dados do usuário logado
 */
function atualizarMenuPerfil() {
  const usuario = obterUsuarioLogado();
  
  if (!usuario) {
    console.warn("Nenhum usuário logado encontrado.");
    return;
  }

  // Atualizar a primeira letra do avatar (baseado no nome)
  const primeiraLetra = usuario.nome.charAt(0).toUpperCase();
  
  // Atualizar o avatar pequeno (na header)
  const avatarPequeno = document.getElementById("profile-avatar");
  if (avatarPequeno) {
    avatarPequeno.textContent = primeiraLetra;
  }

  // Atualizar o avatar grande (no dropdown)
  const avatarGrande = document.querySelector(".profile-info-avatar");
  if (avatarGrande) {
    avatarGrande.textContent = primeiraLetra;
  }

  // Atualizar o nome do usuário
  const nomeElemento = document.querySelector(".profile-name");
  if (nomeElemento) {
    nomeElemento.textContent = usuario.nome;
  }

  // Atualizar o e-mail do usuário
  const emailElemento = document.querySelector(".profile-email");
  if (emailElemento) {
    emailElemento.textContent = usuario.email;
  }
}

/**
 * Inicializa o menu de perfil quando a página carrega
 */
document.addEventListener("DOMContentLoaded", function () {
  // Atualizar menu de perfil com dados do usuário logado
  atualizarMenuPerfil();

  // Configurar o comportamento do avatar e dropdown
  const avatar = document.getElementById("profile-avatar");
  const dropdown = document.getElementById("profile-dropdown");

  if (avatar && dropdown) {
    // Abrir/fechar dropdown ao clicar no avatar
    avatar.addEventListener("click", () => {
      dropdown.classList.toggle("show");
    });

    // Fechar o dropdown se o usuário clicar fora dele
    window.addEventListener("click", (event) => {
      if (!event.target.matches("#profile-avatar") && !event.target.closest(".profile-dropdown")) {
        if (dropdown.classList.contains("show")) {
          dropdown.classList.remove("show");
        }
      }
    });

    // Fechar dropdown ao clicar em um item do menu
    const dropdownItems = dropdown.querySelectorAll(".dropdown-item");
    dropdownItems.forEach(item => {
      item.addEventListener("click", () => {
        dropdown.classList.remove("show");
      });
    });
  }

  // Configurar o botão de logout
  const logoutBtn = document.querySelector(".dropdown-item.logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // Limpar dados do usuário do localStorage
      localStorage.removeItem("user_id");
      localStorage.removeItem("medlar_user");
      // Redirecionar para a página de login
      window.location.href = "/public/html/login.html";
    });
  }
});
