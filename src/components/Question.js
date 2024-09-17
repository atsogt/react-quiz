import React from "react";
import Options from "./Options";

export default function Question({ questions, dispatch, answer, points }) {
  console.log(questions);
  return (
    <div>
      <h4>{questions.question}</h4>
      <Options
        questions={questions}
        dispatch={dispatch}
        answer={answer}
        points={points}
      />
    </div>
  );
}
