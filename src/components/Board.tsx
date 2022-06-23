import { useState } from "react";

import type { GameProps } from "../Game";
import { apiUrl } from "../Constants";
import { AudioContext } from "../Context";
import GameMap from "./GameMap";
import Controls from "./Controls";
import CardWrapper from "./CardWrapper";

export default function Board(props: GameProps) {
  const [playAudio, setPlayAudio] = useState(
    localStorage.getItem("playAudio") == "true"
  );

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
    navigator.sendBeacon(`${apiUrl}/games/justus/${props.matchID}/leave`, blob);
  });

  return (
    <AudioContext.Provider value={{ playAudio, setPlayAudio }}>
      <div className="flex bg-justusbgold flex-col md:flex-row sm:overflow-visible md:h-screen">
        <GameMap {...props} />
        <Controls {...props} />
        {[
          props.G.showChoiceQuestion,
          props.G.showPolarQuestion,
          props.G.showOpenQuestion,
          props.G.showGroupQuestion,
          props.G.showEvent,
        ].includes(true) && <CardWrapper {...props} />}
      </div>
    </AudioContext.Provider>
  );
}
