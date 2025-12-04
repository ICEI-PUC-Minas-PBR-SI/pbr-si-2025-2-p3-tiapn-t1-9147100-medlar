const onlyDigits = require("./onlyDigits");

function montarEndereco({ rua, numero, bairro, cidadeUf, cep }) {
  const linha1 = [rua, numero].filter(Boolean).map(s => String(s).trim()).join(", ");
  const linha2 = [bairro, cidadeUf].filter(Boolean).map(s => String(s).trim()).join(", ");

  const base = [linha1, linha2].filter(Boolean).join(" - ");
  const cepFmt = onlyDigits(cep || "");

  return cepFmt ? `${base} - ${cepFmt}` : base;
}

module.exports = montarEndereco;
