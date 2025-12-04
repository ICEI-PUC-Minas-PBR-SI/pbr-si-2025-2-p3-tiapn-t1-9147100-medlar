## 4. Projeto da Solução

<<<<<<< HEAD
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
=======
<span style="color:red">Pré-requisitos: <a href="3-Modelagem-Processos-Negócio.md"> Modelagem do Processo de Negocio</a></span>

## 4.1. Arquitetura da solução

A arquitetura da solução **PUC Integra** foi projetada seguindo o padrão arquitetural **MVC (Model-View-Controller)**, amplamente utilizado em aplicações web robustas para garantir a separação de responsabilidades, facilidade de manutenção e escalabilidade.

A solução é composta pelas seguintes camadas:

1.  **Camada de Apresentação (View/Frontend):**
    * Responsável pela interação direta com o usuário.
    * Desenvolvida utilizando **HTML5, CSS3 e JavaScript**, garantindo uma interface responsiva e acessível.
    * As páginas são renderizadas pelo servidor ou servidas como conteúdo estático, comunicando-se com o backend para envio e recebimento de dados.

2.  **Camada de Controle e Regra de Negócio (Controller & Service / Backend):**
    * Implementada em **Java** com o framework **Spring Boot**.
    * **Controllers:** Recebem as requisições HTTP (GET, POST, PUT, DELETE) vindas do frontend, validam os dados de entrada e direcionam para os serviços adequados.
    * **Services:** Contêm a lógica de negócio da aplicação (ex: regras de validação de cadastro, cálculo de relevância de respostas, verificação de perfil de monitor). Esta camada isola a regra de negócio da camada de controle e da camada de dados.

3.  **Camada de Persistência (Model/Repository):**
    * Utiliza o **Spring Data JPA** e **Hibernate** para o mapeamento objeto-relacional (ORM).
    * Responsável por traduzir os objetos Java (Entidades) em registros no banco de dados e vice-versa, abstraindo a complexidade do SQL direto para operações padrão.

4.  **Camada de Banco de Dados (Database):**
    * SGBD **MySQL** armazenando os dados relacionais conforme definido no Modelo ER.
    * Garante a integridade referencial e a persistência segura das informações de usuários, perguntas, respostas e interações.

Esta arquitetura garante que alterações na interface não impactem as regras de negócio e que a lógica de banco de dados esteja desacoplada do restante da aplicação.
---

### 4.2. Protótipos de telas

#### Tela Inicial ("Homepage")

O protótipo de alta fidelidade "Homepage" (baseado no Processo 1 – Visualização e Busca de Conteúdo) serve como a porta de entrada para a plataforma PUC Integra, apresentando uma visão geral do conteúdo disponível e as principais funcionalidades de navegação e interação. O fluxo principal envolve o usuário visualizando o feed de perguntas frequentes e notícias recentes, além de ter acesso rápido à busca de conteúdo e à criação de novas perguntas.

Elementos e Seções principais:**

* **Cabeçalho Fixo:**
    * **Logo "PUC Integra"** (Identificador da marca).
    * **Botões de Ação:** "Entrar", "Cadastre-se" (para usuários não logados), e "Faça uma pergunta" (para acesso rápido à criação de conteúdo).
* **Seção "Hero" (Destaque Principal):**
    * **Frase de Efeito:** "Transforme perguntas em aprendizado" (Título principal).
    * **Descrição:** Texto explicativo sobre a proposta de valor da plataforma.
    * **Campo de Busca:** "Qual a sua dúvida?" (Caixa de texto com ícone de lupa para pesquisa de conteúdo).
* **Barra de Categorias/Filtros:**
    * **Navegação Horizontal:** "Todas", "Algoritmos em Grafos", "Redes de Computadores" (Exemplos de categorias/disciplinas para filtrar perguntas).
    * **Setas de Navegação:** Permitem ao usuário rolar as categorias horizontalmente.
* **Seção "Perguntas Mais Frequentes":**
    * **Título:** "PERGUNTAS MAIS FREQUENTES".
    * **Carrossel de Perguntas:** Exibe cards de perguntas populares com informações como autor, disciplina, título da pergunta e palavras-chave.
    * **Setas de Navegação:** Permitem ao usuário navegar entre as perguntas.
