## 3.3.1 Processo 4 - Gerenciamento de Busca e Contratação de Profissional de Saúde Domiciliar

<img width="2056" height="1680" alt="Novo modelo banco de dados cleia" src="https://github.com/user-attachments/assets/80fd2348-3e0f-4604-8cf7-23b3531f4169" />


#### Detalhamento das atividades

| Atividade | Tipo | Dados Utilizados | Observações |
| :--- | :--- | :--- | :--- |
| **Identificar necessidades** | Manual (Paciente) | Requisitos de saúde, tipo de profissional | O paciente inicia o processo definindo o que precisa. |
| **Analisar solicitação** | Manual (Profissional) | Detalhes da necessidade do paciente | O profissional de saúde avalia o pedido recebido. |
| **Verificar disponibilidade** | Manual (Profissional) | Agenda do profissional | O profissional verifica se pode atender na data/hora desejada. |
| **Informar localização** | Usuário (Paciente) | Endereço do paciente | O paciente envia sua localização para a negociação de valores. |
| **Negociar valor** | Manual/Usuário | Preço, localização, necessidades | Etapa de negociação entre o paciente e o profissional. |
| **Realizar Pagamento** | Usuário (Paciente) | Dados de pagamento (cartão, Pix, etc.) | O pagamento é efetuado antes da definição da consulta. |
| **Agendar consulta** | Manual/Usuário | Data, hora, tipo de consulta (online/presencial) | O agendamento pode ser manual ou automático após o pagamento. |
| **Realizar Consulta** | Manual | Consulta (Presencial ou Online) | O profissional realiza o atendimento conforme agendado. |
| **Contratar profissional** | Manual (Paciente) | Contrato, acordo de serviço | Formalização do serviço após a consulta inicial. |


---

### Detalhamento das Atividades (Processo 4 – Gerenciamento de Busca e Contratação de Profissional de Saúde Domiciliar - TO-BE)

Descrevemos aqui cada uma das propriedades das atividades do processo otimizado (TO-BE), conforme o modelo de processo apresentado anteriormente. Este detalhamento visa especificar os campos de entrada/saída e os comandos associados a cada interação na plataforma Medlar.

---

#### Nome da atividade: Identificar Necessidade

Esta atividade representa o momento em que a família reconhece a necessidade de um profissional de saúde domiciliar e decide buscar uma solução.

| Campo             | Tipo           | Restrições                                   | Valor default |
| :---------------- | :------------- | :------------------------------------------- | :------------ |
| Tipo de Cuidado   | Seleção única  | Obrigatório. Opções: Enfermagem, Fisioterapia, Fonoaudiologia, Cuidador, Outro |               |
| Localização       | Caixa de Texto | Endereço completo (Rua, Número, Bairro, Cidade, Estado, CEP) |               |
| Data/Período      | Data e Hora    | Obrigatório. Período desejado para o início do atendimento | Data atual    |
| Observações       | Área de texto  | Máximo 500 caracteres                        |               |

| Comandos          | Destino                                    | Tipo    |
| :---------------- | :----------------------------------------- | :------ |
| Buscar Profissional | Buscar Profissional na Medlar (Próxima Atividade) | default |

---

#### Nome da atividade: Buscar Profissional na Medlar

Nesta atividade, a família utiliza os filtros da plataforma Medlar para encontrar profissionais que atendam aos critérios definidos.

| Campo             | Tipo           | Restrições                                   | Valor default |
| :---------------- | :------------- | :------------------------------------------- | :------------ |
| Tipo de Cuidado   | Seleção única  | Preenchido automaticamente pela atividade anterior, mas editável |               |
| Localização       | Caixa de Texto | Preenchido automaticamente pela atividade anterior, mas editável |               |
| Especialidade     | Seleção múltipla | Opcional. Ex: Pediátrica, Geriátrica, Ortopédica |               |
| Gênero Preferencial | Seleção única  | Opcional. Opções: Masculino, Feminino, Indiferente | Indiferente   |
| Avaliação Mínima  | Número         | Opcional. Escala de 1 a 5 estrelas           | 3             |

| Comandos          | Destino                                    | Tipo    |
| :---------------- | :----------------------------------------- | :------ |
| Aplicar Filtros   | Visualizar Perfis e Avaliações             | default |
| Limpar Filtros    | Buscar Profissional na Medlar (Reiniciar)  | cancel  |

---

#### Nome da atividade: Visualizar Perfis e Avaliações

A família analisa os perfis dos profissionais retornados pela busca, incluindo suas credenciais, experiência e avaliações de outros usuários.

