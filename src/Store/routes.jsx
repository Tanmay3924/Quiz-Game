import { createBrowserRouter } from "react-router";
import QuizCards from "../Components/QuizCards";
import QuizConfig from "../Components/QuizConfig";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <QuizConfig />,
      },
      {
        path: "/Quiz",
        element: <QuizCards />,
      },
    ],
  },
]);

export default router;
