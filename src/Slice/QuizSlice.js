import { createSlice } from "@reduxjs/toolkit";
const QuizSlice = createSlice({
  name: "booking",
  initialState: {
    config: {
      numberOfQuestions: "1",
      category: "",
      difficulty: "",
      type: "",
    },
    showResult: false,
  },

  reducers: {
    submit(state, action) {
      state.config = action.payload;
      // console.log(action);
    },
    showResult1(state, action) {
      state.showResult = action.payload;
    },
  },
});
export const { submit, showResult1 } = QuizSlice.actions;
export default QuizSlice.reducer;