| Campo             | Tipo           | Restrições                                   | Valor default |
| :---------------- | :------------- | :------------------------------------------- | :------------ |
| Nome Profissional | Caixa de Texto | Somente leitura                              |               |
| Foto Perfil       | Imagem         | Somente leitura                              |               |
| Credenciais        | Área de texto  | Somente leitura. Ex: COREN, CREFITO, etc.    |               |
| Experiência       | Área de texto  | Somente leitura                              |               |
| Avaliação Média   | Número         | Somente leitura. Escala de 1 a 5 estrelas    |               |
| Comentários       | Área de texto  | Somente leitura. Lista de avaliações         |               |
| Disponibilidade   | Tabela         | Somente leitura. Horários disponíveis        |               |

| Comandos          | Destino                                    | Tipo    |
| :---------------- | :----------------------------------------- | :------ |
| Solicitar Agendamento | Solicitar Agendamento                    | default |
| Voltar à Busca    | Buscar Profissional na Medlar              | cancel  |

---

#### Nome da atividade: Solicitar Agendamento

A família seleciona um profissional e propõe um agendamento específico, que será enviado para a plataforma Medlar e, posteriormente, para o profissional.

| Campo             | Tipo           | Restrições                                   | Valor default |
| :---------------- | :------------- | :------------------------------------------- | :------------ |
| Profissional Escolhido | Caixa de Texto | Somente leitura. Nome do profissional selecionado |               |
| Data do Atendimento | Data           | Obrigatório. Deve ser uma data futura        |               |
| Hora do Atendimento | Hora           | Obrigatório. Deve estar dentro do horário de funcionamento |               |
| Duração Estimada  | Número         | Opcional. Em horas ou minutos                | 1 hora        |
| Endereço do Atendimento | Caixa de Texto | Preenchido automaticamente com o endereço da família, mas editável |               |

| Comandos          | Destino                                    | Tipo    |
| :---------------- | :----------------------------------------- | :------ |
| Enviar Solicitação | Gerenciar Solicitação de Agendamento (Plataforma Medlar) | default |
| Cancelar          | Visualizar Perfis e Avaliações             | cancel  |

---

#### Nome da atividade: Realizar Pagamento (via Medlar)

Após a confirmação do agendamento, a família efetua o pagamento do serviço diretamente pela plataforma Medlar, garantindo segurança e rastreabilidade.

| Campo             | Tipo           | Restrições                                   | Valor default |
| :---------------- | :------------- | :------------------------------------------- | :------------ |
| Valor Total       | Número         | Somente leitura. Valor do serviço            |               |
| Método de Pagamento | Seleção única  | Obrigatório. Opções: Cartão de Crédito, PIX, Boleto |               |
| Dados do Cartão   | Caixa de Texto | Se Cartão de Crédito: Número, Validade, CVV  |               |
| Comprovante       | Arquivo        | Opcional. Upload de comprovante de PIX/Boleto |               |

| Comandos          | Destino                                    | Tipo    |
| :---------------- | :----------------------------------------- | :------ |
| Confirmar Pagamento | Processar Pagamento (Plataforma Medlar)  | default |
| Cancelar Pagamento | Notificar Cancelamento de Pedido (Plataforma Medlar) | cancel  |

---

#### Nome da atividade: Avaliar Profissional

Após o atendimento, a família tem a oportunidade de avaliar o profissional, contribuindo para o sistema de reputação da plataforma.

| Campo             | Tipo           | Restrições                                   | Valor default |
| :---------------- | :------------- | :------------------------------------------- | :------------ |
| Profissional Avaliado | Caixa de Texto | Somente leitura. Nome do profissional        |               |
| Nota              | Seleção única  | Obrigatório. Escala de 1 a 5 estrelas        |               |
| Comentário        | Área de texto  | Opcional. Máximo 500 caracteres              |               |

| Comandos          | Destino                                    | Tipo    |
| :---------------- | :----------------------------------------- | :------ |
| Enviar Avaliação  | Registrar Avaliação (Plataforma Medlar)    | default |
| Pular Avaliação   | Fim do Processo (Família/Paciente)         | default |

---

#### Nome da atividade: Cadastrar/Atualizar Perfil (na Medlar)

Esta atividade é realizada pelo profissional de saúde para criar ou manter seu perfil na plataforma, essencial para ser encontrado pelas famílias.

