const { MercadoPagoConfig } = require('mercadopago');

// O token de acesso deve ser configurado como uma variável de ambiente
const ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN || 'SEU_ACCESS_TOKEN_AQUI';

if (ACCESS_TOKEN === 'SEU_ACCESS_TOKEN_AQUI') {
    console.warn("⚠️ ATENÇÃO: O token de acesso do Mercado Pago não foi configurado. Use a variável de ambiente MERCADO_PAGO_ACCESS_TOKEN.");
}

// Cria a instância do cliente com o token de acesso
const client = new MercadoPagoConfig({
    accessToken: ACCESS_TOKEN,
});

module.exports = client;
