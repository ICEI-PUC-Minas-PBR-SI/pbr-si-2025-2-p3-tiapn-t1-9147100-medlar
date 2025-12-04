const BASE_URL = "http://localhost:3000";

/* ========================= Helpers de UI ========================= */
function showAlert(msg, tipo = "ok") {
  const el = document.getElementById("alerta");
  if (!el) return;

  el.textContent = msg;
  el.style.display = "block";
  el.style.padding = "10px 14px";
  el.style.margin = "10px";
  el.style.borderRadius = "8px";
  el.style.fontWeight = "600";
  el.style.fontFamily = "system-ui, sans-serif";
  el.style.boxShadow = "0 2px 8px rgba(0,0,0,.08)";

  if (tipo === "erro") {
    el.style.background = "#ffe8e8";
    el.style.color = "#8a1f1f";
    el.style.border = "1px solid #f2bcbc";
  } else if (tipo === "ok") {
    el.style.background = "#e8fff1";
    el.style.color = "#0b5d2a";
    el.style.border = "1px solid #b8efcd";
  } else {
    el.style.background = "#eef3ff";
    el.style.color = "#263a8a";
    el.style.border = "1px solid #c9d6ff";
  }

  clearTimeout(showAlert._t);
  showAlert._t = setTimeout(() => {
    el.style.display = "none";
  }, 4000);
}

function setFormDisabled(form, disabled) {
  form.querySelectorAll("button, input, select, textarea").forEach((el) => {
    if (el.tagName === "BUTTON") {
      el.disabled = disabled && el.classList.contains("btn-primary");
    }
  });
}

/* ============ Controle de etapa (para evitar voltar p/ tela-inicio) ============ */
function salvarEstadoCadastro(tipo, etapa) {
  const estado = {
    tipo: tipo || null,
    etapa: etapa || null,
    timestamp: Date.now(),
  };
  sessionStorage.setItem("medlar_estado_cadastro", JSON.stringify(estado));
}

function lerEstadoCadastro() {
  try {
    const raw = sessionStorage.getItem("medlar_estado_cadastro");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function limparEstadoCadastro() {
  sessionStorage.removeItem("medlar_estado_cadastro");
}

/* ==================== Utilitários / Máscaras ==================== */
const onlyDigits = (s) => (s || "").toString().replace(/\D/g, "");

function isValidCPF(cpfStr) {
  return onlyDigits(cpfStr).length === 11;
}

function isValidPhone(p) {
  const d = onlyDigits(p);
  return d.length >= 10 && d.length <= 11;
}

function isValidEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((e || "").trim());
}

function aplicarMascaraCPF(input) {
  let v = input.value.replace(/\D/g, "").slice(0, 11);
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  input.value = v;
}

function aplicarMascaraTelefone(input) {
  let v = input.value.replace(/\D/g, "").slice(0, 11);
  v =
    v.length > 10
      ? v.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3")
      : v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  input.value = v;
}

/* ======= Data (DD/MM/AAAA): máscara + validação + conversão ======= */
function aplicarMascaraData(input) {
  let v = input.value.replace(/\D/g, "").slice(0, 8);
  if (v.length >= 5) v = v.replace(/^(\d{2})(\d{2})(\d{1,4}).*/, "$1/$2/$3");
  else if (v.length >= 3) v = v.replace(/^(\d{2})(\d{1,2}).*/, "$1/$2");
  input.value = v;
}

function ddmmyyyyToISO(str) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec((str || "").trim());
  if (!m) return null;
  const [, dd, mm, yyyy] = m;
  const d = Number(dd);
  const mon = Number(mm);
  const y = Number(yyyy);

  if (y < 1900 || y > 2100 || mon < 1 || mon > 12 || d < 1 || d > 31) return null;

  const iso = `${yyyy}-${mm}-${dd}`;
  const dt = new Date(iso);

  if (Number.isNaN(dt.getTime())) return null;
  if (
    dt.getUTCFullYear() !== y ||
    dt.getUTCMonth() + 1 !== mon ||
    dt.getUTCDate() !== d
  ) {
    return null;
  }
  return iso;
}

/* ================= CEP (ViaCEP) ================= */
function normalizarCEP(cep) {
  return (cep || "").replace(/\D/g, "").slice(0, 8);
}

