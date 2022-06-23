import { useState } from "react";
import { apiUrl } from "../Constants";
import { GameProps } from "../Game";

export default function GAnswerCreator(props: GameProps) {
  const [hidden, setHidden] = useState(false);
  const [answer, setAnswer] = useState("");
  const question = props.G.cGroupQuestion!;

  async function submit() {
    setHidden(true);
    const res = await fetch(`${apiUrl}/group-answers/${props.matchID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer: answer.trim() }),
    });
    const { count }: { count: number } = await res.json();
    props.moves.create(count);
  }

  return (
    <div
      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
      className="bg-qCbg p-10 rounded-2xl w-2/3 space-y-4"
      hidden={hidden}
    >
      <div className="mx-6 text-2xl text-center">
        <span className="text-gray-100">
          Frage für {props.matchData![parseInt(props.ctx.currentPlayer)].name}:{" "}
        </span>
        <span className="text-white font-bold">{question.question}</span>
      </div>
      <div className="mx-6 text-2xl text-center">
        <span className="text-gray-100">Richtige Antwort:</span>{" "}
        <span className="text-white font-bold">{question.options[0]}</span>
      </div>
      <div className="mx-6 flex">
        <input
          type="text"
          className="bg-transparent border-white border rounded-lg p-4 outline-none caret-white text-white placeholder:text-white font-medium placeholder:font-normal w-full"
          placeholder="Deine Antwort"
          value={answer}
          onChange={({ target: { value } }) => {
            if (value.length <= 50) setAnswer(value);
          }}
          onKeyDown={(event) =>
            event.key == "Enter" &&
            answer &&
            answer.trim() != props.G.cGroupQuestion?.options[0] &&
            submit()
          }
          autoFocus
        />
        <button
          onClick={submit}
          disabled={
            !answer || answer.trim() == props.G.cGroupQuestion?.options[0]
          }
          className="text-white ml-4 bg-qCB p-4 rounded-lg hover:bg-qCBH transition duration-150 disabled:bg-qCBD"
        >
          Antwort hinzufügen
        </button>
      </div>
    </div>
  );
}
