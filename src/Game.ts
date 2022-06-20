import type { Game } from "boardgame.io";

import { stringSimilarity } from "string-similarity-js";
import events from "./assets/events.json";

export interface JustusGameState {
  board: number[];
  playerState: { [key: string]: { position: number; score: number } };
  rolledNumber: number;

  showPolarQuestion: boolean;
  showChoiceQuestion: boolean;
  showOpenQuestion: boolean;
  showGroupQuestion: boolean;

  events: { message: string; type?: string; amount: number }[];
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

    playerState: {
      0: { position: 0, score: 0 },
      1: { position: 0, score: 0 },
      2: { position: 0, score: 0 },
      3: { position: 0, score: 0 },
      4: { position: 0, score: 0 },
      5: { position: 0, score: 0 },
    },
    rolledNumber: 0,

    showPolarQuestion: false,
    showChoiceQuestion: false,
    showOpenQuestion: false,
    showGroupQuestion: false,

    events: ctx.random!.Shuffle(events),
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
          ctx.events?.endTurn();
          break;
        case 3:
          G.showGroupQuestion = true;
          ctx.events?.setStage("groupQuestion");
          break;
        case 4:
          ctx.events?.endTurn();
          break;
        case 5:
          ctx.events?.endTurn();
          break;

        //TODO WIN!
        case 99:
          ctx.events?.endTurn();
          break;

        // Solo Question (Case 2)
        case 2:
          let rand = ctx.random!.D6();
          console.log("RANDOM " + rand);
          switch (rand) {
            case 1:
            case 2:
              G.showPolarQuestion = true;
              ctx.events?.setStage("polarQuestion");
              break;
            case 3:
            case 4:
              G.showChoiceQuestion = true;
              ctx.events?.setStage("choiceQuestion");
              break;
            case 5:
            case 6:
            default:
              G.showOpenQuestion = true;
              ctx.events?.setStage("openQuestion");
          }
          break;
      }
    },
  },
  turn: {
    stages: {
      polarQuestion: {
        moves: {
          answer: (G, ctx, question, submittedAnswer: boolean) => {
            if (submittedAnswer == question.answer) {
              G.playerState[ctx.currentPlayer].score += 10;
              G.showPolarQuestion = false;
              ctx.events?.endTurn();
            } else {
              G.showPolarQuestion = false;
              ctx.events?.endTurn();
            }
          },
        },
      },
      choiceQuestion: {
        moves: {
          answer: (G, ctx, question, submittedAnswer: string) => {
            if (submittedAnswer == question.answer) {
              G.playerState[ctx.currentPlayer].score += 10;
              G.showChoiceQuestion = false;
              ctx.events?.endTurn();
            } else {
              G.showChoiceQuestion = false;
              ctx.events?.endTurn();
            }
          },
        },
      },
      openQuestion: {
        moves: {
          answer: (G, ctx, question, submittedAnswer: string) => {
            let answers: string[] = submittedAnswer.split(",");
            let result: number = 0;
            let counter: number = 0;

            for (let answer in answers) {
              let similarity = 0;
              for (let option in question.options) {
                let current = stringSimilarity(
                  answer.toLowerCase(),
                  option.toLowerCase()
                );
                if (similarity < current) similarity = current;
              }
              result += similarity;

              if (++counter == question.amount) {
                break;
              }
            }

            if (result >= question.amount * 0.9) {
              G.playerState[ctx.currentPlayer].score += 10;
              G.showOpenQuestion = false;
              ctx.events?.endTurn();
            } else {
              G.showOpenQuestion = false;
              ctx.events?.endTurn();
            }
          },
        },
      },
      groupQuestion: {
        moves: {
          answer: (G, ctx, question, submittedAnswer: string) => {
            let similarity = stringSimilarity(
              submittedAnswer.toLowerCase(),
              question.answer.toLowerCase()
            );

            if (similarity >= 0.9) {
              G.playerState[ctx.currentPlayer].score += 10;
              G.showGroupQuestion = false;
              ctx.events?.endTurn();
            } else {
              G.showGroupQuestion = false;
              ctx.events?.endTurn();
            }
          },
        },
      },
    },
  },
};
