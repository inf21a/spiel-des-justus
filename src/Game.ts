import type { Game } from "boardgame.io";

export interface JustusGameState {
  handleClose: any;
}

export const JustusGame: Game<JustusGameState> = {
  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  moves: {},
};
