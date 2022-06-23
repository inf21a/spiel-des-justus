import { shuffle } from "fast-shuffle";
import { useEffect, useState } from "react";
import { apiUrl } from "../Constants";

import { GameProps } from "../Game";
import { QButton } from "./CardWrapper";
import { ResultWrapper } from "./ResultWrapper";

export default function GQuestion(props: GameProps) {
  const [groupQuestions, setGroupQuestions] = useState<Array<string>>([]);
  const [showCorrect, setShowCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (!props.G.waitingForGroupAnswers) {
      fetch(`${apiUrl}/group-answers/${props.matchID}`)
        .then((res) => res.json())
        .then(({ answers }) =>
          setGroupQuestions(shuffle([question.options[0], ...answers]))
        );
    }
  }, [props.G.waitingForGroupAnswers]);

  const submit = (submittedAnswer: string) => {
    if (submittedAnswer == question.options[0]) {
      setShowCorrect(true);
    } else {
      setShowCorrect(false);
    }
    setTimeout(() => {
      setShowCorrect(null);
      props.moves.answer(submittedAnswer, question.options[0]);
    }, 2500);
  };

  const question = props.G.cGroupQuestion!;

  return (
    <div
      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
      className="bg-qCbg p-10 rounded-2xl md:w-2/3 w-full"
    >
      {props.G.waitingForGroupAnswers ? (
        <div className="mx-6 md:text-3xl text-lg text-center">
          <p className="font-bold text-white">Gruppenfrage!</p>
          <p className="text-gray-200">
            Warte auf Antworten der anderen Spieler...
          </p>
        </div>
      ) : (
        <>
          <div className="text-white font-bold mx-6 md:text-2xl text-center">
            {question.question}
          </div>
          {showCorrect == null ? (
            <div className="flex justify-center items-center mt-10 flex-col space-y-7">
              {groupQuestions.map((option) => (
                <QButton
                  key={option}
                  onClick={() => {
                    fetch(`${apiUrl}/group-answers/${props.matchID}`, {
                      method: "DELETE",
                    });
                    submit(option);
                  }}
                  text={option}
                />
              ))}
            </div>
          ) : (
            <ResultWrapper
              showCorrect={showCorrect}
              text={question.options[0]}
            ></ResultWrapper>
          )}
        </>
      )}
    </div>
  );
}
