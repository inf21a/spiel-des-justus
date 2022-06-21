import type { GameProps } from "../Game";
import GameMap from "./GameMap";
import Controls from "./Controls";
import PopupList from "./PopupList";

export default function Board(props: GameProps) {
  return (
    <div className="flex bg-justusbg">
      <GameMap {...props} />
      <Controls {...props} />
      {props.ctx.currentPlayer == props.playerID && <PopupList {...props} />}
    </div>
  );
}
