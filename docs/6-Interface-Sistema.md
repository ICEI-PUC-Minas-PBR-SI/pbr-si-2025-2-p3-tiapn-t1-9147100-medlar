<<<<<<< HEAD
## 6. Interface do Sistema

Esta seção apresenta a visão geral das telas principais da plataforma **Medlar**, demonstrando como o usuário interage com o sistema ao longo dos processos de autenticação, busca, agendamento e gerenciamento de atendimentos.
=======
# 6. Interface do Sistema
>>>>>>> upstream/main

<img width="1916" height="906" alt="Tela Inicial Medlar" src="https://github.com/user-attachments/assets/1e8a637b-60a4-4b18-87cb-0fe8d040a6ce" />

<<<<<<< HEAD
---

### 6.1. Tela Principal do Sistema

**Descrição:**  
A tela principal funciona como a porta de entrada do usuário na plataforma, exibindo um menu simples e o acesso às principais áreas — como busca de profissionais, agenda e perfil.

**Tela principal do sistema:**  

<img width="1919" height="914" alt="Tela Principal do Sistema Medlar" src="https://github.com/user-attachments/assets/9a198055-6395-4deb-8e9e-50438ab8874f" />
=======

## 6.1. Tela Principal (Feed de Interação)

A tela principal atua como o **Feed de Interação**, centralizando o acesso às funcionalidades da plataforma. Nela, o usuário visualiza as últimas dúvidas postadas, organizadas cronologicamente ou por relevância. A interface oferece uma barra de pesquisa global, filtros por curso ou disciplina e acesso rápido ao menu de navegação (Perfil, Nova Pergunta, Configurações). É o ponto de partida para o **Processo 4 (Envio de Perguntas e Respostas)**.

![Tela principal do sistema](../docs/images/homepage/interface_homepage.png)
>>>>>>> upstream/main

---

<<<<<<< HEAD
---

### 6.2. Telas do Processo 1 — Autenticação e Cadastro

#### **6.2.1. Tela de Login**

**Descrição:**  
Permite que pacientes ou profissionais acessem o sistema utilizando e-mail e senha.

- Campos: e-mail e senha  
- Ações: Entrar, Criar cadastro

**Tela de login:**  
**Login Concluído – Área do Paciente**  
Tela exibida após o paciente realizar login com sucesso, mostrando acesso rápido às funcionalidades principais da plataforma.
<img width="1909" height="755" alt="Tela de Login Paciente" src="https://github.com/user-attachments/assets/e349c874-cdfc-4beb-a74b-bdebcd08bfac" />

**Login Concluído – Área do Profissional**  
Tela exibida após o profissional acessar sua conta, apresentando suas consultas, agenda e opções de gerenciamento.
<img width="1919" height="765" alt="Tela de Login Profissional" src="https://github.com/user-attachments/assets/90b4bc41-f6ee-4ea4-b6d6-94b3e489b97f" />
=======
## 6.2. Processo 1 - Tela de Cadastro ("Criar Conta")

O processo de cadastro tem como objetivo permitir que novos usuários sejam registrados na plataforma PUC Integra. A interface foi projetada para coletar dados essenciais e validar o vínculo com a instituição.

* **Campos de Entrada:** Nome Completo, CPF, Matrícula, E-mail Institucional, Senha e Tipo de Entidade (Aluno ou Professor).
* **Comportamento:** Ao clicar em "Cadastrar", o sistema valida se o e-mail possui o domínio institucional e define o perfil de acesso inicial.

![Tela de Cadastro](../docs/images/interface_cadastro.png)

---
>>>>>>> upstream/main

## 6.3. Processo 2 - Tela de Login ("Entrar")

<<<<<<< HEAD
#### **6.2.2. Tela de Cadastro de Paciente**

**Descrição:**  
Tela utilizada para registrar novos pacientes na plataforma.

- Campos: nome, CPF, data de nascimento, telefone, e-mail  
- Endereço completo  
- Histórico médico (opcional)

