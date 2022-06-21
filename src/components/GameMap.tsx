import { GameProps } from "../Game";

import "./GameMap.css";

import board from "../../assets/board.svg";

import avatar1 from "../../assets/avatar1.svg";
import avatar2 from "../../assets/avatar2.svg";
import avatar3 from "../../assets/avatar3.svg";
import avatar4 from "../../assets/avatar4.svg";
import avatar5 from "../../assets/avatar5.svg";
import avatar6 from "../../assets/avatar6.svg";

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

const tiles = [
  { top: "86.7%", left: "77.6%" },
  { top: "82%", left: "77.6%" },
  { top: "77.5%", left: "76.5%" },
  { top: "77.1%", left: "69%" },
  { top: "76.5%", left: "62%" },
  { top: "72.1%", left: "60.8%" },
  { top: "67.5%", left: "60.8%" },
  { top: "63%", left: "62%" },
  { top: "62%", left: "68.5%" },
  { top: "57.5%", left: "69.7%" },
  { top: "53.3%", left: "68.7%" },
  { top: "52.7%", left: "61.3%" },
  { top: "52.7%", left: "53.3%" },
  { top: "52.7%", left: "45.2%" },
  { top: "53.2%", left: "38%" },
  { top: "57.2%", left: "35.6%" },
  { top: "57.8%", left: "28.5%" },
  { top: "57%", left: "21%" },
  { top: "52.8%", left: "20%" },
  { top: "48%", left: "20%" },
  { top: "43.2%", left: "20%" },
  { top: "39%", left: "21%" },
  { top: "38.3%", left: "28.3%" },
  { top: "38.9%", left: "35.7%" },
  { top: "42.8%", left: "38%" },
  { top: "43.5%", left: "45.2%" },
  { top: "43.5%", left: "53.3%" },
  { top: "43%", left: "60.4%" },
  { top: "39%", left: "60.8%" },
  { top: "37.5%", left: "54%" },
  { top: "33.8%", left: "54%" },
  { top: "33.2%", left: "61.2%" },
  { top: "33.2%", left: "69.5%" },
  { top: "33.2%", left: "77.5%" },
  { top: "32.6%", left: "84.5%" },
  { top: "28.8%", left: "86.8%" },
  { top: "27.5%", left: "93.5%" },
  { top: "23.5%", left: "93.5%" },
  { top: "22.8%", left: "86.3%" },
  { top: "23.5%", left: "78.5%" },
  { top: "27.3%", left: "76.5%" },
  { top: "28%", left: "69.5%" },
  { top: "28%", left: "61.2%" },
  { top: "27.5%", left: "54%" },
  { top: "23%", left: "53%" },
  { top: "18.3%", left: "53%" },
  { top: "13.6%", left: "53%" },
  { top: "9%", left: "53%" },
  { top: "4.3%", left: "53%" },
];

export default function GameMap(props: GameProps) {
  return (
    <div className="border-yellow-500 border-8 rounded-3xl relative w-2/3">
      <img className="rounded-2xl" src={board} alt="Spielbrett" />
      {Array(48)
        .fill(0)
        .map((_, i) => (
          <div id={`f${i + 1}`} key={i} className="tile" />
        ))}
      {props.G.players.map((player, i) => (
        <div
          id={`p${i + 1}`}
          key={i}
          className="justus"
          style={{top: "calc("+tiles[player.position].top+ " + " + i * 0.2 + "%)",
            left: "calc("+tiles[player.position].left+ " - " + i * 0.4 + "%)"}}
        >
          <img src={avatars[i]} />
        </div>
      ))}
    </div>
  );
}
