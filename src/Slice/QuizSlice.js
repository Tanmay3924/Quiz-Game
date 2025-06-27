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
  },

  reducers: {
    submit(state, action) {
      state.config = action.payload;
      // console.log(action);
    },
  },
});
export const { submit } = QuizSlice.actions;
export default QuizSlice.reducer;
