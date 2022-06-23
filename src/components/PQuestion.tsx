import { useState } from "react";
import { QButton } from "./CardWrapper";
import { ResultWrapper } from "./ResultWrapper";

export default function PQuestion(props: {
  question: PolarQuestion;
  answer: (submittedAnswer: boolean) => void;
}) {
  const [showCorrect, setShowCorrect] = useState<boolean | null>(null);

  const submit = (submittedAnswer: boolean) => {
    if (submittedAnswer == props.question.answer) {
      setShowCorrect(true);
    } else {
      setShowCorrect(false);
    }
    setTimeout(() => {
      setShowCorrect(null);
      props.answer(submittedAnswer);
    }, 2500);
  };

  return (
    <div
      style={{
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
      className="bg-qCbg p-10 rounded-2xl md:w-2/3"
    >
      <div className="text-white font-bold mx-6 md:text-2xl text-center">
        {props.question.question}
      </div>
      {showCorrect == null ? (
        <>
          <div className="flex md:hidden flex-col mt-5 space-y-3">
            <QButton onClick={() => submit(true)} text="Richtig👍" />
            <QButton onClick={() => submit(false)} text="Falsch👎" />
          </div>
          <div className="md:flex justify-center items-center mt-10 hidden">
            <div className="w-1/3">
              <QButton onClick={() => submit(true)} text="Richtig👍" />
            </div>
            <div className="text-center m-6 text-white text-xl font-bold">
              1
              <br />
              Punkt
            </div>
            <div className="w-1/3">
              <QButton onClick={() => submit(false)} text="Falsch👎" />
            </div>
          </div>
        </>
      ) : (
        <ResultWrapper
          showCorrect={showCorrect}
          text={props.question.answer ? "Richtig" : "Falsch"}
        ></ResultWrapper>
      )}
    </div>
  );
}
