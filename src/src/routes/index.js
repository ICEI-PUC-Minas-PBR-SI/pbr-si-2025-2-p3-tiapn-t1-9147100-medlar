const express = require("express");
const router = express.Router();

router.use("/pacientes", require("./paciente.routes"));
router.use("/profissionais", require("./profissional.routes"));
router.use("/login", require("./login.routes"));
router.use("/servicos", require("./servicos.routes"));
router.use("/busca", require("./busca.routes"));
router.use("/agendamentos", require("./agendamento.routes"));
router.use("/login", require("./login.routes"));
router.use("/admin", require("./admin.routes"));

module.exports = router;
