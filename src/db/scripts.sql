
-- 1. APAGA O BANCO DE DADOS SE ELE JÁ EXISTIR (para recomeçar do zero)
DROP DATABASE IF EXISTS puc_integra;

-- 2. CRIA O BANCO DE DADOS
CREATE DATABASE puc_integra CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 3. SELECIONA O BANCO DE DADOS para usar
USE puc_integra;

-- TABELAS PRINCIPAIS (USUÁRIOS E ACADÊMICO)

-- Tabela PESSOA (Baseado no Processo 1 e 3)
CREATE TABLE PESSOA (
    Nome VARCHAR(100) NOT NULL,
    CPF VARCHAR(14) NOT NULL UNIQUE,
    Matricula VARCHAR(15) PRIMARY KEY, -- Esta é a PK
    Email_Institucional VARCHAR(100) NOT NULL UNIQUE,
    Senha VARCHAR(255) NOT NULL,
    Tipo_Pessoa ENUM('Aluno', 'Professor') NOT NULL,
    Foto_Perfil VARCHAR(255),
    Tema_Preferencial VARCHAR(20),
    Idioma_Preferencial VARCHAR(10),
    Notificacoes_Ativas BOOLEAN DEFAULT TRUE
);

-- Tabela CURSO
CREATE TABLE CURSO (
    Id_Curso INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    Sigla VARCHAR(10) UNIQUE
);

-- Tabela DISCIPLINA
CREATE TABLE DISCIPLINA (
    Id_Disciplina INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    Sigla VARCHAR(10) UNIQUE
);

-- Tabela ALUNO (Especialização de PESSOA)
CREATE TABLE ALUNO (
    Matricula_Aluno VARCHAR(15) PRIMARY KEY,
    Eh_Monitor BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (Matricula_Aluno) REFERENCES PESSOA(Matricula)
);

-- Tabela PROFESSOR (Especialização de PESSOA)
CREATE TABLE PROFESSOR (
    Matricula_Professor VARCHAR(15) PRIMARY KEY,
    Id_Disciplina_Principal INT,
    FOREIGN KEY (Matricula_Professor) REFERENCES PESSOA(Matricula),
    FOREIGN KEY (Id_Disciplina_Principal) REFERENCES DISCIPLina(Id_Disciplina)
);

-- TABELAS DE INTERAÇÃO (PERGUNTAS, RESPOSTAS, REAÇÕES) 

-- Tabela PERGUNTA (Baseado no Processo 4)
CREATE TABLE PERGUNTA (
    Id_Pergunta INT PRIMARY KEY AUTO_INCREMENT,
    Matricula_Aluno VARCHAR(15) NOT NULL,
    Id_Disciplina INT NOT NULL,
    Titulo VARCHAR(150) NOT NULL,
    Conteudo TEXT NOT NULL,
    Data_Criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Aberta', 'Fechada', 'Moderacao') DEFAULT 'Aberta',
    Visibilidade VARCHAR(20),
    FOREIGN KEY (Matricula_Aluno) REFERENCES ALUNO(Matricula_Aluno),
    FOREIGN KEY (Id_Disciplina) REFERENCES DISCIPLINA(Id_Disciplina)
);

-- Tabela RESPOSTA (Baseado no Processo 4)
CREATE TABLE RESPOSTA (
    Id_Resposta INT PRIMARY KEY AUTO_INCREMENT,
    Id_Pergunta INT NOT NULL,
    Matricula_Pessoa VARCHAR(15) NOT NULL,
    Conteudo TEXT NOT NULL,
    Data_Criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    Is_Accepted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (Id_Pergunta) REFERENCES PERGUNTA(Id_Pergunta),
    FOREIGN KEY (Matricula_Pessoa) REFERENCES PESSOA(Matricula)
);

-- Tabela REACAO (Baseado no Processo 4)
CREATE TABLE REACAO (
    Id_Reacao INT PRIMARY KEY AUTO_INCREMENT,
    Id_Resposta INT NOT NULL,
    Matricula_Pessoa VARCHAR(15) NOT NULL,
    Tipo_Reacao VARCHAR(20) NOT NULL,
    UNIQUE KEY (Id_Resposta, Matricula_Pessoa),
    FOREIGN KEY (Id_Resposta) REFERENCES RESPOSTA(Id_Resposta),
    FOREIGN KEY (Matricula_Pessoa) REFERENCES PESSOA(Matricula)
);

