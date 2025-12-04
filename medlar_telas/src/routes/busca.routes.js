// src/routes/busca.routes.js
const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");

// GET /api/busca?termo=...&especialidade=...&cidade=...
router.get("/", async (req, res) => {
  try {
    const termo = (req.query.termo || "").trim();
    const especialidade = (req.query.especialidade || "").trim();
    const cidade = (req.query.cidade || "").trim();
    // disponibilidade / precoMax já vêm do front, mas por enquanto não usamos:
    // const disponibilidade = (req.query.disponibilidade || "").trim();
    // const precoMax = (req.query.precoMax || "").trim();

    let sql = `
      SELECT 
        id_profissional,
        nome,
        especialidade,
        telefone,
        email,
        registro_profissional,
        passagens_profissionais,
        foto_perfil,
        endereco,
        avaliacao_media,
        data_nascimento,
        status
      FROM profissional
    `;

    const where = [];
    const params = [];

    // Sempre traz apenas aprovados
    where.push("status = 'aprovado'");

    // Busca livre (nome ou especialidade)
    if (termo) {
      where.push("(nome LIKE ? OR especialidade LIKE ?)");
      params.push(`%${termo}%`, `%${termo}%`);
    }

    // Filtro de especialidade vindo do select
    if (especialidade) {
      where.push("especialidade LIKE ?");
      params.push(`%${especialidade}%`);
    }

    // Filtro de localização (cidade / bairro dentro do endereço)
    if (cidade) {
      where.push("endereco LIKE ?");
      params.push(`%${cidade}%`);
    }

    if (where.length > 0) {
      sql += " WHERE " + where.join(" AND ");
    }

    sql += " ORDER BY nome";

    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error("❌ Erro ao buscar profissionais:", err.message);
    res.status(500).json({ error: "Erro ao buscar profissionais." });
  }
});

module.exports = router;
