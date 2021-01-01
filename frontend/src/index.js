import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import "./css/utils.css";
import "./css/colors.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GlobalProvider } from "./context/global-context";

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
