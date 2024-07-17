import { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import { useReducer } from "react";
import { type } from "@testing-library/user-event/dist/type";

const initialState = {
  questions: [],
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    default:
      throw new Error("Action Unknown");
  }
}

export default function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => console.error("Error"));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        <p>Main section here</p>
      </Main>
    </div>
  );
}
