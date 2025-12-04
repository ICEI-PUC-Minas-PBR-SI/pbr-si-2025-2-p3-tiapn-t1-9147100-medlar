const { pool } = require("../config/db");

module.exports = {
  /**
   * Cria uma nova solicitação de agendamento.
   * @param {object} data - Dados do agendamento.
   * @returns {number} O ID do agendamento inserido.
   */
  async criarSolicitacao(data) {
  const sql = `
    INSERT INTO agendamento (
      id_paciente,
      id_profissional,
      id_servico,
      data_hora,
      status,
      preco_final
    ) VALUES (?, ?, ?, ?, 'pendente', ?)
  `;
  const [result] = await pool.execute(sql, [
    data.id_paciente,
    data.id_profissional,
    data.servico,   // aqui vem o id_servico
    data.data_hora,
    data.valor,     // aqui vem o valor/preço final
  ]);
  return result.insertId;
},
    /**
   * Lista agendamentos do PROFISSIONAL.
   * @param {number} id_profissional - ID do profissional.
   * @returns {Array} Lista de agendamentos.
   */
  async listarAgendamentosDoProfissional(id_profissional) {
    const sql = `
      SELECT
        a.id_agendamento,
        a.data_hora,
        s.nome_servico AS servico,
        a.preco_final AS valor,
        a.status,
        p.nome AS nome_paciente,
        p.email AS email_paciente,
        p.telefone AS telefone_paciente,
        pmt.status_pagamento,
        pmt.data_pagamento
      FROM agendamento a
      JOIN paciente p ON a.id_paciente = p.id_paciente
      JOIN servico s ON a.id_servico = s.id_servico
      LEFT JOIN pagamento pmt ON pmt.id_agendamento = a.id_agendamento
      WHERE a.id_profissional = ?
      ORDER BY a.data_hora DESC
    `;
    const [rows] = await pool.query(sql, [id_profissional]);
    return rows;
  },

  /**
   * Lista agendamentos do PACIENTE.
   * @param {number} id_paciente - ID do paciente.
   * @returns {Array} Lista de agendamentos.
   */
  async listarAgendamentosDoPaciente(id_paciente) {
    const sql = `
      SELECT
        a.id_agendamento,
        a.data_hora,
        s.nome_servico AS servico,
        a.preco_final AS valor,
        a.status,
        pr.nome AS nome_profissional,
        pr.especialidade AS especialidade_profissional,
        pmt.status_pagamento,
        pmt.data_pagamento
      FROM agendamento a
      JOIN profissional pr ON a.id_profissional = pr.id_profissional
      JOIN servico s ON a.id_servico = s.id_servico
      LEFT JOIN pagamento pmt ON pmt.id_agendamento = a.id_agendamento
      WHERE a.id_paciente = ?
      ORDER BY a.data_hora DESC
    `;
    const [rows] = await pool.query(sql, [id_paciente]);
    return rows;
  },



  /**
   * Atualiza o status de um agendamento.
  * @param {number} id_agendamento - ID do agendamento.
  * @param {string} status - Novo status (pendente, confirmado, concluido, cancelado, etc).
  * @returns {number} Número de linhas afetadas.
  */
  async atualizarStatus(id_agendamento, status) {
    const sql = `
      UPDATE agendamento
      SET status = ?
      WHERE id_agendamento = ?
    `;
    const [result] = await pool.execute(sql, [status, id_agendamento]);
    return result.affectedRows;
  },

  /**
   * Cria um registro de pagamento para um agendamento.
   * @param {number} id_agendamento - ID do agendamento.
   * @param {number} valor - Valor do pagamento.
   * @param {string} metodo_pagamento - Método de pagamento.
   * @returns {number} O ID do pagamento inserido.
   */
  /**
   * Cria um registro de pagamento para um agendamento.
   * @param {number} id_agendamento - ID do agendamento.
   * @param {number} valor - Valor do pagamento.
   * @param {string} metodo_pagamento - Método de pagamento.
   * @param {string} id_transacao_externa - ID da transação no gateway de pagamento.
   * @param {string} status_pagamento - Status inicial do pagamento (ex: pendente).
   * @returns {number} O ID do pagamento inserido.
   */
  async criarPagamento(id_agendamento, valor, metodo_pagamento, id_transacao_externa, status_pagamento = 'pendente') {
    const sql = `
      INSERT INTO pagamento (id_agendamento, valor, metodo_pagamento, status_pagamento, data_pagamento, id_transacao_externa)
      VALUES (?, ?, ?, ?, NOW(), ?)
    `;
    const [result] = await pool.execute(sql, [id_agendamento, valor, metodo_pagamento, status_pagamento, id_transacao_externa]);
    return result.insertId;
  },

  /**
   * Atualiza o status de um pagamento e o ID da transação externa.
   * @param {number} id_agendamento - ID do agendamento.
   * @param {string} novo_status_pagamento - Novo status do pagamento.
   * @param {string} id_transacao_externa - ID da transação no gateway de pagamento.
   * @returns {number} Número de linhas afetadas.
   */
  async atualizarStatusPagamento(id_agendamento, novo_status_pagamento, id_transacao_externa) {
    const sql = `
      UPDATE pagamento
      SET status_pagamento = ?, id_transacao_externa = ?
      WHERE id_agendamento = ?
    `;
    const [result] = await pool.execute(sql, [novo_status_pagamento, id_transacao_externa, id_agendamento]);
    return result.affectedRows;
  },

  /**
   * Atualiza o agendamento com o ID do pagamento e muda o status para 'confirmado'.
   * @param {number} id_agendamento - ID do agendamento.
   * @param {number} id_pagamento - ID do pagamento.
   * @returns {number} Número de linhas afetadas.
   */
  /**
   * Vincula o ID do pagamento ao agendamento e atualiza o status para 'confirmado'.
   * @param {number} id_agendamento - ID do agendamento.
   * @param {number} id_pagamento - ID do pagamento.
   * @returns {number} Número de linhas afetadas.
   */
  async vincularPagamentoEConfirmarAgendamento(id_agendamento, id_pagamento) {
    const sql = `
      UPDATE agendamento
      SET id_pagamento = ?, status = 'confirmado'
      WHERE id_agendamento = ?
    `;
    const [result] = await pool.execute(sql, [id_pagamento, id_agendamento]);
    return result.affectedRows;
  },

  /**
   * Busca a disponibilidade de um profissional.
   * @param {number} id_profissional - ID do profissional.
   * @returns {object} Objeto com dias e horários disponíveis.
   */
  async buscarDisponibilidade(id_profissional) {
    const sql = `
      SELECT dias_disponiveis, hora_inicio, hora_fim
      FROM profissional
      WHERE id_profissional = ?
    `;
    const [rows] = await pool.query(sql, [id_profissional]);
    return rows[0];
  },

  /**
   * Busca agendamentos confirmados para um profissional em um período.
   * @param {number} id_profissional - ID do profissional.
   * @param {string} data_inicio - Data de início (YYYY-MM-DD).
   * @param {string} data_fim - Data de fim (YYYY-MM-DD).
   * @returns {Array} Lista de agendamentos confirmados.
   */
  async buscarAgendamentosConfirmados(id_profissional, data_inicio, data_fim) {
    const sql = `
      SELECT data_hora
      FROM agendamento
      WHERE id_profissional = ?
        AND status = 'confirmado'
        AND data_hora BETWEEN ? AND ?
    `;
    const [rows] = await pool.query(sql, [id_profissional, data_inicio, data_fim]);
    return rows;
  },

  /**
   * Verifica se o agendamento está dentro do prazo de 12 horas para pagamento.
   * @param {number} id_agendamento - ID do agendamento.
   * @returns {object} Objeto com informações sobre a validade do prazo.
   */
  async verificarPrazoPagamento(id_agendamento) {
    const sql = `
      SELECT id_agendamento, data_hora, status
      FROM agendamento
      WHERE id_agendamento = ?
    `;
    const [rows] = await pool.query(sql, [id_agendamento]);
    
    if (rows.length === 0) {
      return { valido: false, motivo: 'Agendamento não encontrado.' };
    }

    const agendamento = rows[0];
    const dataHoraConsulta = new Date(agendamento.data_hora);
    const agora = new Date();
    const diferencaHoras = (dataHoraConsulta - agora) / (1000 * 60 * 60);

    // Verifica se faltam mais de 12 horas para a consulta
    if (diferencaHoras < 12) {
      return {
        valido: false,
        motivo: 'O prazo para pagamento expirou. O pagamento deve ser realizado até 12 horas antes da consulta.',
        horas_restantes: diferencaHoras
      };
    }

    return {
      valido: true,
      horas_restantes: diferencaHoras
    };
  }
};

