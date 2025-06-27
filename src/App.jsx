import "./App.css";
import QuizCards from "./Components/QuizCards";
import QuizConfig from "./Components/QuizConfig";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Outlet></Outlet>
    </>
  );
}

export default App;
