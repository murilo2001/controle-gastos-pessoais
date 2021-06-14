<h1 align="center">
    <img src="./frontend/src/assets/intro_upperfi.gif">
    <p><b>UpperFI</b> Gestão Inteligente</p>
</h1>

## 🏮 Sobre

**UpperFI** é um projeto desenvolvido por fins de estudo, visa proporcionar ao usuário um sistema intuitivo para gestão financeira, ele conta com dashboards dinâmicos é uma interface de fácil utilização. A complexidade desse projeto não esta entrelaçado ao tema e sim na forma em que o sistema foi criado, o backend se trata de uma **API** e foi desenvolvido em node js utilizando algumas bibliotecas externas como JSONWebToken para manipulação dos tokens, BCryptjs para encriptação de senhas, ORM Sequelize, Query Builder Knex, Pusher,... O frontend foi desenvolvido em vue js e vuetfy.<br><br>

Apos a conclusão desse projeto tive a oportunidade de fazer o deploy dele na AWS conhecendo alguns serviços como <b>EC2, S3, RDS, CloundFront e IAM</b>, caso ainda esteja disponível o link para acesso é: (http://d1oqty0urn1887.cloudfront.net)

---

## 🖥 Requisitos

- [Node.js 10+](https://nodejs.org/en/download)
- Um banco de dados relacional: MySQL, PostgreSQL, ...

---

## 📂 Como baixar o projeto

```bash 
  # Clonar o projeto
  $ git clone https://github.com/murilo2001/upper-fi.git
````

```bash 
  # Acessar os diretórios
  $ cd upper-fi/backend
  $ cd upper-fi/frontend
````

```bash 
  # Instale as dependências dentro do diretório frontend e backend, caso usar npm
  $ npm install
````

<p align="center">ou</p>

```bash 
  # Instale as dependências dentro do diretório frontend e backend, caso usar yarn
  $ yarn start
````
---

## 🔧 Como configurar o projeto

```bash 
  # Dentro do diretório upper-fi/backend/src/config crie 2 arquivos e modifique-os de acordo com os dados de conexão do seu banco.
  1) database.js
    module.exports = {
      host: 'localhost',
      username: 'root',
      password: '',
      database: 'nome_base_dados',
      dialect: 'mysql',
      define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
      },
    }; 

  2) knex-database.js
    const knex = require('knex')({
      client: 'mysql2',
      connection: {
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'nome_base_dados'
      }
    });
    module.exports = knex;
````

```bash 
  # Dentro do diretório upper-fi/backend digite os seguintes comandos
  $ npx sequelize-cli db:create (Para criar a base de dados)
  $ npx sequelize-cli db:migrate (Para executar as migrations)
````
```bash 
  # Para inicar o servidor local da aplicação e deixa-lá online digite
  $ npm run serve (dentro do diretório upper-fi/frontend)
  $ npm start (dentro do diretório upper-fi/backend)
````
---
## 📄 Licença
Este projeto está sob a [MIT license](https://opensource.org/licenses/MIT). Veja o arquivo LICENÇA para maiores detalhes.
