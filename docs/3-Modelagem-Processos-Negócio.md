## 3. Modelagem dos Processos de Negócio

<<<<<<< HEAD

### 3.1. Modelagem da situação atual (Modelagem AS IS)

#### 3.1.1. Descrição Geral

O processo atual para cadastrar profissionais da saúde e pacientes,e encontrar e contratar profissionais de saúde para atendimento domiciliar (home care) é predominantemente manual, fragmentado e baseado em redes de contatos informais. Famílias que necessitam de cuidados para pacientes em casa e profissionais autônomos que oferecem esses serviços enfrentam um cenário ineficiente, com pouca tecnologia e sem uma plataforma centralizada que facilite a conexão. A busca depende de indicações, a comunicação é assíncrona e a gestão de agendamentos e pagamentos é descentralizada, gerando insegurança e retrabalho para ambas as partes.

---

## 3.1.2. Etapas do Processo Atual (Cadastro de Pacientes)

#### Perspectiva da Família/Paciente (Ex: Mariana, mãe de um paciente)

*   **Coleta de Informações Básicas:** A família ou paciente precisa reunir dados pessoais (nome, CPF, data de nascimento, endereço, telefone, email).
*   **Preenchimento Manual:** O cadastro é feito em formulários físicos ou digitais sem padronização, muitas vezes exigindo envio repetitivo dos mesmos documentos em diferentes locais.
*   **Validação Limitada:** Não há garantia imediata de que os dados foram validados corretamente (ex.: CPF válido, data de nascimento coerente, email no formato certo).
*   **Confirmação Precária:** A confirmação do cadastro ocorre via e-mail ou mensagem simples, podendo se perder facilmente.
*   **Atualização de Dados:** Caso precise atualizar telefone, endereço ou informações de saúde, o processo exige contato direto com o suporte ou preenchimento de novos formulários.
*   **Segurança da Informação:** O armazenamento de dados pessoais e de saúde é descentralizado, muitas vezes sem garantias de privacidade ou integração com outros sistemas de prontuário eletrônico.

---

## Processo Atual (Cadastro de Profissionais)

### Perspectiva do Profissional de Saúde (Ex: Rafael, enfermeiro)

*   **Reunião de Documentação:** O profissional precisa providenciar informações como nome, CPF, CNPJ (quando aplicável), registro profissional (CRM, COREN, etc.), formação acadêmica, especialidades, endereço, telefone e email.
*   **Envio Manual:** Os dados são enviados manualmente, anexando cópias digitais ou físicas de documentos para validação.
*   **Dependência de Conferência Manual:** A validação de registros profissionais muitas vezes depende de análise manual ou consulta individual no conselho de classe.
*   **Confirmação Irregular:** O retorno sobre aprovação ou recusa do cadastro é demorado e pouco padronizado, o que atrasa o início da atuação na plataforma.
*   **Gestão de Alterações:** Caso precise atualizar endereço, telefone, experiência ou especialidade, o processo não é ágil e geralmente depende de um novo envio de documentos.
*   **Integração Restrita:** O cadastro não se conecta automaticamente a sistemas de prontuário eletrônico, agenda digital ou meios de pagamento, obrigando o profissional a manter controles paralelos.

---

### 3.1.3. Pontos Críticos e Dificuldades

*   **Processo Burocrático e Repetitivo:** Tanto pacientes quanto profissionais precisam preencher e enviar as mesmas informações em diferentes cadastros, o que gera retrabalho e demora.
*   **Validações Incompletas:** Falta verificação automática de CPF/CNPJ, idade mínima, emails e registros profissionais, gerando risco de erros e inconsistências.
*   **Insegurança de Dados:** Armazenamento descentralizado e ausência de padrões de privacidade aumentam o risco de perda ou uso indevido de informações sensíveis.
*   **Demora na Aprovação:** A validação manual de credenciais profissionais retarda o processo de disponibilização do serviço.
*   **Dificuldade de Atualização:** Alterações cadastrais exigem processos manuais, lentos e muitas vezes pouco acessíveis ao usuário.
*   **Ausência de Integração:** Falta de conexão com sistemas de prontuário eletrônico, plataformas de pagamento ou conselhos profissionais dificulta a centralização e a confiabilidade das informações.



