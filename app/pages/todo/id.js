import { html } from "presta/html";
import { prisma } from "../../db";
import { css, redirect } from "../../utils";

export const route = "/todo/:id";

const styles = css`
  .todo {
    padding: 20px;
  }

  .todo h2 {
    font-size: 40px;
  }

  .todo form input {
    padding: 15px;
    border-radius: 4px;
    background-color: var(--grey-100);
    border: 1px solid var(--color);
    font-weight: bold;
  }
`;

async function handlePost(props) {
  await prisma.todo.update({
    where: {
      id: Number(props.params.id),
    },
    data: {
      done: true,
    },
  });

  return redirect(`/todo/${props.params.id}`);
}

export async function handler(props) {
  if (props.method.toLowerCase() === "post" && !!props.params.id) {
    return await handlePost(props);
  }

  const todo = await prisma.todo.findUnique({
    where: {
      id: Number(props.params.id),
    },
  });

  return {
    links: [{ rel: "stylesheet", href: styles }],
    html: `
      <div class="todo">
        <p>You are looking at todo ${props.params.id}</p>
        
        <h2>${todo.title}</h2>

        <form method="post">
          <input type="submit" value="Mark this todo as done!" />
        </form>
      </div>
    `,
  };
}
