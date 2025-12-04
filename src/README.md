# Medlar - Atualização de Funcionalidades

Este projeto contém as atualizações solicitadas para o sistema Medlar, incluindo:
1.  **Integração da Busca de Profissionais** com o cadastro de profissionais.
2.  **Implementação do Fluxo de Agendamento** (solicitação, aceite e rejeição).
3.  **Visualização de Agendamentos** nas agendas do Paciente e do Profissional.

## 1. Configuração do Banco de Dados

**É crucial executar o script SQL abaixo para criar a tabela de agendamentos.**

1.  Acesse seu cliente MySQL (ou similar).
2.  Selecione o banco de dados `medlar`.
3.  Execute o seguinte comando SQL:

\`\`\`sql
CREATE TABLE IF NOT EXISTS agendamento (
    id_agendamento INT AUTO_INCREMENT PRIMARY KEY,
    id_paciente INT NOT NULL,
    id_profissional INT NOT NULL,
    data_hora DATETIME NOT NULL,
    servico VARCHAR(100) NOT NULL,
    status ENUM('pendente', 'aceito', 'rejeitado') NOT NULL DEFAULT 'pendente',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_paciente) REFERENCES paciente(id_paciente),
    FOREIGN KEY (id_profissional) REFERENCES profissional(id_profissional)
);
\`\`\`

## 2. Uso das Novas Funcionalidades

### Busca de Profissionais

*   A tela `public/html/buscar-profissionais.html` agora faz uma chamada à API (`/api/busca?termo=...`) para listar profissionais cadastrados.
*   A busca é feita pelo campo `especialidade` ou `nome` do profissional.
*   **Nota:** Para que a busca funcione, é necessário ter profissionais cadastrados na tabela `profissional` com o campo `especialidade` preenchido.

### Solicitação de Agendamento

*   Ao clicar em "Agendar Consulta" na tela de busca, o usuário é redirecionado para `public/html/solicitar-atendimento.html`.
*   O ID e nome do profissional são passados via URL.
*   A solicitação é enviada para a API (`POST /api/agendamentos`).
*   **Nota:** O `id_paciente` está simulado como `1` no arquivo `public/js/solicitar-atendimento.js`. Em um sistema real, você deve obter o ID do paciente logado via sessão/token.

### Agenda do Profissional

*   A tela `public/html/agenda-profissionais.html` lista as solicitações de agendamento.
*   O `id_profissional` está simulado como `2` no arquivo `public/js/agenda-profissionais.js`.
*   O profissional pode **Aceitar** (`PUT /api/agendamentos/aceitar/:id_agendamento`) ou **Rejeitar** (`PUT /api/agendamentos/rejeitar/:id_agendamento`) as solicitações.

### Agenda do Paciente

*   A tela `public/html/agenda-paciente.html` lista os agendamentos do paciente.
*   O `id_paciente` está simulado como `1` no arquivo `public/js/agenda-paciente.js`.
*   O paciente pode ver o status do agendamento (`Pendente`, `Aceito`, `Rejeitado`).

## 3. Arquivos Modificados

| Arquivo | Descrição da Mudança |
| :--- | :--- |
| `src/models/ProfissionalModel.js` | Adicionada função `buscarProfissionais`. |
| `src/models/AgendamentoModel.js` | **NOVO:** Modelo para operações CRUD de agendamentos. |
| `src/controllers/BuscaController.js` | **NOVO:** Controlador para a lógica de busca de profissionais. |
| `src/controllers/AgendamentoController.js` | **NOVO:** Controlador para a lógica de solicitação e gestão de agendamentos. |
| `src/routes/busca.routes.js` | **NOVO:** Rotas para a busca de profissionais. |
| `src/routes/agendamento.routes.js` | **NOVO:** Rotas para a gestão de agendamentos. |
| `src/routes/index.js` | Inclusão das novas rotas (`/busca` e `/agendamentos`). |
| `public/js/busca.js` | Reescrito para fazer a chamada à API de busca e renderizar os resultados dinamicamente. |
| `public/js/solicitar-atendimento.js` | **NOVO:** Lógica para enviar a solicitação de agendamento via API. |
| `public/js/agenda-profissionais.js` | Reescrito para listar agendamentos do profissional e gerenciar aceite/rejeite via API. |
| `public/js/agenda-paciente.js` | Reescrito para listar agendamentos do paciente via API. |
| `public/html/buscar-profissionais.html` | Ajustado para funcionar com o novo `busca.js`. |
| `public/html/solicitar-atendimento.html` | Adicionada a referência ao novo `solicitar-atendimento.js`. |
| `public/html/agenda-profissionais.html` | Ajustado para usar uma lista dinâmica (`<ul id="appointments-list">`). |
| `public/html/agenda-paciente.html` | Ajustado para usar uma lista dinâmica (`<ul id="appointments-list">`). |
=======

# Código-fonte do projeto


Aqui devem ficar os arquivos-fonte do projeto: HTML, CSS, Javascript, imagens, e outros necessários para o 
funcionamento do sistema.


<li><a href="/src"> Código Fonte</a></li>

