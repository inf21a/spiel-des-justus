import "./QuestionCard.css";
import questions from "../../assets/questions.json";
import { shuffle } from "fast-shuffle";

export default function PolarQuestion(props: {
  random: any;
  answer: (question: PolarQuestion, submittedAnswer: boolean) => void;
}) {
  let question: PolarQuestion = shuffle(questions.polar)[0];

  return (
    <div className="popup fix-centered">
      <div className="question box border">
        <p>{question.question}</p>
      </div>
      <div className="flex-box">
        <span className="regular-dot points-dot border fix-centered"></span>
        <div
          className="left polar-answer box border"
          onClick={() => props.answer(question, true)}
        >
          Richtig
        </div>
        <div
          className="right polar-answer box border"
          onClick={() => props.answer(question, false)}
        >
          Falsch
        </div>
      </div>
    </div>
  );
}
