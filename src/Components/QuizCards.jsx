import { Link } from "react-router";
import { useEffect, useState } from "react";

import { shuffle, decodeHtml } from "./Utils/Helper";
import { useSelector } from "react-redux";
import ScoreCircle from "./ScoreCircle";
import Review from "./Review";
import Loader from "./Loader";

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
  // const [timeLeft, setTimeLeft] = useState(100); // seconds

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
      setSelectedOption(null);
    } else {
      setShowResult(true);
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
  // useEffect(() => {
  //   if (!showResult && questions.length > 0) {
  //     const timer = setInterval(() => {
  //       setTimeLeft((prev) => {
  //         if (prev <= 1) {
  //           clearInterval(timer);

  //           const currentQuestion = questions[currentIndex];

  //           // ⬇️ Check if the selected option was correct
  //           if (selectedOption === currentQuestion.answer) {
  //             setScore((prevScore) => prevScore + 1);
  //           }

  //           // ⬇️ Record the answer (even if none selected)
  //           setUserAnswer((prev) => [
  //             ...prev,
  //             {
  //               Question: currentQuestion.question,
  //               Answer: currentQuestion.answer,
  //               useranswer: selectedOption,
  //               Options: currentQuestion.options,
  //             },
  //           ]);

  //           setShowResult(true);
  //           return 0;
  //         }

  //         return prev - 1;
  //       });
  //     }, 1000);

  //     return () => clearInterval(timer);
  //   }
  // }, [questions, showResult, currentIndex, selectedOption]);

  return (
    <>
      <div className="Tanmay">
        {" "}
        {showResult ? (
          <div className="container text-center mt-5">
            <ScoreCircle score={sc} />

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
              <Review userAnswers={userAnswers} />
            )}
          </div>
        ) : questions.length > 0 ? (
          <div className="container">
            {/* <div className="text-end pe-3 fw-bold">
              Time Left: {Math.floor(timeLeft / 60)}:
              {String(timeLeft % 60).padStart(2, "0")}
            </div> */}

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
          <Loader />
        )}
      </div>
    </>
  );
};
export default QuizCards;
