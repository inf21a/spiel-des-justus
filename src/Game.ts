import type {Game} from "boardgame.io";

export interface JustusGameState {
    board: number[];
    players: { [key: string]: { position: number, score: number } };
    rolledNumber: number;
    diceRolled: boolean;
    currentPolarQuestion?: { question: string, answer: boolean }
    currentChoiceQuestion?: { question: string, choices: string[4], answer: number }
}

export const JustusGame: Game<JustusGameState> = {
    setup: () => ({
        /*
         * 0: start
         * 1: nothing
         * 2: solo questiom
         * 3: group question
         * 4: event
         * 99: end
         */
        board: [
            0, 1, 2, 1, 2, 4, 2, 3, 2, 1, 2, 3, 4, 2, 1, 2, 4, 1, 2, 2, 1, 4, 2, 3, 1,
            2, 2, 1, 4, 1, 3, 2, 1, 4, 3, 2, 4, 1, 2, 4, 3, 2, 1, 2, 4, 3, 2, 4, 99
        ],

        players: {},
        rolledNumber: 0,
        diceRolled: false,
    }),
    minPlayers: 2,
    maxPlayers: 10,
    moves: {
        start: (G, ctx) => {
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
            },
            answerChoiceQuestion: {
                moves: {
                    answer: (G, ctx, answer: number) => {
                        console.log(G.currentChoiceQuestion?.question);
                        if (answer == G.currentChoiceQuestion?.answer) {
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
