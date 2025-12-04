// models/LoginModel.js

const { pool: db } = require("../config/db"); // usa o pool do MySQL

module.exports = {
  /**
   * Autentica o usuário e diferencia:
   * - e-mail não cadastrado
   * - senha incorreta
   * - sucesso
   *
   * Retorno:
   *   { user: {...}, errorType: null }
   *   { user: null, errorType: "WRONG_PASSWORD" }
   *   { user: null, errorType: "EMAIL_NOT_FOUND" }
   */
  async autenticar(email, senha) {
    // 1) TENTAR AUTENTICAR NORMALMENTE (email + senha)

    // Paciente (não tem coluna status, então usamos 'aprovado' fixo)
    let [pac] = await db.query(
      `SELECT 
          id_paciente AS id, 
          nome, 
          email, 
          'aprovado' AS status,      -- <- valor fixo
          'paciente' AS tipo
       FROM paciente 
       WHERE email = ? AND senha = ?
       LIMIT 1`,
      [email, senha]
    );

    if (pac.length > 0) {
      return { user: pac[0], errorType: null };
    }

    // Profissional (aqui sim existe coluna status na tabela)
    let [prof] = await db.query(
      `SELECT 
          id_profissional AS id, 
          nome, 
          email, 
          status,                 -- <- coluna real
          'profissional' AS tipo
       FROM profissional 
       WHERE email = ? AND senha = ?
       LIMIT 1`,
      [email, senha]
    );

    if (prof.length > 0) {
      return { user: prof[0], errorType: null };
    }

    // 2) NÃO AUTENTICOU → agora verificar se o e-mail EXISTE

    let [pacEmail] = await db.query(
      `SELECT 1 FROM paciente WHERE email = ? LIMIT 1`,
      [email]
    );

    let [profEmail] = await db.query(
      `SELECT 1 FROM profissional WHERE email = ? LIMIT 1`,
      [email]
    );

    // e-mail existe → senha está errada
    if (pacEmail.length > 0 || profEmail.length > 0) {
      return { user: null, errorType: "WRONG_PASSWORD" };
    }

    // e-mail não existe em lugar nenhum
    return { user: null, errorType: "EMAIL_NOT_FOUND" };
  },
};
