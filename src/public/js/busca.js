const API_BASE = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  console.log("API_BASE:", API_BASE);

  let resultsSection = document.querySelector(".results-section");
  if (!resultsSection) {
    console.warn('".results-section" não encontrada, criando...');
    resultsSection = document.createElement("section");
    resultsSection.className = "results-section";
    (document.querySelector("main") || document.body).appendChild(
      resultsSection
    );
  }

  const searchButton = document.querySelector(".filter-btn");

  // Tenta pegar pelos IDs; se não tiver, cai para os elementos antigos (por classe)
  const specialtySelect =
    document.getElementById("filtro-especialidade") ||
    document.querySelector(".filter-select"); 

  const locationInput =
    document.getElementById("filtro-localizacao") ||
    document.querySelector(".filter-input");

  const disponSelect =
    document.getElementById("filtro-disponibilidade") ||
    document.querySelectorAll(".filter-select")[1] ||
    null;

  const priceRange =
    document.getElementById("filtro-preco") ||
    document.querySelector(".price-slider");

  const profileModal = document.getElementById("profileModal");
  const closeModalBtn = document.getElementById("closeModal");
  const modalFoto = document.getElementById("modalFoto");
  const modalNome = document.getElementById("modalNome");
  const modalSobrenome = document.getElementById("modalSobrenome");
  const modalRegistro = document.getElementById("modalRegistro");
  const modalEmail = document.getElementById("modalEmail");
  const modalTelefone = document.getElementById("modalTelefone");
  const modalExperiencia = document.getElementById("modalExperiencia");
  const modalDescricao = document.getElementById("modalDescricao");
  const modalDataNasc = document.getElementById("modalDataNasc");
  const modalAvaliacaoFinal = document.getElementById("modalAvaliacaoFinal");
  const modalLocalizacao = document.getElementById("modalLocalizacao");

  // ================= BUSCAR PROFISSIONAIS =================
  async function searchProfessionals(filtros = {}) {
    resultsSection.innerHTML = "<h2>Buscando profissionais...</h2>";

    try {
      const params = new URLSearchParams();

      // termo livre (se quiser usar no futuro)
      if (filtros.termo) {
        params.append("termo", filtros.termo);
      }

      // especialidade (se não for "Todos" / vazio)
      if (filtros.especialidade) {
        params.append("especialidade", filtros.especialidade);
      }

      // cidade / bairro digitado
      if (filtros.localizacao) {
        params.append("cidade", filtros.localizacao);
      }

      // já deixamos preparado (por enquanto o backend ignora)
      if (filtros.disponibilidade) {
        params.append("disponibilidade", filtros.disponibilidade);
      }
      if (filtros.precoMax) {
        params.append("precoMax", filtros.precoMax);
      }

      const url = `${API_BASE}/api/busca?${params.toString()}`;
      console.log("Chamando:", url);

      const response = await fetch(url);

      const rawText = await response.text();
      console.log("Resposta bruta da API:", rawText);

      if (!response.ok) {
        let msg = "Falha desconhecida";
        try {
          const parsed = JSON.parse(rawText);
          msg = parsed.error || msg;
        } catch (_) {}
        resultsSection.innerHTML = `<h2>Erro na busca: ${msg}</h2>`;
        return;
      }

      let profissionais;
      try {
        profissionais = JSON.parse(rawText);
      } catch (e) {
        console.error("Erro ao interpretar JSON:", e);
        resultsSection.innerHTML =
          "<h2>Erro ao interpretar resposta da API.</h2>";

        const pre = document.createElement("pre");
        pre.style.fontSize = "11px";
        pre.style.whiteSpace = "pre-wrap";
        pre.style.marginTop = "10px";
        pre.textContent = rawText;
        resultsSection.appendChild(pre);
        return;
      }

      renderResults(profissionais);
    } catch (error) {
      console.error("Erro de REDE ao buscar profissionais:", error);
      resultsSection.innerHTML = `
          <h2>Erro de conexão ao buscar profissionais.</h2>
          <p style="font-size:13px;color:#555;">
            Detalhes: ${error.message || error}
          </p>`;
    }
  }

  // ================= AJUSTAR CAMINHO DA FOTO =================
  function normalizarFotoPerfil(caminhoBruto) {
    if (!caminhoBruto) {
      return "/public/img/avatar-default.png";
    }

    // "C:\\...\\public\\img\\profissionais\\foto.png"
    // -> "/public/img/profissionais/foto.png"
    return caminhoBruto.replace(/^.*public[\\/]/, "/public/");
  }

  // ================= EXTRAIR CIDADE / ESTADO DO ENDEREÇO =================
  function extrairCidadeEstado(endereco) {
    if (!endereco) return "Não informado";

    // 1) "Cidade/UF"
    const barraMatch = endereco.match(/([A-Za-zÀ-ÿ\s]+)\/([A-Z]{2})/);
    if (barraMatch) {
      const cidade = barraMatch[1].trim();
      const uf = barraMatch[2].trim();
      return `${cidade} / ${uf}`;
    }

    // 2) "Cidade - UF" (pega o último trecho)
    const hifenTodos = endereco.match(/([A-Za-zÀ-ÿ\s]+)\s*-\s*([A-Z]{2})/g);
    if (hifenTodos && hifenTodos.length > 0) {
      const ultimoTrecho = hifenTodos[hifenTodos.length - 1];
      const hifenMatch = /([A-Za-zÀ-ÿ\s]+)\s*-\s*([A-Z]{2})/.exec(ultimoTrecho);
      if (hifenMatch) {
        const cidade = hifenMatch[1].trim();
        const uf = hifenMatch[2].trim();
        return `${cidade} / ${uf}`;
      }
    }

    return endereco;
  }

  // ================= CALCULAR IDADE (se vier data_nascimento) =================
  function calcularIdade(dataNascStr) {
    if (!dataNascStr) return "Não informada";
    const d = new Date(dataNascStr);
    if (Number.isNaN(d.getTime())) return "Não informada";

    const hoje = new Date();
    let idade = hoje.getFullYear() - d.getFullYear();
    const m = hoje.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < d.getDate())) {
      idade--;
    }
    return `${idade} anos`;
  }

  // ================= RENDERIZAR RESULTADOS (CARDS) =================
  function renderResults(profissionais) {
    resultsSection.innerHTML = "";

    if (!profissionais || profissionais.length === 0) {
      resultsSection.innerHTML = "<h2>Nenhum profissional encontrado.</h2>";
      return;
    }

    profissionais.forEach((prof) => {
      const card = document.createElement("div");
      card.classList.add("professional-card");

      const fotoSrc = normalizarFotoPerfil(prof.foto_perfil);

      card.innerHTML = `
        <div class="professional-photo">
          <img src="${fotoSrc}" alt="${prof.nome}">
        </div>

        <div class="professional-info">
          <h3 class="professional-name">${prof.nome}</h3>
          <p class="professional-specialty">
            ${prof.especialidade || "Especialidade não informada"}
          </p>

          <div class="professional-rating">
            <span class="stars">★★★★★</span>
            <span class="rating-number">
              ${
                prof.avaliacao_media
                  ? Number(prof.avaliacao_media).toFixed(1) + " / 5"
                  : "Não avaliado ainda"
              }
            </span>
          </div>

          <div class="button-group">
            <button class="btn-primary profile-btn"
                    data-id="${prof.id_profissional}">
              Ver Perfil
            </button>

            <a href="/public/html/solicitar-atendimento.html?prof_id=${
              prof.id_profissional
            }&prof_nome=${encodeURIComponent(prof.nome)}"
               class="btn-secondary schedule-btn">
               Agendar Consulta
            </a>
          </div>
        </div>
      `;

      resultsSection.appendChild(card);
    });

    // ---- Clique em "Ver Perfil" -> preenche o modal ----
    document.querySelectorAll(".profile-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        const prof = profissionais.find((p) => p.id_profissional == id);
        if (!prof) return;

        const fotoSrc = normalizarFotoPerfil(prof.foto_perfil);
        const idade = calcularIdade(prof.data_nascimento);
        const cidadeEstado = extrairCidadeEstado(prof.endereco);

        const avaliacaoTexto = prof.avaliacao_media
          ? `${Number(prof.avaliacao_media).toFixed(1)} / 5`
          : "Não avaliado ainda";

        const partesNome = (prof.nome || "").split(" ");
        const primeiroNome = partesNome[0] || "";
        const sobrenome = partesNome.slice(1).join(" ") || "";

        if (modalFoto) modalFoto.src = fotoSrc;
        if (modalNome) modalNome.textContent = primeiroNome;
        if (modalSobrenome) modalSobrenome.textContent = sobrenome;
        if (modalRegistro)
          modalRegistro.textContent =
            prof.registro_profissional || "Não informado";
        if (modalEmail)
          modalEmail.textContent = prof.email || "Não informado";
        if (modalTelefone)
          modalTelefone.textContent = prof.telefone || "Não informado";

        if (modalLocalizacao) modalLocalizacao.textContent = cidadeEstado;

        if (modalExperiencia)
          modalExperiencia.textContent =
            prof.passagens_profissionais ||
            "Experiência não informada pelo profissional.";

        if (modalDescricao)
          modalDescricao.textContent =
            prof.especialidade ||
            `Atende na região de ${cidadeEstado}. Avaliação: ${avaliacaoTexto}`;

        // ======== Data de nascimento + idade ========
        if (modalDataNasc) {
          let dataNascBr = "Não informada";

          if (prof.data_nascimento) {
            const d = new Date(prof.data_nascimento);
            if (!Number.isNaN(d.getTime())) {
              dataNascBr = d.toLocaleDateString("pt-BR");
            }
          }

          const textoIdade =
            idade && idade !== "Não informada" ? ` (${idade})` : "";

          modalDataNasc.textContent = `${dataNascBr}${textoIdade}`;
        }

        // Avaliação final
        if (modalAvaliacaoFinal) {
          modalAvaliacaoFinal.textContent = avaliacaoTexto;
        }

        if (profileModal) {
          profileModal.style.display = "flex";
        }
      });
    });
  }

  // ================= BOTÃO BUSCAR =================
  if (searchButton && specialtySelect) {
    searchButton.addEventListener("click", () => {
      const especialidade =
        !specialtySelect.value || specialtySelect.value === "Todos"
          ? ""
          : specialtySelect.value;

      const filtros = {
        especialidade,
        localizacao: (locationInput?.value || "").trim(),
        disponibilidade: disponSelect?.value || "qualquer",
        precoMax: priceRange?.value || null,
      };

      console.log("Filtros usados na busca:", filtros);
      searchProfessionals(filtros);
    });
  }

  // ================= FECHAR MODAL =================
  if (closeModalBtn && profileModal) {
    closeModalBtn.addEventListener("click", () => {
      profileModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === profileModal) {
        profileModal.style.display = "none";
      }
    });
  }

  // ================= BUSCA INICIAL =================
  searchProfessionals({});
});
