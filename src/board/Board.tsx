import {BoardProps} from "boardgame.io/react";
import {useState, useEffect} from "react";
import "../tiles.css";
import BoardView from "./BoardView";
import * as Constants from "../Constants";
import Controls from "./Controls";

export interface PState {
    top: string;
    left: string;
}

const Board = (props: BoardProps) => {
    const p1S = Constants.TILES[props.G.playerState[0] ? props.G.playerState[0].position : 0]
    const p2S = Constants.TILES[props.G.playerState[1] ? props.G.playerState[1].position : 0]
    const p3S = Constants.TILES[props.G.playerState[2] ? props.G.playerState[2].position : 0]
    const p4S = Constants.TILES[props.G.playerState[3] ? props.G.playerState[3].position : 0]
    const p5S = Constants.TILES[props.G.playerState[4] ? props.G.playerState[4].position : 0]
    const p6S = Constants.TILES[props.G.playerState[5] ? props.G.playerState[5].position : 0]


    useEffect(() => {
    }, []);

    return (
        <div className="flex">
            <div className="flex justify-center w-3/5">
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
                        props.moves.rollDice();
                        console.log(props.ctx.currentPlayer, props.G);
                    }}
                >
                    {props.G.playerState[props.ctx.currentPlayer] ? props.G.playerState[props.ctx.currentPlayer].position : "Bitte würfeln"}
                </button>
            </div>
            <div className="w-2/5 border-l-2">
                <Controls/>
            </div>
        </div>
    );
};

export default Board;
