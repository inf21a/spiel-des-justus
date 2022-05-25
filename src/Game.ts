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


const scene = new Phaser.Game({
        type: Phaser.AUTO,
        width: 2000,
        height: 1080,
        backgroundColor: '#0d2b3e',
        pixelArt: true,
        scene: [DCoin],
        scale: {
            mode: Phaser.Scale.ENVELOP,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            min: {
                width: 600,
                height: 600
            },
            // Or set minimum size like these
            // minWidth: 800,
            // minHeight: 600,

            // Maximum size
            max: {
                width: 3000,
                height: 3000
            },
        },
    }
)

