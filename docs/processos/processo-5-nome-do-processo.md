# Processo 5: Solicitação de Atendimento

## Oportunidades de Melhoria Identificadas

A análise do fluxo de solicitação de atendimento revelou diversas oportunidades para otimizar a experiência do usuário, aumentar a eficiência operacional e reduzir falhas manuais. As melhorias propostas estão detalhadas abaixo.

### 1. Agendamento Inteligente
- **Problema Atual:** Seleção manual de data e horário, sujeita a conflitos de agenda e indisponibilidade do profissional.
- **Melhoria Proposta:** Substituir a seleção manual por um sistema que consulta a agenda do profissional em tempo real e **sugere automaticamente os horários disponíveis**.
- **Benefícios:**
  - Reduz o tempo gasto pelo usuário para encontrar um horário.
  - Elimina o risco de agendamentos duplicados (*double booking*).
  - Agiliza o processo de marcação.

### 2. Validação de Endereço
- **Problema Atual:** Erros de digitação no endereço podem levar a atrasos ou impossibilitar o atendimento.
- **Melhoria Proposta:** Implementar a **validação automática de endereços** (via CEP ou integração com APIs de mapas) com funcionalidade de autocompletar.
- **Benefícios:**
  - Garante a precisão da localização do atendimento.
  - Melhora a experiência de preenchimento para o usuário.
  - Facilita o planejamento de rotas para o profissional.

### 3. Transparência na Solicitação
- **Problema Atual:** O usuário pode confirmar a solicitação sem ter uma visão clara de todos os detalhes, gerando cancelamentos por engano.
- **Melhoria Proposta:** Apresentar uma **tela de resumo clara e completa** antes da confirmação final, contendo:
  - Serviço solicitado
  - Profissional
  - Data e horário
  - Local do atendimento
  - Valor (se aplicável)
- **Benefícios:**
  - Aumenta a confiança do usuário no processo.
  - Reduz a taxa de cancelamentos por informações incorretas.

### 4. Comunicação Multicanal e Imediata
- **Problema Atual:** A notificação depende de um único canal, e atrasos na comunicação podem fazer o usuário esperar desnecessariamente.
- **Melhoria Proposta:** Automatizar o envio de **notificações da solicitação para o profissional em múltiplos canais** (push no aplicativo, e-mail, SMS).
- **Benefícios:**
  - Garante que o profissional seja informado o mais rápido possível.
  - Acelera o tempo de resposta da solicitação.

### 5. Fluxo de Resposta Otimizado
- **Problema Atual:** O processo de aceitar, recusar ou negociar um horário é manual e pode ser lento.
- **Melhoria Proposta:** Criar um sistema onde o profissional pode **aceitar, recusar ou sugerir um novo horário com apenas um clique**.
  - **Se recusado:** O sistema automaticamente sugere ao usuário outro profissional ou a busca por um novo horário.
  - **Se um novo horário for sugerido:** O usuário recebe uma notificação para aprovar a alteração.
- **Benefícios:**
  - Simplifica a gestão de solicitações para o profissional.
  - Mantém o usuário engajado no fluxo, mesmo em caso de recusa.
  - Automatiza a renegociação de horários.

### Exemplo de um Modelo BPMN do PROCESSO 5

<img width="773" height="754" alt="image" src="https://github.com/user-attachments/assets/fcabb82f-7a28-4d31-a8c6-9214358963ba" />




## Detalhamento das Atividades

### Nome da atividade: Selecionar Data e Horário
*Esta é a primeira etapa para o usuário, onde ele escolhe quando deseja o atendimento.*

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| `data_desejada` | Calendário | Obrigatório, data futura | Data atual |
| `horarios_sugeridos` | Seleção única | Obrigatório | Lista de horários disponíveis |

### Nome da atividade: Selecionar Endereço
*O usuário define o local onde o atendimento será realizado.*

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| `tipo_endereco` | Seleção única | Obrigatório | `Endereço Padrão` |
| `endereco_selecionado` | Caixa de texto | Autocomplete, validação de CEP | Endereço do cadastro |

### Nome da atividade: Confirmar Solicitação (Resumo)
*Uma tela de resumo é exibida para o usuário revisar todas as informações antes de enviar.*

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| `resumo_servico` | Área de texto | Somente leitura | "Atendimento de [Especialidade] com [Profissional]" |
| `resumo_data_hora` | Caixa de texto | Somente leitura | Data e hora selecionadas |
| `resumo_local` | Caixa de texto | Somente leitura | Endereço selecionado |

### Nome da atividade: Notificar Profissional (Sistema)
*O sistema envia a solicitação ao profissional e bloqueia o horário na agenda.*

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| `status_notificacao` | Caixa de texto | Somente leitura | "Enviando notificação..." |
| `status_agenda` | Caixa de texto | Somente leitura | "Horário bloqueado temporariamente." |

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| `detalhes_solicitacao` | Área de texto | Somente leitura | Exibe todos os dados da solicitação |
| `novo_horario_sugerido` | Seletor de data/hora | Opcional | |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| `Aceitar` | Confirmar Agendamento | `default` |
| `Recusar` | Notificar Recusa ao Usuário | `default` |
| `Sugerir Novo Horário` | Notificar Sugestão ao Usuário | `default` |

### Nome da atividade: Confirmar Agendamento (Sistema)
*Após o aceite do profissional, o sistema finaliza o agendamento.*

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| `status_agendamento` | Caixa de texto | Somente leitura | "Agendamento confirmado!" |
| `status_sincronizacao` | Caixa de texto | Somente leitura | "Sincronizando com agendas externas..." |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| `Finalizar` | Fim do Processo | `default` |

## Wireframe

![Solicitar atendimento](https://github.com/user-attachments/assets/512427f6-171d-42b2-ad39-ed0cea67f5c8)

