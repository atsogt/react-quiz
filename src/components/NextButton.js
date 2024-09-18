import React from "react";
import { ACTIONS } from "./App";

export default function NextButton({ answer, dispatch, index, numQuestions }) {
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: ACTIONS.NEXTQUESTION });
        }}>
        Next
      </button>
    );
  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: ACTIONS.FINISHED });
        }}>
        Finish
      </button>
    );
  // return (
  //   <div>
  //     {index < 14 && (
  //       <button
  //         className="btn btn-ui"
  //         onClick={() => {
  //           dispatch({ type: ACTIONS.NEXTQUESTION });
  //         }}>
  //         Next
  //       </button>
  //     )}
  //     {index >= 14 && (
  //       <button
  //         className="btn btn-ui"
  //         onClick={() => {
  //           dispatch({ type: ACTIONS.FINISHED });
  //         }}>
  //         Finish
  //       </button>
  //     )}
  //   </div>
  // );
}
