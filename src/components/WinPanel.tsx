import { GameProps } from "../Game";
import Lottie from "react-lottie";

import coin from "../../assets/coin.svg";
import avatar1 from "../../assets/avatar1.svg";
import avatar2 from "../../assets/avatar2.svg";
import avatar3 from "../../assets/avatar3.svg";
import avatar4 from "../../assets/avatar4.svg";
import avatar5 from "../../assets/avatar5.svg";
import avatar6 from "../../assets/avatar6.svg";

import stars from "../../assets/animations/win-stars.json";

interface Winner {
  name?: string;
  score: number;
}

export default function WinPanel(props: GameProps) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: stars,
    rendererSettings: {
      preserveAspectRatio: "",
    },
  };

  // Please someone write something more efficient and compact
  // Also if two players have the exact same score the player with the highest position should win
  // and if both are on the same position there will be a random winner.
  const getWinner = (): Winner => {
    let tmp_win_id = 0;
    let tmp_max_score = 0;
    for (let i = 0; i < props.G.players.length; i++) {
      if (props.G.players[i].score > tmp_max_score) {
        tmp_max_score = props.G.players[i].score;
        tmp_win_id = i;
      }
    }

    return { name: props.matchData![tmp_win_id].name, score: tmp_max_score };
  };

  return (
    <div className="h-full flex-col items-center flex">
      <Lottie
        options={defaultOptions}
        height={500}
        width={500}
        style={{ marginTop: 0 }}
      />
      <img className="w-32 -mt-96 z-10" src={avatar1} />
      <div className="flex text-2xl mt-12">
        <div className="font-bold">
          {getWinner().name}
          &nbsp;
        </div>{" "}
        <div>hat gewonnen</div>
      </div>
      <div className="flex mt-12 items-center">
        <img className="w-16" src={coin} />
        <div className="text-3xl font-bold ml-4">{getWinner().score}</div>
      </div>
    </div>
  );
}
