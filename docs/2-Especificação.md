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

# Casos de Uso - Aplicativo Medlar

Este documento detalha os casos de uso do aplicativo Medlar, derivados das Histórias de Usuários e dos Requisitos Funcionais (RF-001 a RF-014) definidos na Especificação do Projeto. Os casos de uso estão organizados por ator e mapeados aos requisitos que atendem.

## Atores

- **Paciente/Familiar**: usuário que busca, agenda e acompanha atendimentos domiciliares.
- **Profissional de Saúde**: enfermeiro, fisioterapeuta, fonoaudiólogo ou outro profissional que presta o atendimento.
- **Administrador**: responsável pela gestão da plataforma, cadastros e relatórios.
- **Sistema**: ações automáticas disparadas sem interação direta do usuário (notificações, atualização de geolocalização).

## Lista de Casos de Uso

| ID   | Nome do Caso de Uso                                  | Ator Principal          | RF Relacionado |
| ---- | ----------------------------------------------------- | ------------------------ | -------------- |
| UC01 | Cadastrar paciente/familiar                            | Paciente/Familiar        | RF-001         |
| UC02 | Buscar profissional de saúde                           | Paciente/Familiar        | -              |
| UC03 | Solicitar/agendar atendimento domiciliar               | Paciente/Familiar        | RF-003         |
| UC04 | Acompanhar deslocamento do profissional em tempo real  | Paciente/Familiar        | RF-004         |
| UC05 | Consultar histórico de atendimentos                    | Paciente/Familiar, Profissional | RF-005  |
| UC06 | Receber lembretes automáticos                          | Sistema → Paciente/Familiar | RF-008       |
| UC07 | Realizar atendimento por videochamada                  | Paciente/Familiar, Profissional | RF-009  |
| UC08 | Avaliar atendimento do profissional                     | Paciente/Familiar        | RF-010         |
| UC09 | Fazer upload de exames/laudos/documentos                | Paciente/Familiar        | RF-013         |
| UC10 | Ajustar manualmente horário de agendamento              | Paciente/Familiar        | RF-014         |
| UC11 | Cadastrar profissional de saúde                         | Profissional de Saúde    | RF-002         |
| UC12 | Gerenciar agenda/disponibilidade                        | Profissional de Saúde    | -              |
| UC13 | Aceitar/recusar solicitação de atendimento              | Profissional de Saúde    | -              |
| UC14 | Registrar informações do atendimento                    | Profissional de Saúde    | RF-006         |
| UC15 | Importar histórico médico de sistema legado              | Profissional de Saúde    | RF-012         |
| UC16 | Gerenciar cadastros de pacientes e profissionais         | Administrador             | -              |
| UC17 | Gerar relatório diário de evolução do paciente           | Administrador             | RF-007         |
| UC18 | Gerar relatório de atendimentos por profissional/período | Administrador             | RF-011         |
| UC19 | Auditar acessos e logs de segurança                      | Administrador             | RNF-002        |
| UC20 | Atualizar geolocalização do profissional em deslocamento | Sistema                   | RF-004         |

## Especificação dos Casos de Uso

### UC01 - Cadastrar paciente/familiar
- **Ator(es):** Paciente/Familiar
- **Descrição:** Permite que um paciente ou familiar crie uma conta na plataforma, informando dados pessoais, de contato e do paciente a ser cuidado.
- **Pré-condições:** Usuário possui acesso à internet e ao aplicativo.
- **Fluxo principal:**
  1. Usuário seleciona "Cadastrar-se".
  2. Preenche dados pessoais e do paciente.
  3. Sistema valida os dados informados.
  4. Sistema cria a conta e confirma o cadastro.
- **Fluxo alternativo:** Dados inválidos ou incompletos → sistema exibe mensagem de erro e solicita correção.
- **Pós-condições:** Conta criada e disponível para login.

### UC02 - Buscar profissional de saúde
- **Ator(es):** Paciente/Familiar
- **Descrição:** Permite buscar profissionais disponíveis por especialidade, localização, avaliação e preço.
- **Pré-condições:** Usuário autenticado.
- **Fluxo principal:**
  1. Usuário acessa a busca.
  2. Aplica filtros (especialidade, localização, preço, avaliação).
  3. Sistema retorna lista de profissionais compatíveis.
  4. Usuário seleciona um perfil para visualizar detalhes.
- **Fluxo alternativo:** Nenhum profissional encontrado → sistema sugere ampliar os filtros.
- **Pós-condições:** Usuário visualiza perfil do profissional escolhido.

### UC03 - Solicitar/agendar atendimento domiciliar
- **Ator(es):** Paciente/Familiar
- **Descrição:** Permite solicitar um atendimento a um profissional específico, escolhendo data, horário e tipo de serviço.
- **Pré-condições:** Profissional selecionado e com disponibilidade na agenda.
- **Fluxo principal:**
  1. Usuário escolhe data/horário disponível.
  2. Descreve necessidade do atendimento.
  3. Sistema envia solicitação ao profissional.
  4. Profissional aceita → sistema confirma o agendamento.
