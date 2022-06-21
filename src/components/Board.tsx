import type { GameProps } from "../Game";
import GameMap from "./GameMap";
import Controls from "./Controls";
import ChoiceQuestion from "./ChoiceQuestion";
import OpenQuestion from "./OpenQuestion";
import PolarQuestion from "./PolarQuestion";

export default function Board(props: GameProps) {
  return (
    <div className="flex justify-center">
      <GameMap {...props} />
      <Controls {...props} />{" "}
      {props.G.showPolarQuestion && (
        <PolarQuestion answer={props.moves.answer} random={props.ctx.random} />
      )}
      {props.G.showChoiceQuestion && (
        <ChoiceQuestion answer={props.moves.answer} random={props.ctx.random} />
      )}
      {props.G.showOpenQuestion && (
        <OpenQuestion answer={props.moves.answer} random={props.ctx.random} />
      )}
      {props.G.showGroupQuestion && (
        <OpenQuestion answer={props.moves.answer} random={props.ctx.random} />
      )}
    </div>
  );
}
