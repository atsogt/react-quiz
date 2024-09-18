import React from "react";
import { useEffect } from "react";
import { ACTIONS } from "./App";

export default function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      // if (secondsRemaining < 0) dispatch({ type: ACTIONS.FINISHED });
      dispatch({ type: ACTIONS.TICK });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}
