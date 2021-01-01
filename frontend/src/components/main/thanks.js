import { useState, useContext } from "react";
import { saveHandle } from "../../utils";
import { Checkbox, IconBtn } from "../default/button";
import { Input } from "../default/input";
import { Detail } from "../default/misc";
import { ReactComponent as ShareIcon } from "../../icons/share-fill.svg";
import { ReactComponent as CheckIcon } from "../../icons/check.svg";
import { ReactComponent as TwitterIcon } from "../../icons/logo-twitter.svg";
import { ReactComponent as RestartIcon } from "../../icons/arrow-counterclockwise.svg";
import { GlobalContext } from "../../context/global-context";
import { animated, useSpring } from "react-spring";

export const Thanks = () => {
  const [ready, setReady] = useState(false);

  return (
    <div className={`p-rel tks`}>
      <RestartBtn hidden={!ready} />
      <Header />
      <Handle setReady={() => setReady(true)} ready={ready} />
    </div>
  );
};

const Header = () => {
  const { cashAmount } = useContext(GlobalContext).main;
  const animStart = {
    opacity: 0,
    transform: "translateX(200px)",
  };

  const animEnd = {
    opacity: 1,
    transform: "translateY(0)",
  };

  const h1Props = useAnimation(animStart, animEnd, {
    config: { friction: 13 },
    delay: 600,
  });
  const h3Props = useAnimation(animStart, animEnd, {
    config: { friction: 13 },
    delay: 1400,
  });

  return (
    <div className="mb-2">
      <animated.h1 className="font-7 weight-400 colorable" style={h1Props}>
        Congratulations,
      </animated.h1>
      <animated.h3 className="font-4 weight-400 colorable" style={h3Props}>
        You've succesfully wasted ${cashAmount}.
      </animated.h3>
    </div>
  );
};

const Handle = ({ setReady, ready }) => {
  const [handle, setHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await saveHandle(handle);
    setLoading(false);
    if (error) return setError(error);
    else return setReady();
  };
  const startProps = {
    opacity: 0,
    transform: "translateX(200px)",
  };
  const endProps = {
    opacity: 1,
    transform: "translateX(0)",
  };
  const animProps = useAnimation(startProps, endProps, {
    config: { friction: 24 },
    delay: 3000,
  });
  return (
    <animated.form
      onSubmit={handleSubmit}
      className="flex flex-column y-gap-2"
      style={animProps}
    >
      <div className="flex x-gap-2">
        <div className="p-rel flex flex-column y-gap-1">
          <Input
            Prefix={TwitterIcon}
            placeholder="handle"
            className="handle-input mb-1"
            value={handle}
            onChange={e => setHandle(e.target.value)}
            disabled={loading || ready}
            required
          />
          <Detail
            text={
              ready
                ? "Saved!"
                : loading
                ? "Processing..."
                : error
                ? error
                : "You may receive a shoutout."
            }
            color={error ? "red" : undefined}
          />
        </div>
        <SubmitBtn disabled={loading} hidden={ready} />
        <ShareBtn hidden={!ready} />
      </div>
    </animated.form>
  );
};

const SubmitBtn = ({ hidden, ...rest }) => {
  return (
    <IconBtn
      Icon={CheckIcon}
      className={hidden ? "hidden" : undefined}
      {...rest}
    />
  );
};
const ShareBtn = ({ hidden }) => {
  return <IconBtn Icon={ShareIcon} className={hidden ? "hidden" : undefined} />;
};

const RestartBtn = ({ hidden }) => {
  const { dispatch } = useContext(GlobalContext);
  const style = {
    top: -53,
  };
  function restart() {
    dispatch({
      type: "BACK_TO_START",
    });
  }
  return (
    <div className={hidden ? "hidden" : "p-abs"} style={style}>
      <IconBtn Icon={RestartIcon} onClick={restart} />
    </div>
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
