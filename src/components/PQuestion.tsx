import { QButton } from "./CardWrapper";

export default function PQuestion(props: {
  question: PolarQuestion;
  answer: (submittedAnswer: boolean) => void;
}) {
  return (
    <div
      style={{
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
      className="bg-qCbg p-10 rounded-2xl w-2/3"
    >
      <div className="text-white font-bold mx-6 text-2xl text-center">
        {props.question.question}
      </div>
      <div className="flex justify-center items-center mt-10">
        <div className="">
          <QButton onClick={() => props.answer(true)} text="Richtig👍" />
        </div>
        <div className="text-center m-6 text-white text-xl font-bold">
          10
          <br />
          Punkte
        </div>
        <div className="">
          <QButton onClick={() => props.answer(false)} text="Falsch👎" />
        </div>
      </div>
    </div>
  );
}