**Tela de cadastro de paciente:**  
<img width="1919" height="400" alt="Tela de Cadastro 2" src="https://github.com/user-attachments/assets/ee4d73d0-a95d-45e4-88d2-acdd750f277c" />
<img width="1916" height="909" alt="Tela de Cadastro de Paciente 1" src="https://github.com/user-attachments/assets/ae7c0576-f79a-42c7-bead-51b2ad376f8b" />
<img width="1914" height="909" alt="Tela de Cadastro de Paciente 2" src="https://github.com/user-attachments/assets/43ae7c2b-2d0d-48df-b1f0-417721bd0ff1" />

---

### 6.3. Telas do Processo 2 — Gestão de Profissionais

#### **6.3.1. Tela de Cadastro de Profissional**

**Descrição:**  
Utilizada para cadastrar profissionais de saúde, incluindo dados pessoais e profissionais.

- Registro profissional (CRM/COREN)
- Especialidade
- Experiência
- Telefone / e-mail
- Upload de foto de perfil

**Tela de cadastro de profissional:**  
<img width="1912" height="380" alt="Tela de Cadastro 1" src="https://github.com/user-attachments/assets/911fcb8e-bade-46b9-aeeb-b056fdf7b914" />
<img width="1916" height="901" alt="Tela de Cadastro de Profissional 1" src="https://github.com/user-attachments/assets/2eb8b87d-f4ad-4fdc-a38a-7f40d06831c2" />
<img width="1916" height="901" alt="Tela de Cadastro de Profissional 2" src="https://github.com/user-attachments/assets/ec5362e5-337c-4f4d-8b8e-0548b7a31802" />
<img width="1916" height="901" alt="Tela de Cadastro de Profissional 3" src="https://github.com/user-attachments/assets/f015385b-8e3f-4728-bbf3-013ca0b03886" />
=======
A tela de login é a porta de entrada para usuários já registrados. Sua interface é minimalista para garantir foco na autenticação rápida.

* **Campos de Entrada:** E-mail Institucional e Senha.
* **Funcionalidades:** Botão de login, link para recuperação de senha ("Esqueceu a senha?") e atalho para a tela de cadastro caso o usuário ainda não possua conta.
* **Feedback:** O sistema exibe mensagens claras caso as credenciais estejam incorretas.

![Tela de Login](../docs/images/interface_login.png)

---

## 6.4. Processo 3 - Tela de Personalização de Perfil
>>>>>>> upstream/main

Esta interface permite que o aluno ou professor gerencie sua identidade digital na plataforma, promovendo o engajamento e o senso de comunidade.

<<<<<<< HEAD

#### **6.3.2. Tela de Perfil do Profissional**

**Descrição:**  
Exibe informações detalhadas sobre um profissional, permitindo que o paciente escolha o especialista desejado.

**Tela de perfil do profissional:**  
<img width="1907" height="941" alt="Tela de Perfil do Profissional" src="https://github.com/user-attachments/assets/5ddda9b8-7a2b-4f23-b7de-6a76ac12e604" />


---

### 6.4. Telas do Processo 3 — Busca de Profissionais

#### **6.4.1. Tela de Busca**

**Descrição:**  
Permite que o paciente filtre profissionais por especialidade, localização, disponibilidade e faixa de preço.

- Listagem com foto, nome, especialidade, descrição e avaliação  
- Botões: *Ver Perfil* e *Agendar Consulta*

**Tela de busca:**  
<img width="1915" height="945" alt="Telas do Processo 3 — Busca de Profissionais" src="https://github.com/user-attachments/assets/15312509-3735-4149-b2da-96d8665cadd0" />



#### **6.4.2. Tela de Filtros da Busca**

**Descrição:**  
Esta tela (ou seção lateral) permite ao usuário aplicar filtros inteligentes para encontrar o profissional ideal.  
Os filtros incluem:

- **Especialidade**
- **Localização (cidade/bairro)**
- **Disponibilidade**
- **Faixa de preço**
- **Avaliação**
- **Forma de atendimento (domiciliar, online, presencial)** — opcional

Os resultados exibidos são atualizados com base nos filtros selecionados, permitindo que o paciente refine sua busca de maneira rápida e eficiente.

