const { pool } = require("../config/db");

module.exports = {
  async listarServicos() {
    const [rows] = await pool.query("SELECT * FROM servico LIMIT 100");
    return rows;
  },

  async buscarPorId(id_servico) {
    const [rows] = await pool.query("SELECT * FROM servico WHERE id_servico = ?", [id_servico]);
    return rows[0];
  }
};
