import { BoardProps } from "boardgame.io/react";
import { useState, useEffect } from "react";
import Spielbrett from "../assets/Spielbrett.svg";
import "./tiles.css";

interface PState {
    top: string;
    left: string;
}

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
            <div className="border-yellow-300 w-2/3 my-32 border-yellow-500 border-8 rounded-3xl relative">
                <img
                    className="rounded-2xl"
                    src={Spielbrett}
                    alt="Spielbrett"
                />
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
                />
                <div
                    id="p2"
                    className="player"
                    style={{ top: p2S.top, left: p2S.left }}
                />
                <div
                    id="p3"
                    className="player"
                    style={{ top: p3S.top, left: p3S.left }}
                />
                <div
                    id="p4"
                    className="player"
                    style={{ top: p4S.top, left: p4S.left }}
                />
                <div
                    id="p5"
                    className="player"
                    style={{ top: p5S.top, left: p5S.left }}
                />
                <div
                    id="p6"
                    className="player"
                    style={{ top: p6S.top, left: p6S.left }}
                />
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
