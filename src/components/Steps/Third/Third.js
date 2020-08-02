import React, { useState, useEffect, useRef } from "react";
import classnames from "classnames";
import { useInterval } from "react-interval-hook";
import { Helmet } from "react-helmet";
import music from "../../../../assets/sounds/music.mp3";
import TicTacToe from "../../Games/TicTacToe/TicTacToe";
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
  const [currentStep, setCurrentStep] = useState(0);
  const [resultMorpion, setResultMorpion] = useState(null);

  const { stop } = useInterval(() => {
    const newCurrentSentence = currentSentence + 1;

    if (newCurrentSentence < sentences.length) {
      setCurrentSentence(newCurrentSentence);
    } else {
      stop();
    }
  }, 5000);

  const timerInput = setTimeout(() => setShowInput(true), 12000);
  let timerInput2, timerInput3;

  useEffect(() => {
    return () => {
      clearTimeout(timerInput);
      clearTimeout(timerInput2);
      clearTimeout(timerInput3);
      stop();
    };
  }, []);

  const sentences = [
    "Super !! Et si on mettait de la musique ?",
    "Pas mal non ? Allez on commence vraiment",
  ];

  const questions = [
    "Quel est mon prénom ? (facile) , si tu ne le sais pas écrit Rodrigo",
    "Quel est mon âge ?",
    "Combien ai-je de frère(s) et soeur(s) (additionne le total) ?",
    "Où ai-je tiré mon feu d'artifice ?",
    "Cite une de mes collections",
    "De quelle région vient ma famille ?",
    "Combien font ((207 * 1411) / (1992 + 1990) - (185 - 165)) / 8 (mettre que l'unité) ?",
    "As-tu remarqué que le cacul était spécial ? ( répondre 'oui' ou 'non')",
    "Il était constitué de nos dates de naissance + années de naissance ainsi que nos tailles respectives (répondre 'mais non')",
    "Et dernier détail, le résultat est le jour de notre premier rendez-vous (j'espère que tu l'as noté, si oui c'est la réponse à saisir)",
  ];

  const answers = [
    "kevin|kévin|rodrigo",
    "29",
    "2",
    "torcy|torsee|torsea|torci|torcie|thorsie",
    "rubiks|rubik's cube|cube|montre|voiture|youngtimer|montres|voitures|youngtimers",
    "auvergne|idf|île de france",
    "6",
    "oui|non|'oui'|'non'",
    "mais non|'mais non'",
    "6",
  ];

  const onChange = (e) => {
    const { target: { value = "" } = {} } = e || {};
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
        setCurrentQuestion(0);
        timerInput2 = setTimeout(() => setCurrentStep(1), 3000);
      }
    } else {
      setBad(true);
      setInformation(`Et non la bonne réponse n'est pas ${answer}`);
    }
  };

  const onFinishTicTacToe = (response) => {
    console.log(response);
    if (response === "win") {
      setResultMorpion("Bravo à toi");
      setBad(false);
      timerInput3 = setTimeout(
        () => !console.log("hey") && setCurrentStep(2),
        3000
      );
    } else if (response === "lose") {
      setResultMorpion("Aie tu as perdu, recommence");
      setBad(true);
    } else {
      setResultMorpion(
        "Mon dieu quel partie intensive, malheureusement seule la victoire compte"
      );
      setBad(true);
    }
  };

  return (
    <div
      className={classnames("Third", className, {
        Third_bad: bad,
        Third_first: currentStep === 0,
        Third_second: currentStep === 1,
        Third_third: currentStep === 2,
      })}
    >
      <div className="Third__items">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Et c'est parti pour quelques questions</title>
        </Helmet>
        {currentStep === 0 && (
          <React.Fragment>
            {!showGif && information}
            {showGif && (
              <React.Fragment>
                <div className="Third__wwell">
                  Super on a le jour, jouons pour trouver le lieu !
                </div>
                <img
                  src="https://media.giphy.com/media/tzMAiFxRNLtII/giphy.gif"
                  alt="Well done !"
                />
              </React.Fragment>
            )}
            {!showInput && sentences[currentSentence]}
            {showInput && !showGif && (
              <React.Fragment>
                <div className="Third__question">
                  {questions[currentQuestion]}
                </div>

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
          </React.Fragment>
        )}
        {currentStep === 1 && (
          <div className="Third__nextStep">
            <Helmet>
              <meta charSet="utf-8" />
              <title>Plus qu'une étape</title>
            </Helmet>
            <div className="Third__information">
              Essaie de gagner ce morpion
            </div>
            {resultMorpion && (
              <div className="Third__result">{resultMorpion}</div>
            )}

            <TicTacToe
              onResetBad={() => setBad(false)}
              onFinish={(response) => onFinishTicTacToe(response)}
            />
          </div>
        )}
        {currentStep === 2 && (
          <div className="Third__nextStep">
            <Helmet>
              <meta charSet="utf-8" />
              <title>Félicitation tu as réussi</title>
            </Helmet>
            <div className="Third__information">
              Bravo à toi tu as réussi toutes les épreuves.
              <div className="Third__info">
                Quand ? <span className="Third__bold">Le 6 Août 2020</span>
              </div>
              <div className="Third__info">
                A quelle heure ? <span className="Third__bold">20h</span>
              </div>
              <div className="Third__info">
                Où ? <span className="Third__bold">Observatoire de Meudon</span>
              </div>
            </div>
          </div>
        )}
        <audio ref={audioRef} src={music} autoPlay />
      </div>
    </div>
  );
};

export default Third;
