--
-- Arquivo de atualização do banco de dados para o sistema de Avaliação por Estrelas
--
USE medlar;

-- 1. Criação da Tabela `avaliacao`
CREATE TABLE IF NOT EXISTS avaliacao (
    id_avaliacao INT AUTO_INCREMENT PRIMARY KEY,
    id_agendamento INT NOT NULL UNIQUE,
    id_paciente INT NOT NULL,
    id_profissional INT NOT NULL,
    nota INT NOT NULL CHECK (nota BETWEEN 1 AND 5),
    comentario TEXT,
    data_avaliacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Chaves Estrangeiras
    FOREIGN KEY (id_agendamento) REFERENCES agendamento(id_agendamento),
    FOREIGN KEY (id_paciente) REFERENCES paciente(id_paciente),
    FOREIGN KEY (id_profissional) REFERENCES profissional(id_profissional)
);

-- 2. Alteração da Tabela `profissional`
-- Adiciona campos para armazenar a média de avaliação e o total de avaliações
ALTER TABLE profissional
ADD COLUMN media_avaliacao DECIMAL(2, 1) DEFAULT 0.0,
ADD COLUMN total_avaliacoes INT DEFAULT 0;
