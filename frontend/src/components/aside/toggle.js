import { Fragment, useContext } from "react";
import { GlobalContext } from "../../context/global-context";
import { IconBtn } from "../default/button";
import { ReactComponent as MoonIcon } from "../../icons/moon.svg";
import { ReactComponent as PodiumIcon } from "../../icons/podium.svg";
import { ReactComponent as InfoIcon } from "../../icons/information-circle.svg";

const ThemeToggle = () => {
  const { dispatch } = useContext(GlobalContext);
  const toggleDark = () => {
    dispatch({
      type: "TOGGLE_THEME",
    });
  };
  return (
    <div className="theme-toggle-container p-abs">
      <button
        className="switch p-rel in-regular-soft clickable"
        onClick={toggleDark}
      >
        <div className="toggle-ball regular-soft m-auto p-abs flex justify-center align-center br-6 z-1">
          <MoonIcon className="toggle-icon icon colorable" />
        </div>
      </button>
    </div>
  );
};

const BoardToggle = () => {
  return (
    <div className="board-toggle-container">
      <IconBtn Icon={PodiumIcon} />
    </div>
  );
};

const InfoToggle = () => {
  const { dispatch, sideOpen } = useContext(GlobalContext);
  function handleClick() {
    dispatch({
      type: "TOGGLE_SIDE",
      payload: sideOpen === "info" ? null : "info",
    });
  }
  return (
    <div className="info-toggle-container">
      <IconBtn Icon={InfoIcon} onClick={handleClick} />
    </div>
  );
};

export const SideToggle = () => {
  const { readyState } = useContext(GlobalContext);
  const visible = readyState === 2;
  return (
    <div className={`fadeIn${visible ? "" : " hidden"}`}>
      <ThemeToggle />
    </div>
  );
};
