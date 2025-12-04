## 3.3.1 Processo 2 – Cadastro de Profissionais

### Oportunidades de Melhoria para o Processo de Cadastro

Com base na análise do processo atual (AS-IS) de cadastro de profissionais, as seguintes oportunidades de melhoria foram identificadas:

*   **Automação e Padronização:** Eliminar o preenchimento manual e repetitivo de formulários, implementando um sistema padronizado e automatizado para coleta de informações.
*   **Validação Abrangente e Automática:** Implementar validações automáticas para dados como CPF/CNPJ, idade mínima, formato de e-mail e registros profissionais, reduzindo erros e inconsistências.
*   **Segurança e Privacidade dos Dados:** Centralizar o armazenamento de dados pessoais e de saúde em um ambiente seguro, garantindo a privacidade e a conformidade com regulamentações de proteção de dados.
*   **Agilidade na Aprovação:** Reduzir a dependência de validação manual de credenciais profissionais, agilizando o processo de aprovação e disponibilização do serviço.
*   **Facilidade de Atualização:** Desenvolver um sistema que permita atualizações cadastrais de forma ágil e acessível aos usuários (pacientes e profissionais), sem a necessidade de processos manuais complexos.
*   **Integração de Sistemas:** Conectar o sistema de cadastro a prontuários eletrônicos, plataformas de pagamento e conselhos profissionais, centralizando e aumentando a confiabilidade das informações.
*   **Comunicação Eficiente:** Melhorar a comunicação sobre o status do cadastro e outras informações relevantes, evitando perdas de comunicação e atrasos.

### Exemplo de um Modelo BPMN do PROCESSO 2 - Cadastro


<img width="2278" height="1866" alt="Novo modelo 2" src="https://github.com/user-attachments/assets/70e50a10-cb11-4662-a952-021bab22f1d4" />



[Este modelo representaria o fluxo otimizado do processo de cadastro, incorporando as melhorias propostas. Ele pode incluir etapas como: Início do Cadastro, Preenchimento de Dados, Validação Automática, Análise de Credenciais (para profissionais), Aprovação/Rejeição, Notificação ao Usuário, e Fim do Cadastro.]

## Detalhamento do Fluxo de Cadastro de Profissional

### 1. Nome da atividade: Início do Cadastro

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| tipo_cadastro | Seleção única | Obrigatório | Profissional |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Iniciar Cadastro | Preenchimento de Dados | default |

---

### 2. Nome da atividade: Preenchimento de Dados (Profissional)

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| nome_completo | Caixa de texto | Obrigatório, mínimo 3 caracteres | |
| cpf | Número | Obrigatório, 11 dígitos, formato XXX.XXX.XXX-XX | |
| cnpj | Número | Opcional, 14 dígitos, formato XX.XXX.XXX/XXXX-XX | |
| registro_profissional | Caixa de texto | Obrigatório, formato específico do conselho (ex: COREN-SP-123456) | |
| formacao_academica | Área de texto | Obrigatório | |
| especialidades | Seleção múltipla | Obrigatório, mínimo 1 seleção | Enfermagem, Fisioterapia, Fonoaudiologia, etc. |
| areas_atendimento | Área de texto | Opcional | |
| endereco | Área de texto | Obrigatório | |
| telefone | Caixa de texto | Obrigatório, formato (XX) XXXXX-XXXX | |
| email | Caixa de texto | Obrigatório, formato de e-mail | |
| comprovante_registro | Arquivo | Obrigatório, PDF ou Imagem | |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Próximo | Validação de Dados | default |
| Cancelar | Início do Cadastro | cancel |

---

### 3. Nome da atividade: Validação de Dados

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| status_validacao | Caixa de texto | Somente leitura | Em validação |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Concluído | Notificação de Cadastro | default |
| Erro na Validação | Preenchimento de Dados | erro |

---

### 4. Nome da atividade: Notificação de Cadastro

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| mensagem_notificacao | Área de texto | Somente leitura | Seu cadastro foi concluído com sucesso! |
| data_cadastro | Data/Hora | Somente leitura, Auditoria | [Data e hora atual do sistema] |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Fechar | Fim do Processo 1 | default |

---

### 5. Nome da atividade: Fim do Processo 1

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| status_final | Caixa de texto | Somente leitura | Cadastro Finalizado |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Nenhum | Nenhum | Fim do Fluxo |


## Wireframe 

<img width="1354" height="687" alt="Captura de tela 2025-10-31 113519" src="https://github.com/user-attachments/assets/9106fdbc-4aa9-4f02-8475-a5a94f0c8d5a" />

<img width="1341" height="681" alt="Captura de tela 2025-10-31 113549" src="https://github.com/user-attachments/assets/22d98aae-a99b-479a-bf46-45de81b93252" />

<img width="1332" height="683" alt="Captura de tela 2025-10-31 113603" src="https://github.com/user-attachments/assets/a518e20d-5d6e-45f8-8dac-b423f548672f" />

<img width="1338" height="691" alt="Captura de tela 2025-10-31 113619" src="https://github.com/user-attachments/assets/25533f1f-8a78-445e-985e-42b232090b0f" />



