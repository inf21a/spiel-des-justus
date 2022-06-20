import type {Game} from "boardgame.io";

import questions from "./assets/questions.json";
import events from "./assets/events.json";

export interface JustusGameState {
    board: number[];
    playerState: { [key: string]: { position: number; score: number } };
    rolledNumber: number;
    currentPolarQuestion?: { question: string; answer: boolean };
    currentChoiceQuestion?: {
        question: string;
        choices: string[4];
        answer: number;
    };
    polarQuestions: { question: string; answer: boolean }[];
    events: { message: string, type?: string, amount: number }[]
}

export const JustusGame: Game<JustusGameState> = {
    setup: (ctx) => ({
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

        playerState: {
            0: {position: 0, score: 0},
            1: {position: 0, score: 0},
            2: {position: 0, score: 0},
            3: {position: 0, score: 0},
            4: {position: 0, score: 0},
            5: {position: 0, score: 0},
        },
        rolledNumber: 0,
        polarQuestions: ctx.random!.Shuffle(questions.polar),
        events: ctx.random!.Shuffle(events)
    }),
    minPlayers: 2,
    maxPlayers: 6,
    moves: {
        rollDice: (G, ctx) => {
            G.rolledNumber = ctx.random!.D6();
            G.playerState[ctx.currentPlayer]
                ? (G.playerState[ctx.currentPlayer].position =
                    G.playerState[ctx.currentPlayer].position + G.rolledNumber)
                : (G.playerState[ctx.currentPlayer] = {
                    position: G.rolledNumber,
                    score: 0,
                });
            const field = G.board[G.playerState[ctx.currentPlayer].position];
            switch (field) {
                case 0:
                    break;
                case 1:
                    break;
                case 2:
                    G.currentPolarQuestion = G.polarQuestions.pop();
                    console.log(G.currentPolarQuestion?.question);
                    ctx.events?.setStage("answerPolarQuestion");
                    break;
                case 3:
                    break;
                case 4:
                    break;
                case 5:
                    break;
                default:
                    G.currentPolarQuestion = G.polarQuestions.pop();
                    console.log(G.currentPolarQuestion?.question);
                    ctx.events?.setStage("answerPolarQuestion");
                    break;

            }
        },
    },
    turn: {
        stages: {
            answerPolarQuestion: {
                moves: {
                    answer: (G, ctx, answer: boolean) => {
                        if (answer == G.currentPolarQuestion?.answer) {
                            G.playerState[ctx.currentPlayer].score += 10;
                            ctx.events?.endTurn();
                        } else {
                            ctx.events?.endTurn();
                        }
                    },
                },
            },
            answerChoiceQuestion: {
                moves: {
                    answer: (G, ctx, answer: number) => {
                        console.log(G.currentChoiceQuestion?.question);
                        if (answer == G.currentChoiceQuestion?.answer) {
                            G.playerState[ctx.currentPlayer].score += 10;
                            ctx.events?.endTurn();
                        } else {
                            ctx.events?.endTurn();
                        }
                    },
                },
            },
        },
    },
};
