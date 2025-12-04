# Especificações do Projeto - Aplicativo   Medlar

<<<<<<< HEAD
Definição do problema e ideia de solução a partir da perspectiva do usuário, incluindo diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais, além das restrições do projeto.

Este documento abordará as seguintes seções, utilizando as informações extraídas do projeto Medlar:

* Personas
* Histórias de Usuários
* Requisitos Funcionais
* Requisitos Não Funcionais
* Restrições do Projeto

## Personas

O projeto Medlar visa atender dois grupos principais de usuários, representados pelas seguintes personas:

### 1. Maria, a Cuidadora Dedicada

* *Idade:* 45 anos
* *Ocupação:* Dona de casa, cuidadora principal de sua mãe idosa e acamada.
* *Necessidades:* Maria busca profissionais de saúde qualificados para atendimento domiciliar (enfermagem, fisioterapia) para sua mãe, pois tem dificuldades de locomoção e acesso a hospitais. Ela precisa de agilidade no agendamento, acompanhamento da evolução do tratamento e comunicação eficiente com os profissionais.
* *Frustrações:* Dificuldade em encontrar profissionais disponíveis, burocracia nos agendamentos e falta de transparência no acompanhamento dos cuidados.
* *Objetivos:* Garantir o melhor cuidado possível para sua mãe no conforto do lar, com praticidade e segurança.

### 2. Carlos, o Profissional Autônomo

* *Idade:* 32 anos
* *Ocupação:* Fisioterapeuta autônomo, busca expandir sua carteira de pacientes de Home Care.
* *Necessidades:* Carlos precisa de uma plataforma que o conecte a pacientes que necessitam de seus serviços em domicílio. Ele busca otimizar sua agenda, ter acesso rápido ao histórico dos pacientes e gerenciar seus atendimentos de forma eficiente.
* *Frustrações:* Dificuldade em encontrar novos pacientes, perda de tempo com agendamentos manuais e falta de um sistema integrado para gerenciar seus atendimentos e relatórios.
* *Objetivos:* Aumentar sua renda, otimizar seu tempo de trabalho e oferecer um serviço de qualidade com praticidade.

### 3. Ana, a Filha Organizada

* *Idade:* 27 anos
* *Ocupação:* Analista de sistemas, trabalha em home office.
* *Necessidades:* Cuida do pai de 78 anos, que tem hipertensão e mobilidade reduzida. Com a rotina corrida e reuniões diárias, precisa de praticidade para contratar e acompanhar serviços de saúde domiciliar.
* *Frustrações:* Dificuldade em conciliar agenda de trabalho com atendimento médico e Necessidade de deslocamentos constantes para levar o pai a consultas, o que atrapalha a rotina de trabalho.
* *Objetivos:* Reduzir saídas desnecessárias, mantendo os cuidados no conforto de casa.

O aplicativo busca conectar esses dois grupos, facilitando o acesso a serviços de saúde domiciliar e otimizando o trabalho dos profissionais.
=======
<span style="color:red">Pré-requisitos: <a href="1-Contexto.md"> Documentação de Contexto</a></span>

Esta seção descreve a solução proposta a partir da perspectiva do usuário. São apresentadas as **personas**, as **histórias de usuários**, os **requisitos funcionais e não funcionais** e as **restrições** do projeto.  

Para elaborar esta etapa, utilizamos as seguintes **técnicas e ferramentas**:  
- **Personas**: criadas com base em perfis de alunos, professores e gestores da PUC Minas, aplicando **mapa de empatia** e levantamento de stakeholders.  
- **Histórias de usuários (User Stories)**: elaboradas com base em práticas ágeis, utilizando o modelo **EU COMO... QUERO... PARA...**.  
- **Requisitos funcionais e não funcionais**: definidos a partir das histórias e priorizados pela técnica **MoSCoW (Must, Should, Could, Won’t)**.  
- **Restrições**: estabelecidas de acordo com as normas institucionais e de segurança digital da PUC Minas. 

## Personas

1. **Clara Monteverde (Aluna):**  21 anos, estudante de Análise e Desenvolvimento de Sistemas. Mora em Belo Horizonte, solteira. Busca otimizar seus estudos, utilizando a internet de forma segura e confiável.  

2. **Rafael Antunes (Professor):**  54 anos, professor de Algoritmos e Estrutura de Dados. Casado, 2 filhos, mora em Contagem. Deseja atender melhor seus alunos fora da sala de aula, oferecendo suporte digital.  

3. **Mariana Costa (Administradora):**  29 anos, responsável pela gestão administrativa e moderação. Casada, mãe de 1 filho, mora em BH. Busca manter a plataforma segura, organizada e dentro das normas institucionais.  