* **Seção "Eventos e Notícias Recentes":**
    * **Título:** "Eventos e notícias recentes".
    * **Carrossel de Notícias:** Exibe cards com notícias relevantes (ex: "Alunos da PUC Minas Lançam Plataforma Inovadora para Colaboração Acadêmica") e imagens.
    * **Setas de Navegação e Indicadores de Página:** Permitem ao usuário navegar entre as notícias.
* **Call-to-Action (Rodapé):**
    * **Mensagem:** "Está buscando uma resposta?".
    * **Botão:** "Faça uma pergunta" (Redireciona para a funcionalidade de criação de perguntas).

**Ações principais:**

* **Cliques nos Botões do Cabeçalho:** Navegar para login, cadastro ou criação de perguntas.
* **Digitar no Campo de Busca:** Iniciar uma pesquisa por conteúdo.
* **Cliques nas Categorias/Filtros:** Filtrar as perguntas exibidas.
* **Cliques em Perguntas ou Notícias:** Navegar para a página de detalhes da pergunta/notícia.
* **Cliques no Botão "Faça uma pergunta" (Rodapé):** Redirecionar para a funcionalidade de criação de perguntas.


![Protótipo de alta fidelidade - Homepage](../docs/images/prototipo_homepage.png)

#### Tela de Cadastro ("Criar Conta:")
Na tela de cadastro, o usuário que ainda não possui registro pode criar sua conta na plataforma. Os campos obrigatórios permitem que o sistema colete informações essenciais para a identificação e autenticação futura.
Campos disponíveis:
* Nome Completo (Caixa de texto – obrigatório)
* CPF (Caixa de texto – numérico, obrigatório)
* Matrícula (Caixa de texto – obrigatório)
* E-mail Institucional (Caixa de texto – obrigatório, formato válido)
* Senha (Caixa de texto – obrigatório, mínimo 8 caracteres)
* Confirmar Senha (Caixa de texto – deve coincidir com a senha)
* Tipo de Entidade (Seleção única – opções: Aluno ou Professor)
Ação principal:
* Botão "Cadastrar" → envia os dados para validação e registro no banco de dados, conforme o fluxo do processo BPMN.

![Protótipo de alta fidelidade - Cadastro](../docs/images/prototipo_cadastro.png)

---

#### Tela de Login ("Entrar")
Na tela de login, o usuário já cadastrado pode acessar a plataforma utilizando suas credenciais.
Campos disponíveis:
* E-mail Institucional (Caixa de texto – obrigatório)
* Senha (Caixa de texto – obrigatório)
  
Ações principais:
* Botão "Login" → valida as credenciais e direciona o usuário para o sistema, caso estejam corretas.
*  Link "Esqueceu a senha? Clique Aqui!" → direciona o usuário para uma tela de recuperação da senha.
* Link "Não possui uma conta? Registrar" → direciona o usuário para a tela de cadastro, caso ainda não tenha registro.

![Protótipo de alta fidelidade - Login](../docs/images/prototipo_login.png)

---

#### Tela de Personalização de Perfil ("Editar Perfil")
O protótipo de alta fidelidade "Editar Perfil" (baseado no Processo 3 – Personalização de Perfil) permite ao usuário atualizar suas informações pessoais e credenciais após o login. O fluxo principal envolve acessar a área de perfil, atualizar os dados desejados, e o sistema validar e salvar as alterações no banco de dados.

Campos disponíveis:
* **Foto de Perfil** (Upload de imagem - permite alteração)
* **Nome de Usuário** (Caixa de texto - permite atualização)
* **E-mail** (Caixa de texto - permite atualização)
* **Número de Telefone** (Caixa de texto - permite atualização)
* **Curso Matriculado** (Seleção única - permite atualização da afiliação acadêmica)
* **Biografia** (Área de texto - limite de 250 caracteres)
* **Link "Deseja Alterar sua senha? Clique Aqui!"** (Link - redireciona para a funcionalidade de alteração de senha)

Ações principais:
* **Botão "Enviar"** → Submete os dados para validação e persistência no banco de dados.
* **Botão "Cancelar"** → Descarta as alterações e retorna à visualização anterior.

![Protótipo de alta fidelidade - Editar Perfil](../docs/images/prototipo_personalizacao_perfil.jpg)

---

#### Tela de Criação de Pergunta ("Faça uma pergunta")
Este protótipo (baseado no Fluxo Pergunta do Processo 4) é a interface para o usuário publicar dúvidas acadêmicas na plataforma. A tela garante que a pergunta seja contextualizada, associando-a a um Curso e Disciplina, e permitindo a inclusão de *Palavras-Chave* e anexos para melhor categorização e busca.

