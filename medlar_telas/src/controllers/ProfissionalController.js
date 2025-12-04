// src/controllers/ProfissionalController.js 
const ProfissionalModel = require("../models/ProfissionalModel");
const onlyDigits = require("../utils/onlyDigits");
const montarEndereco = require("../utils/endereco");

module.exports = {
  async criar(req, res) {
    try {
      console.log("===== REQ.BODY PROFISSIONAL =====");
      console.log(req.body);
      console.log("===== REQ.FILES PROFISSIONAL =====");
      console.log(req.files);

      // ========================================================
      // ARQUIVOS (multer)
      // ========================================================
      const documento_rg  = req.files?.documento_rg?.[0]?.path || null;
      const documento_cpf = req.files?.documento_cpf?.[0]?.path || null;
      const foto_perfil   = req.files?.foto_perfil?.[0]?.path || null;

      // ========================================================
      // CAMPOS DE TEXTO DO FORMULÁRIO
      // ========================================================
      const {
        nome_completo_prof,
        sobrenome_prof,
        registro_profissional,
        cpf_prof,
        email_prof,
        telefone_prof,
        areas_atendimento,
        passagens_profissionais,
        senha_prof,
        cep_prof,
        cidade_prof,
        bairro_prof,
        endereco_prof,
        numero_prof,
        data_nascimento_prof       // 👈 ADICIONADO AQUI
      } = req.body;

      // ========================================================
      // MONTAR ENDEREÇO FORMATADO
      // ========================================================
      const enderecoFull = montarEndereco({
        rua: endereco_prof,
        numero: onlyDigits(numero_prof),
        bairro: bairro_prof,
        cidadeUf: cidade_prof,
        cep: cep_prof
      });

      // ========================================================
      // OBJETO FINAL PARA SALVAR NO BANCO
      // ========================================================
      const dadosProfissional = {
        nome: `${nome_completo_prof || ""} ${sobrenome_prof || ""}`.trim(),
        cpf: onlyDigits(cpf_prof || ""),
        registro_profissional: registro_profissional || null,
        especialidade: areas_atendimento || "",
        passagens_profissionais: passagens_profissionais || "",
        telefone: onlyDigits(telefone_prof || ""),
        email: email_prof || "",
        endereco: enderecoFull || null,
        senha: senha_prof || "",
        documento_rg,
        documento_cpf,
        foto_perfil,

        // ======== NOVO CAMPO =========
        data_nascimento: data_nascimento_prof || null
      };

      // ========================================================
      // SALVAR NO BANCO (MODEL)
      // ========================================================
      const id = await ProfissionalModel.criarProfissional(dadosProfissional);

      return res.status(201).json({ id_profissional: id });

    } catch (err) {
      console.error("Erro Profissional:", err);

      // CPF duplicado
      if (err.code === "ER_DUP_ENTRY" || err.message === "Já existe um profissional com esse CPF.") {
        return res.status(400).json({ error: "Já existe um profissional com esse CPF." });
      }

      // Texto muito grande
      if (err.code === "ER_DATA_TOO_LONG") {
        return res.status(400).json({ error: "O texto enviado é muito longo para o banco de dados." });
      }

      return res.status(500).json({ error: "Erro interno ao salvar profissional." });
    }
  }
};
