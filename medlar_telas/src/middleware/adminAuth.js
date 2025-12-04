// src/middleware/adminAuth.js
module.exports = function adminAuth(req, res, next) {
  const token = req.header("x-admin-token") || req.query.adminToken;
  const expected = process.env.ADMIN_TOKEN || "";

  if (!expected) {
    return res.status(500).json({ error: "Admin token não configurado no servidor." });
  }

  if (!token || token !== expected) {
    return res.status(401).json({ error: "Autorização de admin inválida." });
  }

  next();
};
