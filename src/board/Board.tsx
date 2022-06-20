import { BoardProps } from "boardgame.io/react";
import { useState, useEffect } from "react";

import type { JustusGameState } from "../Game";
import * as Constants from "../Constants";
import Controls from "./Controls";
import BoardView from "./BoardView";

import "../tiles.css";

export interface PState {
  top: string;
  left: string;
}

const Board = (props: BoardProps) => {
    const p1S = Constants.TILES[props.G.playerState[0].position]
    const p2S = Constants.TILES[props.G.playerState[1].position]
    const p3S = Constants.TILES[props.G.playerState[2].position]
    const p4S = Constants.TILES[props.G.playerState[3].position]
    const p5S = Constants.TILES[props.G.playerState[4].position]
    const p6S = Constants.TILES[props.G.playerState[5].position]

  useEffect(() => {}, []);

  return (
    <div className="flex">
      <div className="flex justify-center w-3/5">
        <BoardView
          p1S={p1S}
          p2S={p2S}
          p3S={p3S}
          p4S={p4S}
          p5S={p5S}
          p6S={p6S}
        />
        <button
          onClick={() => {
              props.moves.rollDice();
              console.log(props.ctx.currentPlayer, props.G);
          }}
        >
            {props.G.playerState[props.ctx.currentPlayer]?props.G.playerState[props.ctx.currentPlayer].position:"Bitte würfeln"}
        </button>
      </div>
      <div className="w-2/5 border-l-2">
        <Controls />
      </div>
    </div>
  );
};

export default Board;
