# Movie API
Esta aplicação consiste no uso da API OMDbApi para buscar uma lista de filmes e seus detalhes. Foi desenvolvida utilizando NestJS e Typescript.

## Rodando o projeto
Antes de executar o projeto, será necessário criar uma conta e gerar uma API Key no seguinte serviço:<br>
https://www.omdbapi.com/

Instale as dependencias:
```shell
npm install
```

Prepare as variáveis de ambiente copiando a arquivo **.env.example** e subtituindo a variável **API_KEY** pela chave gerada anteriormente:
```shell
cp .env.example .env
```

Inicie a aplicação:
```shell
npm run start:dev
```

## Documentação
- `GET /movies` - Realiza uma busca de filmes utilizando os parâmetros query e page como query params.
- `GET /movies/:imdbID` - Busca os detalhes de um filme específico com base no seu imdbID.

## Testes automátizados
Para executar os testes automatizados, utilize o seguinte comando:
```shell
npm run test
```

Certifique-se de ter as dependências instaladas antes de executar os testes.

A documentação fornecida inclui as rotas disponíveis e os endpoints correspondentes para buscar filmes e detalhes específicos. Para executar o projeto, siga as instruções fornecidas na seção "Rodando o projeto" e verifique se as variáveis de ambiente foram configuradas corretamente.

Lembre-se de substituir a variável API_KEY no arquivo .env pela chave gerada no serviço OMDbApi para garantir o funcionamento correto da aplicação.