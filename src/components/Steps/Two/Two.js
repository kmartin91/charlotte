import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { useInterval } from "react-interval-hook";

import "./Two.scss";

const Two = ({ history }) => {
  const [currentSentence, setCurrentSentence] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [answer, setAnwser] = useState(false);
  const [bad, setBad] = useState(false);

  const { stop } = useInterval(() => {
    const newCurrentSentence = currentSentence + 1;

    if (newCurrentSentence < firstSentence.length) {
      setCurrentSentence(newCurrentSentence);
    } else {
      stop();
    }
  }, 5000);

  const timerInput = setTimeout(() => setShowInput(true), 22000);

  useEffect(() => {
    return () => {
      clearTimeout(timerInput);
      stop();
    };
  }, []);

  const onSubmit = () => {
    console.log({ answer });
    if (!answer) {
      setBad(true);
    } else {
      setBad(false);
      history.push("/tiptop");
    }
  };

  const firstSentence = [
    "Hello Charlotte",
    "Bienvenue sur ce site spécialement conçu pour toi",
    "Je te propose quelques petits jeux",
    "Pour trouver notre lieu & date de premier rendez-vous",
    "Es-tu partante pour ça ?",
  ];

  return (
    <div className={classnames("Two", { Two_bad: bad })}>
      <div className="Two__items">
        {bad && (
          <React.Fragment>
            <div className="Two__tuile">
              Aie la tuile, dommage :( <p>Tu peux toujours changer d'avis...</p>
            </div>
            <p className="Two__inputs">
              <div className="Two__inputCheckbox">
                <input
                  type="checkbox"
                  className="Two__checkbox"
                  id="answer"
                  name="answer"
                  onChange={setAnwser}
                  value={answer}
                />
                <label for="answer">Oui</label>
              </div>
              <button className={classnames("Two__button")} onClick={onSubmit}>
                Valider
              </button>
            </p>
          </React.Fragment>
        )}
        {!bad && (
          <div className="Two__first">
            <div className="Two__sentence">
              {firstSentence[currentSentence]}
            </div>
            {showInput && (
              <p className="Two__inputs">
                <div className="Two__inputCheckbox">
                  <input
                    type="checkbox"
                    className="Two__checkbox"
                    id="answer"
                    name="answer"
                    onChange={setAnwser}
                    value={answer}
                  />
                  <label for="answer">Oui</label>
                </div>
                <button
                  className={classnames("Two__button")}
                  onClick={onSubmit}
                >
                  Valider
                </button>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Two;
