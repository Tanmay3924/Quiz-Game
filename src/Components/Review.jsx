import { shuffle, decodeHtml } from "./Utils/Helper";
const Review = ({ userAnswers }) => {
  return (
    <>
      {userAnswers.map((Q, index) => (
        <div key={index} className="container">
          <div className="shadow-lg border-0 p-4">
            <div className="card-body body">
              <h5 className="text-secondary mb-2">Question {index + 1}</h5>
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
                      {String.fromCharCode(65 + i)}. {decodeHtml(option)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default Review;
