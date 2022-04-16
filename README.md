# Clone do Twitter

## Funcionalidades

- Criar uma conta com nome, email, handle
- Publicar tweets de até 200 caracteres
- Curtir tweets
- Responder tweets com outro tweet
- Seguir pessoas
- Acessar a tua própria timeline

## Tecnologias

- React
- Next.js
- Node.js
- PostgreSQL
- Prisma
- Jest
- Cypress
- Tailwind CSS

## Para rodar

`npm run dev`

## Subir banco de dados

```
docker-compose up db
```

## Carrega variaveis a seed e inicia o prisma studio

```
npx prisma db seed
npx prisma studio
```

## Tarefas

#### Criar a página do tweet

**Regras de negócio**

- Cada tweet seja clicável independente de onde estiver - feito
- Quando clicar num tweet, deve redirecionar para a página do tweet - feito
- Deve ser possível responder ao tweet apenas se o usuário estiver autenticado - talvez
- Quando responder ao tweet, deve ser recarregado a lista de respostas do tweet original
- Listar tweets que são resposta a um determinado tweet (usar o replyToTweetId) - quase
- Colocar um contador de respostas ao tweet - feito, mas não incrementa