4. **Lucas Oliveira (Aluno):** 23 anos, faz estágio em desenvolvimento e cursa Engenharia de Software. Mora em Betim. Gosta de colaborar em fóruns, responder dúvidas e compartilhar materiais. Vê na plataforma uma oportunidade de reforçar o portfólio acadêmico.  

5. **Fernanda Dias (Monitora):**  32 anos, tutora da área de TI no campus Barreiro. Mora em Belo Horizonte. Precisa acompanhar os alunos, sugerir materiais de apoio e validar respostas técnicas.  

>>>>>>> upstream/main

## Histórias de Usuários

| EU COMO... | QUERO/PRECISO ... | PARA ... |
|---|---|---|
| Familiar de paciente acamado | Agendar atendimento domiciliar com profissional de saúde | Garantir o cuidado contínuo e adequado para o paciente |
| Familiar de paciente acamado | Visualizar o deslocamento do profissional no mapa | Ter previsibilidade sobre a chegada do profissional |
| Familiar de paciente acamado | Receber lembretes automáticos de medicamentos e curativos | Garantir a adesão ao tratamento do paciente |
| Familiar de paciente acamado | Avaliar o atendimento do profissional | Contribuir para a qualidade do serviço e a reputação do profissional |
| Familiar de paciente acamado | Acessar o histórico de atendimentos do paciente | Acompanhar a evolução do tratamento e ter informações para outros profissionais |
| Profissional de saúde (Enfermeiro, Fisioterapeuta, Fonoaudiólogo) | Ser encontrado por pacientes que precisam de atendimento domiciliar | Aumentar minha renda e otimizar meu tempo de trabalho |
| Profissional de saúde (Enfermeiro, Fisioterapeuta, Fonoaudiólogo) | Acessar o histórico de atendimentos do paciente | Prestar um atendimento mais personalizado e eficiente |
| Profissional de saúde (Enfermeiro, Fisioterapeuta, Fonoaudiólogo) | Registrar informações detalhadas sobre o atendimento | Manter o histórico do paciente atualizado e gerar relatórios |
| Profissional de saúde (Enfermeiro, Fisioterapeuta, Fonoaudiólogo) | Realizar atendimento online por videochamada | Oferecer orientações rápidas e economizar tempo de deslocamento |
| Administrador do sistema | Gerar relatórios de atendimentos realizados | Monitorar a performance dos profissionais e a demanda por serviços |
| Administrador do sistema | Gerenciar o cadastro de pacientes e profissionais | Manter a base de dados atualizada e organizada |

<<<<<<< HEAD
## Requisitos Funcionais

Os requisitos funcionais do aplicativo Home Care, baseados nas funcionalidades descritas no projeto, são:

| ID | Descrição do Requisito | Prioridade |
|---|---|---|
| RF-001 | Permitir o cadastro de pacientes e familiares | ALTA |
| RF-002 | Permitir o cadastro de profissionais de saúde | ALTA |
| RF-003 | Possibilitar o agendamento de atendimentos domiciliares | ALTA |
| RF-004 | Exibir a localização e deslocamento do profissional em tempo real (geolocalização) | ALTA |
| RF-005 | Permitir o acesso ao histórico de atendimentos do paciente | ALTA |
| RF-006 | Possibilitar o registro de informações detalhadas sobre cada atendimento | ALTA |
| RF-007 | Gerar relatórios diários sobre a evolução do paciente | ALTA |
| RF-008 | Enviar notificações automáticas (lembretes de medicamentos, próximos atendimentos) | ALTA |
| RF-009 | Permitir a realização de atendimento online por videochamada | MÉDIA |
| RF-010 | Possibilitar a avaliação dos serviços prestados pelos profissionais | MÉDIA |
| RF-011 | Gerar relatórios de atendimentos realizados por profissional e período | MÉDIA |
| RF-012 | Permitir a importação de históricos médicos de sistemas legados | MÉDIA |
| RF-013 | Possibilitar o upload de exames, laudos ou documentos adicionais | MÉDIA |
| RF-014 | Permitir ajustes manuais nos horários de agendamentos | MÉDIA |

## Requisitos Não Funcionais

Os requisitos não funcionais para o aplicativo Home Care, baseados nas características e necessidades do projeto, são:

