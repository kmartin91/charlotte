import React from "react";
import ReactDOM from "react-dom";
import Main from "./src/components/Main/Main";

// First render
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

// All resize
window.addEventListener("resize", () => {
  const vh2 = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh2}px`);
});

ReactDOM.render(<Main />, document.getElementById("root"));
