import React from "react";
import ReactDOM from "react-dom";

import { Lobby } from "boardgame.io/react";

import Board from "./components/Board";
import { game } from "./Game";
import "./index.css";

const server = `http${import.meta.env.DEV ? "" : "s"}://${
  window.location.hostname
}${import.meta.env.DEV ? ":3001" : ""}`;

ReactDOM.render(
  <React.StrictMode>
    <Lobby
      gameServer={server}
      lobbyServer={server}
      gameComponents={[{ game, board: Board }]}
    />
  </React.StrictMode>,
  document.getElementById("root")!
);
