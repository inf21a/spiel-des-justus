import "./QuestionCard.css";
import questions from "../../assets/questions.json";
import { shuffle } from "fast-shuffle";

export default function ChoiceQuestion(props: {
  random: any;
  answer: (question: ChoiceQuestion, submittedAnswer: string) => void;
}) {
  let question: ChoiceQuestion = shuffle(questions.choice)[0];
  question.answer = question.options[0];
  question.options = shuffle(question.options);

  return (
    <div className="popup fix-centered">
      <div className="question box border">
        <p>{question.question}</p>
      </div>
      <div className="flex-wrap flex-box">
        <span className="regular-dot points-dot border fix-centered"></span>
        <div
          id="first"
          className="choice left box border"
          onClick={() => props.answer(question, question.options[0])}
        >
          {question.options[0]}
        </div>
        <div
          id="second"
          className="choice right box border"
          onClick={() => props.answer(question, question.options[1])}
        >
          {question.options[1]}
        </div>
        <div
          id="second"
          className="choice left lower box border"
          onClick={() => props.answer(question, question.options[2])}
        >
          {question.options[2]}
        </div>{" "}
        <div
          id="second"
          className="choice right lower box border"
          onClick={() => props.answer(question, question.options[3])}
        >
          {question.options[3]}
        </div>
      </div>
    </div>
  );
}
