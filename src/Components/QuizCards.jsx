import { useEffect, useState } from "react";

import { shuffle, decodeHtml } from "./Utils/Helper";
import { useSelector } from "react-redux";

const QuizCards = () => {
  const config = useSelector((state) => {
    return state.Quiz.config;
  });
  // console.log(config);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  let s = localStorage.getItem("score");
  let sc = (score / questions.length) * 100;
  const handleSubmit = () => {
    const currentQuestion = questions[currentIndex];
    if (selectedOption === currentQuestion.answer) {
      setScore(score + 1);
      if (score > s) {
        // sc = (score / questions.length) * 100;
        localStorage.setItem("score", JSON.stringify(sc));
      }
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null); // reset for next question
    } else {
      setShowResult(true); // quiz finished
    }
  };

  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=${config.numberOfQuestions}&category=${config.category}&difficulty=${config.difficulty}&type=${config.type}`
    )
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.results.map((q) => {
          const options = [...q.incorrect_answers, q.correct_answer];
          return {
            question: decodeHtml(q.question),
            options: shuffle(options),
            answer: q.correct_answer,
          };
        });
        setQuestions(formatted);
      })
      .catch((error) => console.error("Error fetching quiz:", error));
  }, []);

  return (
    <>
      {/* {console.log(
        `https://opentdb.com/api.php?amount=${config.numberOfQuestions}&category=${config.category}&difficulty=${config.difficulty}&type=${config.type}`
      )} */}
      <div className="Tanmay">
        {" "}
        {showResult ? (
          <div className="container text-center mt-5">
            <h2>Quiz Finished!</h2>
            <p>
              Your Score for this game is : {sc}% ( {score} / {questions.length}
              )
            </p>
            {/* <p>Your highest score was {s}% </p> */}
          </div>
        ) : questions.length > 0 ? (
          <div className="card container ca">
            <div className="shadow-lg border-0 p-4">
              <div className="card-body body">
                <h5 className="text-secondary mb-2">
                  Question {currentIndex + 1}
                </h5>
                <h4 className="card-title mb-4 fw-semibold">
                  {decodeHtml(questions[currentIndex].question)}
                </h4>

                <div className="d-grid gap-3">
                  {questions[currentIndex].options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedOption(option)}
                      className={`btn ${
                        selectedOption === option ? "btn-primary" : "btn-light"
                      } border border-primary text-start shadow-sm`}
                    >
                      {String.fromCharCode(65 + i)}. {decodeHtml(option)}
                    </button>
                  ))}
                </div>

                <div className="d-grid mt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedOption}
                    className="btn btn-primary shadow"
                  >
                    Submit Answer
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center">Loading questions...</p>
        )}
      </div>
      {}
    </>
  );
};
export default QuizCards;
