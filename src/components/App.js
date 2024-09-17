import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import ProgressBar from "./ProgressBar";
import FinishScreen from "./FinishScreen";
//upload the git before the end of day please

export const ACTIONS = {
  LOADING: "loading",
  DATARECEIVED: "dataReceived",
  DATAFAILED: "dataFailed",
  ACTIVE: "active",
  NEWANSWER: "newAnswer",
  NEXTQUESTION: "nextQuestion",
  FINISHED: "finished",
};

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOADING:
      return { ...state, status: ACTIONS.LOADING };
    case ACTIONS.DATARECEIVED:
      return {
        ...state,
        questions: action.payload,
        status: ACTIONS.DATARECEIVED,
      };
    case ACTIONS.DATAFAILED:
      return { ...state, status: ACTIONS.DATAFAILED };
    case "start":
      return { ...state, status: ACTIONS.ACTIVE };
    case ACTIONS.NEWANSWER:
      //current question... getting it from current state
      // const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload.index,
        points: action.payload.earnedPoint,
      };
    case ACTIONS.NEXTQUESTION:
      return {
        ...state,
        answer: null,
        index: state.index + 1,
      };
    case ACTIONS.FINISHED:
      return { ...state, status: ACTIONS.FINISHED };
    default:
      throw new Error("Action unknown");
  }
};

function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );
  //derived state
  const questionCount = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(() => {
    dispatch({ type: ACTIONS.LOADING });
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: ACTIONS.DATARECEIVED, payload: data }))
      .catch((err) => dispatch({ type: ACTIONS.DATAFAILED }));
  }, []);

  return (
    <div>
      <Header />
      <Main>
        {status === ACTIONS.LOADING && <Loader />}{" "}
        {status === ACTIONS.DATARECEIVED && (
          <StartScreen count={questionCount} dispatch={dispatch} />
        )}
        {status === ACTIONS.ACTIVE && (
          <>
            <ProgressBar
              index={index}
              count={questionCount}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
              points={points}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={questionCount}
            />
          </>
        )}
        {status === ACTIONS.DATAFAILED && <Error />}
        {status === ACTIONS.FINISHED && (
          <FinishScreen points={points} maxPoints={maxPoints} />
        )}
      </Main>
    </div>
  );
}

export default App;
