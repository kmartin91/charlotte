import React, { useState } from "react";
import classnames from "classnames";

import "./One.scss";

const One = ({ history, className }) => {
  const [bad, setBad] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [badFirstName, setBadFirstName] = useState("");

  const onChange = (e) => {
    const { target: { value = "" } = {} } = e || {};
    setFirstName(value.toLowerCase().trim());
  };

  const onKeyUp = (e) => {
    const { keyCode } = e || {};

    // Enter
    if (keyCode === 13) onSubmit();
  };

  const onSubmit = () => {
    const isBad = firstName !== "charlotte";
    setBad(isBad);
    if (isBad) setBadFirstName(firstName);

    if (!isBad) history.push("/hey");
  };

  return (
    <div className={classnames("One", className, { One_error: bad })}>
      <div className="One__items">
        <p className="One__headLine">
          {!bad && <span>Bonjour demoiselle, jouons à un petit jeu !</span>}
          {bad && (
            <span>
              Hmm désolé <span className="One__firstName">{badFirstName}</span>{" "}
              MAIS tu n'es pas la personne que j'attends...
            </span>
          )}
        </p>
        <p className="One__label">Avant de commencer, quel est ton prénom ?</p>
        <p className="One__inputs">
          <input
            type="text"
            className="One__input"
            onChange={onChange}
            placeholder="Prénom"
            onKeyUp={onKeyUp}
          />
          <button
            className={classnames("One__button", {
              One__button_valid: firstName && firstName.length >= 1,
            })}
            onClick={onSubmit}
          >
            Valider
          </button>
        </p>
      </div>
    </div>
  );
};

export default One;
