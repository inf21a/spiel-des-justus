import type {Game} from "boardgame.io";
import * as Phaser from "phaser";
import DCoin from "./DCoin";

export interface JustusGameState {
}

export const JustusGame: Game<JustusGameState> = {
    name: "Spiel des Justus",
    minPlayers: 3,
    maxPlayers: 6,

    setup: () => ({fields: Array(47).fill(null)}),
    moves: {}

};

let diceText;

const scene = new Phaser.Game({
        type: Phaser.AUTO,
        width: 1530,
        height: 720,
        backgroundColor: '#304858',
        pixelArt: true,
        scene: [DCoin]
    }
)

