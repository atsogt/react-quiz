import React from "react";
import { ACTIONS } from "./App";

export default function Options({ questions, dispatch, answer, points }) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {questions.options.map((option, index) => (
        // <button
        //   className={`btn btn-option ${index === answer ? "answer" : ""} ${
        //     index === questions.correctOption ? "correct" : "wrong"
        //   }`}
        //   key={option}
        //   onClick={() => {
        //     dispatch({ type: ACTIONS.NEWANSWER, payload: index });
        //   }}>
        //   {option}{" "}
        // </button>
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === questions.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => {
            dispatch({ type: ACTIONS.NEWANSWER, payload: index });
          }}>
          {option}
        </button>
      ))}
    </div>
  );
}
