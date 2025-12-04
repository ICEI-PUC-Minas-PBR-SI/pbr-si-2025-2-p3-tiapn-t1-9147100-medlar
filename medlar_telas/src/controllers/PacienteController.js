// src/controllers/PacienteController.js
const PacienteModel = require("../models/PacienteModel");
const onlyDigits = require("../utils/onlyDigits");
const montarEndereco = require("../utils/endereco");

module.exports = {
  async criar(req, res) {
    try {
      const {
        nome_completo_pac,
        cpf_pac,
        data_nascimento_pac,
        data_nascimento_pac_iso,
        telefone_pac,
        email_pac,
        cep_pac,
        cidade_pac,
        bairro_pac,
        endereco_pac,
        numero_pac,
        complemento_pac,
        historico_medico_pac,
        senha_pac
      } = req.body;

      // ============ Validação mínima =============
      if (
        !nome_completo_pac ||
        !cpf_pac ||
        !data_nascimento_pac_iso || // já vem convertido no front
        !telefone_pac ||
        !email_pac ||
        !senha_pac
      ) {
        return res.status(400).json({ error: "Campos obrigatórios faltando." });
      }

      // ============ Montagem do endereço completo ============
      const enderecoFull = montarEndereco({
        rua: endereco_pac,
        numero: onlyDigits(numero_pac),
        bairro: bairro_pac,
        cidadeUf: cidade_pac,
        cep: cep_pac,
        complemento: complemento_pac || ""  // agora INCLUI o complemento
      });

      // ============ Envio ao model ============
      const novoPaciente = {
        nome: nome_completo_pac.trim(),
        cpf: onlyDigits(cpf_pac),
        data_nascimento: data_nascimento_pac_iso,
        telefone: onlyDigits(telefone_pac),
        email: email_pac.trim(),
        endereco: enderecoFull,
        historico_medico: historico_medico_pac || null,
        senha: senha_pac
      };

      const id = await PacienteModel.criarPaciente(novoPaciente);

      return res.status(201).json({ id_paciente: id });

    } catch (e) {
      console.error("Erro Paciente:", e);
      return res.status(500).json({ error: "Erro interno ao salvar paciente." });
    }
  }
};
