// controllers/LoginController.js

const LoginModel = require("../models/LoginModel");

module.exports = {
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha)
        return res
          .status(400)
          .json({ error: "E-mail e senha são obrigatórios." });

      const { user, errorType } = await LoginModel.autenticar(email, senha);

      if (errorType === "EMAIL_NOT_FOUND") {
        return res
          .status(404)
          .json({ error: "Este e-mail ainda não está cadastrado. Que tal criar sua conta agora? 😊" });
      }

      if (errorType === "WRONG_PASSWORD") {
        return res
          .status(401)
          .json({ error: "Senha incorreta. Tente novamente." });
      }

      if (!user) {
        return res
          .status(401)
          .json({ error: "Não foi possível autenticar." });
      }

      if (user.status === "pendente")
        return res
          .status(403)
          .json({ error: "Cadastro pendente de aprovação." });

      if (user.status === "rejeitado")
        return res
          .status(403)
          .json({ error: "Cadastro rejeitado." });

      return res.json({
        ok: true,
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo,
        status: user.status,
      });

    } catch (e) {
      console.error("Erro no login:", e);
      return res
        .status(500)
        .json({ error: "Erro interno no servidor." });
    }
  }
};
