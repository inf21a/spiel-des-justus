import React from "react";
import ReactDOM from "react-dom";

import { Client } from "boardgame.io/react";
import { Local } from "boardgame.io/multiplayer";

import { JustusGame as Game } from "./Game";
import Board from "./board/Board";

import "./index.css";

const JustusClient = Client({
  game: Game,
  board: Board,
  multiplayer: Local(),
});

const App = () =>{
    return <div>
        <JustusClient playerID={"0"}/>
        <JustusClient playerID={"1"}/>
    </div>
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")!
);
