import { Icon } from "@iconify/react";

import { GameProps } from "../Game";

import coin from "../../assets/coin.svg";

import singleStack from "../../assets/cards/single-stack.svg";
import groupStack from "../../assets/cards/group-stack.svg";
import eventStack from "../../assets/cards/event-stack.svg";

import avatar1 from "../../assets/avatar1.svg";
import avatar2 from "../../assets/avatar2.svg";
import avatar3 from "../../assets/avatar3.svg";
import avatar4 from "../../assets/avatar4.svg";
import avatar5 from "../../assets/avatar5.svg";
import avatar6 from "../../assets/avatar6.svg";

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

export default function Controls(props: GameProps) {
  return (
    <div className="w-1/3 border-l-2 fixed top-0 right-0 h-full">
      <div className="h-full w-full flex flex-col">
        <div className="mt-12 flex mr-8 justify-end">
          <div className="bg-gray-300 p-2 rounded-2xl mr-3">
            <Icon icon="clarity:volume-mute-line" color="white" height="36" />
          </div>
          <button className="bg-red-300 hover:bg-red-500 p-2 rounded-2xl transition duration-150 ease-in">
            <Icon icon="iconoir:cancel" color="white" height="36" />
          </button>
        </div>
        <div className="flex items-center mt-12 flex-col">
          <img className="w-20" src={avatars[parseInt(props.playerID!)]} />
          <div className="font-bold text-2xl">
            {props.matchData![parseInt(props.playerID!)].name}
          </div>
          <div className="flex items-center mt-12">
            <button
              disabled={props.ctx.currentPlayer != props.playerID}
              className={`rounded-lg py-1.5 px-4 text-white font-bold transition duration-150 ${
                props.ctx.currentPlayer == props.playerID
                  ? "bg-violet-500 hover:bg-violet-600"
                  : "bg-gray-300"
              }`}
              onClick={() => {
                props.moves.rollDice();
              }}
            >
              Roll the dice
            </button>
            <div className="ml-4 font-bold">{props.G.rolled}</div>
          </div>
          {/*
          <div className="flex mt-12">
            <img src={singleStack} />
            <img className="ml-5" src={groupStack} />
            <img className="ml-5" src={eventStack} />
            </div> */}
          <div className="flex mt-16">
            {props
              .matchData!.filter(
                ({ id, name }) => id.toString() !== props.playerID
              )
              .map(({ id, name }) => (
                <div className="flex flex-col items-center ml-8" key={id}>
                  <div className="flex">
                    <img className="w-6" src={coin} />
                    <div className="font-bold ml-2 text-gray-500">
                      {props.G.players[id].score}
                    </div>
                  </div>
                  <img className="mt-3" src={avatars[id]} />
                  <div className="font-bold">{name}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
