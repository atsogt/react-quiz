import React from "react";
import { ACTIONS } from "./App";
export default function NextButton({ answer, dispatch, index, numQuestions }) {
  return (
    <div>
      {answer ? (
        <button
          className="btn btn-ui"
          onClick={() => {
            dispatch({ type: ACTIONS.NEXTQUESTION });
          }}>
          Next
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