---

## 3.1.2. Etapas do Processo Atual(Busca de profissionais)

**Perspectiva da Família (Ex: Mariana, mãe de um paciente):**

1.  **Identificação da Necessidade:** A família recebe uma recomendação médica ou percebe a necessidade de um profissional de saúde (enfermeiro, fisioterapeuta, etc.) para cuidados contínuos em casa.

2.  **Contato e Verificação Individual:** A família entra em contato, um por um, com os profissionais indicados. Para cada um, é preciso verificar credenciais, experiência, disponibilidade de agenda e negociar valores. Este processo é lento, repetitivo e marcado por longas esperas por resposta.

3.  **Negociação e Agendamento Manual:** Após encontrar um profissional adequado, o agendamento é feito verbalmente ou por mensagem de texto. A família anota em uma agenda pessoal, sem um sistema formal de confirmação ou lembretes.

4.  **Acompanhamento e Pagamento:** O acompanhamento da evolução do paciente é feito por anotações informais. O pagamento é realizado diretamente ao profissional (via PIX, dinheiro), e o controle financeiro é manual.

**Perspectiva do Profissional (Ex: Rafael, enfermeiro):**

1.  **Divulgação dos Serviços:** O profissional depende do marketing "boca a boca", distribuindo cartões e informando sua rede de contatos que está disponível para atendimentos domiciliares.

2.  **Gestão de Contatos:** Recebe ligações e mensagens de potenciais clientes em horários variados, muitas vezes durante outros atendimentos, o que dificulta a resposta imediata.

3.  **Conciliação de Agenda:** Precisa consultar sua agenda pessoal (caderno, calendário do celular) para verificar horários livres, calcular tempos de deslocamento e encaixar novos pacientes, um verdadeiro quebra-cabeça logístico.

4.  **Carga Administrativa:** Gasta tempo considerável com tarefas não clínicas, como negociação, agendamento, planejamento de rotas e controle financeiro, o que limita seu potencial de renda.

#### 3.1.3. Pontos Críticos e Dificuldades

*   **Processo Lento e Ineficiente:** A busca manual e a negociação individual consomem muito tempo tanto da família quanto do profissional, atrasando o início de cuidados que podem ser urgentes.

*   **Insegurança e Falta de Transparência:** Não há um método padronizado para verificar as credenciais e o histórico dos profissionais. Da mesma forma, os profissionais não têm garantia sobre as condições de trabalho ou o pagamento.

*   **Susceptibilidade a Erros:** O agendamento manual está sujeito a erros, esquecimentos e conflitos de horário. O controle financeiro descentralizado também pode levar a falhas.

*   **Comunicação Fragmentada:** A comunicação via telefone e WhatsApp é desorganizada, dificultando o registro de informações importantes sobre o paciente e o compartilhamento de atualizações entre a família e o profissional.

*   **Dificuldade de Otimização:** Os profissionais têm dificuldade em preencher lacunas em suas agendas e otimizar suas rotas, resultando em perda de tempo e de potencial de faturamento.

 #### 3.1.4. Conclusão

O modelo atual de conexão para serviços de home care é insustentável e ineficiente para ambas as partes. A falta de uma plataforma digital centralizada gera um ciclo de retrabalho, insegurança e sobrecarga administrativa. Essas limitações demonstram a clara necessidade de uma solução como o Medlar, que automatize a busca, valide as credenciais, centralize a comunicação e simplifique o agendamento e o pagamento, trazendo mais segurança, eficiência e profissionalismo ao mercado de cuidados domiciliares.




---

### 3.2. Descrição geral da proposta (Modelagem TO BE)

