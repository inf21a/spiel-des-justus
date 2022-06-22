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
      rolled: 1,
      players,
      showPolarQuestion: false,
      showChoiceQuestion: false,
      showOpenQuestion: false,
      showGroupQuestion: false,
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
      const player = G.players[parseInt(ctx.currentPlayer)];
      G.rolled = ctx.random!.D6();

      if (player.position + G.rolled > G.board.length) {
        ctx.events?.endTurn();
        return;
      }

      player.position += G.rolled;
      const field = G.board[player.position];

      switch (field) {
        case 0:
        case 1:
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
              // Open questions still broken
              //G.showOpenQuestion = true;
              //ctx.events?.setStage("openQuestion");
              ctx.events?.endTurn();
              break;
          }
          break;

        //TODO GROUPQUESTIONS
        case 3:
          // Open questions still broken
          //G.showOpenQuestion = true;
          //ctx.events?.setStage("openQuestion");
          break;

        case 4:
          G.currentEvent = G.events.pop();
          G.showEvent = true;
          if (G.currentEvent?.type === "pause") {
            G.pausedPlayers.push(parseInt(ctx.currentPlayer));
          } else if (G.currentEvent?.type === "money") {
            player.score += G.currentEvent.amount;
          }
          ctx.events?.endTurn();
          break;
        case 5:
          ctx.events?.endTurn();
          break;

        //TODO WIN!
        case 99:
          ctx.events?.endGame(true);
          break;
      }
    },
  },
  turn: {
    // Called at the beginning of a turn.
    onBegin: (G, ctx) => {
      G.showPolarQuestion = false;
      G.showChoiceQuestion = false;
      G.showOpenQuestion = false;
      G.showGroupQuestion = false;
    },

    // Called at the end of a turn.
    onEnd: (G, ctx) => {
      console.log("End turn");
      G.showPolarQuestion = false;
      G.showChoiceQuestion = false;
      G.showOpenQuestion = false;
      G.showGroupQuestion = false;
    },

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
            }
            ctx.events?.endTurn();
          },
        },
      },
      choiceQuestion: {
        moves: {
          answer: (G, ctx, question, submittedAnswer: string) => {
            if (submittedAnswer == question.answer) {
              G.players[parseInt(ctx.currentPlayer)].score += 10;
            }
            ctx.events?.endTurn();
          },
        },
      },
      openQuestion: {
        moves: {
          answer: (G, ctx, question, submittedAnswer: string) => {
            let result: number = 0;
            let counter: number = 0;
            let answers: string[] = submittedAnswer
              .replaceAll(" ", "")
              .split(",");

            question.options[0] = "test";
            question.options[1] = "test";
            question.options[2] = "test";
            question.options[3] = "test";

            for (let answer of answers) {
              let highestSim: number = 0;
              let highestIndex: number = -1;
              for (let i = 0; i < question.options.length; i++) {
                let currentSim = stringSimilarity(
                  answer.toLowerCase(),
                  question.options[i].replaceAll(" ", "").toLowerCase()
                );
                if (highestSim < currentSim) {
                  highestSim = currentSim;
                  highestIndex = i;
                }
              }

              result += highestSim;

              if (highestIndex != -1) {
                question.options.p;
              }
              if (++counter == question.amount) {
                break;
              }
            }
            console.log(
              "result: " + result + " needed: " + question.amount * 0.9
            );
            if (result >= question.amount * 0.9) {
              G.players[parseInt(ctx.currentPlayer)].score += 10;
            }
            console.log("hey");
            ctx.events?.endTurn();
          },
        },
      },
    },
  },
};
