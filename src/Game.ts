import type { Game } from "boardgame.io";
import type { BoardProps } from "boardgame.io/react";
import stringSimilarity from "string-similarity-js";
import events from "../assets/events.json";
import questions from "../assets/questions.json";

export type GameState = {
  board: Array<number>;

  rolled: number;
  players: Array<{ position: number; score: number }>;
  pausedPlayers: number[];

  showPolarQuestion: boolean;
  showChoiceQuestion: boolean;
  showOpenQuestion: boolean;
  showGroupQuestion: boolean;
  waitingForGroupAnswers: boolean;
  showEvent: boolean;

  choiceQuestions: Array<{
    question: string;
    options: Array<string>;
    answer?: string;
  }>;
  polarQuestions: Array<{ question: string; answer: boolean }>;
  groupQuestions: Array<{
    question: string;
    options: Array<string>;
    amount: number;
  }>;
  openQuestions: Array<{
    question: string;
    options: Array<string>;
    amount: number;
  }>;
  events: Array<{
    message: string;
    eventType: string;
    amount: number;
  }>;

  cChoiceQuestion?: {
    question: string;
    options: Array<string>;
    answer?: string;
  };
  cPolarQuestion?: { question: string; answer: boolean };
  cGroupQuestion?: {
    question: string;
    options: Array<string>;
    amount: number;
  };
  cOpenQuestion?: { question: string; options: Array<string>; amount: number };
  cEvent?: {
    message: string;
    eventType: string;
    amount: number;
  };
};

export type GameProps = BoardProps<GameState>;

export const game: Game<GameState> = {
  name: "justus",
  setup(ctx) {
    const players: GameState["players"] = [];
    for (let i = 0; i < ctx.numPlayers; i++) {
      players.push({ position: 0, score: 10 });
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
      pausedPlayers: [],

      showPolarQuestion: false,
      showChoiceQuestion: false,
      showOpenQuestion: false,
      showGroupQuestion: false,
      waitingForGroupAnswers: false,
      showEvent: false,

      events: ctx.random!.Shuffle(events),
      choiceQuestions: ctx.random!.Shuffle(questions.choice),
      polarQuestions: ctx.random!.Shuffle(questions.polar),
      groupQuestions: ctx.random!.Shuffle(questions.group),
      openQuestions: ctx.random!.Shuffle(questions.open),
    };
  },
  minPlayers: 2,
  maxPlayers: 6,
  endIf: (G, _ctx) =>
    G.players.some((player) => player.position >= G.board.length - 1),
  moves: {
    rollDice: (G, ctx) => {
      const player = G.players[parseInt(ctx.currentPlayer)];
      G.rolled = ctx.random!.D6();

      if (player.position + G.rolled >= G.board.length) {
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
              G.cPolarQuestion = G.polarQuestions.pop();
              G.showPolarQuestion = true;
              ctx.events?.setStage("polarQuestion");
              break;
            case 3:
            case 4:
              G.cChoiceQuestion = G.choiceQuestions.pop();
              G.showChoiceQuestion = true;
              ctx.events?.setStage("choiceQuestion");
              break;
            case 5:
            case 6:
              G.cOpenQuestion = G.openQuestions.pop();
              G.showOpenQuestion = true;
              ctx.events?.setStage("openQuestion");
              break;
          }
          break;

        //TODO GROUPQUESTIONS
        case 3:
          G.cGroupQuestion = G.groupQuestions.pop();
          G.showGroupQuestion = true;
          G.waitingForGroupAnswers = true;
          ctx.events?.setStage("groupQuestion");
          ctx.events?.setActivePlayers({
            currentPlayer: "answerGroupQuestion",
            others: "createGroupQuestion",
            minMoves: 1,
            maxMoves: 1,
          });
          break;

        case 4:
          G.cEvent = G.events.pop();
          G.showEvent = true;
          ctx.events?.setStage("justusEvent");
          break;

        //TODO WIN!
        case 99:
          player.score += 10;
          ctx.events?.endTurn();
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
      G.waitingForGroupAnswers = false;
      G.showEvent = false;

      let pausedIndex = G.pausedPlayers.indexOf(parseInt(ctx.currentPlayer));
      if (pausedIndex != -1) {
        G.pausedPlayers.splice(pausedIndex, 1);
        ctx.events?.endTurn();
      }
    },

    // Called at the end of a turn.
    onEnd: (G, ctx) => {
      G.showPolarQuestion = false;
      G.showChoiceQuestion = false;
      G.showOpenQuestion = false;
      G.showGroupQuestion = false;
      G.waitingForGroupAnswers = false;
      G.showEvent = false;
    },
    stages: {
      justusEvent: {
        moves: {
          acceptEvent: (G, ctx) => {
            if (G.cEvent?.eventType === "pause") {
              G.pausedPlayers.push(parseInt(ctx.currentPlayer));
            } else if (G.cEvent?.eventType === "money") {
              G.players[parseInt(ctx.currentPlayer)].score += G.cEvent.amount;
            }
            G.showEvent = false;
            ctx.events?.endTurn();
          },
        },
      },
      polarQuestion: {
        moves: {
          answer: (G, ctx, submittedAnswer: boolean) => {
            if (submittedAnswer == G.cPolarQuestion!.answer) {
              G.players[parseInt(ctx.currentPlayer)].score += 1;
            }
            ctx.events?.endTurn();
          },
        },
      },
      choiceQuestion: {
        moves: {
          answer: (G, ctx, submittedAnswer: string, correct: string) => {
            if (submittedAnswer == correct) {
              G.players[parseInt(ctx.currentPlayer)].score += 2;
            }
            ctx.events?.endTurn();
          },
        },
      },
      openQuestion: {
        moves: {
          answer: (G, ctx, result: number) => {
            if (result >= G.cOpenQuestion!.amount * 0.9) {
              G.players[parseInt(ctx.currentPlayer)].score += 3;
            }
            ctx.events?.endTurn();
          },
        },
      },
      answerGroupQuestion: {
        moves: {
          answer: (G, ctx, submittedAnswer: string, correct: string) => {
            if (submittedAnswer == correct) {
              G.players[parseInt(ctx.currentPlayer)].score += 2;
            }
            ctx.events?.endTurn();
          },
        },
      },
      createGroupQuestion: {
        moves: {
          create: (G, _ctx, count: number) => {
            if (count == G.players.length - 1) {
              G.waitingForGroupAnswers = false;
            }
          },
        },
      },
    },
  },
};
