import React, { useState, useEffect, useRef } from "react";
import classnames from "classnames";
import { useInterval } from "react-interval-hook";
import music from "../../../../assets/sounds/music.mp3";
import "./Third.scss";

const Third = ({ history, className }) => {
  const [currentSentence, setCurrentSentence] = useState(0);
  const audioRef = useRef();
  const [showInput, setShowInput] = useState(false);
  const [answer, setAnwser] = useState("");
  const [bad, setBad] = useState(false);
  const [information, setInformation] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showGif, setShowGif] = useState(false);

  const { stop } = useInterval(() => {
    const newCurrentSentence = currentSentence + 1;

    if (newCurrentSentence < sentences.length) {
      setCurrentSentence(newCurrentSentence);
    } else {
      stop();
    }
  }, 5000);

  const timerInput = setTimeout(() => setShowInput(true), 8000);

  useEffect(() => {
    return () => {
      clearTimeout(timerInput);
      stop();
    };
  }, []);

  const sentences = [
    "Super !! Et si on mettait de la musique ?",
    "Pas mal non ? Allez on commence vraiment",
  ];

  const questions = [
    "Quel est mon prénom ? (facile) , si tu ne le sais pas écris Rodrigo",
    "Quel est mon âge ?",
    "Combien ai-je de frère(s) et soeur(s) (additionne le total) ?",
    "Où ai-je tiré mon feu d'artifice ?",
  ];

  const answers = [
    "kevin|kévin|rodrigo",
    "29",
    "2",
    "torcy|torcie|torsy|torcee",
  ];

  const onChange = (e) => {
    const { target: { value = "" } = {} } = e || {};
    console.log({ e, targ: e.target, v: e.target.value });
    setAnwser(value.toLowerCase());
  };

  const onKeyUp = (e) => {
    const { keyCode } = e || {};

    // Enter
    if (keyCode === 13) onSubmit();
  };

  const onSubmit = () => {
    const isGood = answers[currentQuestion]
      .split("|")
      .find((el) => el === answer);

    if (isGood) {
      setBad(false);
      setInformation("BONNE RÉPONSE !");
      setAnwser("");
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowGif(true);
      }
    } else {
      setBad(true);
      setInformation(`Et non la bonne réponse n'est pas ${answer}`);
    }
  };

  return (
    <div className={classnames("Third", className, { Third_bad: bad })}>
      <div className="Third__items">
        {!showGif && information}
        {showGif && (
          <React.Fragment>
            <div className="Third__wwell">Well done ! </div>
            <img
              src="https://media.giphy.com/media/tzMAiFxRNLtII/giphy.gif"
              alt="Well done !"
            />
          </React.Fragment>
        )}
        {!showInput && sentences[currentSentence]}
        {showInput && !showGif && (
          <React.Fragment>
            <div className="Third__question">{questions[currentQuestion]}</div>

            <div className="Third__inputs">
              <input
                type="text"
                className="Third__input"
                onChange={onChange}
                placeholder="Reponse"
                onKeyUp={onKeyUp}
                value={answer}
              />
              <button
                className={classnames("Third__button", {
                  Third__button_valid: answer && answer.length >= 1,
                })}
                onClick={onSubmit}
              >
                Valider
              </button>
            </div>
          </React.Fragment>
        )}
        <audio ref={audioRef} src={music} autoPlay />
      </div>
    </div>
  );
};

export default Third;
