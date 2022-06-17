import { KeyboardEventHandler } from "react";
import "./QuestionCard.css";

export const OpenQuestion = (props: {
  question: OpenQuestion;
  closePopup: () => void;
}) => {
  const keypressHandler: KeyboardEventHandler = (event) => {
    if (event.code === "Enter") {
      props.closePopup();
    }
  };

  return (
    <div className="flex-box">
      <span className="points-dot one-answer-dot border fix-centered"></span>
      <div id="one-answer" className="box border">
        <input
          type={"text"}
          id={"one-answer-input"}
          name={"one-answer"}
          placeholder={"Hier Antwort eingeben"}
          onKeyDown={keypressHandler}
        />
      </div>
    </div>
  );
};
