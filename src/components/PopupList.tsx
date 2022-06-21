import { GameProps } from "../Game";
import ChoiceQuestion from "./ChoiceQuestion";
import OpenQuestion from "./OpenQuestion";
import PolarQuestion from "./PolarQuestion";

export default function PopupList(props: GameProps) {
  return (
    <>
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
    </>
  );
}