| ID | Descrição do Requisito | Prioridade |
|---|---|---|
| RNF-001 | O sistema deve ser responsivo e compatível com dispositivos móveis (smartphones e tablets) | ALTA |
| RNF-002 | O aplicativo deve garantir a segurança e privacidade dos dados sensíveis dos pacientes (senhas criptografadas, controle de acessos, auditoria de log) | ALTA |
| RNF-003 | O sistema deve ter alta disponibilidade e confiabilidade para garantir o acesso contínuo aos serviços | ALTA |
| RNF-004 | A interface do usuário deve ser intuitiva e de fácil usabilidade para pacientes, familiares e profissionais de saúde | ALTA |
| RNF-005 | O sistema deve ser escalável para suportar um crescente número de usuários e atendimentos | MÉDIA |
| RNF-006 | O aplicativo deve ter um tempo de resposta rápido para agendamentos e consultas de informações | MÉDIA |
| RNF-007 | O aplicativo deve fornecer suporte técnico em tempo real para os usuários | MÉDIA |
| RNF-008 | O sistema deve ser capaz de operar com conectividade de internet variável, minimizando interrupções | MÉDIA |
| RNF-009 | O sistema deve ser acessível para usuários com diferentes necessidades (leitor de tela, alto contraste) | MÉDIA |
=======
## Histórias de Usuários

| EU COMO...   | QUERO/PRECISO ...                  | PARA ...                                                      |
|--------------|------------------------------------|----------------------------------------------------------------|
| Clara Monteverde (Aluna)       | Tirar minhas dúvidas em um canal confiável | Otimizar meu aprendizado e me preparar para avaliações |
| Lucas Oliveira (Aluno)      | Acessar materiais de diferentes disciplinas | Integrar meus estudos em um único ambiente |
| Clara Monteverde (Aluna)       | Avaliar respostas de colegas        | Contribuir para a qualidade das interações |
| Rafael Antunes (Professor)    | Responder alunos via web            | Apoiar o aprendizado e economizar tempo de atendimento individual |
| Rafael Antunes (Professor)    | Indicar materiais complementares    | Direcionar melhor os estudos dos alunos |
| Mariana Costa (Administradora)| Aplicar as políticas de uso         | Garantir que a plataforma seja usada de forma correta |
| Mariana Costa (Administradora)| Gerar relatórios de uso e interações| Monitorar engajamento e desempenho da plataforma |
| Fernanda Dias (Monitora)        | Validar respostas técnicas dos alunos| Garantir que o conteúdo publicado esteja correto e confiável |

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

| ID     | Descrição do Requisito  | Prioridade |
|--------|-------------------------|------------|
| RF-001 | Permitir cadastro e autenticação de usuários com credenciais da PUC | ALTA |
| RF-002 | Permitir envio de dúvidas pelos alunos | ALTA |
| RF-003 | Permitir que professores e tutores respondam dúvidas | ALTA |
| RF-004 | Permitir que usuários avaliem respostas (curtida/nota) | MÉDIA |
| RF-005 | Disponibilizar materiais de apoio e bibliografia recomendada | ALTA |
| RF-006 | Permitir personalização do perfil do usuário (foto, bio, curso) | MÉDIA |
| RF-007 | Emitir relatórios de participação e desempenho | MÉDIA |
| RF-008 | Possibilitar moderação de conteúdos pela equipe administrativa | ALTA |
| RF-009 | Manter registro de interações (perguntas, respostas, avaliações) | ALTA |
| RF-010 | Permitir integração futura com calendário acadêmico e portal do aluno | BAIXA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O login deve ser realizado com as credenciais institucionais da PUC | ALTA | 
|RNF-002| Todo tráfego de dados deve ser protegido por protocolos de segurança. |  ALTA | 
|RNF-003| O sistema precisa diferenciar permissões de acordo com o perfil do usuário. | MÉDIA | 
|RNF-004| Informações sensíveis, como senhas, devem ser armazenadas de forma criptografada. |  ALTA | 
|RNF-005| A plataforma deve manter registros de atividades críticas para auditoria. |  ALTA |
|RNF-006| O tempo de carregamento das páginas deve ser inferior a 2 segundos em situações normais. | MÉDIA | 
|RNF-007| A aplicação deve suportar uma quantidade definida de acessos simultâneos sem perda significativa de desempenho. | MÉDIA | 
|RNF-008| O código deve seguir boas práticas de desenvolvimento para facilitar melhorias. | MÉDIA | 
|RNF-009| A arquitetura do sistema deve ser modular, favorecendo correções e novas implementações. |  MÉDIA | 
|RNF-010| Deve haver documentação atualizada dos principais componentes. |  ALTA | 
|RNF-011| A interface deve ser simples e intuitiva, de fácil uso para alunos e professores. | ALTA | 
|RNF-012| O sistema deve seguir padrões de acessibilidade, garantindo acesso a pessoas com deficiência. |  ALTA | 
|RNF-013| O layout precisa ser responsivo, funcionando bem em computadores, tablets e celulares. | MÉDIA | 
|RNF-014| A aplicação deve funcionar nos principais navegadores atuais. | ALTA | 
|RNF-015| Deve haver backups automáticos e periódicos do banco de dados. | MÉDIA |
|RNF-016| Nenhum dado deve ser perdido em situações de queda do sistema. | ALTA | 
|RNF-017| A plataforma deve possibilitar integrações futuras com outros serviços acadêmicos, como calendário e portal do aluno | BAIXA | 
|RNF-018| O sistema deve possibilitar o acompanhamento de desempenho e uso. |  MÉDIA | 
>>>>>>> upstream/main

