import Lottie from "react-lottie";

import { GameProps } from "../Game";
import { avatars } from "../Constants";

import coin from "../../assets/coin.svg";
import stars from "../../assets/animations/win-stars.json";

export default function WinPanel(props: GameProps) {
  // determine winner

  // add names and indices to players
  const players = props.G.players.map((player, i) => ({
    ...player,
    name: props.matchData![i].name!,
    index: i,
  }));

  // find the highest score
  const highestScore = Math.max(...players.map((player) => player.score));

  // find all players with the highest score
  const potentialWinners = players.filter(
    (player) => player.score == highestScore
  );

  // find the highest position of a winner
  const highestPosition = Math.max(
    ...potentialWinners.map((player) => player.position)
  );

  // find all winners with the highest position
  const winnersWithHighestPosition = potentialWinners.filter(
    (player) => player.position == highestPosition
  );

  // select a random winner
  const winner =
    winnersWithHighestPosition[
      Math.floor(Math.random() * winnersWithHighestPosition.length)
    ];

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
      <img
        className="w-32 -mt-96 z-10 rounded-md"
        src={avatars[winner.index]}
      />
      <div className="flex text-2xl mt-12">
        <div className="font-bold">
          {winner.name}
          &nbsp;
        </div>{" "}
        <div>hat gewonnen</div>
      </div>
      <div className="flex mt-12 items-center">
        <img className="w-16" src={coin} />
        <div className="text-3xl font-bold ml-4">{winner.score}</div>
      </div>
    </div>
  );
}
