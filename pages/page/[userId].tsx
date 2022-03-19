import type { NextPageContext } from "next";

/**
 * Tarefas:
 * - Mostrar o nome do usuário
 * - Mostrar a foto do usuário
 * - Mostrar os tweets do usuário ordenado de forma decrescente de acordo com a data de criação
 */
export default function UserPage({ userId }) {
  console.log({ userId });
  return (
    <article>
      <h1>Página do Otávio</h1>
    </article>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const userId = ctx.query.userId;
  console.log({ userId });

  return {
    props: {
      userId,
    },
  };
}
