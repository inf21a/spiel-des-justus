import { BoardProps } from "boardgame.io/react";

const Board = ({ moves, G, ctx }: BoardProps) => {
  let arr = Array.from(Array(46).keys());
  return (
    <div className="flex flex-wrap" onClick={() => moves.start()}>
      {arr.map((e) => (
        <div
          id={e.toString()}
          className={"m-2 w-12 h-12 border-black border-4"}
        />
      ))}
    </div>
  );
};

export default Board;