Campos disponíveis:
* **Título** (Caixa de texto - obrigatório)
* **Curso** (Seleção única - afiliação acadêmica)
* **Disciplina** (Seleção única - afiliação acadêmica)
* **Descrição** (Área de texto/Editor de texto enriquecido - Conteúdo da dúvida)
* **Inserir um Anexo** (Upload de arquivo - permite a inclusão de até 3 arquivos)
* **Palavras-Chave** (Seleção múltipla/Caixa de texto com seleção - permite categorização por tags)

Ações principais:
* **Botão "Publicar Dúvida"** → Confirma o envio da postagem para o sistema, onde será registrada no banco de dados.
* **Botão "Cancelar"** → Aborta a criação da pergunta.

![Protótipo de alta fidelidade - Fazer uma pergunta](../docs/images/prototipo_pergunta.jpg)

---

#### Tela de Envio de Resposta
O protótipo de Envio de Resposta (baseado no Fluxo Resposta do Processo 4) é a área de interação onde um usuário pode contribuir com soluções para uma dúvida publicada.

Campos disponíveis:
* **Pergunta:** (Área de exibição - Exibe o conteúdo da pergunta que está sendo respondida).
* **Resposta:** (Área de texto/Editor de texto enriquecido - Permite inserção de texto, links, imagens e formatação).
* **Opções de formatação:** (Ícones de texto enriquecido, como negrito, itálico, listas, equações e anexos).

Ações principais:
* **Botão "Enviar"** → Submete o conteúdo da resposta ao sistema para registro e vinculação à pergunta.
* **Botão "Cancelar"** → Aborta o preenchimento da resposta.

![Protótipo de alta fidelidade - Enviar Resposta](../docs/images/prototipo_resposta.jpg)
>>>>>>> upstream/main

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

O diagrama de classes reflete a estrutura orientada a objetos que sustenta a aplicação Spring Boot. As principais classes de domínio mapeiam diretamente as entidades do banco de dados:

<<<<<<< HEAD
<img width="3120" height="2752" alt="diagrama_classes_servicos" src="https://github.com/user-attachments/assets/c86e1bdc-246d-4d1b-a8b5-e181e391f79d" />
=======
- **Pessoa (Classe Abstrata/Superclasse):** Centraliza os atributos comuns (nome, email, senha).
- **Aluno e Professor (Subclasses):** Herdam de Pessoa e adicionam atributos específicos (monitoria para alunos, disciplina principal para professores).
- **Pergunta e Resposta:** Classes associativas que compõem o núcleo da interação, onde Pergunta agrega uma Disciplina e uma lista de Resposta.
- **Curso e Disciplina:** Representam a estrutura acadêmica, com relacionamento N:N.

![Diagrama de classes](../docs/images/diagrama_de_clsses.jpg)
>>>>>>> upstream/main

---
### 4.3. Modelo de dados

O desenvolvimento da solução proposta requer a existência de bases de dados que permitam efetuar os cadastros de dados e controles associados aos processos identificados, assim como recuperações.
Utilizando a notação do DER (Diagrama Entidade e Relacionamento), elaborem um modelo, na ferramenta visual indicada na disciplina, que contemple todas as entidades e atributos associados às atividades dos processos identificados. Deve ser gerado um único DER que suporte todos os processos escolhidos, visando, assim, uma base de dados integrada. O modelo deve contemplar, também, o controle de acesso de usuários (partes interessadas dos processos) de acordo com os papéis definidos nos modelos do processo de negócio.
_Apresente o modelo de dados por meio de um modelo relacional que contemple todos os conceitos e atributos apresentados na modelagem dos processos._

<<<<<<< HEAD
#### 4.3.1 Modelo ER

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.]

