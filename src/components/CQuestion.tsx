import { QButton } from "./CardWrapper";
import { shuffle } from "fast-shuffle";

export default function CQuestion(props: {
  question: ChoiceQuestion;
  answer: (submittedAnswer: string, correct: string) => void;
}) {
  let correct: string = props.question.options[0];
  let options = shuffle(props.question.options);

  return (
    <div
      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
      className="bg-qCbg p-10 rounded-2xl md:w-2/3 w-full"
    >
      <div className="text-white font-bold mx-6 md:text-2xl text-center">
        {props.question.question}
      </div>
      <div className="flex md:hidden flex-col mt-5 space-y-3">
        <QButton
          onClick={() => props.answer(options[0], correct)}
          text={options[0]}
        />
        <QButton
          onClick={() => props.answer(options[1], correct)}
          text={options[1]}
        />
        <QButton
          onClick={() => props.answer(options[2], correct)}
          text={options[2]}
        />
        <QButton
          onClick={() => props.answer(options[3], correct)}
          text={options[3]}
        />
      </div>
      <div className="md:flex justify-center items-center mt-10 hidden">
        <div className="space-y-7 flex flex-col w-1/3">
          <QButton
            onClick={() => props.answer(options[0], correct)}
            text={options[0]}
          />
          <QButton
            onClick={() => props.answer(options[1], correct)}
            text={options[1]}
          />
        </div>
        <div className="text-center m-6 text-white text-xl font-bold md:flex hidden">
          10
          <br />
          Punkte
        </div>
        <div className="space-y-7 flex flex-col w-1/3">
          <QButton
            onClick={() => props.answer(options[2], correct)}
            text={options[2]}
          />
          <QButton
            onClick={() => props.answer(options[3], correct)}
            text={options[3]}
          />
        </div>
      </div>
    </div>
  );
}
