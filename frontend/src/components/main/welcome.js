import { useRef, useContext, useState } from "react";
import { ReactComponent as ArrowRight } from "../../icons/arrow-right.svg";
import { validateCash } from "../../utils";
import { IconBtn } from "../default/button";
import { InputWithRef } from "../default/input";
import { Detail } from "../default/misc";
import { useSpring, animated } from "react-spring";
import { GlobalContext } from "../../context/global-context";

export const Welcome = () => {
  return (
    <div className={`p-rel wq`}>
      <Header />
      <PayForm />
    </div>
  );
};

const Header = () => {
  const animStart = {
    opacity: 0,
    transform: "translateY(100px)",
  };

  const animEnd = {
    opacity: 1,
    transform: "translateY(0)",
  };

  const h1Props = useAnimation(animStart, animEnd, {
    config: { friction: 17 },
    delay: 500,
  });
  const h3Props = useAnimation(animStart, animEnd, {
    config: { friction: 17 },
    delay: 1200,
  });

  return (
    <div className="mb-2">
      <animated.h1 className="font-8 weight-400 colorable" style={h1Props}>
        Good Morning,
      </animated.h1>
      <animated.h3 className="font-4 weight-400 colorable" style={h3Props}>
        How much money would you like to waste today?
      </animated.h3>
    </div>
  );
};

const PayForm = () => {
  const [error, setError] = useState("");
  const inputRef = useRef();
  const { dispatch } = useContext(GlobalContext);

  const startProps = {
    opacity: 0,
    transform: "translateY(80px)",
  };
  const endProps = {
    opacity: 1,
    transform: "translateY(0)",
  };

  const handleRest = e => {
    dispatch({
      type: "SET_READY",
      payload: 2,
    });
  };

  const animProps = useAnimation(startProps, endProps, {
    config: { friction: 30 },
    delay: 1900,
    onRest: handleRest,
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (!inputRef.current) return;
    setError("");
    const cash = inputRef.current.value;
    const { error } = validateCash(cash);
    if (error) return setError(error);
    else {
      dispatch({
        type: "MOVE_TO_PAY",
        payload: { cashAmount: Number(cash) },
      });
    }
  };
  const handleKey = e => {
    const acceptableKeys = ["Enter", "Backspace", "ArrowRight", "ArrowLeft"];
    if (e.key === " " || (isNaN(e.key) && !acceptableKeys.includes(e.key))) {
      e.preventDefault();
    }
  };
  return (
    <animated.form
      className="flex x-gap-2 w-max m-auto"
      onSubmit={handleSubmit}
      style={animProps}
    >
      <div className="p-rel">
        <InputWithRef
          type="text"
          className="pay-input in-alt-soft"
          prefix="$"
          placeholder="0.00"
          ref={inputRef}
          onKeyDown={handleKey}
          required
        />
        <Detail text={error} color="red" />
      </div>
      <IconBtn Icon={ArrowRight} type="submit" className="pay-btn alt-soft" />
    </animated.form>
  );
};

const useAnimation = (start, end, options) => {
  const { direction } = useContext(GlobalContext).main;
  const shouldAnimate = direction === "right";
  const params = shouldAnimate ? start : end;
  const [props, setProps, stop] = useSpring(() => params);
  if (shouldAnimate) setProps({ ...end, ...options });
  return props;
};
