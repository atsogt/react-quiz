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
import Timer from "./Timer";
import Footer from "./Footer";
//upload the git before the end of day please

export const ACTIONS = {
  LOADING: "loading",
  DATARECEIVED: "dataReceived",
  DATAFAILED: "dataFailed",
  ACTIVE: "active",
  NEWANSWER: "newAnswer",
  NEXTQUESTION: "nextQuestion",
  FINISHED: "finished",
  START: "start",
  RESTART: "restart",
  TICK: "tick",
};

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const SEC_PER_QUESTIONS = 30;

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
    case ACTIONS.START:
      return {
        ...state,
        status: ACTIONS.ACTIVE,
        secondsRemaining: state.questions.length * SEC_PER_QUESTIONS,
      };
    case ACTIONS.NEWANSWER:
      //current question... getting it from current state
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case ACTIONS.NEXTQUESTION:
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case ACTIONS.FINISHED:
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case ACTIONS.TICK:
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? ACTIONS.FINISHED : state.status,
      };
    case ACTIONS.RESTART:
      // questions: [],
      // status: "loading",
      // index: 0,
      // answer: null,
      // points: 0,
      // highscore: 0,

      // return {
      //   ...initialState,
      //   questions: state.questions,
      //   status: ACTIONS.DATARECEIVED,
      //   highscore: action.payload,
      // };
      return {
        ...state,
        status: ACTIONS.DATARECEIVED,
        index: 0,
        answer: null,
        points: 0,
        highscore: action.payload,
        secondsRemaining: 5000,
      };
    default:
      throw new Error("Action unknown");
  }
};

function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
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
    <div className="app">
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
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={questionCount}
              />
            </Footer>
          </>
        )}
        {status === ACTIONS.DATAFAILED && <Error />}
        {status === ACTIONS.FINISHED && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
