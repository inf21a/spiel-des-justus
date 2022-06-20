import Spielbrett from "/assets/Spielbrett.svg";
import Avatar1 from "/assets/avatar1.svg";
import Avatar2 from "/assets/avatar2.svg";
import Avatar3 from "/assets/avatar3.svg";
import Avatar4 from "/assets/avatar4.svg";
import Avatar5 from "/assets/avatar5.svg";
import Avatar6 from "/assets/avatar6.svg";
import { PState } from "./Board";

interface BoardViewProps {
  p1S: PState;
  p2S: PState;
  p3S: PState;
  p4S: PState;
  p5S: PState;
  p6S: PState;
}

const BoardView = (props: BoardViewProps) => {
  return (
    <div className="w-2/3 my-32 border-yellow-500 border-8 rounded-3xl relative">
      <img className="rounded-2xl" src={Spielbrett} alt="Spielbrett" />
      <div id="f1" className="tile"></div>
      <div id="f2" className="tile"></div>
      <div id="f3" className="tile"></div>
      <div id="f4" className="tile"></div>
      <div id="f5" className="tile"></div>
      <div id="f6" className="tile"></div>
      <div id="f7" className="tile"></div>
      <div id="f8" className="tile"></div>
      <div id="f9" className="tile"></div>
      <div id="f10" className="tile"></div>
      <div id="f11" className="tile"></div>
      <div id="f12" className="tile"></div>
      <div id="f13" className="tile"></div>
      <div id="f14" className="tile"></div>
      <div id="f15" className="tile"></div>
      <div id="f16" className="tile"></div>
      <div id="f17" className="tile"></div>
      <div id="f18" className="tile"></div>
      <div id="f19" className="tile"></div>
      <div id="f20" className="tile"></div>
      <div id="f21" className="tile"></div>
      <div id="f22" className="tile"></div>
      <div id="f23" className="tile"></div>
      <div id="f24" className="tile"></div>
      <div id="f25" className="tile"></div>
      <div id="f26" className="tile"></div>
      <div id="f27" className="tile"></div>
      <div id="f28" className="tile"></div>
      <div id="f29" className="tile"></div>
      <div id="f30" className="tile"></div>
      <div id="f31" className="tile"></div>
      <div id="f32" className="tile"></div>
      <div id="f33" className="tile"></div>
      <div id="f34" className="tile"></div>
      <div id="f35" className="tile"></div>
      <div id="f36" className="tile"></div>
      <div id="f37" className="tile"></div>
      <div id="f38" className="tile"></div>
      <div id="f39" className="tile"></div>
      <div id="f40" className="tile"></div>
      <div id="f41" className="tile"></div>
      <div id="f42" className="tile"></div>
      <div id="f43" className="tile"></div>
      <div id="f44" className="tile"></div>
      <div id="f45" className="tile"></div>
      <div id="f46" className="tile"></div>
      <div id="f47" className="tile"></div>
      <div id="f48" className="tile"></div>
      <div id="f49" className="tile"></div>
      <div
        id="p1"
        className="justus"
        style={{
          top: props.p1S.top,
          left: props.p1S.left,
          transition: "all 2s",
        }}
      >
        <img src={Avatar1} />
      </div>
      <div
        id="p2"
        className="justus"
        style={{
          top: props.p2S.top,
          left: props.p2S.left,
          transition: "all 2s",
        }}
      >
        <img src={Avatar2} />
      </div>
      <div
        id="p3"
        className="justus"
        style={{
          top: props.p3S.top,
          left: props.p3S.left,
          transition: "all 2s",
        }}
      >
        <img src={Avatar3} />
      </div>
      <div
        id="p4"
        className="justus"
        style={{
          top: props.p4S.top,
          left: props.p4S.left,
          transition: "all 2s",
        }}
      >
        <img src={Avatar4} />
      </div>
      <div
        id="p5"
        className="justus"
        style={{
          top: props.p5S.top,
          left: props.p5S.left,
          transition: "all 2s",
        }}
      >
        <img src={Avatar5} />
      </div>
      <div
        id="p6"
        className="justus"
        style={{
          top: props.p6S.top,
          left: props.p6S.left,
          transition: "all 2s",
        }}
      >
        <img src={Avatar6} />
      </div>
    </div>
  );
};

export default BoardView;
