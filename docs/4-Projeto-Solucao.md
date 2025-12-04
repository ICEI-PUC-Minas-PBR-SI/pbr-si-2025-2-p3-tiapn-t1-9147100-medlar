## 4. Projeto da Solução

## 4.1. Arquitetura da solução

A arquitetura do **Medlar** foi desenhada para atender aos requisitos funcionais (cadastro de pacientes e profissionais, busca, agendamento, notificações, prontuário/arquivos, relatórios) e não funcionais (segurança, disponibilidade, escalabilidade, desempenho e usabilidade).

**Visão em camadas**

- **Cliente (Web):**
  - SPA/PWA (React/Next.js).
  - Autenticação via JWT/OAuth.
  - Máscaras/validações de formulário, acessibilidade e cache local (IndexedDB/LocalStorage).
- **API Backend (REST/GraphQL):**
  - Orquestra os fluxos de negócio: cadastro, busca, agendamento, avaliações, relatórios.
  - Serviços internos: Autenticação/Autorização (RBAC), Pacientes, Profissionais, Agenda, Prontuário/Arquivos, Notificações, Relatórios.
- **Persistência e Arquivos:**
  - **PostgreSQL** (dados transacionais).
  - **Object Storage** (S3/GCS/Azure Blob) para documentos e imagens.
  - **Redis** para cache/sessões/filas leves (opcional).
- **Mensageria/Jobs:**
  - Fila de tarefas para e-mails, SMS e push (BullMQ/Sidekiq/Celery).
- **Integrações externas:**
  - **Maps/Geocoding** (Google Maps/Mapbox) — geolocalização e distância.
  - **Push** (Firebase Cloud Messaging).
  - **E-mail/SMS** (SendGrid/Postmark/Twilio).
- **Observabilidade & DevOps:**
  - Logs estruturados, métricas e tracing (ELK/Datadog).
  - CI/CD (GitHub Actions).
  - Hospedagem: Front (Vercel/Netlify), API (Render/Heroku/Fly.io), DB gerenciado.
- **Segurança:**
  - HTTPS, CORS, criptografia em repouso (KMS), **RBAC**, auditoria de acesso, backups e políticas de retenção.

---
 
 **Diagrama de Arquitetura**:


