# Processo 6: Gestão da Agenda do Paciente

## Oportunidades de Melhoria Identificadas

Com base no fluxo de visualização e gestão de agendamentos pelo paciente, as seguintes oportunidades foram identificadas para criar uma experiência mais integrada, informativa e flexível.

### 1. Centralização e Organização Automática
- **Problema Atual:** O paciente pode não ter um local único e claro para ver todos os seus compromissos futuros.
- **Melhoria Proposta:** Criar uma seção dedicada, como **"Minha Agenda"**, que busca e **organiza automaticamente todos os atendimentos confirmados** em uma visualização cronológica (lista ou calendário).
- **Benefícios:**
  - Facilita o controle e o planejamento do paciente.
  - Reduz a chance de esquecimentos ou confusão sobre os agendamentos.
  - Centraliza todas as informações relevantes em um único lugar.

### 2. Flexibilidade para Edição e Cancelamento
- **Problema Atual:** Cancelar ou alterar um agendamento pode ser um processo manual e burocrático (ex: ligar para uma central).
- **Melhoria Proposta:** Implementar **funcionalidades de autogestão** que permitam ao usuário **editar ou cancelar** um agendamento diretamente pela agenda, sujeito a regras de negócio (ex: antecedência mínima para cancelamento).
- **Benefícios:**
  - Oferece autonomia e conveniência ao paciente.
  - Automatiza o processo de cancelamento, liberando o horário para outros pacientes.
  - Reduz a carga de trabalho administrativo.

### 3. Notificações e Lembretes Inteligentes
- **Problema Atual:** O paciente pode se esquecer do atendimento agendado.
- **Melhoria Proposta:** Configurar um sistema de **lembretes automáticos** enviados em momentos estratégicos (ex: 24 horas antes e 2 horas antes do atendimento) via push, SMS ou e-mail.
- **Benefícios:**
  - Reduz a taxa de não comparecimento (*no-show*).
  - Melhora a experiência e o cuidado com o paciente.

### 4. Histórico de Atendimentos
- **Melhoria Proposta:** Criar uma aba ou seção dedicada ao **"Histórico"**, separada dos compromissos futuros.
- **Funcionalidades:**
  - Listar todos os atendimentos que já foram concluídos.
  - Permitir acesso a detalhes e anotações de sessões passadas.
- **Benefícios:** Facilita o acompanhamento da jornada de cuidado e a consulta de informações passadas.

![Imagem do WhatsApp de 2025-09-19 à(s) 16 59 52_050cc7a1](https://github.com/user-attachments/assets/bacfe5aa-4131-4934-bd74-2483180273b9)

---

## Detalhamento das Atividades

### Nome da atividade: Acessar "Minha Agenda"
*O usuário inicia o processo ao selecionar a opção para visualizar seus compromissos.*

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| `eventos_agenda` | Lista | Somente leitura | Carregando... |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| `Acessar Agenda` | Visualizar Agenda | `default` |

### Nome da atividade: Visualizar Agenda
*O sistema busca e exibe todos os atendimentos confirmados do paciente.*

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| `lista_compromissos` | Lista de cards | Somente leitura | Exibe data, hora, profissional e local de cada agendamento |
| `visualizacao` | Botão de alternância | Opcional | `Lista` / `Calendário` |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| `Selecionar Compromisso` | Detalhar Agendamento | `default` |
| `Fechar` | Fim do Processo | `cancel` |

### Nome da atividade: Detalhar Agendamento
*O usuário seleciona um compromisso específico para ver mais detalhes ou realizar ações.*

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| `detalhes_completos` | Área de texto | Somente leitura | Informações completas do agendamento |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| `Editar Agendamento` | Editar Agendamento | `default` |
| `Cancelar Agendamento` | Confirmar Cancelamento | `default` |
| `Voltar` | Visualizar Agenda | `back` |

### Nome da atividade: Editar Agendamento
*O sistema permite que o usuário altere informações do agendamento, como o horário (se permitido).*

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| `nova_data_hora` | Seletor de data/hora | Obrigatório | Horários disponíveis do profissional |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| `Salvar Alterações` | Salvar Alterações (Sistema) | `default` |
| `Cancelar Edição` | Detalhar Agendamento | `cancel` |

### Nome da atividade: Salvar Alterações (Sistema)
*O sistema processa as mudanças, atualiza as agendas do paciente e do profissional e envia notificações.*

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| `status_atualizacao` | Caixa de texto | Somente leitura | "Salvando alterações e notificando o profissional..." |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| `Alterações Salvas` | Visualizar Agenda | `default` |
| `Erro ao Salvar` | Editar Agendamento | `error` |

## Wireframe

![Agenda do paciente](https://github.com/user-attachments/assets/111cf6ab-9a7f-4b0c-a2b7-73da28905987)

