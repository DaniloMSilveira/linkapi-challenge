## :page_facing_up: Descrição
Foi desenvolvido uma API RESTful capaz de realizar a integração das negociações do sistema CRM [Pipedrive](https://www.pipedrive.com/pt) com status "ganho" para o sistema ERP [Bling](https://www.bling.com.br/)

O web service também é capaz de incluir um resumo dessas negociações dentro de um banco de dados NoSQL [MongoDb](https://www.mongodb.com/pt-br)

## 🛠 Tecnologias
Este projeto foi desenvolvido com as seguintes tecnologias

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Jest](https://jestjs.io/pt-BR/)
- [Javascript](https://pt.wikipedia.org/wiki/JavaScript)


## :dollar: Como utilizar o integrador?
- Primeiro é preciso criar uma conta para o sistema do Pipedrive e também para o sistema do Bling
- Depois é preciso gerar as API Token em ambos sistemas 
  - Guia para gerar no [Pipedrive](https://support.pipedrive.com/pt/article/how-can-i-find-my-personal-api-key)
  - Guia para gerar no [Bling](https://ajuda.bling.com.br/hc/pt-br/articles/360035558634-Usu%C3%A1rio-e-Usu%C3%A1rio-API)
 - Logo após é preciso gerar um novo negócio no Pipedrive e alterar seu status para [ganho](https://support.pipedrive.com/pt/article/deals-what-they-are-and-how-to-add-them)
 - Agora basta executar o método POST para: http://localhost:3000/integrateDeals (não é necessário parâmetros, essa execução irá integrar as últimas negociações sem repetir ID)

## :closed_book: Instalando dependências e rodando a API

```bash
# Clone este repositório.
$ git clone https://github.com/DaniloMSilveira/linkapi-challenge.git

# Instale as dependências
# NPM
$ npm i 
# YARN
$ yarn

# Para executar os testes com Jest
# NPM
$ npm run test
# YARN
$ yarn test

# Execute a aplicação
# NPM
$ npm run start
# YARN
$ yarn start
 
# O app vai está rodando na porta 3000 - http://localhost:3000

# Utilizando a request para integrar as negociações
type: "POST",
url: "http://localhost:3000/integrateDeals"

# Utilizando a request para obter as oportunidades inseridas na collection do MongoDB:
type: "GET",
url: "http://localhost:3000/opportunities",
query: {
  startDate: 2021-08-04 # Data início do intervalo de busca, seguindo o formato YYYY-MM-DD
  endDate: 2021-08-05 # Data final do intervalo de busca, seguindo o formato YYYY-MM-DD
}
```

## :man: Autor
Feito com ❤️ por Danilo Martin
