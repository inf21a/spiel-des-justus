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

const Board = (props: BoardProps<JustusGameState>) => {
  const [p1S, setp1S] = useState<PState>(Constants.TILES[0]);
  const [p2S, setp2S] = useState<PState>(Constants.TILES[0]);
  const [p3S, setp3S] = useState<PState>(Constants.TILES[0]);
  const [p4S, setp4S] = useState<PState>(Constants.TILES[0]);
  const [p5S, setp5S] = useState<PState>(Constants.TILES[0]);
  const [p6S, setp6S] = useState<PState>(Constants.TILES[0]);

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
            console.log(props.G.players[props.ctx.currentPlayer]);
            setp1S(Constants.TILES[props.G.players["0"].position]);
            setp2S(Constants.TILES[props.G.players["1"].position]);
          }}
        >
          Test
        </button>
      </div>
      <div className="w-2/5 border-l-2">
        <Controls />
      </div>
    </div>
  );
};

export default Board;
