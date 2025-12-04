// src/models/ProfissionalModel.js
const { pool } = require("../config/db");

module.exports = {
  /** ==========================================================
   * Buscar profissionais aprovados
   * ========================================================== */
  async buscarProfissionais(termo) {
    const termoBusca = `%${termo || ""}%`;

    const sql = `
      SELECT
        id_profissional,
        nome,
        registro_profissional,
        especialidade,
        passagens_profissionais,
        telefone,
        email,
        endereco,
        foto_perfil,
        status,
        avaliacao_media,
        data_nascimento
      FROM profissional
      WHERE status = 'aprovado'
        AND (especialidade LIKE ? OR nome LIKE ?)
      LIMIT 50
    `;

    const [rows] = await pool.query(sql, [termoBusca, termoBusca]);
    return rows;
  },

  /** ==========================================================
   * Criar profissional
   * ========================================================== */
  async criarProfissional(dados) {
    const sql = `
      INSERT INTO profissional 
        (nome, cpf, data_nascimento, registro_profissional, especialidade, passagens_profissionais,
         telefone, email, endereco, senha,
         documento_rg, documento_cpf, foto_perfil)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    //                 ↑↑↑  13 placeholders (1 pra cada coluna)

    const valores = [
      dados.nome,                         // nome
      dados.cpf,                          // cpf
      dados.data_nascimento || null,      // data_nascimento
      dados.registro_profissional || null,
      dados.especialidade,                // áreas de atendimento
      dados.passagens_profissionais || null,

      dados.telefone,
      dados.email,
      dados.endereco || null,
      dados.senha,

      dados.documento_rg || null,
      dados.documento_cpf || null,
      dados.foto_perfil || null
    ];

    const [result] = await pool.query(sql, valores);
    return result.insertId;
  }
};
