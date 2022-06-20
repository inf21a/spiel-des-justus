import { BoardProps } from "boardgame.io/react";
import type { JustusGameState } from "../Game";

import { Icon } from "@iconify/react";
import Avatar1 from "/assets/avatar1.svg";
import Avatar2 from "/assets/avatar2.svg";
import Avatar3 from "/assets/avatar3.svg";
import Avatar4 from "/assets/avatar4.svg";
import Avatar5 from "/assets/avatar5.svg";
import Avatar6 from "/assets/avatar6.svg";
import EinzelKarte from "/assets/Karten/EinzelKarte.svg";
import EinzelStapel from "/assets/Karten/EinzelStapel.svg";
import GruppenKarte from "/assets/Karten/GruppenKarte.svg";
import GruppenStapel from "/assets/Karten/GruppenStapel.svg";
import EreignisKarte from "/assets/Karten/EreignisKarte.svg";
import EreignisStapel from "/assets/Karten/EreignisStapel.svg";
import Coin from "/assets/coin.svg";

const Controls = (props: { rollDice: () => void }) => {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="mt-12 flex mr-8 justify-end">
        <div className="bg-gray-300 p-2 rounded-2xl mr-3">
          <Icon icon="clarity:volume-mute-line" color="white" height="36" />
        </div>
        <div className="bg-red-300 p-2 rounded-2xl">
          <Icon icon="iconoir:cancel" color="white" height="36" />
        </div>
      </div>
      <div className="flex items-center mt-12 flex-col">
        <img className="w-20" src={Avatar1} />
        <div className="font-bold text-2xl">Justus1</div>
        <div className="flex items-center mt-12">
          <div
            className="bg-violet-500 rounded-lg py-1.5 px-4 text-white font-bold cursor-pointer"
            onClick={() => {
              props.rollDice();
            }}
          >
            Roll the dice
          </div>
          <div className="ml-4 font-bold">2</div>
        </div>
        <div className="flex mt-12">
          <img src={EinzelStapel} />
          <img className="ml-5" src={GruppenStapel} />
          <img className="ml-5" src={EreignisStapel} />
        </div>
        <div className="flex mt-16">
          <div className="flex flex-col items-center">
            <div className="flex">
              <img className="w-6" src={Coin} />
              <div className="font-bold ml-2 text-gray-500">20</div>
            </div>
            <img className="mt-3" src={Avatar2} />
            <div className="font-bold">Justus2</div>
          </div>
          <div className="flex flex-col items-center ml-8">
            <div className="flex">
              <img className="w-6" src={Coin} />
              <div className="font-bold ml-2 text-gray-500">300</div>
            </div>
            <img className="mt-3" src={Avatar3} />
            <div className="font-bold">Justus3</div>
          </div>
          <div className="flex flex-col items-center ml-8">
            <div className="flex">
              <img className="w-6" src={Coin} />
              <div className="font-bold ml-2 text-gray-500">38</div>
            </div>
            <img className="mt-3" src={Avatar4} />
            <div className="font-bold">Justus4</div>
          </div>
          <div className="flex flex-col items-center ml-8">
            <div className="flex">
              <img className="w-6" src={Coin} />
              <div className="font-bold ml-2 text-gray-500">1</div>
            </div>
            <img className="mt-3" src={Avatar5} />
            <div className="font-bold">Justus5</div>
          </div>
          <div className="flex flex-col items-center ml-8">
            <div className="flex">
              <img className="w-6" src={Coin} />
              <div className="font-bold ml-2 text-gray-500">500</div>
            </div>
            <img className="mt-3" src={Avatar6} />
            <div className="font-bold">Justus6</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