async function viaCep(cep) {
  const puro = normalizarCEP(cep);
  if (puro.length !== 8) throw new Error("CEP inválido");
  const resp = await fetch(`https://viacep.com.br/ws/${puro}/json/`);
  if (!resp.ok) throw new Error("Falha ao consultar o CEP");
  const data = await resp.json();
  if (data.erro) throw new Error("CEP não encontrado");
  return {
    cidadeUf: `${data.localidade || ""}/${data.uf || ""}`,
    bairro: data.bairro || "",
    logradouro: data.logradouro || "",
  };
}

function wireViaCep(cepId, cidadeId, bairroId, ruaId) {
  const cep = document.getElementById(cepId);
  const cidade = document.getElementById(cidadeId);
  const bairro = document.getElementById(bairroId);
  const rua = document.getElementById(ruaId);
  if (!cep) return;

  cep.addEventListener("input", () => {
    cep.value = cep.value.replace(/\D/g, "").slice(0, 8);
  });

  cep.addEventListener("blur", async () => {
    try {
      if (normalizarCEP(cep.value).length !== 8) return;
      const info = await viaCep(cep.value);
      if (cidade) cidade.value = info.cidadeUf || "";
      if (bairro && !bairro.value) bairro.value = info.bairro || "";
      if (rua && !rua.value) rua.value = info.logradouro || "";
    } catch (e) {
      console.warn("ViaCEP:", e.message);
      showAlert("Não foi possível preencher pelo CEP. Verifique o número.", "erro");
      if (cidade) cidade.value = "";
    }
  });
}

function initCEPListeners() {
  wireViaCep("cep_prof", "cidade_prof", "bairro_prof", "endereco_prof");
  wireViaCep("cep_pac", "cidade_pac", "bairro_pac", "endereco_pac");
}

/* ==================== Navegação de telas ==================== */
function mostrarTela(idTela) {
  document.querySelectorAll(".tela").forEach((t) => t.classList.remove("ativa"));
  const el = document.getElementById(idTela);
  if (el) {
    el.classList.add("ativa");
    window.scrollTo(0, 0);
  }
}

/* ==================== Coleta e validação ==================== */
function coletarDadosFormulario(form) {
  const data = {};
  form.querySelectorAll("input, select, textarea").forEach((input) => {
    if (input.type !== "file") data[input.name] = (input.value || "").trim();
  });
  return data;
}

function validarSenha(senhaId, confirmaSenhaId, erroMsgId) {
  const senha = document.getElementById(senhaId)?.value || "";
  const confirma = document.getElementById(confirmaSenhaId)?.value || "";
  const msgEl = document.getElementById(erroMsgId);

  if (senha !== confirma) {
    if (msgEl) msgEl.textContent = "As senhas não coincidem.";
    return false;
  }
  if (msgEl) msgEl.textContent = "";
  return true;
}

