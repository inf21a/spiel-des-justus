import { shuffle } from "fast-shuffle";
import { useEffect, useState } from "react";
import { apiUrl } from "../Constants";

import { GameProps } from "../Game";
import { QButton } from "./CardWrapper";

export default function GQuestion(props: GameProps) {
  const [groupQuestions, setGroupQuestions] = useState<Array<string>>([]);

  useEffect(() => {
    if (!props.G.waitingForGroupAnswers) {
      fetch(`${apiUrl}/group-answers/${props.matchID}`)
        .then((res) => res.json())
        .then(({ answers }) =>
          setGroupQuestions(shuffle([question.options[0], ...answers]))
        );
    }
  }, [props.G.waitingForGroupAnswers]);

  const question = props.G.cGroupQuestion!;

  return (
    <div
      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
      className="bg-qCbg p-10 rounded-2xl md:w-2/3 w-full"
    >
      {props.G.waitingForGroupAnswers ? (
        <div className="text-white font-bold mx-6 md:text-3xl text-lg text-center">
          <p>Gruppenfrage!</p>
          <p>Warte auf Antworten der anderen Spieler...</p>
        </div>
      ) : (
        <>
          <div className="text-white font-bold mx-6 md:text-2xl text-center">
            {question.question}
          </div>
          <div className="flex justify-center items-center mt-10 flex-column space-y-7">
            {groupQuestions.map((option) => (
              <QButton
                key={option}
                onClick={() => {
                  props.moves.answer(option, question.options[0]);
                  fetch(`${apiUrl}/group-answers/${props.matchID}`, {
                    method: "DELETE",
                  });
                }}
                text={option}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
