import { GameProps } from "../Game";
import CQuestion from "./CQuestion";
import PQuestion from "./PQuestion";
import OQuestion from "./OQuestion";
import GQuestion from "./GQuestion";
import EventCard from "./EventCard";

export function QButton(props: { text: string; onClick: any }) {
  return (
    <button
      style={{
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
      className="bg-qCB hover:bg-qCBH transition duration-150 p-4 rounded-xl h-28 flex items-center justify-center w-full max-w-xs"
      onClick={props.onClick}
    >
      <div className="text-white font-bold">{props.text}</div>
    </button>
  );
}

export default function CardWrapper(props: GameProps) {
  return (
    <>
      <div className="bg-white/10 fixed w-2/3 h-screen backdrop-blur-sm" />
      <div
        style={{ minWidth: "65.54%" }}
        className="fixed flex h-screen w-2/3 items-center justify-center"
      >
        {props.G.showPolarQuestion && (
          <PQuestion
            question={props.G.cPolarQuestion!}
            answer={props.moves.answer}
          />
        )}
        {props.G.showChoiceQuestion && (
          <CQuestion
            question={props.G.cChoiceQuestion!}
            answer={props.moves.answer}
          />
        )}
        {props.G.showOpenQuestion && (
          <OQuestion
            question={props.G.cOpenQuestion!}
            answer={props.moves.answer}
          />
        )}
        {props.G.showGroupQuestion && <GQuestion {...props} />}
        {props.G.showEvent && (
          <EventCard
            justusEvent={props.G.cEvent}
            acceptEvent={props.moves.acceptEvent}
          />
        )}
      </div>
    </>
  );
}
