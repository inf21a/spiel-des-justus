import type {Game} from "boardgame.io";

export interface JustusGameState {
    board: number[];
    players: { [key: string]: { position: number, score: number } };
    rolledNumber: number;
    diceRolled: boolean;
    currentPolarQuestion?: { question: string, answer: boolean }
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

        players: {},
        rolledNumber: 0,
        diceRolled: false,
    }),
    minPlayers: 2,
    maxPlayers: 10,
    moves: {
        start:(G, ctx)=>{
            ctx.events?.setStage("dice")
        }
    },
    turn: {
        stages: {
            dice: {
                moves: {
                    rollDice: (G, ctx) => {
                        if (!G.diceRolled) {
                            G.rolledNumber = ctx.random!.D6();
                            G.players[ctx.currentPlayer]
                                ? (G.players[ctx.currentPlayer].position =
                                    G.players[ctx.currentPlayer].position +
                                    G.rolledNumber)
                                : (G.players[ctx.currentPlayer] = {
                                    position: G.rolledNumber,
                                    score: 0
                                });
                            G.diceRolled = true;
                            const field = G.board[G.players[ctx.currentPlayer].position];
                            switch (field) {
                                default:
                                    ctx.events!.setStage("answerPolarQuestion");
                            }
                        }
                    },
                },
            },
            answerPolarQuestion: {
                moves: {
                    answer: (G, ctx, answer: boolean) => {
                        console.log(G.currentPolarQuestion?.question);
                        if (answer == G.currentPolarQuestion?.answer) {
                            G.players[ctx.currentPlayer].score += 10;
                            ctx.events?.endTurn();
                        } else {
                            ctx.events?.endTurn();
                        }
                    }
                }
            }
        },
    },
};
