# Clone do Twitter

## Funcionalidades

- Criar uma conta com nome, email, handle
- Publicar tweets de até 240 caracteres
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
``
npm run dev
``

## Subir banco de dados
```
docker-compose up db
```

## Carrega variaveis de .env e inicia o prisma studio

```
npx prisma db seed
npx prisma studio
```