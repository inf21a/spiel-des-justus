import React from "react";
import ReactDOM from "react-dom";

import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";

import { JustusGame as Game } from "./Game";
import Board from "./Board";

import "./index.css";

const App = Client({
  game: Game,
  board: Board,
  multiplayer: SocketIO(
    import.meta.env.DEV
      ? {
          server: "localhost:3001",
        }
      : {}
  ),
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")!
);
