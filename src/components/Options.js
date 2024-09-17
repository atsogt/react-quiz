import React from "react";
import { ACTIONS } from "./App";

export default function Options({ questions, dispatch, answer, points }) {
  const hasAnswered = answer !== null;
  const { options, correctOption, points: point } = questions;
  const handleClick = (index) => {
    const earnedPoint = index === correctOption ? points + point : points;
    dispatch({ type: ACTIONS.NEWANSWER, payload: { index, earnedPoint } });
  };
  return (
    <div className="options">
      {options.map((option, index) => (
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
            handleClick(index);
          }}>
          {option}
        </button>
      ))}
    </div>
  );
}
