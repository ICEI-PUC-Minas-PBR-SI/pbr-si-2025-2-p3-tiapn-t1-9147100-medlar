## 3.3.1 Processo 1 – Cadastro de Pacientes

### Oportunidades de Melhoria para o Processo de Cadastro

Com base na análise do processo atual (AS-IS) de cadastro de pacientes, as seguintes oportunidades de melhoria foram identificadas:

*   **Automação e Padronização:** Eliminar o preenchimento manual e repetitivo de formulários, implementando um sistema padronizado e automatizado para coleta de informações.
*   **Validação Abrangente e Automática:** Implementar validações automáticas para dados como CPF/CNPJ, idade mínima, formato de e-mail e registros profissionais, reduzindo erros e inconsistências.
*   **Segurança e Privacidade dos Dados:** Centralizar o armazenamento de dados pessoais e de saúde em um ambiente seguro, garantindo a privacidade e a conformidade com regulamentações de proteção de dados.
*   **Agilidade na Aprovação:** Reduzir a dependência de validação manual de credenciais profissionais, agilizando o processo de aprovação e disponibilização do serviço.
*   **Facilidade de Atualização:** Desenvolver um sistema que permita atualizações cadastrais de forma ágil e acessível aos usuários (pacientes e profissionais), sem a necessidade de processos manuais complexos.
*   **Integração de Sistemas:** Conectar o sistema de cadastro a prontuários eletrônicos, plataformas de pagamento e conselhos profissionais, centralizando e aumentando a confiabilidade das informações.
*   **Comunicação Eficiente:** Melhorar a comunicação sobre o status do cadastro e outras informações relevantes, evitando perdas de comunicação e atrasos.

### Exemplo de um Modelo BPMN do PROCESSO 1 - Cadastro


<img width="2278" height="1866" alt="Novo modelo" src="https://github.com/user-attachments/assets/4cf4cecb-8033-47e6-9339-9b742742556a" />


[Este modelo representaria o fluxo otimizado do processo de cadastro, incorporando as melhorias propostas. Ele pode incluir etapas como: Início do Cadastro, Preenchimento de Dados, Validação Automática, Aprovação/Rejeição, Notificação ao Usuário, e Fim do Cadastro.]

# Processo 1: Cadastro de Paciente

## Nome da atividade: Início do Cadastro

| Campo | Tipo | Restrições | Valor default |
|---|---|---|---|
| *Nenhum campo visível na tela* | | | |

### Comandos

| Comandos | Destino | Tipo |
|---|---|---|
| Iniciar Cadastro | Preenchimento de Dados - Dados Pessoais | default |

---

## Nome da atividade: Preenchimento de Dados - Dados Pessoais (Etapa 1 de 3)

| Campo | Tipo | Restrições | Valor default |
|---|---|---|---|
| nome_completo | Caixa de texto | Obrigatório | |
| cpf | Número | Obrigatório, formato XXX.XXX.XXX-XX | |
| data_nascimento | Data | Obrigatório, formato DD/MM/AAAA | |
| email | Caixa de texto | Obrigatório, formato de e-mail | |
| telefone | Caixa de texto | Obrigatório, formato (XX) XXXXX-XXXX | |

### Comandos

| Comandos | Destino | Tipo |
|---|---|---|
| Próximo | Preenchimento de Dados - Endereço e Histórico | default |
| Cancelar | Início do Cadastro | cancel |

---

## Nome da atividade: Preenchimento de Dados - Endereço e Histórico (Etapa 2 de 3)

*Nota: Esta atividade combina as informações de Endereço e Histórico Médico Resumido da segunda tela de preenchimento.*

| Campo | Tipo | Restrições | Valor default |
|---|---|---|---|
| cep | Número | Obrigatório, formato XXXXX-XXX | |
| cidade | Caixa de texto | Obrigatório | |
| rua_e_numero | Caixa de texto | Obrigatório | |
| complemento | Caixa de texto | Opcional | |
| condicoes_alergias | Área de texto | Obrigatório | |

### Comandos

| Comandos | Destino | Tipo |
|---|---|---|
| Voltar | Preenchimento de Dados - Dados Pessoais | back |
| Enviar | Validação de Dados | default |

---

## Nome da atividade: Validação de Dados (Etapa 3 de 3 - Inferida)

*Nota: A tela de "Validação de Dados" não foi fornecida, mas o fluxo sugere que ela existe após o "Enviar". Os campos e comandos são mantidos do fluxo original, pois não há evidência para alterá-los, exceto a numeração da etapa.*

| Campo | Tipo | Restrições | Valor default |
|---|---|---|---|
| status_validacao | Caixa de texto | Somente leitura | Em validação |

### Comandos

| Comandos | Destino | Tipo |
|---|---|---|
| Concluído | Notificação de Cadastro | default |
| Erro na Validação | Preenchimento de Dados - Dados Pessoais | erro |

---

## Nome da atividade: Notificação de Cadastro (Fim do Processo)

*Nota: Esta atividade não foi fornecida, mas é o passo lógico final do fluxo original.*

| Campo | Tipo | Restrições | Valor default |
|---|---|---|---|
| mensagem_notificacao | Área de texto | Somente leitura | Seu cadastro foi concluído com sucesso! |

### Comandos

| Comandos | Destino | Tipo |
|---|---|---|
| Fechar | Fim do Processo 1 | default |


## Wireframe 

<img width="1357" height="690" alt="image" src="https://github.com/user-attachments/assets/1b95bf81-9ebf-4449-9ca1-ba1daafb2cf9" />

<img width="1357" height="655" alt="image" src="https://github.com/user-attachments/assets/ab23c987-8e14-42f3-8e7a-b3b9d9c67691" />

<img width="1330" height="414" alt="image" src="https://github.com/user-attachments/assets/d765c4c0-7796-4845-a609-384cf20290ae" />

<img width="1356" height="490" alt="image" src="https://github.com/user-attachments/assets/1a6614df-7347-4691-9026-af6bf859e8ca" />


