// TODO: different color
export default function EventCard(props: {
  justusEvent: JustusEvent | undefined;
  acceptEvent: () => void;
}) {
  function submit() {
    props.acceptEvent();
  }

  return (
    <div
      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
      className="bg-qCbg p-10 rounded-2xl md:w-2/3 w-full"
    >
      <div className="text-white font-bold mx-6 md:text-2xl text-center">
        {props.justusEvent!.message}
      </div>
      <div className="mx-6 mt-10 flex items-center justify-center">
        <button
          onClick={submit}
          className="text-white ml-4 bg-qCB p-4 rounded-lg hover:bg-qCBH transition duration-150 disabled:bg-qCBD"
        >
          Schließen
        </button>
      </div>
    </div>
  );
}