async function enviarParaAPI(url, payload) {
  const resp = await fetch(`${BASE_URL}${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let body = null;
  try {
    body = await resp.json();
  } catch (_) {
    body = null;
  }

  if (!resp.ok) {
    const mensagem =
      body && body.error ? body.error : `Falha ao enviar: HTTP ${resp.status}`;
    const erro = new Error(mensagem);
    erro.status = resp.status;
    throw erro;
  }

  return body;
}

// Envia cadastro de PROFISSIONAL com arquivos (FormData)
async function enviarProfissionalComArquivos(form, dados) {
  const formData = new FormData(form);

  // monta endereço completo: rua + número + bairro + complemento
  const rua = dados.endereco_prof || "";
  const numero = dados.numero_prof ? `, ${dados.numero_prof}` : "";
  const bairro = dados.bairro_prof ? ` - ${dados.bairro_prof}` : "";
  const complemento = dados.complemento_prof ? ` (${dados.complemento_prof})` : "";
  const enderecoCompleto = `${rua}${numero}${bairro}${complemento}`.trim();

  formData.set("endereco_prof", enderecoCompleto);

  // junta passagens + área de atuação em um resumo
  const passagens = dados.passagens_profissionais || "";
  const areas = dados.areas_atendimento || "";
  if (passagens || areas) {
    const separador = passagens && areas ? "\n\nÁrea de atuação: " : "";
    const resumo = `${passagens}${separador}${areas}`.trim();
    formData.set("resumo_profissional", resumo);
  }

  if (dados.data_nascimento_prof_iso) {
    formData.set("data_nascimento_prof", dados.data_nascimento_prof_iso);
  }

  const resp = await fetch(`${BASE_URL}/api/profissionais`, {
    method: "POST",
    body: formData,
  });

  let body = null;
  try {
    body = await resp.json();
  } catch (_) {
    body = null;
  }

  if (!resp.ok) {
    const mensagem =
      body && body.error ? body.error : `Falha ao enviar: HTTP ${resp.status}`;
    const erro = new Error(mensagem);
    erro.status = resp.status;
    throw erro;
  }

  return body;
}

/* ====== Validações por tipo ====== */
function validarCamposProfissional(d) {
  if (!d.nome_completo_prof || d.nome_completo_prof.length < 2) {
    showAlert("Informe o primeiro nome.", "erro");
    return false;
  }
  if (!d.sobrenome_prof || d.sobrenome_prof.length < 2) {
    showAlert("Informe o sobrenome.", "erro");
    return false;
  }
  if (!d.registro_profissional) {
    showAlert("Informe o CRM/COREN.", "erro");
    return false;
  }
  if (!isValidCPF(d.cpf_prof)) {
    showAlert("CPF do profissional inválido.", "erro");
    return false;
  }
  if (!isValidEmail(d.email_prof)) {
    showAlert("E-mail do profissional inválido.", "erro");
    return false;
  }
  if (!isValidPhone(d.telefone_prof)) {
    showAlert("Telefone do profissional inválido.", "erro");
    return false;
  }
  if (!d.senha_prof || d.senha_prof.length < 6) {
    showAlert("Defina uma senha (mín. 6).", "erro");
    return false;
  }

  // exige experiência profissional e área de atuação
  if (!d.passagens_profissionais || d.passagens_profissionais.length < 5) {
    showAlert("Descreva suas passagens profissionais.", "erro");
    return false;
  }
  if (!d.areas_atendimento || d.areas_atendimento.length < 5) {
    showAlert("Descreva sua área de atuação.", "erro");
    return false;
  }

  const iso = ddmmyyyyToISO(d.data_nascimento_prof);
  if (!iso) {
    showAlert("Data de nascimento do profissional inválida (dd/mm/aaaa).", "erro");
    return false;
  }
  d.data_nascimento_prof_iso = iso;
  return true;
}

function validarCamposPaciente(d) {
  if (!d.nome_completo_pac || d.nome_completo_pac.length < 3) {
    showAlert("Informe o nome completo do paciente.", "erro");
    return false;
  }
  if (!isValidCPF(d.cpf_pac)) {
    showAlert("CPF do paciente inválido.", "erro");
    return false;
  }
  if (!isValidEmail(d.email_pac)) {
    showAlert("E-mail do paciente inválido.", "erro");
    return false;
  }
  if (!isValidPhone(d.telefone_pac)) {
    showAlert("Telefone do paciente inválido.", "erro");
    return false;
  }
  if (!d.senha_pac || d.senha_pac.length < 6) {
    showAlert("Defina uma senha (mín. 6).", "erro");
    return false;
  }

  // exige histórico médico
  if (!d.historico_medico_pac || d.historico_medico_pac.length < 5) {
    showAlert("Informe um breve histórico médico / alergias.", "erro");
    return false;
  }

  const iso = ddmmyyyyToISO(d.data_nascimento_pac);
  if (!iso) {
    showAlert("Data de nascimento do paciente inválida (dd/mm/aaaa).", "erro");
    return false;
  }
  d.data_nascimento_pac_iso = iso;
  return true;
}

/* ====== Validação específica dos DOCUMENTOS (profissional) ====== */
function validarDocumentosProfissional() {
  const doc1 = document.getElementById("doc1_prof");
  const doc2 = document.getElementById("doc2_prof");
  const doc3 = document.getElementById("doc3_prof");
  const erroDocs = document.getElementById("erro-docs-prof");

  const ok1 = doc1 && doc1.files && doc1.files.length > 0;
  const ok2 = doc2 && doc2.files && doc2.files.length > 0;
  const ok3 = doc3 && doc3.files && doc3.files.length > 0;

  if (!ok1 || !ok2 || !ok3) {
    if (erroDocs) {
      erroDocs.textContent =
        "Envie os 3 documentos obrigatórios (RG, CPF e foto de perfil).";
    }
    showAlert("Envie os 3 documentos obrigatórios.", "erro");
    return false;
  }

  if (erroDocs) erroDocs.textContent = "";
  return true;
}

/* ==================== Fluxo principal ==================== */
async function processarCadastro(tipoCadastro) {
  console.log("[processarCadastro] Iniciando fluxo para:", tipoCadastro);

  const formId =
    tipoCadastro === "Profissional" ? "form-profissional" : "form-paciente";
  const form = document.getElementById(formId);

  if (!form) {
    console.error("[processarCadastro] Formulário não encontrado:", formId);
    showAlert("Erro interno: formulário não encontrado.", "erro");
    return;
  }

  // Senha
  const okSenha =
    tipoCadastro === "Profissional"
      ? validarSenha("senha_prof", "confirma_senha_prof", "erro-confirma-senha-prof")
      : validarSenha("senha_pac", "confirma_senha_pac", "erro-confirma-senha-pac");

  if (!okSenha) {
    showAlert("As senhas não coincidem.", "erro");
    return;
  }

  // Documentos (apenas profissional)
  if (tipoCadastro === "Profissional" && !validarDocumentosProfissional()) {
    return;
  }

  // Validação nativa HTML5
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const dados = coletarDadosFormulario(form);

  if (tipoCadastro === "Profissional" && !validarCamposProfissional(dados)) return;
  if (tipoCadastro === "Paciente" && !validarCamposPaciente(dados)) return;

  try {
    setFormDisabled(form, true);
    showAlert("Enviando dados...", "info");
    console.log("[processarCadastro] Dados validados, enviando para API...", dados);

    if (tipoCadastro === "Profissional") {
      await enviarProfissionalComArquivos(form, dados);
      console.log("[processarCadastro] Resposta OK do servidor (profissional)");
    } else {
      // monta endereço completo do paciente: rua + número + bairro + complemento
      const rua = dados.endereco_pac || "";
      const numero = dados.numero_pac ? `, ${dados.numero_pac}` : "";
      const bairro = dados.bairro_pac ? ` - ${dados.bairro_pac}` : "";
      const complemento = dados.complemento_pac ? ` (${dados.complemento_pac})` : "";
      const enderecoFinal = `${rua}${numero}${bairro}${complemento}`.trim();

      const payloadPac = {
        nome_completo_pac: dados.nome_completo_pac,
        cpf_pac: dados.cpf_pac,
        data_nascimento_pac: dados.data_nascimento_pac_iso,
        email_pac: dados.email_pac,
        telefone_pac: dados.telefone_pac,
        cep_pac: dados.cep_pac,
        cidade_pac: dados.cidade_pac,
        endereco_pac: enderecoFinal,
        complemento_pac: dados.complemento_pac,
        historico_medico_pac: dados.historico_medico_pac || null,
        senha_pac: dados.senha_pac,
      };

      await enviarParaAPI("/api/pacientes", payloadPac);
      console.log("[processarCadastro] Resposta OK do servidor (paciente)");
    }

    // SUCESSO → telas de validação / notificação
    console.log("[processarCadastro] Sucesso! Mostrando tela de validação...");
    showAlert(`Cadastro de ${tipoCadastro} salvo com sucesso!`, "ok");

    // marca que estamos na etapa de validação
    salvarEstadoCadastro(tipoCadastro, "validacao");

    mostrarTela("tela-validacao");
    const statusValidacao = document.getElementById("status_validacao");
    if (statusValidacao) statusValidacao.textContent = "Em validação...";

    setTimeout(() => {
      console.log("[processarCadastro] Mudando para tela de notificação...");
      if (statusValidacao)
        statusValidacao.textContent = "Validação concluída com sucesso!";

      mostrarTela("tela-notificacao");

      const elData = document.getElementById("data_cadastro");
      if (elData) elData.textContent = new Date().toLocaleString("pt-BR");

      const elMsg = document.getElementById("mensagem_notificacao");
      if (elMsg)
        elMsg.textContent = `Seu cadastro de ${tipoCadastro} foi concluído com sucesso!`;

      // etapa final
      salvarEstadoCadastro(tipoCadastro, "notificacao");
    }, 1200);
  } catch (erro) {
    console.error("ERRO FRONT:", erro);

    let msg = erro?.message || "Não foi possível salvar no servidor.";

    // Erro de validação/regra (ex: CPF duplicado) vindo como 400
    if (erro.status === 400) {
      if (msg.toLowerCase().includes("cpf")) {
        msg = "Já existe um profissional cadastrado com este CPF.";
      }
      showAlert(msg, "erro");
      // NÃO troca de tela, usuário fica no formulário
      return;
    }

    // Erro genérico
    showAlert(
      "Não foi possível salvar no servidor. Tente novamente em instantes.",
      "erro"
    );
    return;
  } finally {
    setFormDisabled(form, false);
  }
}

/* ==================== Botões e inicialização ==================== */
function validarFormularioProfissional() {
  processarCadastro("Profissional");
}

function validarFormularioPaciente() {
  processarCadastro("Paciente");
}

function finalizarProcesso() {
  mostrarTela("tela-fim");
}

function reiniciarProcesso() {
  document.getElementById("form-profissional")?.reset();
  document.getElementById("form-paciente")?.reset();
  limparEstadoCadastro();
  mostrarTela("tela-inicio");
}

const btnIniciar = document.getElementById("btn-iniciar-cadastro");
if (btnIniciar) {
  btnIniciar.addEventListener("click", () => {
    const tipo = document.getElementById("tipo_cadastro")?.value;
    if (tipo === "profissional") mostrarTela("tela-profissional");
    else if (tipo === "paciente") mostrarTela("tela-paciente");
    else {
      showAlert("Por favor, selecione um tipo de cadastro.", "erro");
      alert("Selecione um tipo de cadastro.");
    }
  });
}

function scrollToTop() {
  window.scrollTo(0, 0);
}

/* ==================== onload: restaura etapa se recarregar ==================== */
window.onload = function () {
  const estado = lerEstadoCadastro();

  if (estado && estado.etapa === "validacao") {
    mostrarTela("tela-validacao");
    const statusValidacao = document.getElementById("status_validacao");
    if (statusValidacao) statusValidacao.textContent = "Em validação...";

    setTimeout(() => {
      if (statusValidacao)
        statusValidacao.textContent = "Validação concluída com sucesso!";

      mostrarTela("tela-notificacao");

      const elData = document.getElementById("data_cadastro");
      if (elData) elData.textContent = new Date().toLocaleString("pt-BR");

      const elMsg = document.getElementById("mensagem_notificacao");
      if (elMsg && estado.tipo)
        elMsg.textContent = `Seu cadastro de ${estado.tipo} foi concluído com sucesso!`;

      salvarEstadoCadastro(estado.tipo, "notificacao");
    }, 1200);
  } else if (estado && estado.etapa === "notificacao") {
    mostrarTela("tela-notificacao");

    const elData = document.getElementById("data_cadastro");
    if (elData) elData.textContent = new Date().toLocaleString("pt-BR");

    const elMsg = document.getElementById("mensagem_notificacao");
    if (elMsg && estado.tipo)
      elMsg.textContent = `Seu cadastro de ${estado.tipo} foi concluído com sucesso!`;
  } else {
    if (document.getElementById("tela-inicio")) mostrarTela("tela-inicio");
  }

  document
    .querySelectorAll("#cpf_pac, #cpf_prof")
    .forEach((el) => el?.addEventListener("input", () => aplicarMascaraCPF(el)));

  document
    .querySelectorAll("#telefone_pac, #telefone_prof")
    .forEach((el) =>
      el?.addEventListener("input", () => aplicarMascaraTelefone(el))
    );

  document
    .querySelectorAll("#data_nascimento_pac, #data_nascimento_prof")
    .forEach((el) =>
      el?.addEventListener("input", () => aplicarMascaraData(el))
    );

  initCEPListeners();

  document
    .querySelectorAll("#cep_pac, #cep_prof")
    .forEach((c) =>
      c?.addEventListener("input", () => {
        c.value = c.value.replace(/\D/g, "").slice(0, 8);
      })
    );
};

function mostrarNomeArquivo(event, spanId) {
  const arquivo = event.target.files[0];
  if (arquivo) {
    document.getElementById(spanId).textContent = arquivo.name;
  }
}
