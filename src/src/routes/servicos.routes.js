// src/routes/servicos.routes.js
const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");

// GET /api/servicos
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
         id_servico,
         nome_servico,
         descricao,
         valor_base,
         duracao_padrao
       FROM servico
       ORDER BY nome_servico`
    );

    res.json(rows);
  } catch (err) {
    console.error("❌ Erro ao listar serviços:", err);
    res.status(500).json({ error: "Erro ao listar serviços." });
  }
});

module.exports = router;