A proposta consiste na implementação de um aplicativo digital para gestão de atendimentos domiciliares (Home Care), que centraliza e automatiza todo o processo de conexão entre pacientes, familiares e profissionais de saúde. O sistema tem como objetivo eliminar a fragmentação e o retrabalho identificados no modelo atual (AS-IS), promovendo eficiência, segurança e acessibilidade.

A solução permitirá que famílias encontrem profissionais de forma simples e confiável, por meio de perfis verificados, avaliações de usuários e filtros inteligentes. O agendamento será realizado diretamente na plataforma, com confirmações automáticas, notificações e lembretes, garantindo organização e evitando falhas de comunicação.

Para os profissionais, o aplicativo oferecerá gestão integrada de agenda, rotas, histórico de pacientes e faturamento, reduzindo a carga administrativa e aumentando a produtividade. Além disso, contará com prontuário digital, relatórios de evolução do paciente, chat seguro e geolocalização em tempo real, proporcionando maior transparência e confiança no serviço.

Com essa proposta, os processos hoje manuais, repetitivos e descentralizados passam a ser digitalizados, padronizados e escaláveis, criando um ecossistema de Home Care moderno, seguro e de fácil uso, que beneficia pacientes, familiares e profissionais de saúde.

**Resumo dos Processos Controlados pela Ferramenta**

**A ferramenta será responsável por centralizar e controlar os seguintes processos, que serão detalhados na modelagem:**

1. **Cadastro de Paciente: Registro seguro e simplificado das informações pessoais, contatos e histórico básico do paciente.**

2. **Cadastro de Profissional: Registro validado de dados pessoais, documentos, registros profissionais e área de atuação.**

3. **Login/registro: Registro seguro e simplificado das informações pessoais do usuário .**


4. **Busca por Profissional: Consulta rápida com filtros por especialidade, localização, agenda, avaliações e preço.**

5. **Solicitação de Atendimento: Fluxo de agendamento com confirmação, notificações e opção de ajustes pelo profissional.**

6. **Criação da Agenda do Paciente: Organização automática dos atendimentos agendados, com histórico e lembretes integrados.**

---

### PROCESSO 1 :CADASTRO DE USUÁRIOS (Pacientes):
Objetivo:
Permitir que usuários (pacientes) e profissionais de saúde (prestadores de serviço) se cadastrem de forma rápida, segura e intuitiva na plataforma, com validação adequada e segmentação clara de perfis.

### Tela Inicial de Cadastro
* Opção para selecionar o tipo de conta: Usuário (Paciente) ou Profissional da Saúde
* Redirecionamento para o fluxo de cadastro correspondente.

### Cadastro de Usuário (Paciente)
Informações básicas:
 * Nome completo
 * CPF
 * Data de nascimento
 * Gênero
 * Endereço completo (com geolocalização opcional)
 * Telefone
 * E-mail
 * Senha
 * Validação de e-mail e telefone (código via SMS/e-mail)
 * Aceite dos termos de uso e política de privacidade
 * Cadastro concluído → Direciona para a tela inicial do app com opção de buscar profissionais.
---

### PROCESSO 2 :CADASTRO DE PROFISSIONAIS:

### Cadastro de Profissional de Saúde
Informações pessoais:
 * Nome completo
 * CPF
 * Data de nascimento
 * Gênero
 * Endereço profissional (com raio de atendimento)
 * Telefone
 * E-mail
 * Senha
   
Informações profissionais:
 * Área de atuação (enfermagem, fisioterapia, fonoaudiologia, etc.)
 * Número de registro profissional (CRM, COREN, CREFITO etc.)
 * Upload de documentos comprobatórios (diploma, registro, identidade)
 * Experiência e especializações
 * Foto de perfil profissional
 * Validação de e-mail e telefone
 * Revisão e aceite dos termos de uso e política de privacidade
 * Envio para análise e validação da equipe administrativa
 * Status: Em análise → Aprovado → Rejeitado (com justificativa)
 * Após aprovação, profissional é ativado e pode começar a receber solicitações.

