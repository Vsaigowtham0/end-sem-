import React, { useState, useEffect, useRef } from 'react';

/**
 * Countdown Component
 * Digital Countdown Timer with user input, progress bar, and completion alert.
 */
function Countdown() {
  const [initialSeconds, setInitialSeconds] = useState(300); // Default: 5 minutes
  const [remainingSeconds, setRemainingSeconds] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [inputMin, setInputMin] = useState(5);
  const [inputSec, setInputSec] = useState(0);

  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            setIsCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleSetTime = (e) => {
    e.preventDefault();
    const total = (parseInt(inputMin, 10) || 0) * 60 + (parseInt(inputSec, 10) || 0);
    if (total > 0) {
      setIsRunning(false);
      setIsCompleted(false);
      setInitialSeconds(total);
      setRemainingSeconds(total);
    }
  };

  const handleStart = () => {
    if (remainingSeconds > 0) {
      setIsRunning(true);
      setIsCompleted(false);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStopReset = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setRemainingSeconds(initialSeconds);
  };

  const hours = String(Math.floor(remainingSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((remainingSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(remainingSeconds % 60).padStart(2, '0');

  const progressPct = initialSeconds > 0 ? ((initialSeconds - remainingSeconds) / initialSeconds) * 100 : 0;

  return (
    <div className="clock-container">
      {/* Time Setting Form */}
      <form onSubmit={handleSetTime} className="countdown-input-form">
        <label>Set Timer:</label>
        <div className="input-group">
          <input
            type="number"
            min="0"
            max="99"
            value={inputMin}
            onChange={(e) => setInputMin(e.target.value)}
            disabled={isRunning}
            placeholder="Min"
          />
          <span>min</span>
          <input
            type="number"
            min="0"
            max="59"
            value={inputSec}
            onChange={(e) => setInputSec(e.target.value)}
            disabled={isRunning}
            placeholder="Sec"
          />
          <span>sec</span>
        </div>
        <button type="submit" disabled={isRunning} className="btn-secondary">
          Apply
        </button>
      </form>

      {/* Digital Countdown Display */}
      <div className={`digital-display ${isCompleted ? 'glow-rose alert-pulse' : isRunning ? 'glow-amber' : 'glow-paused'}`}>
        {/* Progress bar */}
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progressPct}%` }}></div>
        </div>

        {isCompleted && <div className="alert-message">⚠️ TIME IS UP!</div>}

        <div className="digits-wrapper">
          <div className="digit-box">{hours}</div>
          <span className={`colon ${isRunning ? 'blink' : ''}`}>:</span>
          <div className="digit-box">{minutes}</div>
          <span className={`colon ${isRunning ? 'blink' : ''}`}>:</span>
          <div className="digit-box">{seconds}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="control-buttons">
        <button
          type="button"
          onClick={handleStart}
          disabled={isRunning || remainingSeconds === 0}
          className="btn-control btn-start"
        >
          ▶ Start
        </button>

        <button
          type="button"
          onClick={handlePause}
          disabled={!isRunning}
          className="btn-control btn-pause"
        >
          ⏸ Pause
        </button>

        <button
          type="button"
          onClick={handleStopReset}
          className="btn-control btn-stop"
        >
          ⏹ Stop / Reset
        </button>
      </div>
    </div>
  );
}

export default Countdown;
