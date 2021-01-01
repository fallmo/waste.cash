import { Fragment, useState, useContext, useEffect, useRef } from "react";
import { useTransition, animated } from "react-spring";
import { Button } from "../components/default/button";
import { Pay } from "../components/main/pay";
import { Thanks } from "../components/main/thanks";
import { Welcome } from "../components/main/welcome";
import { GlobalContext } from "../context/global-context";

function Main() {
  const { stage } = useContext(GlobalContext).main;

  return (
    <div className="flex-1 flex justify-center align-center">
      <StepNav show={stage === 1}>
        <Welcome />
      </StepNav>
      <StepNav show={stage === 2}>
        <Pay />
      </StepNav>
      <NonStep show={stage === 3}>
        <Thanks />
      </NonStep>
    </div>
  );
}

export default Main;

const StepNav = ({ children, show }) => {
  const { direction } = useContext(GlobalContext).main;
  const [init, setInit] = useState(false);
  let fromX = {
    opacity: 0,
    transform: "translateX(50vw)",
  };
  let leaveX = { opacity: 0, transform: "translateX(-50vw)" };
  if (direction === "left") [fromX, leaveX] = [leaveX, fromX];
  const transitions = useTransition(show, null, {
    immediate: !init,
    from: { position: "absolute", ...fromX },
    enter: { opacity: 1, transform: "translateX(0)" },
    leave: { ...leaveX },
  });

  useEffect(() => {
    setInit(true);
  }, []);
  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div key={key} style={props}>
          {children}
        </animated.div>
      )
  );
};

const NonStep = ({ children, show }) => {
  if (show) return children;
  else return null;
};