---

## Processo 3: Acesso ao Sistema (Login)

O usuário inicia o processo de autenticação para acessar as funcionalidades do sistema.

### Tela de Login

O sistema exibe os seguintes campos e opções para o usuário:

*   **Campo de E-mail/Usuário:** Para inserção da credencial principal.
*   **Campo de Senha:** Para inserção da senha, com opção de visualização (ícone de olho).
*   **Botão "Entrar":** Para submeter as credenciais e iniciar a autenticação.
*   **Link "Esqueci minha senha":** Para iniciar o fluxo de recuperação de senha.
*   **Link "Criar conta":** Para iniciar o fluxo de cadastro de novo usuário.

**Fluxo de Autenticação**

Usuário interage com a tela:

1.  Usuário insere **E-mail/Usuário** e **Senha**.
2.  Usuário clica no **Botão "Entrar"**.
3.  Sistema verifica as credenciais no banco de dados.

**Respostas do Sistema:**

O sistema pode retornar uma das seguintes respostas:

*   **Sucesso:** Credenciais válidas. O sistema redireciona o usuário para a **Tela Inicial/Dashboard**.
*   **Falha (Credenciais Inválidas):** O sistema exibe a mensagem de erro: "E-mail ou senha incorretos. Tente novamente."
*   **Falha (Conta Bloqueada):** Após N tentativas falhas, o sistema exibe a mensagem: "Sua conta foi temporariamente bloqueada por segurança. Utilize a opção 'Esqueci minha senha' ou entre em contato com o suporte."

**Recuperação de Senha**

1.  Usuário clica no **Link "Esqueci minha senha"**.
2.  Sistema solicita o **E-mail/Usuário** cadastrado.
3.  Sistema envia um link de redefinição de senha para o e-mail do usuário.
4.  Usuário acessa o link e define uma **Nova Senha**.
5.  Sistema confirma a alteração e redireciona para a **tela de login**.

---
### PROCESSO 4: BUSCA DE PROFISSIONAIS
Objetivo:
Permitir que usuários encontrem rapidamente profissionais disponíveis para atendimento domiciliar com base em localização, especialidade e disponibilidade.

### Tela de Busca (Home do Usuário)
* Campo de busca por especialidade ou nome do profissional
Filtros:
 * Localização (por CEP ou geolocalização)
 * Especialidade
 * Disponibilidade (data e horário)
 * Faixa de preço
 * Avaliação mínima
Resultados exibidos com:
 * Nome, foto e especialidade do profissional
 * Preço base do atendimento
 * Avaliação média
 * Distância aproximada

### Visualização de Perfil do Profissional
Informações detalhadas:
 * Biografia/resumo profissional
 * Especializações e experiências
 * Registro profissional
 * Avaliações e comentários de outros usuários
 * Agenda disponível
 * Botão para solicitar atendimento
---

## Processo 5:Solicitação de Atendimento
Usuário seleciona:
 * Data e horário
 * Endereço de atendimento (padrão ou novo)
 * Confirmação da solicitação
 * Envio de notificação para o profissional
Profissional pode:
 * Aceitar
 * Recusar
 * Sugerir novo horário
 * Confirmação final e início do agendamento

---
## Processo 6 : Criar Agenda do Paciente

1. Sistema verifica solicitações de atendimento aprovadas.


2. Usuário acessa a opção “Minha Agenda”.


3. Sistema organiza automaticamente os atendimentos confirmados.


4. Usuário visualiza os compromissos futuros (data, hora, profissional, local).


5. Sistema permite editar ou cancelar agendamentos (caso necessário).


6. Sistema salva alterações e atualiza agenda do paciente.

---

### 3.3. Modelagem dos processos

