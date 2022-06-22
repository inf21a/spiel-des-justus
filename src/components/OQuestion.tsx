export default function OQuestion(props: {
  question: OpenQuestion;
  answer: (submittedAnswer: string) => void;
}) {
  function submit() {
    props.answer(
      (document.getElementById("open-question-answer") as any).value
    );
  }

  return (
    <div
      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
      className="bg-qCbg p-10 rounded-2xl w-2/3"
    >
      <div className="text-white font-bold mx-6 text-2xl text-center">
        {props.question.question}
      </div>
      <div className="mx-6 mt-10 flex">
        <input
          id="open-question-answer"
          type="text"
          className="bg-transparent border-white border rounded-lg p-4 outline-none caret-white text-white placeholder:text-white font-medium placeholder:font-normal w-full"
          placeholder="Deine Antwort"
        />
        <button
          onClick={submit}
          className="text-white ml-4 bg-qCB p-4 rounded-lg hover:bg-qCBH transition duration-150 disabled:bg-qCBD"
        >
          Antworten
        </button>
      </div>
    </div>
  );
}
