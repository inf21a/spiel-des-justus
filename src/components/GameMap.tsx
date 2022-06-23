import { useRef, useEffect } from "react";
import { GameProps } from "../Game";

import "./GameMap.css";

import board from "../../assets/board_normal.png";

import avatar1 from "../../assets/avatar1.svg";
import avatar2 from "../../assets/avatar2.svg";
import avatar3 from "../../assets/avatar3.svg";
import avatar4 from "../../assets/avatar4.svg";
import avatar5 from "../../assets/avatar5.svg";
import avatar6 from "../../assets/avatar6.svg";

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

const tiles = [
  { top: "-23%", left: "77.6%" },
  { top: "-31%", left: "77.6%" },
  { top: "-38.5%", left: "76.5%" },
  { top: "-40%", left: "69%" },
  { top: "-41.5%", left: "62%" },
  { top: "-47.5%", left: "60.8%" },
  { top: "-57%", left: "60.8%" },
  { top: "-64%", left: "62%" },
  { top: "-67%", left: "68.5%" },
  { top: "-73%", left: "69.7%" },
  { top: "-80%", left: "68.7%" },
  { top: "-82%", left: "61.3%" },
  { top: "-82%", left: "53.3%" },
  { top: "-82%", left: "45.2%" },
  { top: "-81%", left: "38%" },
  { top: "-75%", left: "35.6%" },
  { top: "-73%", left: "28.5%" },
  { top: "-75%", left: "21%" },
  { top: "-81%", left: "20%" },
  { top: "-89%", left: "20%" },
  { top: "-97.5%", left: "20%" },
  { top: "-105%", left: "21%" },
  { top: "-106%", left: "28.3%" },
  { top: "-105%", left: "35.7%" },
  { top: "-98.5%", left: "38%" },
  { top: "-97.5%", left: "45.2%" },
  { top: "-97.6%", left: "53.3%" },
  { top: "-98.5%", left: "60.4%" },
  { top: "-104%", left: "60.8%" },
  { top: "-107%", left: "54%" },
  { top: "-114%", left: "54%" },
  { top: "-115%", left: "61.2%" },
  { top: "-115%", left: "69.5%" },
  { top: "-115%", left: "77.5%" },
  { top: "-116.5%", left: "84.5%" },
  { top: "-123%", left: "86.8%" },
  { top: "-125%", left: "93.5%" },
  { top: "-131%", left: "93.5%" },
  { top: "-132%", left: "86.3%" },
  { top: "-132%", left: "78.5%" },
  { top: "-125%", left: "76.5%" },
  { top: "-124%", left: "69.5%" },
  { top: "-124%", left: "61.2%" },
  { top: "-125%", left: "54%" },
  { top: "-132%", left: "53%" },
  { top: "-139%", left: "53%" },
  { top: "-147%", left: "53%" },
  { top: "-155.5%", left: "53%" },
  { top: "-164%", left: "53%" },
];

function debounce<T extends () => any>(fn: T, timeout: number): () => void {
  let ready = true;
  return () => {
    if (ready) {
      ready = false;
      setTimeout(() => (ready = true), timeout);
      fn();
    }
  };
}

export default function GameMap(props: GameProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(
    debounce(() => {
      if (
        !window.screen.orientation.type.startsWith("portrait") &&
        ref.current
      ) {
        ref.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }, 200)
  );

  return (
    <div className="border-yellow-500 border-8 rounded-3xl relative w-full md:w-2/3 md:m-4 md:mr-2 shadow-l md:overflow-scroll no-scrollbar">
      <img className="rounded-2xl sm:w-screen" src={board} alt="Spielbrett" />
      {Array(48)
        .fill(0)
        .map((_, i) => (
          <div id={`f${i + 1}`} key={i} className="tile" />
        ))}
      {props.G.players
        .filter((player) => player.position < tiles.length)
        .map((player, i) => (
          <div
            id={`p${i + 1}`}
            key={i}
            className="justus text-center flex items-center"
            style={{
              marginTop:
                "calc(" + tiles[player.position].top + " + " + i * 0.2 + "%)",
              marginLeft:
                "calc(" + tiles[player.position].left + " - " + i * 0.4 + "%)",
            }}
            ref={i.toString() == props.playerID ? ref : undefined}
          >
            <img src={avatars[i]} className="rounded-sm" />
            <p className="text-sm bg-white shadow p-0.5 rounded ml-2 relative">
              {props.matchData![i].name}
            </p>
          </div>
        ))}
    </div>
  );
}
