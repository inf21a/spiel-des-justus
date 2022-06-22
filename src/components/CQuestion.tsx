import { GameProps } from "../Game";
import { QButton } from "./CardWrapper";
import questions from "../../assets/questions.json";
import { shuffle } from "fast-shuffle";

export default function CQuestion(props: {
  random: any;
  answer: (question: ChoiceQuestion, submittedAnswer: string) => void;
}) {
  let question: ChoiceQuestion = shuffle(questions.choice)[0];
  question.answer = question.options[0];
  question.options = shuffle(question.options);

  return (
    <div
      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
      className="bg-qCbg p-10 rounded-2xl w-full"
    >
      <div className="text-white font-bold mx-6 text-2xl text-center">
        {question.question}
      </div>
      <div className="flex justify-center items-center mt-10">
        <div className="space-y-7">
          <QButton
            onClick={() => props.answer(question, question.options[0])}
            text={question.options[0]}
          />
          <QButton
            onClick={() => props.answer(question, question.options[1])}
            text={question.options[1]}
          />
        </div>
        <div className="text-center m-6 text-white text-xl font-bold">
          10
          <br />
          Punkte
        </div>
        <div className="space-y-7">
          <QButton
            onClick={() => props.answer(question, question.options[2])}
            text={question.options[2]}
          />
          <QButton
            onClick={() => props.answer(question, question.options[3])}
            text={question.options[3]}
          />
        </div>
      </div>
    </div>
  );
}
