// src/models/PacienteModel.js
const { pool } = require("../config/db");

module.exports = {
  async criarPaciente(data) {
    const sql = `
      INSERT INTO paciente
        (nome, cpf, data_nascimento, telefone, email, endereco, historico_medico, senha)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      data.nome,                   // nome_completo_pac
      data.cpf,                    // somente dígitos
      data.data_nascimento,        // formato ISO yyyy-mm-dd
      data.telefone,               // somente dígitos
      data.email,
      data.endereco,               // rua + numero + bairro + complemento
      data.historico_medico,       // NOVO CAMPO
      data.senha
    ];

    const [result] = await pool.execute(sql, params);
    return result.insertId;
  }
};
