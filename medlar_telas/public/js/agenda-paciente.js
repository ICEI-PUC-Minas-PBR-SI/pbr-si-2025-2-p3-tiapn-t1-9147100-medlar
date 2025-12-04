document.addEventListener("DOMContentLoaded", () => {
    const appointmentsList = document.getElementById("appointments-list");

    const API_BASE = "http://localhost:3000";

        // ==== elementos do calendário ====
    const calendarMonthEl = document.querySelector(".calendar-month");
    const calendarDaysEl = document.querySelector(".calendar-days");

    const NOME_MESES = [
        "Janeiro", "Fevereiro", "Março", "Abril",
        "Maio", "Junho", "Julho", "Agosto",
        "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    // Monta o grid do mês (ano, mês, dias que têm consulta, dia selecionado)
    function montarCalendario(ano, mesIndex, diasComConsulta = new Set(), diaSelecionado = null) {
        if (!calendarMonthEl || !calendarDaysEl) return;

        calendarMonthEl.textContent = `${NOME_MESES[mesIndex]} de ${ano}`;
        calendarDaysEl.innerHTML = "";

        const primeiroDiaMes = new Date(ano, mesIndex, 1);
        const diaSemanaInicio = primeiroDiaMes.getDay(); // 0 = Dom, 6 = Sáb
        const diasNoMes = new Date(ano, mesIndex + 1, 0).getDate();

        // espaços em branco antes do dia 1
        for (let i = 0; i < diaSemanaInicio; i++) {
            const vazio = document.createElement("div");
            vazio.classList.add("calendar-day", "empty");
            calendarDaysEl.appendChild(vazio);
        }

        // dias do mês
        for (let dia = 1; dia <= diasNoMes; dia++) {
            const diaEl = document.createElement("div");
            diaEl.classList.add("calendar-day");
            diaEl.textContent = dia;

            if (diasComConsulta.has(dia)) {
                diaEl.classList.add("has-appointment");
            }
            if (diaSelecionado && dia === diaSelecionado) {
                diaEl.classList.add("active"); // já tem estilo verdinho no CSS
            }

            calendarDaysEl.appendChild(diaEl);
        }
    }

    // Atualiza o calendário com base nos agendamentos do paciente
    function atualizarCalendario(agendamentos) {
        if (!calendarMonthEl || !calendarDaysEl) return;

        if (!agendamentos || agendamentos.length === 0) {
            // se não tiver consulta, mostra mês atual
            const hoje = new Date();
            montarCalendario(hoje.getFullYear(), hoje.getMonth(), new Set(), hoje.getDate());
            return;
        }

        // pega todas as datas válidas
        const datas = agendamentos
            .map(a => new Date(a.data_hora))
            .filter(d => !isNaN(d));

        if (datas.length === 0) return;

        // primeira consulta (mais antiga)
        datas.sort((a, b) => a - b);
        const primeira = datas[0];
        const ano = primeira.getFullYear();
        const mesIndex = primeira.getMonth();
        const diaPrimeira = primeira.getDate();

        // marca todos os dias desse mês que têm consulta
        const diasComConsulta = new Set(
            agendamentos
                .map(a => new Date(a.data_hora))
                .filter(d => !isNaN(d) &&
                    d.getFullYear() === ano &&
                    d.getMonth() === mesIndex)
                .map(d => d.getDate())
        );

        montarCalendario(ano, mesIndex, diasComConsulta, diaPrimeira);
    }


    // ================== OBTÉM ID DO PACIENTE LOGADO ==================
    function getLoggedPacienteId() {
        // 1) Tenta pegar o objeto completo salvo no login (medlar_user)
        try {
            const storedUser = localStorage.getItem("medlar_user");
            if (storedUser) {
                const user = JSON.parse(storedUser);

                // Se você salvou o tipo de usuário, garante que é paciente
                if (user && user.tipo === "paciente") {
                    if (user.id_paciente) return user.id_paciente;
                    if (user.id) return user.id;
                }

                // Caso não tenha tipo, tenta usar id_paciente ou id mesmo
                if (user && (user.id_paciente || user.id)) {
                    return user.id_paciente || user.id;
                }
            }
        } catch (e) {
            console.warn("Não foi possível ler medlar_user do localStorage:", e);
        }

        // 2) Fallback simples: algum id salvo separado
        const fallbackId = localStorage.getItem("user_id");
        if (fallbackId) return fallbackId;

        // 3) Último recurso: id 1 (apenas para testes locais)
        return 1;
    }

    const loggedInUser = {
        id_paciente: getLoggedPacienteId(),
    };

    // ================== BUSCAR AGENDAMENTOS ==================
    async function fetchAppointments() {
        appointmentsList.innerHTML = "<li>Carregando agendamentos...</li>";

        try {
            const url = `${API_BASE}/api/agendamentos/paciente/${loggedInUser.id_paciente}`;
            console.log("Buscando agendamentos do paciente em:", url);

            const response = await fetch(url);
            let agendamentos = [];

            try {
                agendamentos = await response.json();
            } catch (e) {
                console.error("Erro ao converter resposta da API em JSON:", e);
                appointmentsList.innerHTML =
                    "<li>Erro ao interpretar a resposta do servidor.</li>";
                return;
            }

            if (response.ok) {
                renderAppointments(agendamentos);
                atualizarCalendario(agendamentos);
            } else {
                console.error("Erro da API:", agendamentos);
                appointmentsList.innerHTML = `<li>Erro ao carregar agendamentos: ${
                    agendamentos.error || "Erro desconhecido."
                }</li>`;
            }
        } catch (error) {
            console.error("Erro ao buscar agendamentos:", error);
            appointmentsList.innerHTML =
                "<li>Erro de conexão ao buscar agendamentos.</li>";
        }
    }
    document.addEventListener("DOMContentLoaded", () => {
    
    });

        // ... (renderAppointments aqui em cima)

    // ================== NOVO AGENDAMENTO ==================
    const newAppointmentBtn = document.querySelector(".new-appointment-btn");

    if (newAppointmentBtn) {
        newAppointmentBtn.addEventListener("click", () => {
            window.location.href = "/public/html/buscar-profissionais.html";
        });
    }

    // Carrega ao entrar na tela
    fetchAppointments();


    // ================== CANCELAR AGENDAMENTO ==================
async function cancelAppointment(id_agendamento) {
    if (!confirm("Tem certeza que deseja cancelar este agendamento?")) {
        return;
    }

    try {
        const response = await fetch(
            `${API_BASE}/api/agendamentos/cancelar/${id_agendamento}`,
            { method: "PUT" }
        );

        const result = await response.json();

        if (response.ok) {
            alert("Agendamento cancelado com sucesso!");
            fetchAppointments(); // Recarrega a lista
        } else {
            alert(`Erro ao cancelar agendamento: ${result.error || "Erro desconhecido"}`);
        }
    } catch (error) {
        console.error("Erro ao cancelar agendamento:", error);
        alert("Erro de conexão ao tentar cancelar o agendamento.");
    }
}

// ================== RENDERIZAR LISTA ==================
    function renderAppointments(agendamentos) {
        appointmentsList.innerHTML = "";

        if (!agendamentos || agendamentos.length === 0) {
            appointmentsList.innerHTML =
                "<li>Nenhum agendamento encontrado.</li>";
            return;
        }

        agendamentos.forEach((agendamento) => {
            const li = document.createElement("li");
            li.classList.add("appointment-item");

            const dataHora = new Date(agendamento.data_hora);
            const dataFormatada = dataHora.toLocaleDateString("pt-BR");
            const horaFormatada = dataHora.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
            });

            const valorFormatado = parseFloat(agendamento.valor || 0)
                .toFixed(2)
                .replace(".", ",");

            let statusClass = "";
            let statusText = "";
            let pagamentoInfo = "";

            switch (agendamento.status) {
                case "pendente":
                    statusClass = "status-pending";
                    statusText = "Pendente ⏳";
                    pagamentoInfo =
                        "<span class='payment-info'>Pagamento: aguardando</span>";
                    break;

                case "confirmado":
                    statusClass = "status-accepted";
                    statusText = "Confirmado ✅";
                    pagamentoInfo = `
                        <span class="payment-info">
                            Pagamento: ${
                                agendamento.status_pagamento === "aprovado"
                                    ? "Aprovado"
                                    : "Pendente"
                            }
                        </span>
                    `;
                    break;

                case "concluido":
                    statusClass = "status-accepted";
                    statusText = "Concluído ✅";
                    pagamentoInfo =
                        "<span class='payment-info'>Atendimento concluído</span>";
                    
                    // Adiciona a opção de avaliação
                    // O botão será adicionado no bloco de ações
                    break;

                case "rejeitado":
                case "cancelado":
                    statusClass = "status-rejected";
                    statusText = "Cancelado ❌";
                    pagamentoInfo =
                        "<span class='payment-info'>Consulta não realizada</span>";
                    break;

                default:
                    statusClass = "status-pending";
                    statusText =
                        agendamento.status || "Status não informado";
                    break;
            }

            li.innerHTML = `
                <div class="appointment-details">
                    <span class="appointment-date">
                        ${dataFormatada} às ${horaFormatada}
                    </span>

                    <span class="appointment-professional">
                        Profissional: ${agendamento.nome_profissional || "-"} 
                        ${
                            agendamento.especialidade_profissional
                                ? `(${agendamento.especialidade_profissional})`
                                : ""
                        }
                    </span>

                    <span class="appointment-service">
                        Serviço: ${agendamento.servico || "-"}
                    </span>

                    <span class="appointment-price">
                        Valor: R$ ${valorFormatado}
                    </span>

                    ${pagamentoInfo}
                </div>

                <div class="appointment-actions">
	                    <span class="appointment-status ${statusClass}">
	                        ${statusText}
	                    </span>
	                    ${
	                        (agendamento.status === "pendente" || agendamento.status === "confirmado")
	                            ? `<button class="btn-cancel-paciente" data-id="${agendamento.id_agendamento}">Cancelar Consulta</button>`
	                            : ""
	                    }
	                    ${
	                        agendamento.status === "concluido"
	                            ? `<button class="btn-avaliar-paciente" data-id="${agendamento.id_agendamento}" data-prof-id="${agendamento.id_profissional}">Avaliar Profissional</button>`
	                            : ""
	                    }
	                </div>
            `;

            appointmentsList.appendChild(li);
        });

	        // Adiciona listeners aos botões de cancelamento
	        document.querySelectorAll(".btn-cancel-paciente").forEach((btn) => {
	            btn.addEventListener("click", () => {
	                cancelAppointment(btn.dataset.id);
	            });
	        });

	        // Adiciona listeners aos botões de avaliação
	        document.querySelectorAll(".btn-avaliar-paciente").forEach((btn) => {
	            btn.addEventListener("click", () => {
	                const id_agendamento = btn.dataset.id;
	                const id_profissional = btn.dataset.profId;
	                promptForRating(id_agendamento, id_profissional);
	            });
	        });
	    }

	    // ================== FUNÇÃO DE AVALIAÇÃO ==================
	    async function promptForRating(id_agendamento, id_profissional) {
	        const nota = prompt("Por favor, avalie o profissional com uma nota de 1 a 5:");
	
	        if (nota === null) return; // Cancelou
	
	        const notaNumerica = parseInt(nota);
	
	        if (isNaN(notaNumerica) || notaNumerica < 1 || notaNumerica > 5) {
	            alert("Nota inválida. Por favor, insira um número entre 1 e 5.");
	            return;
	        }
	
	        const comentario = prompt("Opcional: Deixe um comentário sobre o atendimento:");
	
	        try {
	            const payload = {
	                id_paciente: loggedInUser.id_paciente,
	                nota: notaNumerica,
	                comentario: comentario,
	            };
	
	            const response = await fetch(
	                `${API_BASE}/api/agendamentos/avaliar/${id_agendamento}`,
	                {
	                    method: "POST",
	                    headers: { "Content-Type": "application/json" },
	                    body: JSON.stringify(payload),
	                }
	            );
	
	            const result = await response.json();
	
	            if (response.ok) {
	                alert("✅ Avaliação registrada com sucesso! Obrigado por sua opinião.");
	                fetchAppointments(); // Recarrega a lista para remover o botão
	            } else {
	                alert(`Erro ao avaliar: ${result.error || "Erro desconhecido"}`);
	            }
	        } catch (error) {
	            console.error("Erro ao enviar avaliação:", error);
	            alert("Erro de conexão ao tentar enviar a avaliação.");
	        }
	    }

    // Carrega ao entrar na tela
    fetchAppointments();
});