// Adicionando a função de busca de serviço para obter o valor
module.exports.buscarServicoPorId = async (id_servico) => {
  const sql = `
    SELECT preco
    FROM servico
    WHERE id_servico = ?
  `;
  const [rows] = await pool.query(sql, [id_servico]);
  return rows[0];
};

// Reorganizando as exportações para incluir as novas funções
  /**
   * Registra a avaliação de um agendamento.
   * @param {number} id_agendamento - ID do agendamento.
   * @param {number} id_paciente - ID do paciente.
   * @param {number} id_profissional - ID do profissional.
   * @param {number} nota - Nota de 1 a 5.
   * @param {string} comentario - Comentário opcional.
   * @returns {number} O ID da avaliação inserida.
   */
module.exports.registrarAvaliacao = async (id_agendamento, id_paciente, id_profissional, nota, comentario) => {
  const sql = `
    INSERT INTO avaliacao (id_agendamento, id_paciente, id_profissional, nota, comentario)
    VALUES (?, ?, ?, ?, ?)
  `;
  const [result] = await pool.execute(sql, [id_agendamento, id_paciente, id_profissional, nota, comentario]);
  return result.insertId;
};

/**
 * Calcula e atualiza a média de avaliação do profissional.
 * @param {number} id_profissional - ID do profissional.
 * @returns {number} Número de linhas afetadas na tabela profissional.
 */
