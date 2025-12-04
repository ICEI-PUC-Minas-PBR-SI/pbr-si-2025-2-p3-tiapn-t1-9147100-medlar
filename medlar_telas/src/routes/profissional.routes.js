const express = require("express");
const router = express.Router();

const ProfissionalController = require("../controllers/ProfissionalController");
const upload = require("../config/upload"); // middleware MULTER

// Rota de cadastro de profissional COM upload de documentos
router.post(
    "/",
    upload.fields([
        { name: "documento_rg", maxCount: 1 },
        { name: "documento_cpf", maxCount: 1 },
        { name: "foto_perfil", maxCount: 1 }
    ]),
    ProfissionalController.criar
);

module.exports = router;
