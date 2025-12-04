# Especificações do Projeto - Aplicativo   Medlar

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

## Restrições

O projeto do aplicativo Home Care está sujeito às seguintes restrições:

| ID | Restrição |
|---|---|
| 01 | O desenvolvimento inicial pode ser limitado por custos e recursos disponíveis. |
| 02 | A funcionalidade completa do aplicativo depende da conectividade à internet. |
| 03 | A segurança e privacidade dos dados do paciente são críticas e exigem atenção contínua. |
| 04 | A disponibilidade de profissionais qualificados na plataforma pode variar por região. |
| 05 | A qualidade do serviço pode ser impactada pela subjetividade das avaliações dos usuários. |