**Tela de filtros da busca:**  
<img width="1914" height="931" alt="Tela de Perfil  filtro" src="https://github.com/user-attachments/assets/d627ab31-8c44-4648-977c-c29d8ec60f4d" />

---

### 6.5. Telas do Processo 4 — Solicitação de Atendimento

#### **6.5.1. Tela de Solicitar Atendimento**

**Descrição:**  
Utilizada para marcar consultas com profissionais. Nesta tela, o paciente seleciona:

- Profissional (preenchido automaticamente)
- Serviço desejado
- Data
- Horário disponível (com base na disponibilidade real do profissional)
- Método de pagamento

**Tela solicitar atendimento:**  
<img width="1909" height="940" alt="Telas do Processo 4 — Solicitação de Atendimento" src="https://github.com/user-attachments/assets/52d47312-6a38-4115-b495-e87a7aae469f" />

---

### 6.6. Telas do Processo 5 — Agenda do Paciente

#### **6.6.1. Tela de Agenda do Paciente**

**Descrição:**  
Exibe o calendário mensal e a lista de consultas do dia selecionado.

- Destaque de dias com consultas  
- Lista com horário, profissional e status  

**Tela agenda paciente:**  
<img width="1918" height="936" alt="Telas do Processo 5 — Agenda do Paciente" src="https://github.com/user-attachments/assets/28525424-5d80-43f6-b6a5-fb3cd3e2a34e" />

---

### 6.7. Telas do Processo 6 — Agenda do Profissional

#### **6.7.1. Tela de Consultas Pendentes**

**Descrição:**  
Lista todos os atendimentos agendados pelos pacientes.

- Colunas: data, paciente, serviço, valor, status, pagamento  
- Ações: Detalhes, Concluir, Cancelar

**Tela agenda profissional:**  

<img width="1903" height="905" alt="Telas do Processo 6 — Agenda do Profissional" src="https://github.com/user-attachments/assets/be159e6a-9537-44a7-80b5-4adcc9c064bd" />


---
=======
* **Funcionalidades:**
    * **Edição de Dados:** Permite alterar nome de usuário, telefone, e-mail e biografia (limite de 250 caracteres).
    * **Foto de Perfil:** Upload de imagem para identificação visual.
    * **Curso/Afiliação:** Atualização do curso matriculado para direcionar o conteúdo do feed.
    * **Segurança:** Link direto para alteração de senha.
* **Ações:** Botões para "Enviar" (salvar alterações) e "Cancelar".

![Tela de Personalização de Perfil](../docs/images/prototipo_personalizacao_perfil.jpg)

---

## 6.5. Processo 4 - Tela de Criação de Pergunta ("Faça uma pergunta")

Interface dedicada à publicação de novas dúvidas acadêmicas. O foco é garantir que a pergunta seja bem contextualizada para facilitar respostas precisas.

* **Estrutura:**
    * **Título:** Resumo da dúvida.
    * **Contexto:** Seletores para Curso e Disciplina.
    * **Descrição Detalhada:** Editor de texto rico para explicar o problema.
    * **Anexos:** Área para upload de arquivos (imagens, PDFs) que ilustrem a dúvida.
    * **Tags:** Inserção de palavras-chave para indexação.

![Tela de Criação de Pergunta](../docs/images/prototipo_pergunta.jpg)

---

## 6.6. Processo 4 - Tela de Visualização e Resposta

Esta tela exibe o detalhe de uma dúvida e permite a interação da comunidade. É onde ocorre a troca de conhecimento efetiva.

* **Exibição:** Mostra a pergunta completa, autor, data e anexos.
* **Área de Resposta:** Campo de texto enriquecido (com formatação e suporte a links/imagens) para que outros usuários enviem soluções.
* **Lista de Respostas:** Abaixo da pergunta, são listadas as contribuições de outros usuários.
* **Validação:** Botões de "Like/Dislike" e, para professores/monitores, a opção de validar a resposta como correta/confiável.

![Tela de Envio de Resposta](../docs/images/prototipo_resposta.jpg)
>>>>>>> upstream/main
