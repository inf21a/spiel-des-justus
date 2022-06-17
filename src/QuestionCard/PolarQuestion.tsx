import { KeyboardEventHandler } from "react";
import "./QuestionCard.css";

export const PolarQuestion = (props: {
  question: PolarQuestion;
  closePopup: () => void;
}) => {
  return (
    <div className="flex-box">
      <span className="regular-dot points-dot border fix-centered"></span>
      <div className="left polar-answer box border" onClick={props.closePopup}>
        True
      </div>
      <div className="right polar-answer box border" onClick={props.closePopup}>
        False
      </div>
    </div>
  );
};
