import { shuffle } from "fast-shuffle";

import { GameProps } from "../Game";
import { QButton } from "./CardWrapper";

export default function GQuestion(props: GameProps) {
  const question = props.G.cGroupQuestion!;
  return (
    <div
      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
      className="bg-qCbg p-10 rounded-2xl w-2/3"
    >
      <div className="text-white font-bold mx-6 text-2xl text-center">
        {question.question}
      </div>
      <div className="flex justify-center items-center mt-10 flex-column space-y-7">
        {shuffle([question.options[0], ...[]]).map((option) => (
          <QButton
            onClick={() => props.moves.answer(option, question.options[0])}
            text={option}
          />
        ))}
      </div>
    </div>
  );
}
