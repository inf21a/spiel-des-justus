import type { Game } from "boardgame.io";

import questions from "./assets/questions.json";

export interface JustusGameState {
  board: number[];
  players: { [key: string]: { position: number; score: number } };
  rolledNumber: number;
  diceRolled: boolean;
  currentPolarQuestion?: { question: string; answer: boolean };
  currentChoiceQuestion?: {
    question: string;
    choices: string[4];
    answer: number;
  };
  polarQuestions: { question: string; answer: boolean }[];
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
      2, 2, 1, 4, 1, 3, 2, 1, 4, 3, 2, 4, 1, 2, 4, 3, 2, 1, 2, 4, 3, 2, 4, 99,
    ],

    players: {
      "0": {
        position: 0,
        score: 0,
      },
      "1": {
        position: 0,
        score: 0,
      },
    },
    rolledNumber: 0,
    diceRolled: false,
    polarQuestions: ctx.random!.Shuffle(questions.polar),
  }),
  minPlayers: 2,
  maxPlayers: 10,
  moves: {
    rollDice: (G, ctx) => {
      if (!G.diceRolled) {
        G.rolledNumber = ctx.random!.D6();
        G.players[ctx.currentPlayer]
          ? (G.players[ctx.currentPlayer].position =
              G.players[ctx.currentPlayer].position + G.rolledNumber)
          : (G.players[ctx.currentPlayer] = {
              position: G.rolledNumber,
              score: 0,
            });
        G.diceRolled = true;
        const field = G.board[G.players[ctx.currentPlayer].position];
        switch (field) {
          case 0:
            break;
          case 1:
            console.log("Landed on normal field!");
            ctx.events?.endTurn();
            break;
          case 2:
            G.currentPolarQuestion = G.polarQuestions.pop();
            console.log(G.currentPolarQuestion?.question);
            ctx.events?.setStage("answerPolarQuestion");
            break;
          case 3:
            console.log("Landed on multiple choice field!");
            break;
          case 4:
            console.log("Landed on event field!");
            break;
          case 5:
            break;
          default:
            break;
        }
      }
    },
  },
  turn: {
    onBegin: (G, ctx) => {
      G.diceRolled = false;
    },

    minMoves: 1,
    maxMoves: 1,
    stages: {
      answerPolarQuestion: {
        moves: {
          answer: (G, ctx, answer: boolean) => {
            if (answer == G.currentPolarQuestion?.answer) {
              G.players[ctx.currentPlayer].score += 10;
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
              G.players[ctx.currentPlayer].score += 10;
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
