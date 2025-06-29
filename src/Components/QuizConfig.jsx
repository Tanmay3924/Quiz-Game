import React, { useState } from "react";
import { submit } from "../Slice/QuizSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

const QuizSetup = () => {
  const [formData, setFormData] = useState({
    numberOfQuestions: "1",
    category: "",
    difficulty: "",
    type: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="container mt-5 p-4 rounded"
      style={{
        backgroundColor: "#fafafa",
        color: "#000000",
        maxWidth: "600px",
      }}
    >
      <div className="mb-3">
        <label className="form-label">Number of Questions:</label>
        <input
          type="number"
          name="numberOfQuestions"
          value={formData.numberOfQuestions}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Select Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="form-select"
        >
          <option value="any">Any Category</option>
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="12">Entertainment: Music</option>
          <option value="13">Entertainment: Musicals &amp; Theatres</option>
          <option value="14">Entertainment: Television</option>
          <option value="15">Entertainment: Video Games</option>
          <option value="16">Entertainment: Board Games</option>
          <option value="17">Science &amp; Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
          <option value="29">Entertainment: Comics</option>
          <option value="30">Science: Gadgets</option>
          <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
          <option value="32">Entertainment: Cartoon &amp; Animations</option>
          {/* Add more categories as needed */}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Select Difficulty:</label>
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="form-select"
        >
          <option value="any">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Select Type:</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Any Type</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True / False</option>
        </select>
      </div>

      <Link
        className="btn btn-primary w-100"
        onClick={() => dispatch(submit(formData))}
        to="/quiz"
        // quizconfig={quizconfig(formData)}
      >
        Start Quiz
      </Link>
    </div>
  );
};

export default QuizSetup;
