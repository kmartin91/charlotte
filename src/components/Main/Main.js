import React, { useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import One from "../Steps/One/One";
import Two from "../Steps/Two/Two";
import Third from "../Steps/Third/Third";

import "./Main.scss";

const AnimatedSwitch = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition key={location.key} classNames="slide" timeout={1000}>
      <Switch location={location}>
        <Route path="/" component={One} className="Component" exact />
        <Route path="/hey" component={Two} className="Component" />
        <Route path="/tiptop" component={Third} className="Component" />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
));

const Main = () => {
  return (
    <div className="Main">
      <BrowserRouter>
        <AnimatedSwitch />
      </BrowserRouter>
    </div>
  );
};

export default Main;