## Restrições

O projeto do aplicativo Home Care está sujeito às seguintes restrições:

<<<<<<< HEAD
| ID | Restrição |
|---|---|
| 01 | O desenvolvimento inicial pode ser limitado por custos e recursos disponíveis. |
| 02 | A funcionalidade completa do aplicativo depende da conectividade à internet. |
| 03 | A segurança e privacidade dos dados do paciente são críticas e exigem atenção contínua. |
| 04 | A disponibilidade de profissionais qualificados na plataforma pode variar por região. |
| 05 | A qualidade do serviço pode ser impactada pela subjetividade das avaliações dos usuários. |
=======
|ID| Restrição                                             |
|--|-------------------------------------------------------|
|R-01| A aplicação deve utilizar infraestrutura compatível com os padrões da PUC Minas. |
|R-02| O banco de dados deve armazenar informações apenas em servidores autorizados e que atendam às normas da universidade. |
|R-03| Apenas usuários com vínculo ativo com a PUC Minas poderão criar contas e acessar os conteúdos. |
|R-04| Dados sensíveis não poderão ser compartilhados fora do ambiente institucional. |
|R-05| Alunos só poderão postar dúvidas e respostas após autenticação no sistema. |
|R-06| A moderação de conteúdos inapropriados ficará restrita à equipe administrativa da instituição. |
|R-08| A plataforma deve seguir o padrão visual e de identidade institucional da PUC Minas. |
|R-09| Somente informações autorizadas poderão ser integradas ao calendário acadêmico e bibliografia institucional. |
|R-10| O acesso externo (fora da comunidade acadêmica da PUC) será restrito, salvo autorização expressa da instituição. |
|R-11| O acesso será restrito a estudantes da área de Tecnologia da Informação da PUC Minas. |

## Matriz de Rastreabilidade
A tabela abaixo mostra a relação entre as **Histórias de Usuários** e os **Requisitos funcionais e não-funcionais** que garantem sua implementação.

| História de Usuário                                                                 | Requisitos Relacionados |
|-------------------------------------------------------------------------------------|--------------------------|
| **EU, Clara Monteverde, COMO aluna quero tirar minhas dúvidas em um canal confiável para otimizar meu aprendizado** | RF-002, RF-003, RNF-001, RNF-002 |
| **EU, Clara Monteverde, COMO aluna quero acessar materiais de diferentes disciplinas para integrar meus estudos em um único ambiente** | RF-005, RF-009, RNF-013 |
| **EU, Lucas Oliveira, COMO aluna quero avaliar respostas de colegas para contribuir para a qualidade das interações** | RF-004, RF-009 |
| **EU, Rafael Antunes, COMO professor quero responder alunos via web para apoiar o aprendizado** | RF-003, RF-005, RNF-011 |
| **EU, Rafael Antunes, COMO professor quero indicar materiais complementares para direcionar melhor os estudos dos alunos** | RF-005, RNF-010 |
| **EU, Mariana Costa, COMO administradora quero aplicar as políticas de uso para garantir que a plataforma seja usada de forma correta** | RF-008, RNF-003, RNF-005 |
| **EU, Mariana Costa, COMO administradora quero gerar relatórios de uso e interações para monitorar engajamento** | RF-007, RF-009, RNF-018 |
| **EU, Rafael Antunes, COMO professor quero validar respostas técnicas dos alunos para garantir confiabilidade do conteúdo** | RF-003, RF-008, RNF-004 |
| **EU, Lucas Oliveira, COMO aluno quero personalizar meu perfil para ter uma identidade no ambiente virtual** | RF-006, RNF-011, RNF-013 |
| **EU, Mariana Costa, COMO administradora quero que apenas usuários com vínculo ativo possam acessar** | RF-001, RNF-001, R-03 |
>>>>>>> upstream/main
