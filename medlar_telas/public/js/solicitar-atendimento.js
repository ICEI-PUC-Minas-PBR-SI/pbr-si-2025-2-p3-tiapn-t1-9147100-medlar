// public/js/solicitar-atendimento.js
document.addEventListener("DOMContentLoaded", () => {
  const API_BASE = "http://localhost:3000";

  const form = document.querySelector(".appointment-form");
  const profissionalInput = document.getElementById("profissional");
  const servicoSelect = document.getElementById("servico");
  const valorServicoP = document.getElementById("valor-servico");
  const dataInput = document.getElementById("data");
  const horarioSelect = document.getElementById("horario");
  const metodoPagamentoSelect = document.getElementById("pagamento");

  let id_profissional = null;
  let nome_profissional = null;
  let servicosDisponiveis = [];

  // Paciente “logado” (simulação)
  const loggedInUser = {
    id_paciente: 1,
    nome: "Paciente Teste",
  };

  // =================== INIT ===================
  function init() {
    // pega dados que vêm da tela de busca: ?prof_id=..&prof_nome=..
    const urlParams = new URLSearchParams(window.location.search);
    id_profissional = urlParams.get("prof_id");
    nome_profissional = urlParams.get("prof_nome");

    if (nome_profissional) {
      // URLSearchParams já decodifica, mas deixei por segurança
      profissionalInput.value = decodeURIComponent(nome_profissional);
      profissionalInput.setAttribute("data-id", id_profissional);
    } else {
      profissionalInput.value = "Selecione um profissional na tela de busca";
    }

    // data mínima = hoje
    const today = new Date().toISOString().split("T")[0];
    dataInput.setAttribute("min", today);

    carregarServicos();

    servicoSelect.addEventListener("change", atualizarValorServico);
    dataInput.addEventListener("change", carregarDisponibilidade);
    form.addEventListener("submit", onSubmit);
  }

  // =================== SERVIÇOS ===================
  async function carregarServicos() {
    try {
      const response = await fetch(`${API_BASE}/api/servicos`);
      if (!response.ok) throw new Error("Falha ao carregar serviços.");

      servicosDisponiveis = await response.json();

      servicoSelect.innerHTML =
        '<option value="" disabled selected>Selecione um serviço</option>';

      servicosDisponiveis.forEach((servico) => {
        const id = servico.id_servico;
        const nome = servico.nome_servico || servico.nome || "Serviço";
        const valor =
          servico.valor_base ?? servico.preco ?? servico.preco_base ?? 0;

        const option = document.createElement("option");
        option.value = id;
        option.textContent = `${nome} (R$ ${Number(valor)
          .toFixed(2)
          .replace(".", ",")})`;
        option.dataset.valor = valor;
        servicoSelect.appendChild(option);
      });
    } catch (error) {
      console.error("Erro ao carregar serviços:", error);
      alert("Erro ao carregar a lista de serviços.");
    }
  }

  function atualizarValorServico() {
    const idServico = servicoSelect.value;
    const servico = servicosDisponiveis.find(
      (s) => String(s.id_servico) === String(idServico)
    );

    const valor =
      servico?.valor_base ?? servico?.preco ?? servico?.preco_base ?? null;

    if (valor != null) {
      valorServicoP.textContent = `Valor: R$ ${Number(valor)
        .toFixed(2)
        .replace(".", ",")}`;
    } else {
      valorServicoP.textContent = "";
    }
  }

  // =================== DISPONIBILIDADE / HORÁRIOS ===================
  async function carregarDisponibilidade() {
    const dataSelecionada = dataInput.value;
    if (!id_profissional || !dataSelecionada) return;

    const dataInicio = `${dataSelecionada}T00:00:00`;
    const dataFim = `${dataSelecionada}T23:59:59`;

    horarioSelect.innerHTML =
      '<option value="" disabled selected>Carregando horários...</option>';

    try {
      const url =
        `${API_BASE}/api/agendamentos/disponibilidade` +
        `?id_profissional=${id_profissional}` +
        `&data_inicio=${dataInicio}` +
        `&data_fim=${dataFim}`;

      console.log("Buscando disponibilidade em:", url);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Falha na API de disponibilidade (HTTP ${response.status})`
        );
      }

      const dados = await response.json();
      const {
        dias_disponiveis = [],
        hora_inicio = "07:00",
        hora_fim = "19:00",
        horarios_ocupados = [],
      } = dados;

      // 0 = dom, 1 = seg... 6 = sáb  → backend usa 1–7 (seg–dom)
      const diaSemana = new Date(dataSelecionada).getDay();
      const diaSemanaApi = diaSemana === 0 ? 7 : diaSemana;

      if (
        dias_disponiveis.length > 0 &&
        !dias_disponiveis.includes(diaSemanaApi)
      ) {
        horarioSelect.innerHTML =
          '<option value="" disabled selected>Profissional não atende neste dia.</option>';
        return;
      }

      // gera slots 07:00–19:00 de 30 em 30 (ou conforme backend mandar)
      const slots = gerarSlots(hora_inicio, hora_fim, 30);

      const ocupados = (horarios_ocupados || []).map((dt) =>
        new Date(dt).toTimeString().substring(0, 5)
      );

      preencherHorarios(slots, ocupados);
    } catch (error) {
      console.warn(
        "Erro ao carregar disponibilidade, usando horários padrão:",
        error
      );

      // fallback: sempre 07:00–19:00 de 30 em 30
      const slots = gerarSlots("07:00", "19:00", 30);
      preencherHorarios(slots, []);
    }
  }

  function preencherHorarios(slots, horariosOcupados) {
    horarioSelect.innerHTML =
      '<option value="" disabled selected>Selecione um horário</option>';

    slots.forEach((slot) => {
      if (!horariosOcupados.includes(slot)) {
        const option = document.createElement("option");
        option.value = slot;
        option.textContent = slot;
        horarioSelect.appendChild(option);
      }
    });

    if (horarioSelect.options.length === 1) {
      horarioSelect.innerHTML =
        '<option value="" disabled selected>Nenhum horário disponível neste dia.</option>';
    }
  }

  // gera horários HH:MM de X em X minutos
  function gerarSlots(inicio, fim, intervaloMinutos) {
    const slots = [];
    let [hInicio, mInicio] = inicio.split(":").map(Number);
    let [hFim, mFim] = fim.split(":").map(Number);

    let currentTime = new Date(0, 0, 0, hInicio, mInicio);
    const endTime = new Date(0, 0, 0, hFim, mFim);

    while (currentTime < endTime) {
      const hora = String(currentTime.getHours()).padStart(2, "0");
      const minuto = String(currentTime.getMinutes()).padStart(2, "0");
      slots.push(`${hora}:${minuto}`);
      currentTime.setMinutes(currentTime.getMinutes() + intervaloMinutos);
    }
    return slots;
  }

  // =================== SUBMIT ===================
  async function onSubmit(e) {
    e.preventDefault();

    if (!id_profissional) {
      alert("Por favor, selecione um profissional na tela de busca.");
      return;
    }

    const id_servico = servicoSelect.value;
    const data = dataInput.value;
    const horario = horarioSelect.value;
    const metodo_pagamento = metodoPagamentoSelect.value;

    if (!id_servico || !data || !horario || !metodo_pagamento) {
      alert(
        "Por favor, preencha serviço, data, horário e método de pagamento."
      );
      return;
    }

    const dataHora = `${data} ${horario}:00`;

    // Determina se o pagamento é requerido
    // Se o método for "Dinheiro na visita", assumimos que o pagamento não é requerido de imediato
    const requer_pagamento = metodo_pagamento !== "Dinheiro na visita";

    const payload = {
      id_paciente: loggedInUser.id_paciente,
      id_profissional: Number(id_profissional),
      id_servico: Number(id_servico),
      data_hora: dataHora,
      // O backend não usa metodo_pagamento, mas o front pode precisar para a lógica
      // Enviamos o novo parâmetro para o backend
      requer_pagamento: requer_pagamento,
    };

    console.log("Enviando agendamento:", payload);

    try {
      const response = await fetch(`${API_BASE}/api/agendamentos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("Resposta do agendamento:", result);

      if (response.ok) {
        const valor =
          result.valor ??
          (() => {
            const s = servicosDisponiveis.find(
              (srv) => String(srv.id_servico) === String(id_servico)
            );
            return s?.valor_base ?? s?.preco ?? s?.preco_base ?? 0;
          })();

        const status = result.status || "pendente";

        // --- NOVO TRATAMENTO DE RESPOSTA ---
        if (status === "confirmado") {
          alert(
            `✅ Agendamento CONFIRMADO para ${decodeURIComponent(
              nome_profissional || ""
            )} em ${data} às ${horario}.\n` +
              `Valor: R$ ${Number(valor).toFixed(2).replace(".", ",")}.`
          );
          window.location.href = "/public/html/agenda-paciente.html";
        } else if (status === "pendente_pagamento" && result.payment_link) {
          alert(
            `Agendamento criado. Redirecionando para pagamento do valor de R$ ${Number(
              valor
            )
              .toFixed(2)
              .replace(".", ",")}.`
          );
          window.location.href = result.payment_link;
        } else {
          // Fallback para status inesperado
          alert(
            `Agendamento criado com status: ${status}. Verifique sua agenda.`
          );
          window.location.href = "/public/html/agenda-paciente.html";
        }
        // --- FIM NOVO TRATAMENTO DE RESPOSTA ---
      } else {
        alert(`Erro ao agendar: ${result.error || "Falha desconhecida."}`);
        if (result.horas_restantes) {
          alert(`Horas restantes: ${result.horas_restantes} (Prazo de 12h expirado).`);
        }
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      alert("Erro de conexão ao tentar agendar.");
    }
  }

  // Start
  init();
});
