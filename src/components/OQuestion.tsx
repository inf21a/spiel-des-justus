import {
  useState,
  useEffect,
  useRef,
  MutableRefObject,
  KeyboardEventHandler,
} from "react";
import questions from "../../assets/questions.json";
import { shuffle } from "fast-shuffle";

export default function OQuestion(props: {
  random: any;
  answer: (question: OpenQuestion, submittedAnswer: string) => void;
}) {
  //let question: MutableRefObject<OpenQuestion> = useRef(shuffle(questions.open)[0]);
  let question: OpenQuestion = shuffle(questions.open)[0];

  useEffect(() => {}, []);

  const [answer, setAnswer] = useState("");

  function handleAnswerChange(newAnswer: string) {
    setAnswer(newAnswer);
  }

  function submit() {
    question = shuffle(questions.open)[0];
    props.answer(question, answer);
  }

  const keypressHandler: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      let temp: string = (event.target as any).value;
      props.answer(question, temp);
    }
  };

  return (
    <div
      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
      className="bg-qCbg p-10 rounded-2xl w-2/3"
    >
      <div className="text-white font-bold mx-6 text-2xl text-center">
        {question!.question}
      </div>
      <div className="mx-6 mt-10 flex">
        <input
          type="text"
          className="bg-transparent border-white border rounded-lg p-4 outline-none caret-white text-white placeholder:text-white font-medium placeholder:font-normal w-full"
          placeholder="Deine Antwort"
          onKeyUp={keypressHandler}
        />
        <button
          disabled={true}
          onClick={submit}
          className="text-white ml-4 bg-qCB p-4 rounded-lg hover:bg-qCBH transition duration-150 disabled:bg-qCBD"
        >
          Antworten
        </button>
      </div>
    </div>
  );
}
