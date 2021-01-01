import "./css/App.css";
import Main from "./views/Main";
import { GlobalContext } from "./context/global-context";
import { useEffect, useContext } from "react";
import { SideToggle } from "./components/aside/toggle";

function App() {
  const container = {
    minWidth: window.innerWidth,
    minHeight: window.innerHeight,
    display: "flex",
  };
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      dispatch({
        type: "TOGGLE_THEME",
      });
    }
    dispatch({
      type: "SET_READY",
      payload: 1,
    });
  }, []);
  const { themeDark, dispatch, readyState } = useContext(GlobalContext);
  const themeClass = themeDark ? " dark" : "";

  if (readyState === 0) return <div className="App" style={container}></div>;
  return (
    <div className={`App flex over-hidden${themeClass}`}>
      <div className="p-rel" style={container}>
        <SideToggle />
        <Main />
      </div>
    </div>
  );
}

export default App;
