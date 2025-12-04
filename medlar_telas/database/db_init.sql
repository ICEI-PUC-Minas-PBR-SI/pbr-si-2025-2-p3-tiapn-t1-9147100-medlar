-- Script de Inicialização do Banco de Dados (db_init.sql)

-- NOTA: Este script assume que as tabelas 'paciente', 'profissional' e 'servico' já existem.
-- As colunas de conexão (host, user, password) estão em src/config/db.js.

-- Tabela AGENDAMENTO
-- Adiciona a coluna id_pagamento, se não existir, e ajusta o status.
CREATE TABLE IF NOT EXISTS agendamento (
    id_agendamento INT AUTO_INCREMENT PRIMARY KEY,
    id_paciente INT NOT NULL,
    id_profissional INT NOT NULL,
    id_servico INT NOT NULL,
    data_hora DATETIME NOT NULL,
    status ENUM('pendente', 'confirmado', 'rejeitado', 'cancelado', 'concluido') NOT NULL DEFAULT 'pendente',
    preco_final DECIMAL(10, 2) NOT NULL,
    id_pagamento INT NULL, -- Chave estrangeira para a tabela pagamento
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_paciente) REFERENCES paciente(id_paciente),
    FOREIGN KEY (id_profissional) REFERENCES profissional(id_profissional),
    FOREIGN KEY (id_servico) REFERENCES servico(id_servico)
);

-- Tabela PAGAMENTO
-- Tabela para registrar as transações de pagamento.
CREATE TABLE IF NOT EXISTS pagamento (
    id_pagamento INT AUTO_INCREMENT PRIMARY KEY,
    id_agendamento INT NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    metodo_pagamento VARCHAR(50) NOT NULL,
    status_pagamento ENUM('pendente', 'aprovado', 'rejeitado', 'estornado', 'cancelado') NOT NULL DEFAULT 'pendente',
    id_transacao_externa VARCHAR(255) NULL, -- ID da transação no Mercado Pago (preference ID)
    data_pagamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_agendamento) REFERENCES agendamento(id_agendamento)
);

-- Adicionar a coluna id_pagamento na tabela agendamento se ela ainda não existir
-- (Para o caso de o usuário já ter uma tabela agendamento sem essa coluna)
ALTER TABLE agendamento
ADD COLUMN IF NOT EXISTS id_pagamento INT NULL;

-- Adicionar a chave estrangeira para id_pagamento na tabela agendamento
-- (Para o caso de o usuário já ter a coluna, mas não a FK)
-- NOTA: A sintaxe IF NOT EXISTS para ADD CONSTRAINT pode não ser suportada em todas as versões do MySQL.
-- Se der erro, o usuário deve rodar manualmente.
-- ALTER TABLE agendamento
-- ADD CONSTRAINT fk_agendamento_pagamento
-- FOREIGN KEY (id_pagamento) REFERENCES pagamento(id_pagamento);

-- Exemplo de dados de teste (opcional)
-- INSERT INTO paciente (nome, email, telefone) VALUES ('Paciente Teste', 'paciente@teste.com', '11999999999');
-- INSERT INTO profissional (nome, email, especialidade, dias_disponiveis, hora_inicio, hora_fim) VALUES ('Profissional Teste', 'profissional@teste.com', 'Clínico Geral', '1,2,3,4,5', '09:00:00', '17:00:00');
-- INSERT INTO servico (nome_servico, preco) VALUES ('Consulta Médica', 150.00);