[PROCESSO 1 - Cadastro de (Usuarios) Pacientes](./processos/processo-1-nome-do-processo.md "Detalhamento do Processo 1.")

[PROCESSO 2 - Cadastro de Profissionais](./processos/processo-2-nome-do-processo.md "Detalhamento do Processo 2.")

[Processo 3 – Login de Usuário](./processos/processo-3-nome-do-processo.md "Detalhamento do Processo 3.")

[Processo 4 – Gerenciamento de Busca e Contratação de Profissional de Saúde Domiciliar ](./processos/processo-4-nome-do-processo.md "Detalhamento do Processo 4.")

[Processo 5: Solicitação de Atendimento](./processos/processo-5-nome-do-processo.md "Detalhamento do Processo 5.")

[PROCESSO 6 - Criar Agenda do Paciente](./processos/processo-6-nome-do-processo.md "Detalhamento do Processo 6.")
=======
### 3.1. Modelagem da situação atual (Modelagem AS IS)
No contexto atual, o processo de compartilhamento e validação de conhecimento entre a comunidade acadêmica da PUC Minas acontece de forma fragmentada, e desorganizada, exigindo a necessidade de recorrer a fontes externas, como inteligências artificiais, redes sociais e plataformas online. Embora esses recursos ofereçam respostas imediatas, não garantem aos usuários a veracidade das informações, o alinhamento acadêmico ou integração as diretrizes institucionais. Ademais, a interação entre professores, monitores e estudantes acontece, principalmente, em sala de aula, por e-mail ou através sistemas administrativos da universidade que não são focados no suporte ao aprendizado. 
Portanto, os cenários observados caracterizam um fluxo de troca de informações descentralizado e sem padrões, em que a confiabilidade é baixa e a comunicação entre os alunos, professores e colaboradores da universidade não é totalmente aproveitada.

### 3.2. Descrição geral da proposta (Modelagem TO BE)

Após analisar o processo atual, busca-se, com este projeto, desenvolver um ambiente digital, seguro e intuitivo para a troca de dúvidas, respostas e materiais de estudo entre a comunidade acadêmica da Pontifícia Universidade Católica de Minas Gerais. O sistema busca suprir a falta de uma ferramenta disponível aos alunos que garanta a troca de informações, diante os conteúdos
lecionados. Para isso, o sistema contará com: 
* **Diferentes perfis de usuários:** alunos, professores, equipe administrativa e monitores selecionados por professores da instituição;
* **Interação entre usuários:** permite que qualquer usuário responda a dúvidas postadas na plataforma.
* **Validação de conteúdo:** recursos que permitem a verificação e avaliação de conteúdos e conhecimentos utilizados em forma de like/dislike.
* **Integração institucional:** conexão com elementos e informações da universidade, como disciplinas, calendário acadêmico e bibliografias recomendadas. 

**Processo 1 – Cadastro de Usuários:** Esse processo é responsável por registrar novos membros da comunidade acadêmica na plataforma.  
O fluxo inicia quando o usuário acessa a tela de cadastro e insere seus dados pessoais e institucionais (nome, e-mail, senha, matrícula e curso). O sistema realiza a validação automática desses dados, verificando se a matrícula é válida e se o e-mail corresponde ao domínio institucional. Em seguida, identifica se o usuário é aluno ou professor, atribuindo o perfil inicial de forma automática. O cadastro é armazenado com segurança e uma mensagem de confirmação é exibida. Esse processo garante que apenas pessoas ligadas à instituição sejam registradas e que seu perfil inicial já esteja adequado à função acadêmica desempenhada.  

**Processo 3 – Personalização de Perfil**: Após realizar login com sucesso, o usuário pode acessar a área de personalização de perfil. Nesse processo, ele tem a possibilidade de atualizar suas informações pessoais e acadêmicas, como nome, senha, curso, além de adicionar uma foto de perfil e uma breve biografia. O sistema valida os dados inseridos, verificando duplicidade de e-mail, consistência de matrícula e formatos aceitos para imagens. Quando aprovadas, as alterações são salvas no banco de dados e imediatamente refletidas na conta do usuário. Esse processo é essencial para proporcionar uma experiência mais personalizada e alinhada às preferências individuais, fortalecendo o senso de pertencimento à comunidade acadêmica.

