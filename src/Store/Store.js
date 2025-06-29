import { configureStore } from "@reduxjs/toolkit";
import QuizReducer from "../Slice/QuizSlice";

const store = configureStore({
  reducer: {
    Quiz: QuizReducer,
  },
});

export default store;
