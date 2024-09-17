// import { type } from "@testing-library/user-event/dist/type";
import { useReducer } from "react";

const ACTIONS = {
  DEC: "dec",
  INC: "inc",
  SETCOUNT: "setCount",
  SETSTEP: "setStep",
  RESET: "reset",
};

//costume Hook to encapsulate useReducer
// const useReducerOwn = function (reducer, initial) {
//   const [value, setValue] = useState(initial);

//   const dispatch = function (action) {
//     const updatedState = reducer(value, action);
//     setValue(updatedState);
//   };

//   return [value, dispatch];
// };

const initialState = { count: 0, step: 1 };

const reducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {
    case ACTIONS.DEC:
      return { ...state, count: state.count - state.step };
    case ACTIONS.INC:
      return { ...state, count: state.count + state.step };
    case ACTIONS.SETCOUNT:
      return { ...state, count: action.payload };
    case ACTIONS.SETSTEP:
      return { ...state, step: action.payload };
    case ACTIONS.RESET:
      return initialState;
    default:
      return null;
  }
};

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: ACTIONS.DEC });
  };

  const inc = function () {
    dispatch({ type: ACTIONS.INC });
  };

  const defineCount = function (e) {
    dispatch({ type: ACTIONS.SETCOUNT, payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: ACTIONS.SETSTEP, payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: ACTIONS.RESET });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
