import type { Game } from "boardgame.io";

export interface JustusGameState {}

export const JustusGame: Game<JustusGameState> = {
    name:"Spiel des Justus",
    minPlayers: 3,
    maxPlayers: 6,

    setup: () => ({fields: Array(47).fill(null)}),
    moves: {

    }

};
