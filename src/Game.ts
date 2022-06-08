import type { Game } from "boardgame.io";

export interface JustusGameState {
  board: number[];
  playerPositions: { [key: string]: { position: number } };
  rolledNumber: number;
  diceRolled: boolean;
  scores: number[];
}

export const JustusGame: Game<JustusGameState> = {
  setup: () => ({
    /*
     * 0: nothing
     * 1: event
     * 2: polar question
     * 3: choice question
     * 4: open question
     * 5: group question
     * 99: end
     */
    board: [
      0, 0, 1, 2, 0, 0, 3, 0, 2, 0, 0, 1, 0, 0, 0, 3, 0, 2, 0, 4, 0, 2, 0, 0, 0,
      1, 2, 0, 0, 2, 3, 0, 0, 2, 0, 3, 0, 0, 1, 0, 0, 0, 2, 4, 1, 0, 99,
    ],
    playerPositions: {},
    rolledNumber: 0,
    diceRolled: false,
    scores: [],
  }),
  minPlayers: 2,
  maxPlayers: 10,
  moves: {},
  turn: {
    stages: {
      dice: {
        moves: {
          rollDice: (G, ctx) => {
            if (!G.diceRolled) {
              G.rolledNumber = ctx.random!.D6();
              let playerPosition = G.playerPositions[ctx.currentPlayer];
              G.playerPositions[ctx.currentPlayer]
                ? (G.playerPositions[ctx.currentPlayer].position =
                    G.playerPositions[ctx.currentPlayer].position +
                    G.rolledNumber)
                : (G.playerPositions[ctx.currentPlayer] = {
                    position: G.rolledNumber,
                  });
              G.diceRolled = true;
              const field = G.board[playerPosition.position];
              switch (field) {
                case 1:
                  ctx.events!.setActivePlayers({
                    currentPlayer: "eventTrigger",
                    minMoves: 1,
                    maxMoves: 1,
                  });
                  ctx.events!.setActivePlayers({
                    others: "eventInfo",
                    minMoves: 0,
                    maxMoves: 0,
                  });
              }
            }
          },
        },
      },
    },
  },
};
