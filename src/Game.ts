import type { Game } from "boardgame.io";
import type { BoardProps } from "boardgame.io/react";
import stringSimilarity from "string-similarity-js";
import events from "../assets/events.json";

export type GameState = {
  board: Array<number>;
  rolled: number;
  players: Array<{ position: number; score: number }>;
  showPolarQuestion: boolean;
  showChoiceQuestion: boolean;
  showOpenQuestion: boolean;
  showGroupQuestion: boolean;
  gameEnd: boolean;
  events: Array<{ message: string; type: string; amount: number }>;
  pausedPlayers: Array<number>;
  showEvent: boolean;
  currentEvent?: { message: string; type: string; amount: number };
};

export type GameProps = BoardProps<GameState>;

export const game: Game<GameState> = {
  name: "justus",
  setup(ctx) {
    const players: GameState["players"] = [];
    for (let i = 0; i < ctx.numPlayers; i++) {
      players.push({ position: 0, score: 0 });
    }
    return {
      /*
       * 0: start
       * 1: nothing
       * 2: solo questiom
       * 3: group question
       * 4: event
       * 99: end
       */
      board: [
        0, 1, 2, 1, 2, 4, 2, 3, 2, 1, 2, 3, 4, 2, 1, 2, 4, 1, 2, 2, 1, 4, 2, 3,
        1, 2, 2, 1, 4, 1, 3, 2, 1, 4, 3, 2, 4, 1, 2, 4, 3, 2, 1, 2, 4, 3, 2, 4,
        99,
      ],
      rolled: 0,
      players,
      showPolarQuestion: false,
      showChoiceQuestion: false,
      showOpenQuestion: false,
      showGroupQuestion: false,
      gameEnd: false,
      events: ctx.random!.Shuffle(events),
      pausedPlayers: [],
      showEvent: false,
    };
  },
  minPlayers: 2,
  maxPlayers: 6,
  endIf: (G, ctx) =>
    G.players[parseInt(ctx.currentPlayer)].position >= G.board.length,
  moves: {
    rollDice: (G, ctx) => {
      G.rolled = ctx.random!.D6();
      G.players[parseInt(ctx.currentPlayer)].position += G.rolled;
      const field = G.board[G.players[parseInt(ctx.currentPlayer)].position];
      switch (field) {
        case 0:
          break;
        case 1:
          ctx.events?.endTurn();
          break;
        //TODO GROUPQUESTIONS
        case 3:
          G.gameEnd = true;
          ctx.events?.endTurn();
          //G.showGroupQuestion = true;
          //ctx.events?.setStage("openQuestion");
          break;
        case 4:
          G.currentEvent = G.events.pop();
          G.showEvent = true;
          if (G.currentEvent?.type === "pause") {
            G.pausedPlayers.push(parseInt(ctx.currentPlayer));
          } else if (G.currentEvent?.type === "money") {
            G.players[parseInt(ctx.currentPlayer)].score +=
              G.currentEvent.amount;
          }
          ctx.events?.endTurn();
          break;
        case 5:
          ctx.events?.endTurn();
          break;

        //TODO WIN!
        case 99:
          G.gameEnd = true;
          ctx.events?.endTurn();
          break;

        // Solo Question (Case 2)
        case 2:
          let rand = ctx.random!.D6();
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
            // default:
            //   G.showOpenQuestion = true;
            //   ctx.events?.setStage("openQuestion");
          }
          break;
      }
    },
  },
  turn: {
    order: {
      // Get the initial value of playOrderPos at the beginning of the phase.
      first: (G, ctx) => 0,

      // Get the next value of playOrderPos at the end of each turn.
      next: (G, ctx) => {
        let nextPos = (ctx.playOrderPos + 1) % ctx.numPlayers;
        // TODO(felix): splicing the array causes a read-only error
        // while (G.pausedPlayers.includes(nextPos)) {
        //   G.pausedPlayers.splice(G.pausedPlayers.indexOf(nextPos), 1);
        //   nextPos = (nextPos + 1) % ctx.numPlayers;
        // }
        return nextPos;
      },
    },
    stages: {
      polarQuestion: {
        moves: {
          answer: (G, ctx, question, submittedAnswer: boolean) => {
            if (submittedAnswer == question.answer) {
              G.players[parseInt(ctx.currentPlayer)].score += 10;
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
              G.players[parseInt(ctx.currentPlayer)].score += 10;
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
              G.players[parseInt(ctx.currentPlayer)].score += 10;
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
              G.players[parseInt(ctx.currentPlayer)].score += 10;
              G.showOpenQuestion = false;
              ctx.events?.endTurn();
            } else {
              G.showOpenQuestion = false;
              ctx.events?.endTurn();
            }
          },
        },
      },
    },
  },
};
