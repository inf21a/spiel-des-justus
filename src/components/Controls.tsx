import { Icon } from "@iconify/react";

import { GameProps } from "../Game";
import { QuitGameContext } from "../Context";
import { avatars } from "../Constants";
import WinPanel from "./WinPanel";

import coin from "../../assets/coin.svg";

// import singleStack from "../../assets/cards/single-stack.svg";
// import groupStack from "../../assets/cards/group-stack.svg";
// import eventStack from "../../assets/cards/event-stack.svg";

export default function Controls(props: GameProps) {
  return (
    <div className="w-1/3 bg-white m-4 ml-2 border-8 rounded-3xl border-yellow-500">
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
          <div className="flex items-center m-2">
            <img className="w-8" src={coin} />
            <div className="font-bold ml-2 text-gray-500">
              {props.G.players[parseInt(props.playerID!)].score}
            </div>
          </div>
          <img className="w-20" src={avatars[parseInt(props.playerID!)]} />
          <div className="font-bold text-2xl">
            {props.matchData![parseInt(props.playerID!)].name}
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
                ].includes(true)
              }
              className="rounded-lg py-1.5 px-4 text-white font-bold transition duration-150 bg-violet-500 hover:bg-violet-600 disabled:bg-gray-300 disabled:hover:bg-gray-300"
              onClick={() => {
                props.moves.rollDice();
              }}
            >
              Würfeln
            </button>
            <div className="ml-4 font-bold">{props.G.rolled}</div>
          </div>
          {/* Temporarily disabled because look is bad
          <div className="flex mt-12">
            <img src={singleStack} />
            <img className="ml-5" src={groupStack} />
            <img className="ml-5" src={eventStack} />
            </div> */}
          <div className="flex mt-16">
            {props
              .matchData!.filter(({ id }) => id.toString() !== props.playerID)
              .map(({ id, name }) => (
                <div
                  className="flex flex-col items-center ml-8 text-center"
                  key={id}
                >
                  <div className="flex">
                    <img className="w-6" src={coin} />
                    <div className="font-bold ml-2 text-gray-500">
                      {props.G.players[id].score}
                    </div>
                  </div>
                  <img className="mt-3 h-16" src={avatars[id]} />
                  <div className="text-sm block truncate w-20">{name}</div>
                </div>
              ))}
          </div>
        </div>
        {props.ctx.gameover && <WinPanel {...props} />}
      </div>
    </div>
  );
}
