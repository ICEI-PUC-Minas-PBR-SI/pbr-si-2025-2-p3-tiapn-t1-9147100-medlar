const ProfissionalModel = require("../models/ProfissionalModel");

module.exports = {
  /**
   * Busca profissionais por termo (especialidade ou nome).
   */
  async buscar(req, res) {
    try {
      const { termo } = req.query;

      if (!termo) {
        return res.status(400).json({ error: "O termo de busca é obrigatório." });
      }

      const profissionais = await ProfissionalModel.buscarProfissionais(termo);
      res.json(profissionais);
    } catch (err) {
      console.error("❌ Erro ao buscar profissionais:", err.message);
      res.status(500).json({ error: "Erro interno ao buscar profissionais." });
    }
  },
};
