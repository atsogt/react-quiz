import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
//upload the git before the end of day please

export const ACTIONS = {
  LOADING: "loading",
  DATARECEIVED: "dataReceived",
  DATAFAILED: "dataFailed",
  ACTIVE: "active",
  NEWANSWER: "newAnswer",
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
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption,
      };
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
  // const questionCount = 15;

  useEffect(() => {
    dispatch({ type: ACTIONS.LOADING });
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: ACTIONS.DATARECEIVED, payload: data }))
      .catch((err) => dispatch({ type: ACTIONS.DATAFAILED }));

    // const fetchData = async () => {
    //   const res = await fetch("http://localhost:8000/questions");
    //   const data = await res.json();
    //   console.log(data);
    //   return data;
    // };
    // fetchData();
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
          <Question
            questions={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
        {/* {questions.map((q) => (
          <div>{q}</div>
        ))} */}
        {status === ACTIONS.DATAFAILED && <Error />}
      </Main>
    </div>
  );
}

export default App;