![Imagem do WhatsApp de 2025-10-09 à(s) 21 48 06_b4ac3a1e](https://github.com/user-attachments/assets/d33b799a-ce2a-4c4d-85c7-96006cbdded3)

 

### 4.2. Protótipos de telas

Os protótipos apresentados a seguir representam as principais interfaces do sistema **Medlar**, desenvolvidas para ilustrar a **interação do usuário com a plataforma** e apoiar o design final do aplicativo.  

Esses *wireframes* demonstram como o sistema atende às **histórias de usuário**, **requisitos funcionais** e **não funcionais** descritos na *Especificação do Projeto*, oferecendo uma visão clara de como o usuário navegará entre as telas e executará as principais ações.

As telas foram criadas em **baixa fidelidade**, com foco na estrutura, hierarquia e posicionamento dos elementos da interface, sem aplicação de cores, estilos visuais ou identidade definitiva.  

---

### 1️⃣ Protótipo de Baixa Fidelidade — Cadastro de Profissional  

<img src="https://github.com/user-attachments/assets/6d9e1a0b-9857-4139-a7c5-729a9cfb218d" alt="Cadastro de Profissional - Protótipo Baixa de Fidelidade" width="80%">

### Descrição da Tela  

- **Cabeçalho:** contém o logotipo do sistema, o nome *Medlar* e o menu de navegação (“Início” e “Sobre”), garantindo identidade visual e consistência.  
- **Título:** “Cadastro de Profissional” indica claramente o propósito da página.  
- **Campos de entrada:**  
  - **Nome** e **Sobrenome** — identificação pessoal.  
  - **CRRM/COREN** — campo para o registro profissional obrigatório.  
  - **Experiência Profissional** — área de texto para descrição detalhada da formação e experiências.  
  - **Área de Atendimento** — especialidade ou campo de atuação (ex.: enfermagem, fisioterapia, fonoaudiologia).  
- **Seção de Documentos:** espaço para upload de arquivos comprobatórios (ex.: diploma, registro profissional, documento de identidade), representados por *cards* de upload.  
- **Botões de ação:**  
  - **Voltar** — retorna à tela anterior.  
  - **Enviar** — envia o cadastro para validação pela equipe administrativa.

 ---

### 2️⃣ Tela de Cadastro de Paciente  

<img src="https://github.com/user-attachments/assets/a5a557d9-cc23-4b71-907b-2d8b93b2c68a" alt="Protótipo de Baixa Fidelidade - Login" width="80%">

#### Descrição da Tela  
- **Objetivo:** Permitir que pacientes ou familiares realizem o cadastro inicial na plataforma Medlar, inserindo informações pessoais e de contato de forma simples e organizada.  
- **Campos de entrada:** Nome completo, CPF, data de nascimento, telefone, e-mail e endereço, garantindo que os dados necessários sejam registrados corretamente.  
- **Botões de ação:**  
  - **Voltar** — retorna à tela anterior, permitindo que o usuário revise ou cancele o cadastro.  
  - **Continuar** — avança para a próxima etapa do cadastro, salvando as informações inseridas.    
 
---

### 3️⃣ Tela de Login

<img src="https://github.com/user-attachments/assets/64bc7d37-1d34-4ce1-9c43-9b5c2726ab41" alt="Cadastro de Login - Protótipo Baixa de Fidelidade" width="80%">

#### Descrição da Tela:
- **Objetivo:** Permitir que o usuário acesse sua conta na plataforma de forma segura, autenticando-se com suas credenciais.
- **Campos de entrada:**
    - **E-mail/Usuário** — campo para inserção da credencial principal de acesso.
    - **Senha** — campo para inserção da senha, com um ícone que permite visualizar o texto digitado para evitar erros.
- **Botões de ação:**
    - **Entrar** — submete as credenciais para validação e, em caso de sucesso, redireciona o usuário para a tela inicial do sistema.
- **Links complementares:**
    - **Esqueci minha senha** — inicia o fluxo de recuperação de acesso, geralmente solicitando o e-mail para envio de um link de redefinição.
    - **Criar conta** — direciona o usuário para a tela de cadastro, caso ainda não possua um registro na plataforma.

---

### 4️⃣ Tela de Busca de Profissionais  

<img src="https://github.com/user-attachments/assets/bc745274-c9d5-4b9f-8fa3-abf6281e7c91" alt="Protótipo de Baixa Fidelidade - Agenda" width="80%">

#### Descrição da Tela  
- **Objetivo:** Permitir que o usuário (paciente ou familiar) encontre profissionais de saúde disponíveis para atendimento domiciliar, utilizando filtros de busca e informações detalhadas de perfil.  

- **Elementos Principais:**  
  - **Barra de pesquisa:** Campo central para buscar profissionais por nome ou palavra-chave.  
  - **Filtros laterais:**  
    - **Especialidade:** Seleção de área de atuação (ex.: Enfermagem, Fisioterapia, Fonoaudiologia, etc.).  
    - **Localização:** Campo para inserir CEP ou endereço, com base em geolocalização.  
    - **Disponibilidade:** Escolha de data ou horário para atendimentos.  
    - **Preço:** Controle deslizante para definir faixa de preço mínima e máxima.  
    - **Classificação:** Botão de ação para aplicar filtros.  
  - **Lista de resultados:**  
    - Cards de profissionais contendo:  
      - Foto (avatar genérico ou foto real do profissional).  
      - Nome e especialidade.  
      - Avaliação por estrelas e número de atendimentos realizados.  
      - Botão **“Ver Perfil”** para acessar informações detalhadas.  
  - **Botão “Favoritos”:** Acesso rápido aos profissionais salvos.  
  
---

### 5️⃣ Solicitação de Atendimento
<img width="739" height="459" alt="image" src="https://github.com/user-attachments/assets/6159cb0b-84b9-4c87-a6a1-85fb6f9d1a85" />

#### Descrição da Tela:
- **Objetivo:** Permitir que o usuário solicite um novo atendimento de forma rápida e intuitiva, selecionando a especialidade, o profissional, a data e o horário desejados.
- **Campos de entrada:**
    - **Especialidade** — menu de seleção para escolher a área de atendimento (ex: Fisioterapia, Enfermagem).
    - **Profissional** — menu de seleção para escolher o profissional específico, filtrado pela especialidade.
    - **Data** — campo para definir o dia do atendimento.
    - **Horário** — campo para definir a hora do atendimento.
- **Botões de ação:**
    - **Voltar** — retorna à tela anterior, cancelando a solicitação atual.
    - **Agendar** — envia a solicitação de atendimento para a aprovação do profissional.
- **Links complementares:**
    - **Início** — retorna para a tela principal do sistema.
    - **Agendamento** — direciona para a tela "Minha Agenda", onde o usuário pode ver seus compromissos.
    - **Perfil** — leva o usuário para a sua página de perfil.

---

### 6️⃣ Tela Criar Agenda do Paciente 
<img width="745" height="468" alt="Captura de tela 2025-11-26 200833" src="https://github.com/user-attachments/assets/d59a2319-5a87-4ae4-9f1c-53f858ba48ef" />

#### Descrição da Tela: 
- **Objetivo:** Permitir que o paciente visualize, organize e gerencie seus atendimentos futuros de forma clara e centralizada, garantindo total controle sobre seus compromissos de saúde.
- **Elementos da Tela:**
    - **Calendário** — exibe o mês atual, permitindo ao usuário selecionar datas específicas para visualizar os agendamentos.
    - **Lista de Agenda** — mostra os atendimentos confirmados para a data selecionada, com detalhes como horário e o profissional responsável.
- **Botões de ação:**
    - **Novo agendamento** — inicia o fluxo para solicitar um novo atendimento.
- **Links complementares:**
    - **Logo** — retorna à página inicial do sistema.
    - **Perfil** — direciona o usuário para a tela de seu perfil, onde pode visualizar e editar suas informações pessoais.

---
## Diagrama de Classes

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.

<img width="3120" height="2752" alt="diagrama_classes_servicos" src="https://github.com/user-attachments/assets/c86e1bdc-246d-4d1b-a8b5-e181e391f79d" />

---
### 4.3. Modelo de dados

O desenvolvimento da solução proposta requer a existência de bases de dados que permitam efetuar os cadastros de dados e controles associados aos processos identificados, assim como recuperações.
Utilizando a notação do DER (Diagrama Entidade e Relacionamento), elaborem um modelo, na ferramenta visual indicada na disciplina, que contemple todas as entidades e atributos associados às atividades dos processos identificados. Deve ser gerado um único DER que suporte todos os processos escolhidos, visando, assim, uma base de dados integrada. O modelo deve contemplar, também, o controle de acesso de usuários (partes interessadas dos processos) de acordo com os papéis definidos nos modelos do processo de negócio.
_Apresente o modelo de dados por meio de um modelo relacional que contemple todos os conceitos e atributos apresentados na modelagem dos processos._

#### 4.3.1 Modelo ER

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.]

