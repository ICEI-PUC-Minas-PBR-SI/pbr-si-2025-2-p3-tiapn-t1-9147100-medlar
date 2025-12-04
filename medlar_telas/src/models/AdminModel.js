// src/models/AdminModel.js
const { pool } = require("../config/db");

module.exports = {
  // PACIENTES
  async listarPacientesPendentes() {
    const [rows] = await pool.query(
      "SELECT id_paciente AS id, nome, cpf, email, telefone, endereco, status FROM paciente WHERE status = 'pendente' ORDER BY id_paciente DESC LIMIT 300"
    );
    return rows;
  },

  async atualizarStatusPaciente(id, novoStatus) {
    const [result] = await pool.execute(
      "UPDATE paciente SET status = ? WHERE id_paciente = ?",
      [novoStatus, id]
    );
    return result.affectedRows;
  },

  async deletarPaciente(id) {
    const [result] = await pool.execute(
      "DELETE FROM paciente WHERE id_paciente = ?",
      [id]
    );
    return result.affectedRows;
  },

  // PROFISSIONAIS
  async listarProfissionaisPendentes() {
    const [rows] = await pool.query(
      "SELECT id_profissional AS id, nome, cpf, email, telefone, endereco, status FROM profissional WHERE status = 'pendente' ORDER BY id_profissional DESC LIMIT 300"
    );
    return rows;
  },

  async atualizarStatusProfissional(id, novoStatus) {
    const [result] = await pool.execute(
      "UPDATE profissional SET status = ? WHERE id_profissional = ?",
      [novoStatus, id]
    );
    return result.affectedRows;
  },

  async deletarProfissional(id) {
    const [result] = await pool.execute(
      "DELETE FROM profissional WHERE id_profissional = ?",
      [id]
    );
    return result.affectedRows;
  }
};
