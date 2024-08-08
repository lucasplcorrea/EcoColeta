# EcoColeta

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) ![BcryptJS](https://img.shields.io/badge/BcryptJS-0A2F33?style=for-the-badge&logo=none&logoColor=white) ![dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=none&logoColor=black) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white) ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

## Descrição do Projeto

O **EcoColeta** é uma plataforma que facilita o gerenciamento de resíduos e o acesso a pontos de coleta de materiais recicláveis. Os usuários podem cadastrar novos pontos de coleta, encontrar pontos próximos, visualizar informações sobre os materiais aceitos em cada ponto e registrar suas próprias contribuições para a reciclagem.

## Funcionalidades

| Funcionalidade Usuários | Status |
| --- |     :---:      |
 | O sistema deve iniciar carregando do banco de dados uma lista de usuários já cadastrados.  | :white_check_mark: |
| No endpoint de usuários, deve haver opções para login e cadastro de novos usuários. | :white_check_mark: |
| Os usuários devem fornecer informações como nome, sexo, CPF, endereço, e-mail, senha, data de nascimento. | :white_check_mark: |
| Regras de validação devem ser implementadas, como evitar o cadastro de pessoas com o mesmo CPF e ou mesmo email. | :white_check_mark: |

| Funcionalidade Coleta de Resíduos | Status |
| --- |     :---:      |
| Cada usuário pode cadastrar um ou mais locais de coleta de resíduos, fornecendo informações detalhadas sobre cada local. | :white_check_mark: |
| Informações como nome do local, descrição, localidade, coordenadas geográficas, e outras devem ser capturadas. | :white_check_mark: |
| O usuário deve ser capaz de resgatar o link do Google Maps apontando para o local cadastrado. | :white_check_mark: |
| Regras específicas devem ser implementadas, como não permitir a deleção de um usuário que tenha locais associados. | :white_check_mark: |

| Implementação de Mecanismo de Autenticação (JWT) | Status |
| --- |     :---:      |
| Todas as rotas, com exceção da rota de login e de cadastro de novo usuário, devem ser privadas. | :white_check_mark: |
| Rotas privadas necessitam que o usuário tenha um token válido, disponível na requisição, para que sejam acessadas. | :white_check_mark: |

| Exigências | Status |
| --- |     :---:      |
| Banco de Dados Relacional | :white_check_mark: |
| Documentação de Rotas com Swagger | :white_check_mark: |
| Listar todos os locais do usuário autenticado | :white_check_mark: |
| Listar informações de um local específico do usuário | :white_check_mark: |
| Criar documentação no formato README.md, explicando a estrutura do projeto, como executá-lo localmente, e outras informações relevantes. | :white_check_mark: |
| Sistema de Autenticação | :white_check_mark: |
| Rotas de Usuário: Login e Criação de Novo Usuário | :white_check_mark: |
| Cadastro de novo Local | :white_check_mark: |
| Excluir informações de um local específico do usuário | :white_check_mark: |
| Alterar informações de um local específico do usuário | :white_check_mark: |
| Código organizado e correto uso das boas práticas de desenvolvimento de software | :white_check_mark: |
| Implementação da Rota com link para o Google Maps de acordo com o Local Específico do Usuário | :white_check_mark: |

## Como Executar o Projeto

### Requisitos

- Node.js
- PostgreSQL

### Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```plaintext
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_seu_banco
DB_HOST=nome_do_seu_host
JWT_SECRET=sua_chave_JWT
```

### Configuração do Banco de Dados
Crie um arquivo config.json na pasta config com o seguinte conteúdo:

```json
{
  "development": {
    "username": "seu_usuario",
    "password": "sua_senha",
    "database": "ecocoleta",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "seu_usuario",
    "password": "sua_senha",
    "database": "ecocoleta_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "seu_usuario",
    "password": "sua_senha",
    "database": "ecocoleta_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```
## Instalação

1 - Clone o repositório:
```ssh
git clone https://github.com/seu-usuario/ecocoleta.git
```

2 - Instale as dependências
```ssh
npm install
```

3 - Execute as migrações do banco de dados
```ssh
npx sequelize db:migrate
```

4 - Inicie o servidor
```ssh
npm start
```

## Docs da API :memo:

A documentação das rotas da API pode ser acessada via Swagger em http://localhost:3000/api-docs.