![ER](https://github.com/user-attachments/assets/31c15e75-3f0d-4fd1-b8ba-3474bf792d74)

---

#### 4.3.2 Esquema Relacional

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.
 
As referências abaixo irão auxiliá-lo na geração do artefato “Esquema Relacional”.

<img width="909" height="746" alt="banco_medlar-img" src="https://github.com/user-attachments/assets/be7a633e-468e-4538-8397-2e3b6b320aa0" />

---


#### 4.3.3 Modelo Físico

O modelo físico do banco de dados **Medlar** representa a estrutura detalhada das tabelas que armazenam e organizam as informações da aplicação.  

Esse banco de dados é utilizado para registrar pacientes, profissionais de saúde, serviços, solicitações de atendimento, agendamentos, pagamentos e consultas realizados dentro da plataforma.

## 2. Descrição Detalhada das Tabelas

### 2.1. Tabela `agendamento`

**Propósito:** Armazena informações sobre os agendamentos de serviços realizados pelos pacientes com os profissionais.

| Coluna | Tipo de Dado | Restrições | Descrição |
| --- | --- | --- | --- |
| `id_agendamento` | `INT` | `PRIMARY KEY`, `NOT NULL`, `AUTO_INCREMENT` | Identificador único do agendamento. |
| `id_paciente` | `INT` | `NOT NULL`, `FOREIGN KEY` (`paciente.id_paciente`) | Identificador do paciente que realizou o agendamento. |
| `id_profissional` | `INT` | `NOT NULL`, `FOREIGN KEY` (Parte da chave composta em `profissional_servico`) | Identificador do profissional que prestará o serviço. |
| `id_servico` | `INT` | `NOT NULL`, `FOREIGN KEY` (Parte da chave composta em `profissional_servico`) | Identificador do serviço agendado. |
| `data_hora` | `DATETIME` | `NOT NULL` | Data e hora marcadas para o agendamento. |
| `status` | `ENUM` | `DEFAULT 'pendente'` | Status atual do agendamento (`pendente`, `confirmado`, `cancelado`, `concluido`). |
| `preco_final` | `DECIMAL(10,2)` | `DEFAULT NULL` | Preço final cobrado pelo serviço no agendamento. |

### 2.2. Tabela `cartao_credito`

**Propósito:** Armazena informações de cartões de crédito associados aos pacientes para facilitar pagamentos.

| Coluna | Tipo de Dado | Restrições | Descrição |
| --- | --- | --- | --- |
| `id_cartao` | `INT` | `PRIMARY KEY`, `NOT NULL`, `AUTO_INCREMENT` | Identificador único do cartão de crédito. |
| `id_paciente` | `INT` | `NOT NULL`, `FOREIGN KEY` (`paciente.id_paciente`) | Identificador do paciente proprietário do cartão. |
| `numero_cartao` | `VARCHAR(20)` | `NOT NULL` | Número do cartão de crédito (provavelmente mascarado ou criptografado). |
| `nome_titular` | `VARCHAR(100)` | `NOT NULL` | Nome completo do titular do cartão. |
| `validade` | `CHAR(5)` | `NOT NULL` | Data de validade do cartão (MM/AA). |
| `bandeira` | `VARCHAR(20)` | `DEFAULT NULL` | Bandeira do cartão (ex: Visa, Mastercard). |

### 2.3. Tabela `metodo_pagamento`

**Propósito:** Lista os métodos de pagamento disponíveis no sistema.

| Coluna | Tipo de Dado | Restrições | Descrição |
| --- | --- | --- | --- |
| `id_metodo` | `INT` | `PRIMARY KEY`, `NOT NULL`, `AUTO_INCREMENT` | Identificador único do método de pagamento. |
| `tipo` | `ENUM` | `NOT NULL` | Tipo de método de pagamento (`credito`, `debito`, `pix`, `dinheiro`). |
| `descricao` | `VARCHAR(100)` | `DEFAULT NULL` | Descrição detalhada do método de pagamento. |

### 2.4. Tabela `paciente`

**Propósito:** Armazena os dados cadastrais e informações de saúde dos pacientes.

| Coluna | Tipo de Dado | Restrições | Descrição |
| --- | --- | --- | --- |
| `id_paciente` | `INT` | `PRIMARY KEY`, `NOT NULL`, `AUTO_INCREMENT` | Identificador único do paciente. |
| `nome` | `VARCHAR(100)` | `NOT NULL` | Nome completo do paciente. |
| `cpf` | `CHAR(11)` | `NOT NULL`, `UNIQUE` | Cadastro de Pessoa Física (CPF) do paciente. |
| `data_nascimento` | `DATE` | `NOT NULL` | Data de nascimento do paciente. |
| `telefone` | `VARCHAR(20)` | `DEFAULT NULL` | Número de telefone para contato. |
| `email` | `VARCHAR(100)` | `DEFAULT NULL`, `UNIQUE` | Endereço de e-mail do paciente. |
| `endereco` | `VARCHAR(150)` | `DEFAULT NULL` | Endereço residencial do paciente. |
| `historico_medico` | `TEXT` | `DEFAULT NULL` | Campo para registro de histórico médico relevante. |
| `senha` | `VARCHAR(100)` | `NOT NULL` | Senha de acesso do paciente (provavelmente hash). |

### 2.5. Tabela `pagamento`

**Propósito:** Registra os pagamentos realizados para os agendamentos.

| Coluna | Tipo de Dado | Restrições | Descrição |
| --- | --- | --- | --- |
| `id_pagamento` | `INT` | `PRIMARY KEY`, `NOT NULL`, `AUTO_INCREMENT` | Identificador único do registro de pagamento. |
| `id_agendamento` | `INT` | `NOT NULL`, `FOREIGN KEY` (`agendamento.id_agendamento`) | Agendamento ao qual o pagamento se refere. |
| `id_metodo` | `INT` | `NOT NULL`, `FOREIGN KEY` (`metodo_pagamento.id_metodo`) | Método de pagamento utilizado. |
| `data_pagamento` | `DATETIME` | `NOT NULL` | Data e hora em que o pagamento foi processado. |
| `valor_pago` | `DECIMAL(10,2)` | `NOT NULL` | Valor efetivamente pago. |
| `status_pagamento` | `ENUM` | `DEFAULT 'pendente'` | Status do pagamento (`pendente`, `aprovado`, `cancelado`). |
| `codigo_transacao` | `VARCHAR(50)` | `DEFAULT NULL` | Código de transação ou referência do pagamento. |

### 2.6. Tabela `profissional`

**Propósito:** Armazena os dados cadastrais e profissionais dos prestadores de serviço (médicos, terapeutas, etc.).

| Coluna | Tipo de Dado | Restrições | Descrição |
| --- | --- | --- | --- |
| `id_profissional` | `INT` | `PRIMARY KEY`, `NOT NULL`, `AUTO_INCREMENT` | Identificador único do profissional. |
| `nome` | `VARCHAR(100)` | `NOT NULL` | Nome completo do profissional. |
| `cpf` | `CHAR(11)` | `NOT NULL`, `UNIQUE` | Cadastro de Pessoa Física (CPF) do profissional. |
| `registro_profissional` | `VARCHAR(40)` | `NOT NULL` | Número de registro no conselho profissional (ex: CRM, CRP). |
| `especialidade` | `VARCHAR(500)` | `DEFAULT NULL` | Especialidade(s) do profissional. |
| `passagens_profissionais` | `TEXT` | `DEFAULT NULL` | Histórico de passagens e experiências profissionais. |
| `telefone` | `VARCHAR(20)` | `DEFAULT NULL` | Número de telefone para contato. |
| `email` | `VARCHAR(100)` | `DEFAULT NULL`, `UNIQUE` | Endereço de e-mail do profissional. |
| `endereco` | `VARCHAR(150)` | `DEFAULT NULL` | Endereço de atendimento ou residencial. |
| `avaliacao_media` | `DECIMAL(3,2)` | `DEFAULT NULL` | Média das avaliações recebidas pelo profissional. |
| `senha` | `VARCHAR(100)` | `DEFAULT NULL` | Senha de acesso do profissional (provavelmente hash). |
| `status` | `ENUM` | `DEFAULT 'aprovado'` | Status de aprovação do cadastro (`aprovado`, `pendente`, `rejeitado`). |
| `documento_rg` | `VARCHAR(255)` | `DEFAULT NULL` | Caminho ou referência ao documento de RG. |
| `documento_cpf` | `VARCHAR(255)` | `DEFAULT NULL` | Caminho ou referência ao documento de CPF. |
| `foto_perfil` | `VARCHAR(255)` | `DEFAULT NULL` | Caminho ou referência à foto de perfil. |

### 2.7. Tabela `profissional_servico`

**Propósito:** Tabela de relacionamento N:N (muitos para muitos) que associa quais serviços cada profissional oferece, permitindo valores e durações específicas por profissional.

| Coluna | Tipo de Dado | Restrições | Descrição |
| --- | --- | --- | --- |
| `id_profissional` | `INT` | `PRIMARY KEY`, `FOREIGN KEY` (`profissional.id_profissional`) | Identificador do profissional. |
| `id_servico` | `INT` | `PRIMARY KEY`, `FOREIGN KEY` (`servico.id_servico`) | Identificador do serviço. |
| `valor_profissional` | `DECIMAL(10,2)` | `DEFAULT NULL` | Valor cobrado pelo profissional para este serviço específico. |
| `duracao_profissional` | `INT` | `DEFAULT NULL` | Duração em minutos do serviço quando prestado por este profissional. |

### 2.8. Tabela `servico`

**Propósito:** Lista todos os serviços que podem ser agendados no sistema.

| Coluna | Tipo de Dado | Restrições | Descrição |
| --- | --- | --- | --- |
| `id_servico` | `INT` | `PRIMARY KEY`, `NOT NULL`, `AUTO_INCREMENT` | Identificador único do serviço. |
| `nome_servico` | `VARCHAR(100)` | `DEFAULT NULL` | Nome do serviço (ex: "Consulta Médica Geral"). |
| `descricao` | `TEXT` | `DEFAULT NULL` | Descrição detalhada do serviço. |
| `valor_base` | `DECIMAL(10,0)` | `DEFAULT NULL` | Valor base sugerido para o serviço. |
| `duracao_padrao` | `INT` | `DEFAULT NULL` | Duração padrão em minutos do serviço. |

### 4.4. Tecnologias

Para o desenvolvimento da aplicação **Medlar**, foram utilizadas tecnologias que garantem integração eficiente entre o front-end, o back-end e o banco de dados, priorizando desempenho, segurança e escalabilidade.  
A escolha das ferramentas foi baseada em sua robustez, facilidade de manutenção e compatibilidade com os requisitos do sistema.

### 🧠 Tecnologias Utilizadas

| **Dimensão** | **Tecnologia / Ferramenta** |
|---------------|------------------------------|
| **SGBD (Banco de Dados)** | 🗄️ **MySQL** — responsável pelo armazenamento e gerenciamento das informações da aplicação. |
| **Front-end** | 💻 **HTML, CSS e JavaScript** — utilizados na construção das interfaces do usuário e protótipos das telas. |
| **Back-end** | ☕ **Java (Spring Boot)** — responsável pela lógica de negócio e integração entre o sistema e o banco de dados. |
| **IDE de Desenvolvimento** | 🧩 **Visual Studio Code** — ambiente utilizado para escrever, editar e integrar o código com o GitHub. |
| **Controle de Versão** | 🔁 **Git + GitHub** — utilizado para versionamento do código, colaboração e publicação da documentação. |
| **Servidor / Deploy** | 🌐 **GitHub Pages** — hospedagem das páginas web e documentação do projeto. |
| **Modelagem e Diagramas** | 🧮 **Lucidchart / Bizagi Modeler** — criação dos diagramas BPMN e modelagem AS-IS e TO-BE. |
| **Prototipagem de Telas** | 🎨 **Figma / Draw.io** — elaboração dos wireframes e protótipos de baixa fidelidade das telas do aplicativo. |

---

#### 💡 Descrição das Tecnologias Utilizadas

- **MySQL:** Banco de dados relacional utilizado para armazenar as informações do sistema, como cadastros de pacientes, profissionais e agendamentos.  
- **Spring Boot (Java):** Framework responsável pela camada de back-end, fornecendo APIs integradas ao banco de dados.  
- **HTML + CSS + JavaScript:** Linguagens usadas no front-end para criar uma interface acessível e responsiva.  
- **Git / GitHub:** Ferramentas de controle de versão e colaboração entre os membros do grupo.  
- **Figma:** Utilizado para prototipar as telas e padronizar o design da aplicação.

---

#### 🔁 Fluxo de Interação entre Tecnologias

O diagrama abaixo ilustra como as tecnologias se integram e o caminho percorrido por uma requisição do usuário até o retorno da resposta no sistema.

<img width="1248" height="832" alt="Arquitetura_Medlar_Fluxo2" src="https://github.com/user-attachments/assets/d92506a9-2ec1-4137-822d-1729d8c6f431" />

**Descrição do Fluxo:**
1. O **usuário** acessa o aplicativo via navegador (Front-end em HTML, CSS e JS).  
2. O front-end se comunica com a **API REST** desenvolvida em **Spring Boot**, que processa as solicitações.  
3. O **back-end** envia e recebe dados do **banco MySQL**, realizando validações e regras de negócio.  
4. O resultado é retornado ao front-end, exibindo informações em tempo real para o usuário.  
5. O sistema é hospedado via **GitHub Pages** (interface) e **Render** (API), garantindo disponibilidade e fácil manutenção.

---



