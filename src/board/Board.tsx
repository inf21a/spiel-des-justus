import { BoardProps } from "boardgame.io/react";
import { useState, useEffect } from "react";
import "../tiles.css";
import BoardView from "./BoardView";
import * as Constants from "../Constants";

export interface PState {
    top: string;
    left: string;
}

const Board = (props: BoardProps) => {
    const [p1S, setp1S] = useState<PState>(Constants.TILES[0]);
    const [p2S, setp2S] = useState<PState>(Constants.TILES[0]);
    const [p3S, setp3S] = useState<PState>(Constants.TILES[0]);
    const [p4S, setp4S] = useState<PState>(Constants.TILES[0]);
    const [p5S, setp5S] = useState<PState>(Constants.TILES[0]);
    const [p6S, setp6S] = useState<PState>(Constants.TILES[0]);

    useEffect(() => {}, []);

    return (
        <div className="flex justify-center">
            <BoardView
                p1S={p1S}
                p2S={p2S}
                p3S={p3S}
                p4S={p4S}
                p5S={p5S}
                p6S={p6S}
            />
            <button
                onClick={() => {
                    setp1S(Constants.TILES[2]);
                }}
            >
                Test
            </button>
        </div>
    );
};

export default Board;
