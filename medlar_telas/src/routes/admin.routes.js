// src/routes/admin.routes.js
const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");

// Lista pacientes + profissionais pendentes
router.get("/pendentes", AdminController.listarPendentes);

// Aprovar (tipo = paciente | profissional)
router.put("/aprovar/:tipo/:id", AdminController.aprovar);

// Rejeitar (tipo = paciente | profissional)
router.put("/rejeitar/:tipo/:id", AdminController.rejeitar);

module.exports = router;
