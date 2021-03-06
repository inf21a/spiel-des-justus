import { useContext } from "react";
import { Icon, loadIcons } from "@iconify/react";

import { AudioContext } from "../Context";
import buzzer from "../../assets/sounds/buzzer.wav";

loadIcons([
  "ant-design:check-circle-filled",
  "ant-design:exclamation-circle-filled",
]);

export const ResultWrapper = (props: {
  showCorrect: boolean;
  text: string;
}) => {
  const { playAudio } = useContext(AudioContext);
  if (playAudio && !props.showCorrect) {
    const buzzerAudio = new Audio(buzzer);
    buzzerAudio.play();
  }

  return (
    <div className="w-11/12 mt-10 flex mx-auto">
      {props.showCorrect ? (
        <>
          <Icon
            icon={`ant-design:check-circle-filled`}
            className="text-green-900 m-auto"
            height="36"
          />
          <p className=" text-white font-bold break-normal m-auto text-lg text-center px-2 w-9/12">
            {props.text}
          </p>
          <Icon
            icon={`ant-design:check-circle-filled`}
            className="text-green-900 m-auto"
            height="36"
          />
        </>
      ) : (
        <>
          <Icon
            icon={`ant-design:exclamation-circle-filled`}
            className="text-red-900 m-auto"
            height="36"
          />
          <p className=" text-white font-bold break-normal m-auto text-lg text-center px-2 w-9/12">
            {props.text}
          </p>
          <Icon
            icon={`ant-design:exclamation-circle-filled`}
            className="text-red-900 m-auto"
            height="36"
          />
        </>
      )}
    </div>
  );
};
