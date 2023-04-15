import { useEffect, createContext, useReducer } from "react";
import { TimeReducer } from "../Components/Reducers/TimeReducer";

const TimeContext = createContext();

export const TimeProvider = ({ children }) => {
  const initialState = {
    countDown: "",
    endDate: new Date("April 20, 2023, 11:59:59").getTime(),
  };
  const [state, dispatch] = useReducer(TimeReducer, initialState);

  useEffect(() => {
    const count = setInterval(() => {
      let now = new Date().getTime();

      let diff = state.endDate - now;
      let days = Math.floor(diff / (1000 * 60 * 60 * 24));
      let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((diff % (1000 * 60)) / 1000);
      const result = `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
      dispatch({ type: "COUNT_DOWN", payload: result });

      if (diff <= 0) {
        clearInterval(count);
        dispatch({ type: "STOP_COUNT", payload: "Expires" });
      }
    }, 1000);
  }, []);

  return (
    <TimeContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </TimeContext.Provider>
  );
};

export default TimeContext;