-- Tabela CURSO_DISCIPLINA (Relacionamento N:N)
CREATE TABLE CURSO_DISCIPLINA (
    Id_Curso INT NOT NULL,
    Id_Disciplina INT NOT NULL,
    PRIMARY KEY (Id_Curso, Id_Disciplina),
    FOREIGN KEY (Id_Curso) REFERENCES CURSO(Id_Curso),
    FOREIGN KEY (Id_Disciplina) REFERENCES DISCIPLINA(Id_Disciplina)
);

-- Tabela MONITORIA
CREATE TABLE MONITORIA (
    Matricula_Aluno VARCHAR(15) NOT NULL,
    Matricula_Professor VARCHAR(15) NOT NULL,
    Id_Disciplina INT NOT NULL,
    Data_Inicio DATE NOT NULL,
    Data_Fim DATE,
    PRIMARY KEY (Matricula_Aluno, Matricula_Professor, Id_Disciplina),
    FOREIGN KEY (Matricula_Aluno) REFERENCES ALUNO(Matricula_Aluno),
    FOREIGN KEY (Matricula_Professor) REFERENCES PROFESSOR(Matricula_Professor),
    FOREIGN KEY (Id_Disciplina) REFERENCES DISCIPLINA(Id_Disciplina)
);

-- 1. Tabela PALAVRA_CHAVE (Armazena as palavras-chave únicas)
CREATE TABLE PALAVRA_CHAVE (
    Id_PalavraChave INT PRIMARY KEY AUTO_INCREMENT,
    Palavra VARCHAR(50) UNIQUE NOT NULL
);

-- 2. Tabela PERGUNTA_PALAVRACHAVE (Liga palavras-chave às Perguntas)
CREATE TABLE PERGUNTA_PALAVRACHAVE (
    Id_Pergunta INT NOT NULL,
    Id_PalavraChave INT NOT NULL,
    PRIMARY KEY (Id_Pergunta, Id_PalavraChave),
    FOREIGN KEY (Id_Pergunta) REFERENCES PERGUNTA(Id_Pergunta),
    FOREIGN KEY (Id_PalavraChave) REFERENCES PALAVRA_CHAVE(Id_PalavraChave)
);

-- 3. Tabela RESPOSTA_PALAVRACHAVE (Liga palavras-chave às Respostas)
CREATE TABLE RESPOSTA_PALAVRACHAVE (
    Id_Resposta INT NOT NULL,
    Id_PalavraChave INT NOT NULL,
    PRIMARY KEY (Id_Resposta, Id_PalavraChave),
    FOREIGN KEY (Id_Resposta) REFERENCES RESPOSTA(Id_Resposta),
    FOREIGN KEY (Id_PalavraChave) REFERENCES PALAVRA_CHAVE(Id_PalavraChave)
);

-- TABELAS DE ANEXOS (Baseado no Processo 4)
CREATE TABLE PERGUNTA_ANEXO (
    Id_Pergunta INT NOT NULL,
    Nome_Arquivo VARCHAR(255) NOT NULL,
    Caminho_Arquivo VARCHAR(255) NOT NULL,
    Tipo_Arquivo VARCHAR(50),
    PRIMARY KEY (Id_Pergunta, Nome_Arquivo),
    FOREIGN KEY (Id_Pergunta) REFERENCES PERGUNTA(Id_Pergunta)
);

CREATE TABLE RESPOSTA_ANEXO (
    Id_Resposta INT NOT NULL,
    Nome_Arquivo VARCHAR(255) NOT NULL,
    Caminho_Arquivo VARCHAR(255) NOT NULL,
    Tipo_Arquivo VARCHAR(50),
    PRIMARY KEY (Id_Resposta, Nome_Arquivo),
    FOREIGN KEY (Id_Resposta) REFERENCES RESPOSTA(Id_Resposta)
);