import { Link } from "react-router";
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
  let [userAnswers, setUserAnswer] = useState([]);
  const [review, setReview] = useState(false);
  const sc = (score / questions.length) * 100;
  useEffect(() => {
    console.log("Updated answers:", userAnswers);
  }, [userAnswers]);
  const handleSubmit = () => {
    const currentQuestion = questions[currentIndex];
    setUserAnswer((prev) => [
      ...prev,
      {
        Question: currentQuestion.question,
        Answer: currentQuestion.answer,
        useranswer: selectedOption,
        Options: currentQuestion.options,
      },
    ]);

    if (selectedOption === currentQuestion.answer) {
      setScore(score + 1);
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
      <div className="Tanmay">
        {" "}
        {showResult ? (
          <div className="container text-center mt-5">
            <h2>Quiz Finished!</h2>
            <p>
              Your Score for this game is : {sc}% ( {score} / {questions.length}
              )
            </p>
            {!review ? (
              <>
                <Link to="/">
                  <button className="btn btn-primary">Restart</button>
                </Link>
                <button
                  className="btn btn-primary"
                  onClick={() => setReview(true)}
                >
                  Review
                </button>
              </>
            ) : (
              <>
                {userAnswers.map((Q, index) => (
                  <div key={index} className="card container ca mt-4">
                    <div className="shadow-lg border-0 p-4">
                      <div className="card-body body">
                        <h5 className="text-secondary mb-2">
                          Question {index + 1}
                        </h5>
                        <h4 className="card-title mb-4 fw-semibold">
                          {decodeHtml(Q.Question)}
                        </h4>

                        <div className="d-grid gap-3">
                          {Q.Options.map((option, i) => {
                            const isCorrect = option === Q.Answer;
                            const isUserChoice = option === Q.useranswer;

                            return (
                              <button
                                key={i}
                                className={`btn border text-start shadow-sm ${
                                  isCorrect
                                    ? "btn-success"
                                    : isUserChoice
                                    ? "btn-danger"
                                    : "btn-light"
                                }`}
                              >
                                {String.fromCharCode(65 + i)}.{" "}
                                {decodeHtml(option)}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
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
          <div className="m">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
      {}
    </>
  );
};
export default QuizCards;
