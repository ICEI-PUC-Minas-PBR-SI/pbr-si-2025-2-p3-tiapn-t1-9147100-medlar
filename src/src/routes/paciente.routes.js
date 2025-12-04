const express = require("express");
const router = express.Router();
const PacienteController = require("../controllers/PacienteController");

router.post("/", PacienteController.criar);

module.exports = router;
