import type { GameProps } from "../Game";
import GameMap from "./GameMap";
import Controls from "./Controls";
import PopupList from "./PopupList";

export default function Board(props: GameProps) {
  console.log(props);
  return (
    <div className="flex justify-center">
      <GameMap {...props} />
      <Controls {...props} />
      {props.ctx.currentPlayer == props.playerID && <PopupList {...props} />}
    </div>
  );
}
