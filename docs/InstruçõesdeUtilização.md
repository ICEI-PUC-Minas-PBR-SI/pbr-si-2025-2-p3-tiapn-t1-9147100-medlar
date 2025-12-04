## 1. Pré-requisitos

Para executar a aplicação, você precisará ter instalado em seu ambiente:

*   **Node.js e npm:** A aplicação é construída em Node.js.
*   **MySQL:** A aplicação utiliza um banco de dados MySQL.

## 2. Configuração do Banco de Dados

A aplicação está configurada para se conectar a um banco de dados MySQL.

1.  **Servidor MySQL:** Certifique-se de que seu servidor MySQL esteja em execução.
2.  **Criação do Banco de Dados:** Crie um banco de dados com o nome `medlar`.
3.  **Credenciais:** A aplicação utiliza as seguintes credenciais de conexão, conforme definido em `src/config/db.js` e `src/server.js`:
    *   **Host:** `localhost`
    *   **Usuário:** `root`
    *   **Senha:** `@1997`

    > **Nota:** Se suas credenciais de banco de dados forem diferentes, você precisará editar os arquivos `src/config/db.js` e `src/server.js` para refletir a configuração correta.

4.  **Estrutura do Banco de Dados (Schema):** Você precisará importar o schema (estrutura das tabelas) do projeto para o banco de dados `medlar`. O arquivo de schema não estava no ZIP fornecido, mas é essencial para o funcionamento da aplicação (ex: tabelas `paciente`, `profissional`, `agendamento`, etc.).

## 3. Instalação de Dependências

1.  **Navegue até o diretório do projeto:**
    ```bash
    cd /caminho/para/medlar_project
    ```
2.  **Instale as dependências:** A aplicação utiliza as dependências listadas no `package.json` (`cors`, `express`, `multer`, `mysql2`). Use o `npm` para instalá-las:
    ```bash
    npm install
    ```

## 4. Execução da Aplicação

1.  **Inicie o servidor:** Use o script `start` definido no `package.json` para iniciar a aplicação:
    ```bash
    npm start
    ```
2.  **Verificação:** Se a conexão com o banco de dados for bem-sucedida, o console exibirá uma mensagem similar a:
    ```
    ✅ Conectado ao MySQL (medlar)
    🚀 API rodando em http://localhost:3000
    ```
3.  **Acesso:** A aplicação estará acessível no seu navegador através do endereço:
    ```
    http://localhost:3000
    ```

---
