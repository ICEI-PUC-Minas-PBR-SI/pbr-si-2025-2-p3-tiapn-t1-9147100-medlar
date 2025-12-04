## 3.3.2 Processo 3 – Login de Usuário

### Oportunidades de Melhoria para o Processo de Login

Com base na análise do processo de Login (AS-IS) e nas melhores práticas de segurança e usabilidade, as seguintes oportunidades de melhoria podem ser consideradas:

* **Segurança Reforçada (TO-BE):** Implementar mecanismos de segurança robustos, como autenticação em dois fatores (2FA) e limitação de tentativas de login, para proteger as contas dos usuários contra acessos não autorizados.
* **Usabilidade e Feedback (TO-BE):** Prover feedback claro e imediato ao usuário sobre o status do login (sucesso, falha por credenciais incorretas, conta bloqueada, etc.), sem revelar detalhes que possam auxiliar ataques de força bruta.
* **Recuperação de Senha Simplificada (TO-BE):** Oferecer um fluxo de recuperação de senha intuitivo e seguro, preferencialmente via e-mail ou SMS, com links de redefinição de uso único e tempo limitado.
* **Integração com Provedores Externos (TO-BE):** Possibilitar o login através de serviços de terceiros (ex: Google, Facebook), para maior conveniência do usuário.

---

### Modelo BPMN do PROCESSO 3 - Login

[Este modelo representaria o fluxo otimizado do processo de login, incorporando as melhorias propostas.  
Ele pode incluir etapas como: Início do Login, Preenchimento de Credenciais, Validação de Credenciais,  
Autenticação em Dois Fatores (opcional), Redirecionamento para Dashboard e Fim do Login.]

<img width="2894" height="1864" alt="Novo modelo Login" src="https://github.com/user-attachments/assets/5832440e-cad0-4cc0-b2ce-758999a186a0" />


---

## Detalhamento do Fluxo de Login de Usuário

Este documento detalha as atividades, campos, restrições e comandos de navegação do fluxo de login de usuário, incluindo elementos de controle e auditoria.

---

## 1. Nome da atividade: Tela de Login (Preenchimento de Credenciais)

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| email | Caixa de texto | Obrigatório, formato de e-mail válido | |
| senha | Senha | Obrigatório | |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Entrar | Validação de Credenciais | default |
| Registrar-se | Início do Cadastro | navigation |
| Esqueci minha senha | Recuperação de Senha | navigation |

---

## 2. Nome da atividade: Validação de Credenciais

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| status_login | Caixa de texto | Somente leitura | Em validação |
| tentativas_login | Número | Auditoria, limite de 3 tentativas | |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Sucesso | Redirecionamento para Dashboard | default |
| Falha | Tela de Login (Preenchimento de Credenciais) | error |
| Conta Bloqueada | Notificação de Bloqueio | error |

---

## 3. Nome da atividade: Recuperação de Senha

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| email_recuperacao | Caixa de texto | Obrigatório, formato de e-mail válido | |
| codigo_verificacao | Código (OTP) | Obrigatório após envio de e-mail | |
| nova_senha | Senha | Obrigatório, mínimo 6 caracteres | |
| confirmar_senha | Senha | Deve ser igual a nova_senha | |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Enviar e-mail de recuperação | Envio de Código de Redefinição | default |
| Confirmar nova senha | Validação de Redefinição | default |
| Cancelar | Tela de Login (Preenchimento de Credenciais) | navigation |

---

## 4. Nome da atividade: Validação de Redefinição

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| status_redefinicao | Caixa de texto | Somente leitura | Validando redefinição |
| codigo_valido | Booleano | Obrigatório | true/false |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Sucesso | Confirmação de Senha Redefinida | default |
| Falha | Recuperação de Senha | error |

---

## 5. Nome da atividade: Confirmação de Senha Redefinida

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| mensagem_confirmacao | Caixa de texto | Somente leitura | Senha alterada com sucesso |
| redirecionamento | Caixa de texto | Somente leitura | /login |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Voltar ao Login | Tela de Login (Preenchimento de Credenciais) | navigation |

---

## 6. Nome da atividade: Redirecionamento para Dashboard

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| url_destino | Caixa de texto | Somente leitura | /dashboard |
| data_login | Data/Hora | Somente leitura, Auditoria | [Data e hora atual do sistema] |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Redirecionar | Fim do Processo | default |

---

## 7. Nome da atividade: Fim do Processo

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| status_final | Caixa de texto | Somente leitura | Login Finalizado |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Nenhum | Nenhum | Fim do Fluxo |

---
## Wireframe

<img width="1330" height="688" alt="Captura de tela 2025-10-31 113844" src="https://github.com/user-attachments/assets/80841424-ea21-4bb3-808d-6aa44dc916fe" />