module.exports.atualizarMediaAvaliacao = async (id_profissional) => {
  // 1. Calcula a nova média e o total de avaliações
  const [mediaRows] = await pool.query(`
    SELECT 
      AVG(nota) AS media, 
      COUNT(nota) AS total 
    FROM avaliacao 
    WHERE id_profissional = ?
  `, [id_profissional]);

  const media = mediaRows[0].media ? parseFloat(mediaRows[0].media).toFixed(1) : 0.0;
  const total = mediaRows[0].total || 0;

  // 2. Atualiza a tabela profissional
  const [result] = await pool.execute(`
    UPDATE profissional
    SET media_avaliacao = ?, total_avaliacoes = ?
    WHERE id_profissional = ?
  `, [media, total, id_profissional]);

  return result.affectedRows;
};

/**
 * Busca os dados de um agendamento específico para avaliação.
 * @param {number} id_agendamento - ID do agendamento.
 * @returns {object} Dados do agendamento.
 */
module.exports.buscarAgendamentoParaAvaliacao = async (id_agendamento) => {
  const sql = `
    SELECT 
      a.id_agendamento, 
      a.id_paciente, 
      a.id_profissional, 
      a.status,
      (SELECT COUNT(*) FROM avaliacao WHERE id_agendamento = a.id_agendamento) AS ja_avaliado
    FROM agendamento a
    WHERE a.id_agendamento = ?
  `;
  const [rows] = await pool.query(sql, [id_agendamento]);
  return rows[0];
};

// Adicionando a função de busca de serviço para obter o valor
module.exports.buscarServicoPorId = async (id_servico) => {
  const sql = `
    SELECT preco
    FROM servico
    WHERE id_servico = ?
  `;
  const [rows] = await pool.query(sql, [id_servico]);
  return rows[0];
};

// Reorganizando as exportações para incluir as novas funções
module.exports = {
  ...module.exports,
  criarSolicitacao: module.exports.criarSolicitacao,
  buscarPorProfissional: module.exports.buscarPorProfissional,
  buscarPorPaciente: module.exports.buscarPorPaciente,
  atualizarStatus: module.exports.atualizarStatus,
  criarPagamento: module.exports.criarPagamento,
  vincularPagamentoEConfirmarAgendamento: module.exports.vincularPagamentoEConfirmarAgendamento,
  atualizarStatusPagamento: module.exports.atualizarStatusPagamento,
  buscarDisponibilidade: module.exports.buscarDisponibilidade,
  buscarAgendamentosConfirmados: module.exports.buscarAgendamentosConfirmados,
  buscarServicoPorId: module.exports.buscarServicoPorId,
  verificarPrazoPagamento: module.exports.verificarPrazoPagamento,
  // NOVAS FUNÇÕES DE AVALIAÇÃO
  registrarAvaliacao: module.exports.registrarAvaliacao,
  atualizarMediaAvaliacao: module.exports.atualizarMediaAvaliacao,
  buscarAgendamentoParaAvaliacao: module.exports.buscarAgendamentoParaAvaliacao,
};
