import { KeyboardEventHandler } from "react";
import "./QuestionCard.css";

export const ChoiceQuestion = (props: {
  question: ChoiceQuestion;
  closePopup: () => void;
}) => {
  props.question.options;
  return (
    <div className="flex-wrap flex-box">
      <span className="regular-dot points-dot border fix-centered"></span>
      <div
        id="first"
        className="choice left box border"
        onClick={props.closePopup}
      >
        {props.question.options[0]}
      </div>
      <div
        id="second"
        className="choice right box border"
        onClick={props.closePopup}
      >
        {props.question.options[1]}
      </div>
      <div
        id="second"
        className="choice left lower box border"
        onClick={props.closePopup}
      >
        {props.question.options[2]}
      </div>{" "}
      <div
        id="second"
        className="choice right lower box border"
        onClick={props.closePopup}
      >
        {props.question.options[3]}
      </div>
    </div>
  );
};
