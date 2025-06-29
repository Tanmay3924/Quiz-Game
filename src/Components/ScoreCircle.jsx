const ScoreCircle = ({ score }) => {
  return (
    <>
      {" "}
      <p>Your Score for this game is :</p>
      <div className="circle-loader">
        <svg viewBox="0 0 36 36" className="circular-chart green">
          <path
            className="circle-bg"
            d="M18 2.0845
         a 15.9155 15.9155 0 0 1 0 31.831
         a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="circle"
            strokeDasharray={`${Math.round(score)}, 100`}
            d="M18 2.0845
         a 15.9155 15.9155 0 0 1 0 31.831
         a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="20.35" className="percentage">
            {Math.round(score)}%
          </text>
        </svg>
      </div>
    </>
  );
};
export default ScoreCircle;
