// ===========================================================
// server.js  (versão organizada e comentada)
// ===========================================================

const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const path = require("path");

const LoginController = require("./controllers/LoginController");

const app = express();

// ===========================================================
// MIDDLEWARES BÁSICOS
// ===========================================================

// Libera requisições de outras origens (ex.: 127.0.0.1, localhost, etc.)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Permite JSON no corpo das requisições
app.use(express.json({ limit: "2mb" }));

// Arquivos estáticos da pasta /public acessíveis em /public/...
// Ex.: /public/html/buscar-profissionais.html
app.use("/public", express.static(path.join(__dirname, "../public")));

// ===========================================================
// HELPER
// ===========================================================

const onlyDigits = (s) => (s || "").toString().replace(/\D/g, "");

// ===========================================================
// BANCO DE DADOS (MySQL)
// ===========================================================

const DB_NAME = "medlar";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1604pv",
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true
});

// Flags só para log informativo
let HAS_PROF_ENDERECO = false;
let HAS_PROF_REGISTRO = false;

async function detectColumns() {
  try {
    const [rows] = await pool.query(
      `SELECT COLUMN_NAME
         FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = ?
          AND TABLE_NAME   = 'profissional'
          AND COLUMN_NAME IN ('endereco', 'registro_profissional')`,
      [DB_NAME]
    );

    const names = new Set(rows.map((r) => r.COLUMN_NAME));
    HAS_PROF_ENDERECO = names.has("endereco");
    HAS_PROF_REGISTRO = names.has("registro_profissional");

    console.log(
      "ℹ️ profissional.endereco:",
      HAS_PROF_ENDERECO ? "OK" : "NÃO EXISTE"
    );
    console.log(
      "ℹ️ profissional.registro_profissional:",
      HAS_PROF_REGISTRO ? "OK" : "NÃO EXISTE"
    );
  } catch (e) {
    console.warn("⚠️ Falha ao detectar colunas do profissional:", e.message);
  }
}

// Testa conexão inicial
(async () => {
  try {
    const conn = await pool.getConnection();
    await conn.query("SELECT 1");
    conn.release();

    console.log(`✅ Conectado ao MySQL (${DB_NAME})`);
    await detectColumns();
  } catch (err) {
    console.error("❌ Falha ao conectar no MySQL:", err.message);
  }
})();

// ===========================================================
// ROTAS DE API
// ===========================================================

// Busca de profissionais (usada na tela buscar-profissionais)
app.use("/api/busca", require("./routes/busca.routes"));

// Agendamentos (solicitar / gerenciar atendimentos)
app.use("/api/agendamentos", require("./routes/agendamento.routes"));

// Serviços (lista de serviços ofertados)
app.use("/api/servicos", require("./routes/servicos.routes"));

// LOGIN
app.post("/api/login", LoginController.login);

// Healthcheck simples
app.get("/api/ping", (_req, res) => {
  res.json({ ok: true });
});

// ===========================================================
// PACIENTES
// ===========================================================

app.post("/api/pacientes", async (req, res) => {
  try {
    const {
      nome_completo_pac,
      cpf_pac,
      data_nascimento_pac,
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
    } = req.body || {};

    // Campos mínimos obrigatórios
    if (
      !nome_completo_pac ||
      !cpf_pac ||
      !data_nascimento_pac ||
      !telefone_pac ||
      !email_pac ||
      !senha_pac
    ) {
      return res.status(400).json({ error: "Campos obrigatórios faltando." });
    }

    const cpf = onlyDigits(cpf_pac).slice(0, 11);
    const telefone = onlyDigits(telefone_pac).slice(0, 20);

    // Endereço já vem montado do front (rua + número + bairro + complemento)
    const enderecoFull = endereco_pac;

    const sql = `
      INSERT INTO paciente
        (nome, cpf, data_nascimento, telefone, email, endereco, historico_medico, senha)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      String(nome_completo_pac).trim(),
      cpf,
      data_nascimento_pac,
      telefone,
      String(email_pac).trim(),
      enderecoFull,
      historico_medico_pac || null,
      senha_pac
    ];

    const [result] = await pool.execute(sql, params);
    res.status(201).json({ id_paciente: result.insertId });
  } catch (err) {
    console.error("❌ Erro ao inserir paciente:", err.message);
    res.status(500).json({ error: "Erro interno ao salvar paciente." });
  }
});

// ===========================================================
// PROFISSIONAIS (com multer nas rotas específicas)
// ===========================================================

app.use("/api/profissionais", require("./routes/profissional.routes"));

// ===========================================================
// ADMIN
// ===========================================================

app.use("/api/admin", require("./routes/admin.routes"));

// ===========================================================
// PÁGINA INICIAL (INDEX.HTML)
// ===========================================================

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/index.html"));
});

// ===========================================================
// SUBIR SERVIDOR
// ===========================================================

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
});


