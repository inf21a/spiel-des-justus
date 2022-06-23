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
      body: JSON.stringify({ answer }),
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
      <div className="text-white font-bold mx-6 text-2xl text-center">
        Frage für {props.matchData![parseInt(props.ctx.currentPlayer)].name}:{" "}
        {question.question}
      </div>
      <div className="text-white font-bold mx-6 text-2xl text-center">
        Richtige Antwort: {question.options[0]}
      </div>
      <div className="mx-6 flex">
        <input
          type="text"
          className="bg-transparent border-white border rounded-lg p-4 outline-none caret-white text-white placeholder:text-white font-medium placeholder:font-normal w-full"
          placeholder="Deine Antwort"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          onKeyDown={(event) => event.key == "Enter" && submit()}
        />
        <button
          onClick={submit}
          className="text-white ml-4 bg-qCB p-4 rounded-lg hover:bg-qCBH transition duration-150 disabled:bg-qCBD"
        >
          Antwort hinzufügen
        </button>
      </div>
    </div>
  );
}
