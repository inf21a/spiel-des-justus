import { QButton } from "./CardWrapper";
import questions from "../../assets/questions.json";
import { shuffle } from "fast-shuffle";

export default function PQuestion(props: {
  random: any;
  answer: (question: PolarQuestion, submittedAnswer: boolean) => void;
}) {
  let question: PolarQuestion = shuffle(questions.polar)[0];

  return (
    <div
      style={{
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
      className="bg-qCbg p-10 rounded-2xl"
    >
      <div className="text-white font-bold mx-6 text-2xl text-center">
        {question.question}
      </div>
      <div className="flex justify-center items-center mt-10">
        <div className="">
          <QButton
            onClick={() => props.answer(question, true)}
            text="Richtig👍"
          />
        </div>
        <div className="text-center m-6 text-white text-xl font-bold">
          10
          <br />
          Punkte
        </div>
        <div className="">
          <QButton
            onClick={() => props.answer(question, false)}
            text="Falsch👎"
          />
        </div>
      </div>
    </div>
  );
}
