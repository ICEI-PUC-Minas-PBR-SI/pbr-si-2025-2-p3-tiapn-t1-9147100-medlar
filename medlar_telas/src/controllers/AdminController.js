// src/controllers/AdminController.js
const { pool } = require("../config/db");

module.exports = {
  // Lista todos os pacientes e profissionais com status pendente
  async listarPendentes(req, res) {
    try {
      const [pacientes] = await pool.query(
        `SELECT 
           id_paciente AS id,
           nome,
           email,
           'paciente' AS tipo
         FROM paciente
         WHERE status = 'pendente'`
      );

      const [profissionais] = await pool.query(
        `SELECT 
           id_profissional AS id,
           nome,
           email,
           'profissional' AS tipo
         FROM profissional
         WHERE status = 'pendente'`
      );

      return res.json([...pacientes, ...profissionais]);
    } catch (err) {
      console.error("Erro ao listar pendentes:", err);
      return res.status(500).json({ error: "Erro ao listar pendentes." });
    }
  },

  // Aprovar usuário (paciente ou profissional)
  async aprovar(req, res) {
    try {
      const { tipo, id } = req.params;

      const tabela = tipo === "paciente" ? "paciente" : "profissional";
      const idCol  = tipo === "paciente" ? "id_paciente" : "id_profissional";

      const [result] = await pool.execute(
        `UPDATE ${tabela} SET status = 'aprovado' WHERE ${idCol} = ?`,
        [id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      return res.json({ ok: true, msg: `${tipo} aprovado!` });
    } catch (err) {
      console.error("Erro ao aprovar:", err);
      return res.status(500).json({ error: "Erro ao aprovar." });
    }
  },

  // Rejeitar usuário (paciente ou profissional)
  async rejeitar(req, res) {
    try {
      const { tipo, id } = req.params;

      const tabela = tipo === "paciente" ? "paciente" : "profissional";
      const idCol  = tipo === "paciente" ? "id_paciente" : "id_profissional";

      const [result] = await pool.execute(
        `UPDATE ${tabela} SET status = 'rejeitado' WHERE ${idCol} = ?`,
        [id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      return res.json({ ok: true, msg: `${tipo} rejeitado!` });
    } catch (err) {
      console.error("Erro ao rejeitar:", err);
      return res.status(500).json({ error: "Erro ao rejeitar." });
    }
  }
};
