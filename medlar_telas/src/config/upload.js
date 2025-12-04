const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Caminho da pasta ONDE OS ARQUIVOS SERÃO SALVOS
// OBS: você está rodando a API dentro de:  medlar_telas/src
// Então a pasta public/ está em:  medlar_telas/public
// e a pasta img/profissionais está em:  medlar_telas/public/img/profissionais
const uploadPath = path.join(__dirname, "../../public/img/profissionais");

// Garante que a pasta existe
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, unique + path.extname(file.originalname));
    }
});

module.exports = multer({ storage });
