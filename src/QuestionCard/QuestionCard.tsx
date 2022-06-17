import { useState } from "react";
import { ChoiceQuestion } from "./ChoiceQuestion";
import { OpenQuestion } from "./OpenQuestion";
import { PolarQuestion } from "./PolarQuestion";

export const QuestionCard = () => {
  const [isOpenO, setIsOpenO] = useState(false);
  const [isOpenP, setIsOpenP] = useState(false);
  const [isOpenC, setIsOpenC] = useState(false);
  const [isOpenG, setIsOpenG] = useState(false);
  const togglePopupO = () => {
    setIsOpenO(!isOpenO);
  };
  const togglePopupP = () => {
    setIsOpenP(!isOpenP);
  };
  const togglePopupC = () => {
    setIsOpenC(!isOpenC);
  };
  const togglePopupG = () => {
    setIsOpenG(!isOpenG);
  };

  let question: any = {
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  };
  return (
    <>
      <input
        type="button"
        value="Click to Open OpenQuestion"
        onClick={togglePopupO}
      />
      {isOpenO && (
        <>
          <div className="popup fix-centered">
            <div className="question box border">
              <p>{question.question}</p>
            </div>
            {(question.answer = "test")}
            <OpenQuestion question={question} closePopup={togglePopupO} />
          </div>
        </>
      )}
      <input
        type="button"
        value="Click to Open PolarQuestion"
        onClick={togglePopupP}
      />
      {isOpenP && (
        <>
          <div className="popup fix-centered">
            <div className="question box border">
              <p>{question.question}</p>
            </div>
            {(question.answer = true)}
            <PolarQuestion question={question} closePopup={togglePopupP} />
          </div>
        </>
      )}
      <input type="button" value="Click to Open Popup" onClick={togglePopupC} />
      {isOpenC && (
        <>
          <div className="popup fix-centered">
            <div className="question box border">
              <p>{question.question}</p>
            </div>
            {(question.options = ["test", "ABC", "DEF", "Ich bin der Beste"])}
            <ChoiceQuestion question={question} closePopup={togglePopupC} />
          </div>
        </>
      )}
    </>
  );
};