![ER](https://github.com/user-attachments/assets/31c15e75-3f0d-4fd1-b8ba-3474bf792d74)

---

#### 4.3.2 Esquema Relacional

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.
 
As referências abaixo irão auxiliá-lo na geração do artefato “Esquema Relacional”.

<img width="909" height="746" alt="banco_medlar-img" src="https://github.com/user-attachments/assets/be7a633e-468e-4538-8397-2e3b6b320aa0" />

=======
>>>>>>> upstream/main
---

### 4.3.1 Modelo ER

![Modelo Entidade-Relacionamento](../docs/images/modeloER_Image.png)

<<<<<<< HEAD
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
=======
**Diagrama de Entidade e Relacionamento**

| Nº | Relacionamento | Entidades envolvidas | Grau | Cardinalidades | Tipo | Identifying? | Participações | Observações |
|----|----------------|----------------------|------|----------------|------|---------------|----------------|--------------|
| 1 | **Faz** | Aluno — Pergunta | Binário | Aluno (0,N) — Pergunta (1,1) | 1:N | Não | Pergunta participa totalmente; Aluno parcialmente | Pergunta contém Id_Aluno (FK) — redundância explícita (atributo + relacionamento) |
| 2 | **Possui** | Pergunta — Resposta | Binário | Pergunta (0,N) — Resposta (1,1) | 1:N | Não | Resposta participa totalmente | Resposta contém Id_Pergunta (FK) — coerente com o relacionamento |
| 3 | **Possui** | Curso — Disciplina | Binário | Curso (0,N) — Disciplina (0,N) | N:N | Não | Ambos os lados opcionais | Relação totalmente opcional (many-to-many) |
| 4 | **Tem relação com** | Pergunta — Disciplina | Binário | Pergunta (1,1) — Disciplina (0,N) | 1:N | Não | — | Cada Pergunta pertence a uma Disciplina; vincula perguntas à disciplina correspondente |
| 5 | **Responde** | Pessoa — Resposta | Binário | Pessoa (0,N) — Resposta (1,1) | 1:N | Não | Resposta participa totalmente | Resposta possui Id_Pessoa (FK) |
| 6 | **Avalia** | Resposta — Reação | Binário | Resposta (1,1) — Reação (0,N) | 1:N | Não | — | Reação contém Id_Resposta (FK) |
| 7 | **Interage** | Pessoa — Reação | Binário | Pessoa (1,1) — Reação (1,1) | 1:1 | Não | — | Ligação obrigatória e um-para-um; diagrama mostra Id_Pessoa, Id_Resposta, Id_Pergunta — possível redundância |
| 8 | **Monitor** | Aluno — Professor — Disciplina | Ternário | Implícito (dependente dos três) | Entidade fraca | Sim (identificação por chaves compostas) | — | Representa relação entre Aluno, Professor e Disciplina; Aluno contém Eh_Monitor indicando a função |

**Relações Implícitas (Atributos-FK)**

| Entidade | Atributo | Associação implícita | Observação |
|-----------|-----------|----------------------|-------------|
| Professor | Id_Disciplina | Professor ⇄ Disciplina | Sugere 1:1 (não explicitado no diagrama) |
| Pergunta | Id_Disciplina, Id_Aluno | Pergunta ⇄ Disciplina e Pergunta ⇄ Aluno | FKs embutidos |
| Resposta | Id_Pergunta, Id_Pessoa | Resposta ⇄ Pergunta e Resposta ⇄ Pessoa | FKs coerentes com Possui e Responde |
| Reação | Id_Resposta, Id_Pergunta, Id_Pessoa | Reação ⇄ Resposta, Pergunta e Pessoa | Redundâncias entre atributos e relacionamentos explícitos |

**Generalização / Especialização**

| Superentidade | Subentidades | Tipo | Atributo Discriminador | Observações |
|----------------|---------------|------|------------------------|--------------|
| Pessoa | Aluno, Professor | Especialização (ISA) | Tipo_pessoa | Pessoa contém atributos comuns (CPF, Nome, Email, Telefone, Matrícula, Tipo_pessoa). CPF é chave. Discriminação representada por símbolo *d*. Pode ser disjunta ou sobreposta. |

**Resumo Geral**

| Relacionamento | Entidade A | Cardinalidade A | Entidade B | Cardinalidade B | Tipo |
|----------------|-------------|-----------------|-------------|-----------------|------|
| Faz | Aluno | (0,N) | Pergunta | (1,1) | 1:N |
| Possui | Pergunta | (0,N) | Resposta | (1,1) | 1:N |
| Possui | Curso | (0,N) | Disciplina | (0,N) | N:N |
| Tem relação com | Pergunta | (1,1) | Disciplina | (0,N) | 1:N |
| Responde | Pessoa | (0,N) | Resposta | (1,1) | 1:N |
| Avalia | Resposta | (1,1) | Reação | (0,N) | 1:N |
| Interage | Pessoa | (1,1) | Reação | (1,1) | 1:1 |
| Monitor | Aluno, Professor, Disciplina | — | — | — | Entidade fraca / ternária |

---

### 4.3.2 Esquema Relacional

O modelo de dados é a espinha dorsal da solução "PUC Integra", projetado para armazenar, organizar e relacionar todas as informações necessárias para suportar os processos de negócio definidos: **Cadastro de Usuários**, **Login**, **Personalização de Perfil** e o sistema de **Perguntas e Respostas**. A estrutura foi concebida utilizando o modelo relacional, que garante consistência, integridade e escalabilidade dos dados.

O diagrama reflete a organização das informações em entidades (tabelas) interconectadas por meio de chaves primárias (PK) e estrangeiras (FK). A seguir, uma descrição das principais áreas do modelo:

1.  **Módulo de Usuários e Perfis:**
    * A entidade central é a **`PESSOA`**, que utiliza o `CPF` como chave primária, garantindo um identificador único para cada indivíduo. Esta tabela armazena dados comuns a todos os usuários, como nome, e-mail, matrícula e credenciais de acesso.
    * A partir de `PESSOA`, ocorre uma especialização para as entidades **`ALUNO`** e **`PROFESSOR`**. Essa abordagem permite centralizar as informações genéricas em uma única tabela, enquanto os atributos específicos de cada perfil são mantidos em suas respectivas tabelas, otimizando a estrutura e evitando redundância.
    * Dados de personalização, como tema, idioma e foto de perfil, também são armazenados na entidade `PESSOA`, alinhando-se diretamente ao Processo 3 – Personalização de Perfil.

2.  **Módulo Acadêmico:**
    * As entidades **`CURSO`** e **`DISCIPLINA`** formam a base da estrutura acadêmica da plataforma. O relacionamento entre elas é do tipo N:N (muitos-para-muitos), representado pela tabela associativa **`CURSO_DISCIPLINA`**, permitindo que uma disciplina pertença a múltiplos cursos e vice-versa.

3.  **Módulo de Interação (Perguntas e Respostas):**
    * Este é o núcleo funcional da plataforma, materializado pelas entidades **`PERGUNTA`** e **`RESPOSTA`**. Uma `PERGUNTA` é obrigatoriamente vinculada a um `ALUNO` (autor) e a uma `DISCIPLINA`, garantindo o contexto acadêmico.
    * Qualquer `PESSOA` (seja aluno ou professor) pode fornecer uma `RESPOSTA`, que é ligada diretamente à pergunta correspondente.
    * Para enriquecer a interação, a entidade **`REACAO`** permite que os usuários avaliem as respostas, enquanto a entidade **`TAG`** e sua tabela associativa **`PERGUNTA_TAG`** possibilitam a categorização e a busca eficiente de conteúdo.

Em resumo, este modelo de dados integrado não apenas traduz os requisitos dos processos de negócio em uma estrutura de banco de dados lógica e coesa, mas também estabelece uma fundação robusta para o desenvolvimento e a futura expansão das funcionalidades da plataforma PUC Integra.

![Modelo relacional](images/modelo_relacional.png "Modelo Relacional.")

---

##### Modelo de Dados do Processo 1 - Cadastro de Usuário

Este modelo de dados representa a estrutura fundamental para o **Processo 1 – Cadastro de Usuários**. O design foi focado exclusivamente nas informações coletadas e armazenadas durante o registro de um novo membro na plataforma "PUC Integra", garantindo que a identidade e o perfil do usuário sejam corretamente estabelecidos desde o início.

A estrutura é composta por três tabelas principais:

1.  **`PESSOA`**: Esta é a entidade central do processo de cadastro. Ela armazena todos os dados comuns fornecidos pelo usuário no formulário, como `Nome`, `E-mail institucional`, `Matrícula` e `Senha`. O campo `Tipo_Pessoa` atua como um "discriminador", registrando se o usuário é um aluno ou professor, o que é essencial para a próxima etapa do fluxo.

2.  **`ALUNO`** e **`PROFESSOR`**: Estas tabelas representam a especialização do perfil do usuário. Após o sistema identificar o tipo de usuário, uma entrada correspondente é criada em uma dessas duas tabelas. Ambas utilizam o CPF como chave primária e estrangeira, estabelecendo um relacionamento direto e obrigatório com a tabela `PESSOA`.

Essa abordagem de generalização/especialização é altamente eficiente, pois centraliza os dados comuns em uma única tabela (`PESSOA`) e separa as especificidades de cada perfil, criando uma base de dados organizada, sem redundância e pronta para ser expandida com atributos exclusivos para alunos ou professores no futuro.

![Modelo relacional - Processo 1](images/modelo_p1.png "Modelo Relacional - Processo 1.")

##### Modelo de Dados do Processo 2 - Login de Usuário

Este modelo de dados representa a estrutura consultada durante o **Processo 2 – Login de Usuários**. Diferente do cadastro, este processo não cria novas tabelas; em vez disso, ele **consulta** a estrutura de dados existente para autenticar o usuário.

O processo de login foca em validar as credenciais (E-mail/Matrícula e Senha) fornecidas pelo usuário. A estrutura consultada é:

1.  **`PESSOA`**: Esta é a entidade central para a autenticação. O sistema utiliza esta tabela para verificar se a `Matricula` (ou `Email_Institucional`) e a `Senha` fornecidas correspondem a um registro válido.
2.  **`ALUNO`** e **`PROFESSOR`**: Após a validação bem-sucedida na tabela `PESSOA`, o sistema consulta estas tabelas de especialização para identificar o `Tipo_Pessoa` e, assim, direcionar o usuário para a interface correta (seja de aluno ou professor), liberando o acesso ao sistema.

Como o Processo 2 (Login) apenas lê os dados criados pelo Processo 1 (Cadastro), o "Modelo Físico" (script de criação das tabelas) é o mesmo, pois as tabelas consultadas são as mesmas que foram criadas no cadastro.

#### Modelo de Dados do Processo 3 – Personalização de Perfil

O Processo 3 (Personalização de Perfil) atualiza os dados básicos do usuário contidos na tabela de generalização **`PESSOA`**, e adiciona campos para personalização da experiência na interface (UX/UI), como foto, biografia, e preferências de tema/idioma.
**Estruturas Atualizadas para o Processo 3 (ALTER TABLE):**

```sql
-- TABELA PESSOA (Atualização de atributos de personalização)
-- Adiciona campos para armazenar foto, biografia e preferências de interface.
ALTER TABLE PESSOA
ADD COLUMN Foto_Perfil VARCHAR(255),
ADD COLUMN Biografia TEXT,
ADD COLUMN Tema_Preferencial VARCHAR(50) DEFAULT 'Claro',
ADD COLUMN Idioma_Preferencial VARCHAR(50) DEFAULT 'Português';
```

#### Modelo de Dados do Processo 4 - Envio de Perguntas e Respostas
Este processo é o cerne da colaboração e requer a criação de um conjunto de tabelas robustas para gerenciar o conteúdo gerado pelos usuários, suas interações (reações) e o contexto acadêmico (disciplinas e palavras-chave/tags).
Este processo envolve as seguintes tabelas:
- Pergunta
```sql
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
```
- Resposta
```sql
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
```
- Reação
```sql
CREATE TABLE REACAO (
    Id_Reacao INT PRIMARY KEY AUTO_INCREMENT,
    Id_Resposta INT NOT NULL,
    Matricula_Pessoa VARCHAR(15) NOT NULL,
    Tipo_Reacao VARCHAR(20) NOT NULL,
    UNIQUE KEY (Id_Resposta, Matricula_Pessoa),
    FOREIGN KEY (Id_Resposta) REFERENCES RESPOSTA(Id_Resposta),
    FOREIGN KEY (Matricula_Pessoa) REFERENCES PESSOA(Matricula)
);
```
- Palavras-Chave
```sql
CREATE TABLE PALAVRA_CHAVE (
    Id_PalavraChave INT PRIMARY KEY AUTO_INCREMENT,
    Palavra VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE PERGUNTA_PALAVRACHAVE (
    Id_Pergunta INT NOT NULL,
    Id_PalavraChave INT NOT NULL,
    PRIMARY KEY (Id_Pergunta, Id_PalavraChave),
    FOREIGN KEY (Id_Pergunta) REFERENCES PERGUNTA(Id_Pergunta),
    FOREIGN KEY (Id_PalavraChave) REFERENCES PALAVRA_CHAVE(Id_PalavraChave)
);

CREATE TABLE RESPOSTA_PALAVRACHAVE (
    Id_Resposta INT NOT NULL,
    Id_PalavraChave INT NOT NULL,
    PRIMARY KEY (Id_Resposta, Id_PalavraChave),
    FOREIGN KEY (Id_Resposta) REFERENCES RESPOSTA(Id_Resposta),
    FOREIGN KEY (Id_PalavraChave) REFERENCES PALAVRA_CHAVE(Id_PalavraChave)
);
```
- Anexos de Pergunta
```sql
CREATE TABLE PERGUNTA_ANEXO (
    Id_Pergunta INT NOT NULL,
    Nome_Arquivo VARCHAR(255) NOT NULL,
    Caminho_Arquivo VARCHAR(255) NOT NULL,
    Tipo_Arquivo VARCHAR(50),
    PRIMARY KEY (Id_Pergunta, Nome_Arquivo),
    FOREIGN KEY (Id_Pergunta) REFERENCES PERGUNTA(Id_Pergunta)
);
```

- Anexos de Resposta
```sql
CREATE TABLE RESPOSTA_ANEXO (
    Id_Resposta INT NOT NULL,
    Nome_Arquivo VARCHAR(255) NOT NULL,
    Caminho_Arquivo VARCHAR(255) NOT NULL,
    Tipo_Arquivo VARCHAR(50),
    PRIMARY KEY (Id_Resposta, Nome_Arquivo),
    FOREIGN KEY (Id_Resposta) REFERENCES RESPOSTA(Id_Resposta)
);
```
---

### 4.3.3 Modelo Físico

Abaixo está o script SQL completo para a criação do banco de dados `puc_integra`, com todas as tabelas necessárias para suportar os processos de negócio definidos.

**Configuração Inicial do Banco de Dados:**

<code>
-- 1. APAGA O BANCO DE DADOS SE ELE JÁ EXISTIR (para recomeçar do zero)
DROP DATABASE IF EXISTS puc_integra;

-- 2. CRIA O BANCO DE DADOS
CREATE DATABASE puc_integra CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 3. SELECIONA O BANCO DE DADOS para usar
USE puc_integra;
</code>


**Tabela PESSOA:**

<code>
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
</code>
>>>>>>> upstream/main

| Coluna | Tipo de Dado | Restrições | Descrição |
| --- | --- | --- | --- |
| `id_metodo` | `INT` | `PRIMARY KEY`, `NOT NULL`, `AUTO_INCREMENT` | Identificador único do método de pagamento. |
| `tipo` | `ENUM` | `NOT NULL` | Tipo de método de pagamento (`credito`, `debito`, `pix`, `dinheiro`). |
| `descricao` | `VARCHAR(100)` | `DEFAULT NULL` | Descrição detalhada do método de pagamento. |

<<<<<<< HEAD
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
=======
**Tabela CURSO:**

<code>
-- Tabela CURSO
CREATE TABLE CURSO (
    Id_Curso INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    Sigla VARCHAR(10) UNIQUE
);
</code>


**Tabela DISCIPLINA:**

<code>
-- Tabela DISCIPLINA
CREATE TABLE DISCIPLINA (
    Id_Disciplina INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    Sigla VARCHAR(10) UNIQUE
);
</code>


**Tabela ALUNO:**

<code>
-- Tabela ALUNO (Especialização de PESSOA)
CREATE TABLE ALUNO (
    Matricula_Aluno VARCHAR(15) PRIMARY KEY,
    Eh_Monitor BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (Matricula_Aluno) REFERENCES PESSOA(Matricula)
);
</code>


**Tabela PROFESSOR:**

<code>
-- Tabela PROFESSOR (Especialização de PESSOA)
CREATE TABLE PROFESSOR (
    Matricula_Professor VARCHAR(15) PRIMARY KEY,
    Id_Disciplina_Principal INT,
    FOREIGN KEY (Matricula_Professor) REFERENCES PESSOA(Matricula),
    FOREIGN KEY (Id_Disciplina_Principal) REFERENCES DISCIPLina(Id_Disciplina)
);
</code>


**Tabela PERGUNTA:**

<code>
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
</code>


**Tabela RESPOSTA:**

<code>
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
</code>


**Tabela REACAO:**

<code>
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
</code>


**Tabela CURSO_DISCIPLINA:**

<code>
-- Tabela CURSO_DISCIPLINA (Relacionamento N:N)
CREATE TABLE CURSO_DISCIPLINA (
    Id_Curso INT NOT NULL,
    Id_Disciplina INT NOT NULL,
    PRIMARY KEY (Id_Curso, Id_Disciplina),
    FOREIGN KEY (Id_Curso) REFERENCES CURSO(Id_Curso),
    FOREIGN KEY (Id_Disciplina) REFERENCES DISCIPLINA(Id_Disciplina)
);
</code>


**Tabela MONITORIA:**

<code>
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
</code>


**Tabela PALAVRA_CHAVE:**

<code>
-- 1. Tabela PALAVRA_CHAVE (Armazena as palavras-chave únicas)
CREATE TABLE PALAVRA_CHAVE (
    Id_PalavraChave INT PRIMARY KEY AUTO_INCREMENT,
    Palavra VARCHAR(50) UNIQUE NOT NULL
);
</code>


**Tabela PERGUNTA_PALAVRACHAVE:**

<code>
-- 2. Tabela PERGUNTA_PALAVRACHAVE (Liga palavras-chave às Perguntas)
CREATE TABLE PERGUNTA_PALAVRACHAVE (
    Id_Pergunta INT NOT NULL,
    Id_PalavraChave INT NOT NULL,
    PRIMARY KEY (Id_Pergunta, Id_PalavraChave),
    FOREIGN KEY (Id_Pergunta) REFERENCES PERGUNTA(Id_Pergunta),
    FOREIGN KEY (Id_PalavraChave) REFERENCES PALAVRA_CHAVE(Id_PalavraChave)
);
</code>


**Tabela RESPOSTA_PALAVRACHAVE:**

<code>
-- 3. Tabela RESPOSTA_PALAVRACHAVE (Liga palavras-chave às Respostas)
CREATE TABLE RESPOSTA_PALAVRACHAVE (
    Id_Resposta INT NOT NULL,
    Id_PalavraChave INT NOT NULL,
    PRIMARY KEY (Id_Resposta, Id_PalavraChave),
    FOREIGN KEY (Id_Resposta) REFERENCES RESPOSTA(Id_Resposta),
    FOREIGN KEY (Id_PalavraChave) REFERENCES PALAVRA_CHAVE(Id_PalavraChave)
);
</code>


**Tabela PERGUNTA_ANEXO:**

<code>
-- TABELAS DE ANEXOS (Baseado no Processo 4)
CREATE TABLE PERGUNTA_ANEXO (
    Id_Pergunta INT NOT NULL,
    Nome_Arquivo VARCHAR(255) NOT NULL,
    Caminho_Arquivo VARCHAR(255) NOT NULL,
    Tipo_Arquivo VARCHAR(50),
    PRIMARY KEY (Id_Pergunta, Nome_Arquivo),
    FOREIGN KEY (Id_Pergunta) REFERENCES PERGUNTA(Id_Pergunta)
);
</code>


**Tabela RESPOSTA_ANEXO:**

<code>
CREATE TABLE RESPOSTA_ANEXO (
    Id_Resposta INT NOT NULL,
    Nome_Arquivo VARCHAR(255) NOT NULL,
    Caminho_Arquivo VARCHAR(255) NOT NULL,
    Tipo_Arquivo VARCHAR(50),
    PRIMARY KEY (Id_Resposta, Nome_Arquivo),
    FOREIGN KEY (Id_Resposta) REFERENCES RESPOSTA(Id_Resposta)
);
</code>


---

### 4.4. Tecnologias

**Fluxo de Interação das Tecnologias:**

1.  **Interação do Usuário:** O usuário acessa a plataforma através de um navegador web (Chrome, Firefox, Edge), interagindo com as páginas construídas em **HTML, CSS e JavaScript**.
2.  **Requisição:** Ao realizar uma ação (ex: "Enviar uma Pergunta"), o navegador envia uma requisição HTTP para o servidor.
3.  **Processamento (Back-end):** O **Spring Boot** (Java) intercepta a requisição. O *Controller* valida os dados recebidos. Se válidos, aciona a camada de *Service* que aplica as regras de negócio (ex: verificar se o usuário está logado e vinculado a uma disciplina).
4.  **Persistência:** O serviço solicita ao *Repository* (JPA) que salve a nova pergunta. O framework converte o objeto Java em comandos SQL e os executa no banco de dados **MySQL**.
5.  **Resposta:** O banco de dados confirma a gravação. O Spring Boot processa essa confirmação e retorna uma resposta ao navegador (geralmente redirecionando o usuário para a página da pergunta recém-criada ou exibindo uma mensagem de sucesso via JSON/HTML).
6.  **Deploy:** O código fonte é versionado no **GitHub**, e a versão de produção/documentação pode ser hospedada utilizando recursos como **GitHub Pages** (para estáticos/docs) ou serviços de nuvem compatíveis com Java.
>>>>>>> upstream/main



