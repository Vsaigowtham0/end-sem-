import React, { useState, useEffect, useRef } from 'react';

/**
 * DigitalClock Component
 * Demonstrates useState, useEffect, and useRef to control a digital clock
 * with Start, Pause, and Stop/Reset functionalities.
 */
function DigitalClock() {
  // State to store current time (in seconds/Date format)
  const [time, setTime] = useState(new Date());
  // State to track if the clock is running or paused
  const [isRunning, setIsRunning] = useState(true);
  // State for 12-hour vs 24-hour format
  const [is24Hour, setIs24Hour] = useState(false);
  
  // useRef to store interval ID across re-renders without triggering re-renders
  const timerRef = useRef(null);

  // useEffect hook to manage the clock interval based on isRunning state
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        // Increment time by 1 second each tick
        setTime(prevTime => new Date(prevTime.getTime() + 1000));
      }, 1000);
    } else {
      // Clear interval when paused/stopped
      clearInterval(timerRef.current);
    }

    // Cleanup interval on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  // Handler to Start / Resume the clock
  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  // Handler to Pause the clock (freezes current time display)
  const handlePause = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };

  // Handler to Stop and Reset clock back to live current real-world time
  const handleStop = () => {
    setIsRunning(false);
    setTime(new Date());
  };

  // Handler to Synchronize with current actual time while running
  const handleSyncRealTime = () => {
    setTime(new Date());
  };

  // Format time digits
  const rawHours = time.getHours();
  const hours = is24Hour
    ? String(rawHours).padStart(2, '0')
    : String(rawHours % 12 || 12).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');
  const ampm = rawHours >= 12 ? 'PM' : 'AM';

  // Format date
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dateString = `${days[time.getDay()]}, ${months[time.getMonth()]} ${time.getDate()}, ${time.getFullYear()}`;

  return (
    <div className="clock-container">
      {/* Top Header Controls */}
      <div className="clock-header">
        <div className="status-badge">
          <span className={`status-dot ${isRunning ? 'dot-running' : 'dot-paused'}`}></span>
          <span className="status-text">
            STATUS: <strong>{isRunning ? 'RUNNING' : 'PAUSED'}</strong>
          </span>
        </div>

        <div className="header-actions">
          <button 
            type="button" 
            onClick={handleSyncRealTime} 
            className="btn-secondary"
            title="Sync with current real-world time"
          >
            🔄 Sync Real Time
          </button>
          <button 
            type="button" 
            onClick={() => setIs24Hour(!is24Hour)} 
            className="btn-secondary"
          >
            {is24Hour ? '24-Hour Format' : '12-Hour Format'}
          </button>
        </div>
      </div>

      {/* Digital LED Display */}
      <div className={`digital-display ${isRunning ? 'glow-cyan' : 'glow-paused'}`}>
        <div className="digital-date">{dateString}</div>
        
        <div className="digits-wrapper">
          <div className="digit-box">{hours}</div>
          <span className={`colon ${isRunning ? 'blink' : ''}`}>:</span>
          <div className="digit-box">{minutes}</div>
          <span className={`colon ${isRunning ? 'blink' : ''}`}>:</span>
          <div className="digit-box">{seconds}</div>

          {!is24Hour && (
            <div className="ampm-indicator">
              <span className={`ampm-badge ${ampm === 'AM' ? 'active' : ''}`}>AM</span>
              <span className={`ampm-badge ${ampm === 'PM' ? 'active' : ''}`}>PM</span>
            </div>
          )}
        </div>
      </div>

      {/* Start / Pause / Stop Control Buttons */}
      <div className="control-buttons">
        {/* START BUTTON */}
        <button
          type="button"
          onClick={handleStart}
          disabled={isRunning}
          className="btn-control btn-start"
        >
          ▶ Start
        </button>

        {/* PAUSE BUTTON */}
        <button
          type="button"
          onClick={handlePause}
          disabled={!isRunning}
          className="btn-control btn-pause"
        >
          ⏸ Pause
        </button>

        {/* STOP / RESET BUTTON */}
        <button
          type="button"
          onClick={handleStop}
          className="btn-control btn-stop"
        >
          ⏹ Stop / Reset
        </button>
      </div>

      {/* Technical Hook Explanation */}
      <div className="hook-explanation">
        <h4>React Hooks Used in this Clock:</h4>
        <ul>
          <li><code>useState(new Date())</code>: Stores the current time object and state.</li>
          <li><code>useState(true)</code>: Manages the <code>isRunning</code> execution state.</li>
          <li><code>useEffect</code>: Runs <code>setInterval</code> on mount/resume and clears it on pause/unmount.</li>
          <li><code>useRef</code>: Stores the <code>timerRef</code> interval ID without causing re-renders.</li>
        </ul>
      </div>
    </div>
  );
}

export default DigitalClock;