| Campo             | Tipo           | Restrições                                   | Valor default |
| :---------------- | :------------- | :------------------------------------------- | :------------ |
| Nome Completo     | Caixa de Texto | Obrigatório                                  |               |
| CPF               | Número         | Obrigatório. Formato: 000.000.000-00         |               |
| Registro Profissional | Caixa de Texto | Obrigatório. Ex: COREN, CREFITO, etc.        |               |
| Especialidades    | Seleção múltipla | Obrigatório. Ex: Pediátrica, Geriátrica      |               |
| Foto de Perfil    | Imagem         | Opcional. Formatos: JPG, PNG                 |               |
| Mini-currículo    | Área de texto  | Opcional. Máximo 1000 caracteres             |               |
| Endereço de Atendimento | Caixa de Texto | Obrigatório. Área de atuação                 |               |
| Valor da Consulta | Número         | Obrigatório. Em Reais (R$)                   |               |
| Dados Bancários   | Tabela         | Obrigatório. Banco, Agência, Conta, Tipo, PIX |               |

| Comandos          | Destino                                    | Tipo    |
| :---------------- | :----------------------------------------- | :------ |
| Salvar Perfil     | Perfil Salvo (Plataforma Medlar)           | default |
| Cancelar          | Retornar ao Painel (Profissional)          | cancel  |

---

#### Nome da atividade: Definir Disponibilidade (na Medlar)

O profissional gerencia sua agenda na plataforma, indicando os horários em que está disponível para atendimentos domiciliares.

| Campo             | Tipo           | Restrições                                   | Valor default |
| :---------------- | :------------- | :------------------------------------------- | :------------ |
| Calendário        | Tabela         | Obrigatório. Visualização de dias e horários |               |
| Horários Livres   | Seleção múltipla | Obrigatório. Seleção de blocos de horário    |               |
| Bloquear Horário  | Data e Hora    | Opcional. Para indisponibilidade temporária  |               |

| Comandos          | Destino                                    | Tipo    |
| :---------------- | :----------------------------------------- | :------ |
| Salvar Agenda     | Agenda Salva (Plataforma Medlar)           | default |
| Cancelar          | Retornar ao Painel (Profissional)          | cancel  |

---

#### Nome da atividade: Confirmar/Recusar Agendamento

O profissional recebe uma solicitação de agendamento e decide aceitá-la ou recusá-la através da plataforma.

| Campo             | Tipo           | Restrições                                   | Valor default |
| :---------------- | :------------- | :------------------------------------------- | :------------ |
| Detalhes do Agendamento | Área de texto  | Somente leitura. Informações da solicitação |               |
| Opção             | Seleção única  | Obrigatório. Opções: Confirmar, Recusar      |               |
| Motivo da Recusa  | Área de texto  | Obrigatório se Recusar. Máximo 200 caracteres |               |

| Comandos          | Destino                                    | Tipo    |
| :---------------- | :----------------------------------------- | :------ |
| Enviar Resposta   | Gerenciar Solicitação de Agendamento (Plataforma Medlar) | default |

---

#### Nome da atividade: Registrar Evolução do Paciente

Após o atendimento, o profissional registra informações relevantes sobre a sessão e a evolução do paciente na plataforma.

| Campo             | Tipo           | Restrições                                   | Valor default |
| :---------------- | :------------- | :------------------------------------------- | :------------ |
| Data do Registro  | Data e Hora    | Preenchido automaticamente                   | Data e hora atual |
| Observações       | Área de texto  | Obrigatório. Máximo 1000 caracteres          |               |
| Próximos Passos   | Área de texto  | Opcional. Máximo 500 caracteres              |               |
| Anexos            | Arquivo        | Opcional. Ex: Fotos, exames                  |               |

| Comandos          | Destino                                    | Tipo    |
| :---------------- | :----------------------------------------- | :------ |
| Salvar Registro   | Registro Salvo (Plataforma Medlar)         | default |
| Cancelar          | Retornar ao Painel (Profissional)          | cancel  |

---

#### Nome da atividade: Avaliar Família

O profissional avalia a família após o atendimento, contribuindo para a reputação mútua na plataforma.

| Campo             | Tipo           | Restrições                                   | Valor default |
| :---------------- | :------------- | :------------------------------------------- | :------------ |
| Família Avaliada  | Caixa de Texto | Somente leitura. Nome da família/paciente   |               |
| Nota              | Seleção única  | Obrigatório. Escala de 1 a 5 estrelas        |               |
| Comentário        | Área de texto  | Opcional. Máximo 500 caracteres              |               |

| Comandos          | Destino                                    | Tipo    |
| :---------------- | :----------------------------------------- | :------ |
| Enviar Avaliação  | Registrar Avaliação (Plataforma Medlar)    | default |
| Pular Avaliação   | Fim do Processo (Profissional)             | default |

## Wireframe

![WhatsApp Image 2025-10-03 at 20 20 29](https://github.com/user-attachments/assets/cb00cfa8-0a74-4f35-9293-dd6c1ef4f2e7)


