import { QButton } from "./CardWrapper";
import { shuffle } from "fast-shuffle";
import { useState } from "react";
import { ResultWrapper } from "./ResultWrapper";

export default function CQuestion(props: {
  question: ChoiceQuestion;
  answer: (submittedAnswer: string, correctAnswer: string) => void;
}) {
  const [showCorrect, setShowCorrect] = useState<boolean | null>(null);
  const correctAnswer = props.question.options[0];
  let options = shuffle(props.question.options);

  const submit = (submittedAnswer: string) => {
    if (submittedAnswer == correctAnswer) {
      setShowCorrect(true);
    } else {
      setShowCorrect(false);
    }
    setTimeout(() => {
      setShowCorrect(null);
      props.answer(submittedAnswer, correctAnswer);
    }, 2500);
  };

  return (
    <div
      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
      className="bg-qCbg p-10 rounded-2xl w-2/3"
    >
      <div className="text-white font-bold mx-6 text-2xl text-center">
        {props.question.question}
      </div>
      {showCorrect == null ? (
        <div className="flex justify-center items-center mt-10">
          <div className="space-y-7">
            <QButton onClick={() => submit(options[0])} text={options[0]} />
            <QButton onClick={() => submit(options[1])} text={options[1]} />
          </div>
          <div className="text-center m-6 text-white text-xl font-bold">
            10
            <br />
            Punkte
          </div>
          <div className="space-y-7">
            <QButton onClick={() => submit(options[2])} text={options[2]} />
            <QButton onClick={() => submit(options[3])} text={options[3]} />
          </div>
        </div>
      ) : (
        <ResultWrapper
          showCorrect={showCorrect}
          text={correctAnswer}
        ></ResultWrapper>
      )}
    </div>
  );
}
