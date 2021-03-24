# draenak-pwa

## Projeto hospedado

<https://draenakpwa.web.app/>

## Rodar o projeto localmente

### Clonar

![Botão de clonagem](https://user-images.githubusercontent.com/46501003/112393451-d8525b80-8cd9-11eb-8539-fa8c3a4ed1fa.png)
Através do *link* ou baixando os arquivos compactados.

### Instalar dependências
```
npm install
```
[requer](https://nodejs.org/pt-br/download/)

### Compilar com atualização em tempo real
```
npm run serve
```

## Requisitos

### Requisitos implementados

|       **Requisitos Funcionais**       |                                                 **Descrição**                                                 |                               **Codificação**                               |
|:---------------------------------:|:---------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------:|
|                                   |                                              **Funções Básicas**                                              |                                                                         |
|        RF_B1: Autenticação        | O usuário deve inserir o par login e senha a fim de realizar autenticação  no sistema.                    | src/App.vue src/views/Login.vue src/components/ForgotPasswordDialog.vue |
|                 **RF_B2: Gerenciar conta**                  |                                                                                     |                                                                         |
| RF_B2.1: Criar Conta              | O usuário pode registrar uma nova conta, inserindo e-mail, nome de usuário, senha e confirmação da senha. | src/views/Login.vue src/components/SignUp.vue                           |
| RF_B2.2: Consultar dados da conta | O usuário pode consultar qual e-mail e nome de usuário estão ativos.                                      | src/views/Settings.vue                                                  |
| RF_B2.3: Alterar dados da conta   | O usuário pode trocar sua senha, inserindo a antiga, a nova e a confirmação da nova.                      | src/views/Settings.vue                                                  |
| RF_B2.4: Excluir conta            | O usuário pode, através de confirmação da senha, excluir sua conta.                                       | src/views/Settings.vue                                                  |

### Requisitos pendentes

|   **Requisitos Funcionais**   |                                                                                                                                                                **Descrição**                                                                                                                                                               | **Codificação** |
|:-------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:-----------:|
|                           |                                                                                                                                                          **Funções Fundamentais**                                                                                                                                                          |             |
|              **RF_F1: Gerenciar fichas**             |                                                                                                                                                                                                                                                                                                                 |             |
| RF_F1.1: Consultar fichas | O usuário pode ver a lista de fichas e acessar os detalhes de cada uma.                                                                                                                                                                                                                                                                |             |
| RF_F1.2: Criar fichas     | O usuário pode criar uma nova ficha, na qual pode inserir imagem, informações gerais, pontos de atributo, inventário de itens e anotações, além de associá-la a uma mesa à qual tem acesso.                                                                                                                                            |             |
| RF_F1.3: Editar fichas    | O usuário pode alterar todas as informações da ficha selecionada.                                                                                                                                                                                                                                                                      |             |
| RF_F1.4: Excluir fichas   | O usuário pode excluir a ficha selecionada.                                                                                                                                                                                                                                                                                            |             |
|   **RF_F2: Gerenciar mesas**  |                                                                                                                                                                                                                                                                                                                                        |             |
| RF_F2.1: Consultar mesas  | O usuário pode ver a lista de mesas às quais tem acesso e consultar seus detalhes. O usuário com o título de mestre da mesa (concedido inicialmente a quem a criou) pode ver todas as informações de todas as fichas associadas, enquanto os demais usuários podem ver apenas algumas informações específicas das fichas de terceiros. |             |
| RF_F2.2: Criar mesa       | O usuário pode criar uma nova mesa, com descrição, permissão de acesso a outros usuários e anotações.                                                                                                                                                                                                                                  |             |
| RF_F2.3: Editar mesa      | O usuário com o título de mestre da mesa (concedido inicialmente a quem a criou) pode alterar todas as informações da mesa selecionada, inclusive a lista de usuários associados a ela e qual usuário possui o título de mestre.                                                                                                       |             |
| RF_F2.4: Excluir mesa     | O usuário com o título de mestre da mesa (concedido inicialmente a quem a criou) pode excluir a mesa selecionada.                                                                                                                                                                                                                      |             |
