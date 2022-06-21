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

export default function WinPanel(props: GameProps) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: stars,
    rendererSettings: {
      preserveAspectRatio: "",
    },
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
          {props.matchData![props.G.winner].name}&nbsp;
        </div>{" "}
        <div>hat gewonnen</div>
      </div>
      <div className="flex mt-12 items-center">
        <img className="w-16" src={coin} />
        <div className="text-3xl font-bold ml-4">
          {props.G.players[1].score}
        </div>
      </div>
    </div>
  );
}
