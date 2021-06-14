import { html } from "presta/html";
import {
  renderChildrenHTML,
  isRedirect,
  css,
  extendChildrenLinks,
} from "../utils";
export const route = "/";

const styles = css`
  :root {
    --grey-100: #fafafa;
    --grey-200: #cacaca;
    --background-color: var(--grey-200);
    --color: #222222;
    --header-height: 80px;
    --footer-height: 100px;
  }

  body {
    margin: 0;
    padding: 0;
    height: 100vh;
    font-family: sans-serif;
    background-color: var(--background-color);
    color: var(--color);
    display: grid;
    grid-template-rows: auto 1fr auto;
  }

  header {
    background-color: var(--grey-100);
    padding: 20px;
    display: flex;
    align-items: center;
    height: var(--header-height);
  }

  header a {
    text-decoration: none;
    padding: 10px;
    border-radius: 4px;
    background-color: #ffffff;
    margin-right: 1em;
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    height: var(--footer-height);
    font-size: 14px;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  main {
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr;
    overflow: auto;
    height: calc(100vh - var(--footer-height) - var(--header-height));
  }

  @media (min-width: 700px) {
    main {
      grid-template-columns: 250px 1fr;
    }
  }
`;

export async function handler(props) {
  return (children) => {
    // if children is a redirect
    if (isRedirect(children)) return children;

    return html({
      head: {
        title: "Todos",
        link: extendChildrenLinks(
          [{ rel: "stylesheet", href: styles }],
          children
        ),
      },
      body: `
      <header>
        <a href="/">Home</a>
        <a href="/todo">Todos</a>
      </header>
      <main>
        ${renderChildrenHTML(children)}
      </main>
      <footer>
        This is a testing app
      </footer>
    `,
    });
  };
}
