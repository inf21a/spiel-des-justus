import React from "react";
import ReactDOM from "react-dom";
import { Lobby, Client } from "boardgame.io/react";

import Board from "./components/Board";
import GameLobby from "./components/GameLobby";
import Loading from "./components/Loading";
import { QuitGameContext } from "./Context";

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
      clientFactory={(args) => Client({ ...args, loading: Loading })}
      renderer={(args) => {
        if (args.runningMatch)
          return (
            <QuitGameContext.Provider
              value={async (matchID: string) => {
                args.handleExitMatch();
                await args.handleLeaveMatch("justus", matchID);
              }}
            >
              <args.runningMatch.app
                matchID={args.runningMatch.matchID}
                playerID={args.runningMatch.playerID}
                credentials={args.runningMatch.credentials}
              />
            </QuitGameContext.Provider>
          );
        return <GameLobby {...args} />;
      }}
    />
  </React.StrictMode>,
  document.getElementById("root")!
);
