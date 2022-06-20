import { BoardProps } from "boardgame.io/react";
import { useEffect } from "react";

import type { JustusGameState } from "../Game";
import * as Constants from "../Constants";
import Controls from "./Controls";
import BoardView from "./BoardView";
import questions from "../assets/questions.json";

import "../tiles.css";
import { PolarQuestion } from "../QuestionCards/PolarQuestion";
import { OpenQuestion } from "../QuestionCards/OpenQuestion";
import { ChoiceQuestion } from "../QuestionCards/ChoiceQuestion";

export interface PState {
  top: string;
  left: string;
}

const Board = (props: BoardProps<JustusGameState>) => {
  const p1S = Constants.TILES[props.G.playerState[0].position];
  const p2S = Constants.TILES[props.G.playerState[1].position];
  const p3S = Constants.TILES[props.G.playerState[2].position];
  const p4S = Constants.TILES[props.G.playerState[3].position];
  const p5S = Constants.TILES[props.G.playerState[4].position];
  const p6S = Constants.TILES[props.G.playerState[5].position];

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
      </div>
      <div className="w-2/5 border-l-2">
        <Controls rollDice={props.moves.rollDice} />
      </div>
      {props.G.showPolarQuestion && (
        <PolarQuestion
          answer={props.moves.answer}
          random={props.ctx.random}
        ></PolarQuestion>
      )}
      {props.G.showChoiceQuestion && (
        <ChoiceQuestion
          answer={props.moves.answer}
          random={props.ctx.random}
        ></ChoiceQuestion>
      )}
      {props.G.showOpenQuestion && (
        <OpenQuestion
          answer={props.moves.answer}
          random={props.ctx.random}
        ></OpenQuestion>
      )}
      {props.G.showGroupQuestion && (
        <OpenQuestion
          answer={props.moves.answer}
          random={props.ctx.random}
        ></OpenQuestion>
      )}
    </div>
  );
};

export default Board;
