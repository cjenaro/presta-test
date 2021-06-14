import { html } from "presta/html";
import { prisma } from "../../db";
import {
  extendChildrenLinks,
  renderChildrenHTML,
  bodyParams,
  redirect,
  isRedirect,
  css,
} from "../../utils";

const styles = css`
  aside {
    padding: 20px;
    display: block;
    background-color: #ffffff;
  }

  nav {
    display: grid;
    grid-template-columns: 100%;
    row-gap: 1rem;
  }

  nav a {
    text-decoration: none;
    padding: 10px;
    background-color: var(--grey-100);
    border-radius: 4px;
    color: currentColor;
    display: flex;
    justify-content: space-between;
  }

  nav a.done {
    text-decoration: line-through;
  }

  nav form {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    column-gap: 10px;
  }

  nav form input {
    background-color: var(--grey-100);
    border-radius: 4px;
    padding: 8px 12px;
    display: block;
    width: 100%;
    border: 1px solid var(--color);
  }

  nav form button {
    background-color: var(--grey-100);
    border-radius: 4px;
    border: 1px solid var(--color);
    cursor: pointer;
  }
`;

export const route = "/todo";

async function handlePost(props) {
  const body = bodyParams(props.body);

  if (!body.todo) {
    // here you would add the error to the session
    return redirect("/todo");
  }

  const newTodo = await prisma.todo.create({
    data: {
      title: body.todo,
      done: false,
    },
  });

  return redirect(`/todo/${newTodo.id}`);
}

export async function handler(props) {
  if (props.path === "/todo" && props.method.toLowerCase() === "post") {
    return await handlePost(props);
  }

  const todos = await prisma.todo.findMany();

  return (children) => {
    if (isRedirect(children)) return children;
    return {
      links: extendChildrenLinks(
        [{ rel: "stylesheet", href: styles }],
        children
      ),
      html: `
      <aside>
        <nav>
          ${todos
            .map(
              (todo) =>
                `<a class="${todo.done ? "done" : ""}" href="/todo/${
                  todo.id
                }"><span>${todo.title}</span><span>&rarr;</span></a>`
            )
            .join("")}
          <form method="post" action="/todo">
            <input type="text" name="todo" />
            <button type="submit">Add</button>
          </form>
        </nav>
      </aside>

      ${renderChildrenHTML(children)}
    `,
    };
  };
}
