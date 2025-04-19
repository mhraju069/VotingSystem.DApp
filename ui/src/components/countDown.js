import { useEffect, useState } from "react";

const Countdown = ({ endTime }) => {
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = endTime - now;
    setRemainingTime(timeLeft > 0 ? timeLeft : 0);

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    
    <div className="container" style={{display: remainingTime >0? "block":"none" }} >
      <div className={`timer ${remainingTime <= 60 ? 'warning' : ''} ${remainingTime <= 10 ? 'danger' : ''}`}>
        <div className="timer-label">Time Remaining:</div>
        <div className="timer-display">
          {minutes}m {seconds}s
        </div>
        {remainingTime <= 60 && (
          <div className="timer-warning">Hurry up! Voting ending soon</div>
        )}
      </div>
    </div>
  );
};

export default Countdown;

