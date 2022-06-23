import { Icon, loadIcons } from "@iconify/react";

import { GameProps } from "../Game";
import { QuitGameContext } from "../Context";
import { avatars } from "../Constants";
import WinPanel from "./WinPanel";

import coin from "../../assets/coin.svg";

// import singleStack from "../../assets/cards/single-stack.svg";
// import groupStack from "../../assets/cards/group-stack.svg";
// import eventStack from "../../assets/cards/event-stack.svg";

// preload dice icons
loadIcons([1, 2, 3, 4, 5, 6].map((n) => `bi:dice-${n}-fill`));

function createGameStateMessage(props: GameProps) {
  const hasTurn = props.playerID == props.ctx.currentPlayer;
  const showingQuestion = [
    props.G.showChoiceQuestion,
    props.G.showOpenQuestion,
    props.G.showPolarQuestion,
    props.G.showGroupQuestion,
  ].includes(true);

  if (showingQuestion) {
    if (hasTurn)
      return "Fragenfeld! Beantworte die Frage, um Justustaler zu verdienen.";
    return `${
      props.matchData![parseInt(props.ctx.currentPlayer)].name
    } beantwortet eine Frage...`;
  }

  if (hasTurn) {
    return "Du bist dran! Benutze den Würfel.";
  }

  return `${
    props.matchData![parseInt(props.ctx.currentPlayer)].name
  } ist am Zug...`;
}

export default function Controls(props: GameProps) {
  return (
    <div className="w-full md:w-1/3 bg-white mt-4 md:m-4 md:ml-2 border-8 rounded-3xl border-yellow-500">
      <div className="h-full w-full flex-col flex">
        <div className="m-8 flex justify-end">
          <div className="bg-gray-300 p-2 rounded-2xl mr-3">
            <Icon icon="clarity:volume-mute-line" color="white" height="36" />
          </div>
          <QuitGameContext.Consumer>
            {(quitGame) => (
              <button
                onClick={() => quitGame(props.matchID)}
                className="bg-red-300 hover:bg-red-500 p-2 rounded-2xl transition duration-150 ease-in"
              >
                <Icon icon="iconoir:cancel" color="white" height="36" />
              </button>
            )}
          </QuitGameContext.Consumer>
        </div>
        <div
          className={`items-center flex-col ${
            props.ctx.gameover ? "hidden" : "flex"
          }`}
        >
          <div className="flex flex-row items-center space-x-16">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center m-2">
                <img className="w-8" src={coin} />
                <div className="font-bold ml-2 text-gray-500">
                  {props.G.players[parseInt(props.playerID!)].score}
                </div>
              </div>
              <img
                className="h-28 rounded-md"
                src={avatars[parseInt(props.playerID!)]}
              />
              <div className="text-2xl mt-1">
                {props.matchData![parseInt(props.playerID!)].name}
              </div>
            </div>
            <div className="flex items-center mt-12">
              <button
                disabled={
                  props.ctx.currentPlayer != props.playerID ||
                  [
                    props.G.showChoiceQuestion,
                    props.G.showPolarQuestion,
                    props.G.showOpenQuestion,
                    props.G.showGroupQuestion,
                    props.G.showEvent,
                  ].includes(true)
                }
                className="rounded-lg transition duration-150 text-green-500 hover:text-green-400 disabled:text-gray-400 disabled:hover:text-gray-400 text-6xl"
                onClick={() => {
                  props.moves.rollDice();
                }}
              >
                <Icon icon={`bi:dice-${props.G.rolled}-fill`} />
              </button>
            </div>
          </div>
          <div className="font-bold text-center text-xl mt-12 mx-4">
            {createGameStateMessage(props)}
          </div>
          {/* Temporarily disabled because look is bad
          <div className="flex mt-12">
            <img src={singleStack} />
            <img className="ml-5" src={groupStack} />
            <img className="ml-5" src={eventStack} />
            </div> */}
          <div className="flex mt-12">
            {props
              .matchData!.filter(({ id }) => id.toString() !== props.playerID)
              .map(({ id, name }) => (
                <div
                  className="flex flex-col items-center text-center"
                  key={id}
                >
                  <div className="flex">
                    <img className="w-6" src={coin} />
                    <div className="font-bold ml-2 text-gray-500">
                      {props.G.players[id].score}
                    </div>
                  </div>
                  <img className="mt-3 h-16 rounded-md" src={avatars[id]} />
                  <div className="text-sm block truncate w-20 mt-1">{name}</div>
                </div>
              ))}
          </div>
        </div>
        {props.ctx.gameover && <WinPanel {...props} />}
      </div>
    </div>
  );
}
