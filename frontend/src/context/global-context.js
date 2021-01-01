import { createContext, useReducer } from "react";

const initalConfig = {
  themeDark: false,
  readyState: 0,
  sideOpen: null,
  main: {
    cashAmount: null,
    direction: "right",
    stage: 1,
  },
};

export const GlobalContext = createContext(initalConfig);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initalConfig);
  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case "MOVE_TO_PAY":
      return {
        ...state,
        main: {
          cashAmount: action.payload.cashAmount,
          direction: "right",
          stage: 2,
        },
      };
    case "BACK_TO_CASH":
      return {
        ...state,
        main: {
          ...state.main,
          direction: "left",
          stage: 1,
        },
      };
    case "MOVE_TO_THANKS":
      return {
        ...state,
        main: {
          ...state.main,
          direction: "right",
          stage: 3,
        },
      };
    case "BACK_TO_START":
      return {
        ...state,
        main: {
          ...state.main,
          direction: "left",
          stage: 1,
        },
      };
    case "TOGGLE_THEME":
      return {
        ...state,
        themeDark: !state.themeDark,
      };
    case "TOGGLE_SIDE":
      return {
        ...state,
        sideOpen: action.payload,
      };

    case "SET_READY":
      return {
        ...state,
        readyState: action.payload,
      };
    default:
      return state;
  }
};
