import React, { useState, useEffect, useRef } from 'react';

/**
 * Stopwatch Component
 * Digital Precision Stopwatch with Start, Pause, Stop/Reset, and Lap tracking.
 * Utilizes useState, useEffect, and useRef for millisecond-accurate timing.
 */
function Stopwatch() {
  const [timeMs, setTimeMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - timeMs;
      intervalRef.current = setInterval(() => {
        setTimeMs(Date.now() - startTimeRef.current);
      }, 10); // 10ms resolution for precision
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStopReset = () => {
    setIsRunning(false);
    setTimeMs(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning && timeMs > 0) {
      setLaps(prevLaps => [
        {
          id: prevLaps.length + 1,
          time: timeMs,
        },
        ...prevLaps,
      ]);
    }
  };

  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);

    return {
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
      centiseconds: String(centiseconds).padStart(2, '0'),
    };
  };

  const formatted = formatTime(timeMs);

  return (
    <div className="clock-container">
      <div className="clock-header">
        <div className="status-badge">
          <span className={`status-dot ${isRunning ? 'dot-running' : 'dot-paused'}`}></span>
          <span className="status-text">
            TIMER: <strong>{isRunning ? 'RECORDING' : 'STOPPED'}</strong>
          </span>
        </div>
        <div className="header-actions">
          <span className="badge-precision">Precision: 10ms</span>
        </div>
      </div>

      {/* Digital Stopwatch Display */}
      <div className={`digital-display ${isRunning ? 'glow-green' : 'glow-paused'}`}>
        <div className="digits-wrapper">
          <div className="digit-box">{formatted.hours}</div>
          <span className="colon">:</span>
          <div className="digit-box">{formatted.minutes}</div>
          <span className="colon">:</span>
          <div className="digit-box">{formatted.seconds}</div>
          <span className="dot">.</span>
          <div className="digit-box digit-small">{formatted.centiseconds}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="control-buttons grid-4">
        <button
          type="button"
          onClick={handleStart}
          disabled={isRunning}
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
          onClick={handleLap}
          disabled={!isRunning}
          className="btn-control btn-lap"
        >
          🚩 Lap
        </button>

        <button
          type="button"
          onClick={handleStopReset}
          className="btn-control btn-stop"
        >
          ⏹ Stop / Reset
        </button>
      </div>

      {/* Lap Times */}
      {laps.length > 0 && (
        <div className="lap-list">
          <h4>Lap Records</h4>
          <div className="lap-items">
            {laps.map(lap => {
              const f = formatTime(lap.time);
              return (
                <div key={lap.id} className="lap-row">
                  <span>Lap {String(lap.id).padStart(2, '0')}</span>
                  <span>{f.hours}:{f.minutes}:{f.seconds}.{f.centiseconds}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Stopwatch;
