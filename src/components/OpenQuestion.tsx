import { KeyboardEventHandler } from "react";
import "./QuestionCard.css";
import questions from "../../assets/questions.json";
import { shuffle } from "fast-shuffle";

export default function OpenQuestion(props: {
  random: any;
  answer: (question: OpenQuestion, submittedAnswer: string) => void;
}) {
  let question: OpenQuestion = shuffle(questions.open)[0];

  const keypressHandler: KeyboardEventHandler = (event) => {
    if (event.key === "Enter") {
      props.answer(question, "test");
    }
  };

  return (
    <div className="popup fix-centered">
      <div className="question box border">
        <p>{question.question}</p>
      </div>
      <div className="flex-box">
        <span className="points-dot one-answer-dot border fix-centered"></span>
        <div id="one-answer" className="box border">
          <input
            type={"text"}
            id={"one-answer-input"}
            name={"one-answer"}
            placeholder={"Hier Antwort eingeben"}
          />
        </div>
        <button onClick={() => props.answer(question, "test")}>close</button>
      </div>
    </div>
  );
}