**Processo 4 – Envio de Dúvidas/Respostas**: Esse processo é o núcleo da plataforma, pois viabiliza a troca de conhecimentos entre os usuários. Ele se inicia quando o aluno ou professor acessa a área de postagens e opta por enviar uma nova dúvida ou responder a uma já existente. O sistema disponibiliza um formulário onde é possível descrever o conteúdo em texto, além de anexar links, imagens ou outros materiais de apoio. As publicações são organizadas por disciplina, curso e palavras-chave, facilitando sua localização. Ao confirmar o envio, o sistema valida a estrutura mínima da postagem e registra os dados de forma segura. Esse processo fortalece o aprendizado colaborativo, permitindo que dúvidas se transformem em discussões construtivas e soluções coletivas.

**Processo 5 – Avaliação das Respostas**: Após a publicação de uma resposta, o processo de avaliação assegura a qualidade e a confiabilidade das informações compartilhadas. Os usuários podem atribuir feedback positivo ou negativo às contribuições, destacando aquelas que agregam mais valor. Além disso, professores e monitores possuem a função de validar respostas, atribuindo um selo de confiabilidade institucional que garante maior credibilidade ao conteúdo. O sistema organiza as respostas com base nas melhores avaliações, exibindo-as em destaque para otimizar a experiência de consulta. Esse processo não apenas orienta outros usuários na busca pela melhor solução, como também estimula a participação qualificada, criando um ambiente de aprendizado confiável e transparente.

**Processo 6 – Armazenamento dos Dados**: Esse processo é responsável por garantir que todas as informações inseridas e geradas na plataforma sejam armazenadas de forma segura e íntegra. Ele contempla tanto os dados pessoais dos usuários (cadastro, perfil, credenciais) quanto os dados acadêmicos (dúvidas, respostas, avaliações e interações). O sistema aplica técnicas de criptografia para senhas e informações sensíveis, além de adotar políticas de backup e recuperação de dados. Os acessos são regulados de acordo com os perfis de usuário, respeitando os princípios da confidencialidade e integridade definidos pela LGPD. Esse processo é essencial para sustentar a confiança dos usuários e a continuidade do ambiente, garantindo que a plataforma seja escalável, segura e aderente às normas institucionais.

Assim, espera-se que o fortalecimento da cultura acadêmica participativa, inovadora e tecnológica seja garantido, promovendo o engajamento dos membros da comunidade e a troca de experiência e conhecimentos entre eles. Ademais, deseja-se que a plataforma possa contribuir para integrar diferentes cursos na área de Tecnologia da Informaçãp, estimulando práticas de aprendizagem ativa, além de servir como suporte ao aprendizado e como um repositório vivo de conhecimentos produzidos dentro e pela própria universidade. Por fim, é imprescindível citar a intenção de posicionar a instituição como um meio propício a inovações e que
utiliza da tecnologia no meio educacional, gerando impacto positivo tanto para os usuários, quanto para
a reputação acadêmica.

### 3.3. Modelagem dos processos

[PROCESSO 1 - Cadastro de Usuários](./processos/processo1_cadastro_usuario.md "Detalhamento do Processo 1.")

[PROCESSO 2 - Login de Usuários](./processos/processo2_login_usuario.md "Detalhamento do Processo 2.")

[PROCESSO 3 - Personalização de Perfil](./processos/processo3_personalizacao_usuario.md "Detalhamento do Processo 3.")

[PROCESSO 4 - Envio de Perguntas e Respostas](./processos/processo4_perguntas_respostas.md "Detalhamento do Processo 4.")

>>>>>>> upstream/main
