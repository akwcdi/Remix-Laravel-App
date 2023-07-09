import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import styles from "front-end/app/styles/index.css";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const indexlinks: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Remix - Todo</h1>
      <div className="mx-auto mt-16 max-w-7xl text-center">
        <Link to="/posts" className="text-xl text-blue-600 underline">
          Blog Posts
        </Link>
      </div>
      <Link to="/todo" className="text-xl text-blue-600 underline">
        Todo
      </Link>
    </div>
  );
}
