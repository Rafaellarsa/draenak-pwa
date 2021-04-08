# draenak-pwa

## Sobre o projeto

O projeto é um PWA (híbrido entre _site_ e aplicativo) voltado para _smartphones_ que se propõe a ser uma ferramenta de auxílio para jogadores de RPG (Role Playing Game) de mesa. Mais especificamente, entrega uma forma rápida, intuitiva e agradável de fazer fichas no sistema Draenak de RPG e as armazena para consultas e edições. Além disso, a aplicação possui a funcionalidade de gerenciamento de mesas, nas quais os jogadores podem ver as informações básicas das fichas dos demais e o mestre pode ver todas as informações de todas as fichas, facilitando o planejamento e a condução das sessões. A interface, leve e jovem, remete a jogos e fantasia sem se restringir a nenhum tema específico de RPG - proporcionando, assim, maior liberdade para os usuários na escolha da ambientação.

## Sobre o cliente

João Pedro Osawa, desenvolvedor de jogos formado em Sistemas e Mídias Digitais na Universidade Federal do Ceará (UFC), joga RPG há 14 anos e está desenvolvendo um sistema próprio - o Draenak.

## Sobre a equipe

### Equipe Pica-pau

- Luana Helena de Oliveira Viana
- Marcos Paulo Oliveira de Almeida
- Maria Eduarda Olinda Oliveira Bernardo
- Nicole Inácio Sousa
- Rafaella Sampaio de Alencar

## Projeto hospedado

<https://draenakpwa.web.app/>

## Rodar o projeto localmente

### Clonar

![Botão de clonagem](https://user-images.githubusercontent.com/46501003/112393451-d8525b80-8cd9-11eb-8539-fa8c3a4ed1fa.png)

Através do _link_ ou baixando os arquivos compactados.

### Instalar dependências

```
npm install
```

Requer [node](https://nodejs.org/pt-br/download/).

### Compilar com atualização em tempo real

```
npm run serve
```

## Melhorias futuras

- Tempo de carregamento e fluidez na navegação;
- _Feedback_ ao usuário, especialmente nas telas relacionadas à autenticação;
- _Layout_ da tela de configurações;
- _Layout_ da ficha visualizada pelo mestre da mesa;
- Transformar algumas variáveis muito utilizadas em estados do _store_ para melhorar a lógica, por exemplo, do menu superior, da seleção de ficha dentro da mesa e do retorno à lista ao apagar uma ficha ou mesa;
- Adicionar "Nenhuma mesa" nas opções de mesa;
- Modo noturno;
- Escolha de temas (cores);
- Internacionalização;
- Exportação de fichas.

## Requisitos

### Requisitos implementados

|     **Requisitos Funcionais**     |                                                                                                                                                              **Descrição**                                                                                                                                                               |                             **Codificação**                             |
| :-------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------: |
|                                   |                                                                                                                                                           **Funções Básicas**                                                                                                                                                            |                                                                         |
|        RF_B1: Autenticação        |                                                                                                                          O usuário deve inserir o par login e senha a fim de realizar autenticação no sistema.                                                                                                                           | src/App.vue src/views/Login.vue src/components/ForgotPasswordDialog.vue |
|    **RF_B2: Gerenciar conta**     |                                                                                                                                                                                                                                                                                                                                          |                                                                         |
|       RF_B2.1: Criar Conta        |                                                                                                                O usuário pode registrar uma nova conta, inserindo e-mail, nome de usuário, senha e confirmação da senha.                                                                                                                 |              src/views/Login.vue src/components/SignUp.vue              |
| RF_B2.2: Consultar dados da conta |                                                                                                                                   O usuário pode consultar qual e-mail e nome de usuário estão ativos.                                                                                                                                   |                         src/views/Settings.vue                          |
|  RF_B2.3: Alterar dados da conta  |                                                                                                                           O usuário pode trocar sua senha, inserindo a antiga, a nova e a confirmação da nova.                                                                                                                           |                         src/views/Settings.vue                          |
|      RF_B2.4: Excluir conta       |                                                                                                                                   O usuário pode, através de confirmação da senha, excluir sua conta.                                                                                                                                    |                         src/views/Settings.vue                          |
|  **Requisitos Funcionais**  |                                                                                                                                                             **Descrição**                                                                                                                                                              | **Codificação** |
|                            |  |  |
|                             |                                                                                                                                                        **Funções Fundamentais**                                                                                                                                                        |                 |
| **RF_F1: Gerenciar fichas** |                                                                                                                                                                                                                                                                                                                                        |                 |
|  RF_F1.1: Consultar fichas  |                                                                                                                                O usuário pode ver a lista de fichas e acessar os detalhes de cada uma.                                                                                                                                 |                 |
|    RF_F1.2: Criar fichas    |                                                                      O usuário pode criar uma nova ficha, na qual pode inserir imagem, informações gerais, pontos de atributo, inventário de itens e anotações, além de associá-la a uma mesa à qual tem acesso.                                                                       |                 |
|   RF_F1.3: Editar fichas    |                                                                                                                                   O usuário pode alterar todas as informações da ficha selecionada.                                                                                                                                    |                 |
|   RF_F1.4: Excluir fichas   |                                                                                                                                              O usuário pode excluir a ficha selecionada.                                                                                                                                               |                 |
| **RF_F2: Gerenciar mesas**  |                                                                                                                                                                                                                                                                                                                                        |                 |
|  RF_F2.1: Consultar mesas   | O usuário pode ver a lista de mesas às quais tem acesso e consultar seus detalhes. O usuário com o título de mestre da mesa (concedido inicialmente a quem a criou) pode ver todas as informações de todas as fichas associadas, enquanto os demais usuários podem ver apenas algumas informações específicas das fichas de terceiros. |                 |
|     RF_F2.2: Criar mesa     |                                                                                                                 O usuário pode criar uma nova mesa, com descrição, permissão de acesso a outros usuários e anotações.                                                                                                                  |                 |
|    RF_F2.3: Editar mesa     |                                                    O usuário com o título de mestre da mesa (concedido inicialmente a quem a criou) pode alterar todas as informações da mesa selecionada, inclusive a lista de usuários associados a ela e qual usuário possui o título de mestre.                                                    |                 |
|    RF_F2.4: Excluir mesa    |                                                                                                           O usuário com o título de mestre da mesa (concedido inicialmente a quem a criou) pode excluir a mesa selecionada.                                                                                                            |                 |
