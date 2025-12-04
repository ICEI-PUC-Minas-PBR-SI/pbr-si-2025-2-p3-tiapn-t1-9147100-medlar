const ServicoModel = require("../models/ServicoModel");

module.exports = {
  async listar(req, res) {
    try {
      const servicos = await ServicoModel.listarServicos();
      res.json(servicos);
    } catch (err) {
      console.error("Erro Listar Serviços:", err.message);
      res.status(500).json({ error: "Erro ao listar serviços." });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id_servico } = req.params;
      if (!id_servico) {
        return res.status(400).json({ error: "ID do serviço é obrigatório." });
      }
      const servico = await ServicoModel.buscarPorId(id_servico);
      if (!servico) {
        return res.status(404).json({ error: "Serviço não encontrado." });
      }
      res.json(servico);
    } catch (err) {
      console.error("Erro Buscar Serviço por ID:", err.message);
      res.status(500).json({ error: "Erro ao buscar serviço." });
    }
  }
};
