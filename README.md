<<<<<<< HEAD
# Medlar

`SISTEMAS DE INFORMAÇÃO`

`TRABALHO INTERDICIPLINAR: APLICAÇÃO PROCESSOS DE NEGOCIOS`

`2° semestre - 2025`

O desenvolvimento de um aplicativo para centralizar profissionais de 
saúde no atendimento domiciliar (Home Care) oferece uma solução prática e 
inovadora para pacientes que necessitam de cuidados contínuos.


## Integrantes

* Brenda Vieira Nascimento Santos
* Fernando Rafael da Silva Alves
* Gustavo Souza Rodrigues
* Pablo Vinicius Lazaro da Silva
* Pedro Henrique Lopes Silva
* Pedro Henrique Lima Bomfim

## Orientador

*  Cleia Marcia Gomes Amaral

---


## Instruções de Utilização do Projeto Medlar

<li><a href="docs/InstruçõesdeUtilização.md"> Instruções de Utilização</a></li>


Este documento fornece as instruções resumidas para instalar as dependências e executar a aplicação Medlar.

---
=======
# PUC Integra

`Sistemas de Informação`

`Trabalho interdisciplinar: Aplicações para processos de negócios`

`2.2025`

Inspirado no aplicativo Web e Mobile “Brainly”, uma comunidade de compartilhamento de conhecimentos entre especialistas e estudantes dos mais diversos assuntos, idealizamos um projeto que visa promover a interação e a cooperação entre membros da comunidade acadêmica da PUC Minas, aliando tecnologia, inovação e metodologias de aprendizagem colaborativa. Assim, espera-se que o acesso ao conhecimento, bem como a construção coletiva do aprendizado no ambiente universitário sejam fortalecidos e garantidos. 

## Integrantes

* Gabriel Rodrigo dos Santos Miguel
* Giovanna Fabíola Vaz
* Luiza Rodrigues Vertelo
* Mateus de Carvalho Freitas
* Ronaldo Pereira de Camargos Júnior

## Orientador

* Cleia Marcia Gomes Amaral

## Instruções de Utilização

Para executar o projeto **PUC Integra** em ambiente de desenvolvimento local, siga os passos abaixo.

### Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:
* **Java JDK 17** ou superior.
* **Maven** (para gerenciamento de dependências e build).
* **MySQL Server** (8.0 ou superior).
* **Git** (para clonagem do repositório).
* Uma IDE de sua preferência (recomendado: IntelliJ IDEA ou Eclipse).

### Configuração do Banco de Dados
1.  Acesse o seu gerenciador de banco de dados (MySQL Workbench, DBeaver ou terminal).
2.  Execute o script de criação do banco e das tabelas disponível na documentação do projeto:
    * O script encontra-se no arquivo: `docs/4-Projeto-Solucao.md` (Seção 4.3.3 - Modelo Físico).
3.  Verifique se o schema `puc_integra` foi criado corretamente.

### Configuração da Aplicação
1.  Clone este repositório:
    ```bash
    git clone [https://github.com/SEU-USUARIO/puc-integra.git](https://github.com/SEU-USUARIO/puc-integra.git)
    ```
2.  Navegue até a pasta do projeto e localize o arquivo `src/main/resources/application.properties`.
3.  Edite as configurações de acesso ao banco de dados conforme suas credenciais locais:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/puc_integra
    spring.datasource.username=SEU_USUARIO_MYSQL
    spring.datasource.password=SUA_SENHA_MYSQL
    spring.jpa.hibernate.ddl-auto=update
    ```

### Executando a Aplicação
1.  Abra o projeto na sua IDE ou terminal.
2.  Execute o comando Maven para baixar as dependências e rodar o projeto:
    ```bash
    mvn spring-boot:run
    ```
3.  Após a inicialização (aguarde a mensagem "Started Application..."), abra o navegador e acesse:
    * `http://localhost:8080`

### Login Inicial
Caso tenha populado o banco com dados de teste, utilize as credenciais padrão ou cadastre um novo usuário através da tela "Criar Conta".
>>>>>>> upstream/main

# Documentação

<ol>
<li><a href="docs/1-Contexto.md"> Documentação de Contexto</a></li>
<li><a href="docs/2-Especificação.md"> Especificação do Projeto</a></li>
<li><a href="docs/3-Modelagem-Processos-Negócio.md"> Modelagem dos Processos de Negocio</a></li>
<li><a href="docs/4-Projeto-Solucao.md"> Projeto da solução</a></li>
<<<<<<< HEAD
<li><a href="docs/5-Planejamento-Projeto.md"> Gerenciamento do Projeto</a></li>
=======
<li><a href="docs/5-Planejamento-Projeto.md"> Planejamento do Projeto</a></li>
>>>>>>> upstream/main
<li><a href="docs/6-Interface-Sistema.md"> Interface do Sistema</a></li>
<li><a href="docs/7-Conclusão.md"> Conclusão</a></li>
<li><a href="docs/8-Referências.md"> Referências</a></li>
</ol>

# Código

<li><a href="src/README.md"> Código Fonte</a></li>

# Apresentação

<<<<<<< HEAD
<li><a href="docs/Apresentaçãodasolução.md"> Apresentação da solução</a></li>
=======
<li><a href="docs/apresentacao/README.md"> Apresentação da solução</a></li>
>>>>>>> upstream/main


## Histórico de versões

* 0.1.1
    * CHANGE: Atualização das documentações. Código permaneceu inalterado.
* 0.1.0
    * Implementação da funcionalidade X pertencente ao processo P.
* 0.0.1
    * Trabalhando na modelagem do processo de negócio.

