import { useRef, useState } from "react";
import stringSimilarity from "string-similarity-js";
import { ResultWrapper } from "./ResultWrapper";

export default function OQuestion(props: {
  question: OpenQuestion;
  answer: (result: number) => void;
}) {
  const [input, setInput] = useState("");
  const [showCorrect, setShowCorrect] = useState<boolean | null>(null);

  function submit() {
    let result = 0;
    let counter = 0;
    let answers: Array<string> = input.replaceAll(" ", "").split(",");
    let options = props.question.options.map((elem) => elem);

    for (let answer of answers) {
      let highestSim = 0;
      let highestIndex = -1;
      for (let i = 0; i < options.length; i++) {
        let currentSim = stringSimilarity(
          answer.toLowerCase(),
          options[i].replaceAll(" ", "").toLowerCase()
        );
        if (highestSim < currentSim) {
          highestSim = currentSim;
          highestIndex = i;
        }
      }

      result += highestSim;

      if (highestIndex != -1) {
        options.splice(highestIndex, 1);
      }
      if (++counter == props.question.amount) {
        break;
      }
    }
    if (result >= props.question.amount * 0.9) {
      setShowCorrect(true);
    } else {
      setShowCorrect(false);
    }
    setTimeout(() => {
      props.answer(result);
      setShowCorrect(null);
    }, 2500);
  }

  return (
    <div
      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
      className="bg-qCbg p-10 rounded-2xl md:w-2/3 w-full"
    >
      <div className="text-white font-bold mx-6 md:text-2xl text-center">
        {props.question.question}
      </div>
      {showCorrect == null ? (
        <div className="mx-6 md:mt-10 mt-5 flex">
          <input
            type="text"
            className="bg-transparent border-white border rounded-lg p-4 outline-none caret-white text-white placeholder:text-white font-medium placeholder:font-normal w-full"
            placeholder="Deine Antwort"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => event.key == "Enter" && submit()}
            autoFocus
          />
          <button
            onClick={submit}
            className="text-white ml-4 bg-qCB p-4 rounded-lg hover:bg-qCBH transition duration-150 disabled:bg-qCBD"
          >
            Antworten
          </button>
        </div>
      ) : (
        <ResultWrapper
          showCorrect={showCorrect}
          text={props.question.options.join(", ")}
        ></ResultWrapper>
      )}
    </div>
  );
}