- **Fluxo alternativo:** Profissional recusa → sistema notifica o usuário e sugere novos horários/profissionais.
- **Pós-condições:** Atendimento agendado e visível na agenda de ambos os atores.

### UC04 - Acompanhar deslocamento do profissional em tempo real
- **Ator(es):** Paciente/Familiar
- **Descrição:** Exibe no mapa a localização e o trajeto do profissional a caminho do atendimento.
- **Pré-condições:** Atendimento confirmado e profissional a caminho.
- **Fluxo principal:**
  1. Usuário acessa detalhes do atendimento agendado.
  2. Sistema exibe mapa com localização atual do profissional.
  3. Sistema atualiza posição periodicamente (via UC20).
- **Fluxo alternativo:** Sem sinal de geolocalização → sistema informa última posição conhecida.
- **Pós-condições:** Usuário tem previsibilidade da chegada do profissional.

### UC05 - Consultar histórico de atendimentos
- **Ator(es):** Paciente/Familiar, Profissional de Saúde
- **Descrição:** Permite visualizar os atendimentos já realizados, incluindo anotações e evolução do paciente.
- **Pré-condições:** Usuário autenticado e com atendimentos registrados.
- **Fluxo principal:**
  1. Usuário acessa "Histórico".
  2. Sistema lista atendimentos anteriores com data, profissional/paciente e resumo.
  3. Usuário seleciona um atendimento para ver detalhes completos.
- **Pós-condições:** Histórico consultado.

### UC06 - Receber lembretes automáticos
- **Ator(es):** Sistema → Paciente/Familiar
- **Descrição:** Envia notificações automáticas sobre medicamentos, curativos e próximos atendimentos.
- **Pré-condições:** Usuário com notificações ativadas.
- **Fluxo principal:**
  1. Sistema identifica evento programado (medicação, atendimento futuro).
  2. Sistema dispara notificação push/e-mail/SMS no horário definido.
- **Pós-condições:** Usuário notificado a tempo de agir.

### UC07 - Realizar atendimento por videochamada
- **Ator(es):** Paciente/Familiar, Profissional de Saúde
- **Descrição:** Permite realizar orientação remota via videochamada, sem deslocamento físico.
- **Pré-condições:** Atendimento agendado como remoto.
- **Fluxo principal:**
  1. Ambos os atores acessam a sala de videochamada no horário agendado.
  2. Sistema estabelece a conexão.
  3. Profissional realiza o atendimento e registra observações (UC14).
- **Fluxo alternativo:** Falha de conexão → sistema oferece reconexão ou reagendamento.
- **Pós-condições:** Atendimento remoto concluído e registrado.

### UC08 - Avaliar atendimento do profissional
- **Ator(es):** Paciente/Familiar
- **Descrição:** Permite avaliar a qualidade do atendimento prestado após sua conclusão.
- **Pré-condições:** Atendimento marcado como concluído.
- **Fluxo principal:**
  1. Sistema solicita avaliação após o atendimento.
  2. Usuário atribui nota e comentário opcional.
  3. Sistema registra a avaliação no perfil do profissional.
- **Pós-condições:** Avaliação vinculada à reputação do profissional.

### UC09 - Fazer upload de exames/laudos/documentos
- **Ator(es):** Paciente/Familiar
- **Descrição:** Permite anexar documentos médicos ao prontuário do paciente.
- **Pré-condições:** Usuário autenticado.
- **Fluxo principal:**
  1. Usuário acessa o prontuário do paciente.
  2. Seleciona "Adicionar documento".
  3. Sistema armazena o arquivo em object storage e vincula ao prontuário.
- **Fluxo alternativo:** Formato de arquivo não suportado → sistema exibe erro.
- **Pós-condições:** Documento disponível para consulta pelos profissionais autorizados.

### UC10 - Ajustar manualmente horário de agendamento
- **Ator(es):** Paciente/Familiar
- **Descrição:** Permite reagendar um atendimento já confirmado.
- **Pré-condições:** Atendimento agendado e ainda não iniciado.
- **Fluxo principal:**
  1. Usuário seleciona o atendimento a alterar.
  2. Escolhe novo horário/data disponível.
  3. Sistema envia a alteração para confirmação do profissional.
- **Fluxo alternativo:** Profissional indisponível no novo horário → sistema sugere outras opções.
- **Pós-condições:** Agendamento atualizado.

### UC11 - Cadastrar profissional de saúde
- **Ator(es):** Profissional de Saúde
- **Descrição:** Permite que um profissional crie uma conta, informando especialidade, credenciais e área de atuação.
- **Pré-condições:** Profissional possui documentação válida (registro de classe).
- **Fluxo principal:**
  1. Profissional preenche dados pessoais e profissionais.
  2. Anexa documentos comprobatórios.
  3. Sistema envia cadastro para validação do Administrador.
- **Fluxo alternativo:** Documentação incompleta → cadastro fica pendente até regularização.
- **Pós-condições:** Cadastro criado, aguardando ou já aprovado.

