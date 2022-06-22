import type { GameProps } from "../Game";
import GameMap from "./GameMap";
import Controls from "./Controls";
import CardWrapper from "./CardWrapper";

export default function Board(props: GameProps) {
  // super hacky shit
  window.addEventListener("beforeunload", () => {
    const blob = new Blob(
      [
        JSON.stringify({
          playerID: props.playerID,
          credentials: props.credentials,
        }),
      ],
      { type: "application/json" }
    );
    navigator.sendBeacon(
      `http${import.meta.env.DEV ? "" : "s"}://${window.location.hostname}${
        import.meta.env.DEV ? ":3001" : ""
      }/games/justus/${props.matchID}/leave`,
      blob
    );
  });

  return (
    <div className="flex bg-yellow-50">
      <GameMap {...props} />
      <Controls {...props} />
      {props.ctx.currentPlayer == props.playerID &&
        (props.G.showPolarQuestion ||
          props.G.showChoiceQuestion ||
          props.G.showOpenQuestion) && <CardWrapper {...props} />}
    </div>
  );
}
