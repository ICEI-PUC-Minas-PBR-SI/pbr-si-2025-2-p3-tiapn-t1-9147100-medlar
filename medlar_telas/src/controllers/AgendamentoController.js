// src/controllers/AgendamentoController.js
const AgendamentoModel = require("../models/AgendamentoModel");
const mercadopago = require("../config/mercadopago");

const AgendamentoController = {
  /**
   * Cria uma nova solicitação de agendamento + pagamento.
   * Fluxo:
   *  1) Busca valor do serviço
   *  2) Cria agendamento com status 'pendente' ou 'confirmado' (dependendo de requer_pagamento)
   *  3) Se requer_pagamento=true: Cria preferência de pagamento no Mercado Pago.
   *  4) Se requer_pagamento=true: Cria registro de pagamento no DB com status 'pendente'.
   *  5) Retorna dados de pagamento (link) para o frontend ou confirmação direta.
   */
  async solicitar(req, res) {
    try {
      const {
        id_paciente,
        id_profissional,
        data_hora,
        id_servico,
        requer_pagamento = true, // Por padrão, requer pagamento (mantém comportamento atual)
        // O método de pagamento será escolhido no checkout do MP,
        // mas podemos usar o campo para dados do pagador se necessário.
      } = req.body || {};

      if (
        !id_paciente ||
        !id_profissional ||
        !data_hora ||
        !id_servico
      ) {
        return res
          .status(400)
          .json({ error: "Campos obrigatórios faltando (id_paciente, id_profissional, data_hora, id_servico)." });
      }

      // 1) Buscar o valor do serviço
      const servicoData = await AgendamentoModel.buscarServicoPorId(
        id_servico
      );

      if (!servicoData || servicoData.preco == null) {
        return res.status(404).json({
          error: "Serviço não encontrado ou sem preço definido.",
        });
      }

      const valor = Number(servicoData.preco);
      const descricao = servicoData.nome_servico || "Agendamento de Serviço Médico";

      // Verificar se a data/hora da consulta permite pagamento (mínimo 12 horas de antecedência)
      // APENAS se requer_pagamento for true
      if (requer_pagamento) {
        const dataHoraConsulta = new Date(data_hora);
        const agora = new Date();
        const diferencaHoras = (dataHoraConsulta - agora) / (1000 * 60 * 60);

        if (diferencaHoras < 12) {
          return res.status(400).json({
            error: "Não é possível criar um agendamento com menos de 12 horas de antecedência para o pagamento.",
            horas_restantes: diferencaHoras.toFixed(2)
          });
        }
      }

      // 2) Criar solicitação de agendamento (status 'pendente' ou 'confirmado')
      const id_agendamento = await AgendamentoModel.criarSolicitacao({
        id_paciente,
        id_profissional,
        data_hora,
        servico: id_servico, // guarda o ID do serviço
        valor,
      });

      // --- FLUXO COM PAGAMENTO ---
      if (requer_pagamento) {
        // --- 3) Criar preferência de pagamento no Mercado Pago ---
        const preference = {
          items: [
            {
              title: descricao,
              unit_price: valor,
              quantity: 1,
            },
          ],
          // O external_reference é crucial para vincular o pagamento ao agendamento
          external_reference: String(id_agendamento),
          back_urls: {
            success: "URL_DE_SUCESSO_AQUI", // Substituir pela URL de sucesso real
            failure: "URL_DE_FALHA_AQUI",   // Substituir pela URL de falha real
            pending: "URL_PENDENTE_AQUI",   // Substituir pela URL pendente real
          },
          auto_return: "approved",
          notification_url: "URL_DO_WEBHOOK_AQUI", // Substituir pela URL do webhook real
        };

        const mpResponse = await mercadopago.preferences.create({ body: preference });
        const id_transacao_externa = mpResponse.body.id; // ID da preferência do Mercado Pago
        const payment_link = mpResponse.body.init_point; // Link de pagamento/checkout

        // --- 4) Criar registro de pagamento no DB com status 'pendente' ---
        const id_pagamento = await AgendamentoModel.criarPagamento(
          id_agendamento,
          valor,
          "Mercado Pago", // Método de pagamento
          id_transacao_externa,
          "pendente" // Status inicial
        );

        // --- 5) Retornar dados de pagamento para o frontend ---
        return res.status(201).json({
          id_agendamento,
          valor,
          status: "pendente_pagamento",
          payment_link,
          message: "Agendamento criado. Redirecione o paciente para o link de pagamento.",
        });
      }

      // --- FLUXO SEM PAGAMENTO (AGENDAMENTO DIRETO) ---
      // Atualiza o status do agendamento para 'confirmado' diretamente
      await AgendamentoModel.atualizarStatus(id_agendamento, "confirmado");

      return res.status(201).json({
        id_agendamento,
        valor,
        status: "confirmado",
        message: "Agendamento confirmado com sucesso. O profissional foi notificado.",
      });

      // Código removido para implementação do Mercado Pago
      // O agendamento será confirmado via webhook do Mercado Pago
      // após a aprovação do pagamento.
    } catch (err) {
      console.error(
        "❌ Erro ao solicitar agendamento e processar pagamento:",
        err.message,
        err.response ? err.response.data : '' // Adiciona detalhes do erro do MP, se houver
      );
      return res.status(500).json({
        error: "Erro interno ao processar agendamento e pagamento.",
      });
    }
  },

  /**
   * Lista agendamentos (confirmados/pendentes) de um profissional.
   */
  async listarPorProfissional(req, res) {
    try {
      const { id_profissional } = req.params;

      if (!id_profissional) {
        return res
          .status(400)
          .json({ error: "ID do profissional é obrigatório." });
      }

      const agendamentos =
        await AgendamentoModel.listarAgendamentosDoProfissional(
          Number(id_profissional)
        );

      return res.json(agendamentos);
    } catch (err) {
      console.error(
        "❌ Erro ao listar agendamentos do profissional:",
        err.message
      );
      return res.status(500).json({
        error: "Erro interno ao listar agendamentos.",
      });
    }
  },

  /**
   * Lista agendamentos de um paciente.
   */
  async listarPorPaciente(req, res) {
    try {
      const { id_paciente } = req.params;

      if (!id_paciente) {
        return res
          .status(400)
          .json({ error: "ID do paciente é obrigatório." });
      }

      const agendamentos =
        await AgendamentoModel.listarAgendamentosDoPaciente(
          Number(id_paciente)
        );

      return res.json(agendamentos);
    } catch (err) {
      console.error(
        "❌ Erro ao listar agendamentos do paciente:",
        err.message
      );
      return res.status(500).json({
        error: "Erro interno ao listar agendamentos.",
      });
    }
  },

  /**
   * Busca disponibilidade de um profissional em um intervalo de datas.
   * Espera query: id_profissional, data_inicio, data_fim
   */
  async buscarDisponibilidade(req, res) {
    try {
      const { id_profissional, data_inicio, data_fim } = req.query;

      if (!id_profissional || !data_inicio || !data_fim) {
        return res.status(400).json({
          error:
            "ID do profissional, data de início e data de fim são obrigatórios.",
        });
      }

      const [disponibilidade, agendamentosConfirmados] = await Promise.all(
        [
          AgendamentoModel.buscarDisponibilidade(id_profissional),
          AgendamentoModel.buscarAgendamentosConfirmados(
            id_profissional,
            data_inicio,
            data_fim
          ),
        ]
      );

      if (!disponibilidade) {
        return res.status(404).json({
          error:
            "Profissional não encontrado ou sem disponibilidade definida.",
        });
      }

      return res.json({
        dias_disponiveis: disponibilidade.dias_disponiveis
          .split(",")
          .map((d) => parseInt(d.trim(), 10)), // ex: "1,2,3,4,5" → [1,2,3,4,5]
        hora_inicio: disponibilidade.hora_inicio,
        hora_fim: disponibilidade.hora_fim,
        horarios_ocupados: agendamentosConfirmados.map(
          (a) => a.data_hora
        ),
      });
    } catch (err) {
      console.error(
        "❌ Erro ao buscar disponibilidade:",
        err.message
      );
      return res.status(500).json({
        error: "Erro interno ao buscar disponibilidade.",
      });
    }
  },

  /**
   * Aceitar agendamento (profissional confirma).
   */
  async aceitar(req, res) {
    try {
      const { id_agendamento } = req.params;

      const affectedRows =
        await AgendamentoModel.atualizarStatus(
          id_agendamento,
          "confirmado"
        );

      if (affectedRows === 0) {
        return res.status(404).json({
          error:
            "Agendamento não encontrado ou não pôde ser atualizado.",
        });
      }

      return res.json({
        message: "Agendamento aceito/confirmado com sucesso.",
      });
    } catch (err) {
      console.error("❌ Erro ao aceitar agendamento:", err.message);
      return res.status(500).json({
        error: "Erro interno ao aceitar agendamento.",
      });
    }
  },

  /**
   * Rejeitar agendamento.
   */
  async rejeitar(req, res) {
    try {
      const { id_agendamento } = req.params;

      const affectedRows =
        await AgendamentoModel.atualizarStatus(
          id_agendamento,
          "rejeitado"
        );

      if (affectedRows === 0) {
        return res.status(404).json({
          error:
            "Agendamento não encontrado ou não pôde ser atualizado.",
        });
      }

      return res.json({
        message: "Agendamento rejeitado com sucesso.",
      });
    } catch (err) {
      console.error("❌ Erro ao rejeitar agendamento:", err.message);
      return res.status(500).json({
        error: "Erro interno ao rejeitar agendamento.",
      });
    }
  },

  /**
   * Concluir agendamento (após atendimento).
   */
  async concluir(req, res) {
    try {
      const { id_agendamento } = req.params;

      const affectedRows =
        await AgendamentoModel.atualizarStatus(
          id_agendamento,
          "concluido"
        );

      if (affectedRows === 0) {
        return res.status(404).json({
          error:
            "Agendamento não encontrado ou não pôde ser atualizado.",
        });
      }

      return res.json({
        message: "Agendamento concluído com sucesso.",
      });
    } catch (err) {
      console.error("❌ Erro ao concluir agendamento:", err.message);
      return res.status(500).json({
        error: "Erro interno ao concluir agendamento.",
      });
    }
  },

  /**
   * Cancelar agendamento (profissional).
   */
  async cancelar(req, res) {
    try {
      const { id_agendamento } = req.params;

      const affectedRows =
        await AgendamentoModel.atualizarStatus(
          id_agendamento,
          "cancelado"
        );

      if (affectedRows === 0) {
        return res.status(404).json({
          error:
            "Agendamento não encontrado ou já processado.",
        });
      }

      return res.json({
        message: "Agendamento cancelado com sucesso.",
      });
    } catch (err) {
      console.error("❌ Erro ao cancelar agendamento:", err.message);
      return res.status(500).json({
        error: "Erro interno ao cancelar agendamento.",
      });
    }
  },

  /**
   * Registra a avaliação do paciente para um agendamento concluído.
   */
  async avaliar(req, res) {
    try {
      const { id_agendamento } = req.params;
      const { id_paciente, nota, comentario } = req.body;

      if (!id_paciente || !nota || nota < 1 || nota > 5) {
        return res.status(400).json({
          error: "Campos obrigatórios faltando ou inválidos (id_paciente, nota entre 1 e 5).",
        });
      }

      // 1. Buscar dados do agendamento para validação
      const agendamento = await AgendamentoModel.buscarAgendamentoParaAvaliacao(Number(id_agendamento));

      if (!agendamento) {
        return res.status(404).json({ error: "Agendamento não encontrado." });
      }

      if (agendamento.status !== 'concluido') {
        return res.status(400).json({ error: "A avaliação só pode ser feita para agendamentos concluídos." });
      }

      if (agendamento.ja_avaliado > 0) {
        return res.status(400).json({ error: "Este agendamento já foi avaliado." });
      }

      if (agendamento.id_paciente !== Number(id_paciente)) {
        return res.status(403).json({ error: "Paciente não autorizado a avaliar este agendamento." });
      }

      // 2. Registrar a avaliação
      const id_avaliacao = await AgendamentoModel.registrarAvaliacao(
        Number(id_agendamento),
        Number(id_paciente),
        agendamento.id_profissional,
        Number(nota),
        comentario
      );

      // 3. Atualizar a média de avaliação do profissional
      await AgendamentoModel.atualizarMediaAvaliacao(agendamento.id_profissional);

      return res.status(201).json({
        message: "Avaliação registrada com sucesso!",
        id_avaliacao,
      });
    } catch (err) {
      console.error("❌ Erro ao registrar avaliação:", err.message);
      // Erro de chave duplicada (agendamento já avaliado)
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: "Este agendamento já foi avaliado." });
      }
      return res.status(500).json({
        error: "Erro interno ao registrar avaliação.",
      });
    }
  },

  /**
   * Verifica se um agendamento ainda está dentro do prazo para pagamento.
   * Retorna informações sobre a validade do prazo de 12 horas.
   */
  async verificarPrazoPagamento(req, res) {
    try {
      const { id_agendamento } = req.params;

      if (!id_agendamento) {
        return res.status(400).json({
          error: "ID do agendamento é obrigatório.",
        });
      }

      const resultado = await AgendamentoModel.verificarPrazoPagamento(
        Number(id_agendamento)
      );

      if (!resultado.valido) {
        return res.status(400).json({
          valido: false,
          error: resultado.motivo,
          horas_restantes: resultado.horas_restantes ? resultado.horas_restantes.toFixed(2) : null,
        });
      }

      return res.json({
        valido: true,
        message: "Agendamento dentro do prazo para pagamento.",
        horas_restantes: resultado.horas_restantes.toFixed(2),
      });
    } catch (err) {
      console.error("❌ Erro ao verificar prazo de pagamento:", err.message);
      return res.status(500).json({
        error: "Erro interno ao verificar prazo de pagamento.",
      });
    }
  },
};

module.exports = AgendamentoController;