### UC12 - Gerenciar agenda/disponibilidade
- **Ator(es):** Profissional de Saúde
- **Descrição:** Permite configurar horários disponíveis e bloqueios de agenda.
- **Pré-condições:** Profissional cadastrado e aprovado.
- **Fluxo principal:**
  1. Profissional acessa "Minha Agenda".
  2. Define horários disponíveis e bloqueios.
  3. Sistema atualiza a disponibilidade exibida na busca (UC02).
- **Pós-condições:** Agenda refletida para novos agendamentos.

### UC13 - Aceitar/recusar solicitação de atendimento
- **Ator(es):** Profissional de Saúde
- **Descrição:** Permite responder a uma solicitação de atendimento recebida.
- **Pré-condições:** Solicitação pendente de atendimento (UC03).
- **Fluxo principal:**
  1. Profissional recebe notificação de nova solicitação.
  2. Analisa detalhes e decide aceitar ou recusar.
  3. Sistema atualiza o status do agendamento e notifica o solicitante.
- **Pós-condições:** Status do agendamento definido (confirmado ou recusado).

### UC14 - Registrar informações do atendimento
- **Ator(es):** Profissional de Saúde
- **Descrição:** Permite registrar evolução, procedimentos realizados e observações após o atendimento.
- **Pré-condições:** Atendimento em andamento ou concluído.
- **Fluxo principal:**
  1. Profissional acessa o atendimento.
  2. Preenche formulário de evolução/prontuário.
  3. Sistema salva as informações no histórico do paciente.
- **Pós-condições:** Prontuário atualizado, disponível para relatórios (UC17, UC18).

### UC15 - Importar histórico médico de sistema legado
- **Ator(es):** Profissional de Saúde
- **Descrição:** Permite importar registros médicos anteriores de outro sistema.
- **Pré-condições:** Arquivo de histórico em formato suportado.
- **Fluxo principal:**
  1. Profissional seleciona "Importar histórico".
  2. Faz upload do arquivo.
  3. Sistema processa e vincula os dados ao prontuário do paciente.
- **Fluxo alternativo:** Formato incompatível → sistema rejeita e orienta conversão.
- **Pós-condições:** Histórico do paciente enriquecido com dados importados.

### UC16 - Gerenciar cadastros de pacientes e profissionais
- **Ator(es):** Administrador
- **Descrição:** Permite aprovar, bloquear ou editar cadastros de usuários da plataforma.
- **Pré-condições:** Administrador autenticado.
- **Fluxo principal:**
  1. Administrador acessa painel de gestão de usuários.
  2. Revisa cadastros pendentes ou existentes.
  3. Aprova, edita ou bloqueia o cadastro.
- **Pós-condições:** Base de usuários atualizada.

### UC17 - Gerar relatório diário de evolução do paciente
- **Ator(es):** Administrador
- **Descrição:** Gera relatório consolidado sobre a evolução dos pacientes atendidos no dia.
- **Pré-condições:** Existem atendimentos registrados no período.
- **Fluxo principal:**
  1. Administrador acessa "Relatórios".
  2. Seleciona o tipo "Evolução diária".
  3. Sistema compila os dados dos prontuários e gera o relatório.
- **Pós-condições:** Relatório disponível para download/visualização.

### UC18 - Gerar relatório de atendimentos por profissional/período
- **Ator(es):** Administrador
- **Descrição:** Gera relatório de desempenho e volume de atendimentos por profissional em um intervalo de datas.
- **Pré-condições:** Existem atendimentos registrados no período selecionado.
- **Fluxo principal:**
  1. Administrador seleciona profissional e período.
  2. Sistema consulta os atendimentos correspondentes.
  3. Sistema gera relatório com métricas (quantidade, avaliação média, etc.).
- **Pós-condições:** Relatório disponível para análise de performance.

### UC19 - Auditar acessos e logs de segurança
- **Ator(es):** Administrador
- **Descrição:** Permite consultar registros de acesso e ações críticas realizadas na plataforma.
- **Pré-condições:** Administrador com permissão de auditoria (RBAC).
- **Fluxo principal:**
  1. Administrador acessa o módulo de auditoria.
  2. Filtra por usuário, ação ou período.
  3. Sistema exibe o log correspondente.
- **Pós-condições:** Rastreabilidade das ações garantida.

### UC20 - Atualizar geolocalização do profissional em deslocamento
- **Ator(es):** Sistema
- **Descrição:** Captura periodicamente a localização do profissional durante o deslocamento até o atendimento, alimentando o acompanhamento em tempo real (UC04).
- **Pré-condições:** Atendimento confirmado e profissional com GPS ativo.
- **Fluxo principal:**
  1. Sistema solicita a localização do dispositivo do profissional em intervalos regulares.
  2. Atualiza a posição no mapa exibido ao paciente/familiar.
- **Fluxo alternativo:** Permissão de localização negada → sistema notifica o profissional para habilitar o GPS.
- **Pós-condições:** Posição do profissional atualizada continuamente até o início do atendimento.
