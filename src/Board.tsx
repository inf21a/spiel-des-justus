import { BoardProps } from "boardgame.io/react";
import { useState, useEffect } from "react";
import Spielbrett from "../assets/Spielbrett.svg";
import Avatar1 from "../assets/avatar1.svg";
import Avatar2 from "../assets/avatar2.svg";
import Avatar3 from "../assets/avatar3.svg";
import Avatar4 from "../assets/avatar4.svg";
import Avatar5 from "../assets/avatar5.svg";
import Avatar6 from "../assets/avatar6.svg";
import "./tiles.css";

interface PState {
  top: string;
  left: string;
}

interface TilePos {
  top: string;
  left: string;
}

// Array of all 49 tiles from tiles.css
const tiles: TilePos[] = [
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

const Board = (props: BoardProps) => {
  const [p1S, setp1S] = useState<PState>({ top: "0%", left: "0%" });
  const [p2S, setp2S] = useState<PState>({ top: "0%", left: "0%" });
  const [p3S, setp3S] = useState<PState>({ top: "0%", left: "0%" });
  const [p4S, setp4S] = useState<PState>({ top: "0%", left: "0%" });
  const [p5S, setp5S] = useState<PState>({ top: "0%", left: "0%" });
  const [p6S, setp6S] = useState<PState>({ top: "0%", left: "0%" });

  useEffect(() => {}, []);

  return (
    <div className="flex justify-center">
      <div className="border-yellow-300 w-2/3 my-32 border-8 rounded-3xl relative">
        <img className="rounded-2xl" src={Spielbrett} alt="Spielbrett" />
        <div id="f1" className="tile"></div>
        <div id="f2" className="tile"></div>
        <div id="f3" className="tile"></div>
        <div id="f4" className="tile"></div>
        <div id="f5" className="tile"></div>
        <div id="f6" className="tile"></div>
        <div id="f7" className="tile"></div>
        <div id="f8" className="tile"></div>
        <div id="f9" className="tile"></div>
        <div id="f10" className="tile"></div>
        <div id="f11" className="tile"></div>
        <div id="f12" className="tile"></div>
        <div id="f13" className="tile"></div>
        <div id="f14" className="tile"></div>
        <div id="f15" className="tile"></div>
        <div id="f16" className="tile"></div>
        <div id="f17" className="tile"></div>
        <div id="f18" className="tile"></div>
        <div id="f19" className="tile"></div>
        <div id="f20" className="tile"></div>
        <div id="f21" className="tile"></div>
        <div id="f22" className="tile"></div>
        <div id="f23" className="tile"></div>
        <div id="f24" className="tile"></div>
        <div id="f25" className="tile"></div>
        <div id="f26" className="tile"></div>
        <div id="f27" className="tile"></div>
        <div id="f28" className="tile"></div>
        <div id="f29" className="tile"></div>
        <div id="f30" className="tile"></div>
        <div id="f31" className="tile"></div>
        <div id="f32" className="tile"></div>
        <div id="f33" className="tile"></div>
        <div id="f34" className="tile"></div>
        <div id="f35" className="tile"></div>
        <div id="f36" className="tile"></div>
        <div id="f37" className="tile"></div>
        <div id="f38" className="tile"></div>
        <div id="f39" className="tile"></div>
        <div id="f40" className="tile"></div>
        <div id="f41" className="tile"></div>
        <div id="f42" className="tile"></div>
        <div id="f43" className="tile"></div>
        <div id="f44" className="tile"></div>
        <div id="f45" className="tile"></div>
        <div id="f46" className="tile"></div>
        <div id="f47" className="tile"></div>
        <div id="f48" className="tile"></div>
        <div id="f49" className="tile"></div>

        <div
          id="p1"
          className="player"
          style={{
            top: p1S.top,
            left: p1S.left,
            transition: "all 5s",
          }}
        >
          <img src={Avatar1} />
        </div>
        <div
          id="p2"
          className="player"
          style={{ top: p2S.top, left: p2S.left }}
        >
          <img src={Avatar2} />
        </div>
        <div
          id="p3"
          className="player"
          style={{ top: p3S.top, left: p3S.left }}
        >
          <img src={Avatar3} />
        </div>
        <div
          id="p4"
          className="player"
          style={{ top: p4S.top, left: p4S.left }}
        >
          <img src={Avatar4} />
        </div>
        <div
          id="p5"
          className="player"
          style={{ top: p5S.top, left: p5S.left }}
        >
          <img src={Avatar5} />
        </div>
        <div
          id="p6"
          className="player"
          style={{ top: p6S.top, left: p6S.left }}
        >
          <img src={Avatar6} />
        </div>
      </div>
      <button
        onClick={() => {
          setp1S({ top: "84.8%", left: "75.7%" });
        }}
      >
        Test
      </button>
    </div>
  );
};

export default Board;
