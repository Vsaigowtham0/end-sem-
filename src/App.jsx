import React, { useState } from 'react';
import DigitalClock from './components/DigitalClock';
import Stopwatch from './components/Stopwatch';
import Countdown from './components/Countdown';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('clock'); // 'clock' | 'stopwatch' | 'countdown'

  return (
    <div className="app-wrapper">
      <main className="main-card">
        {/* Application Header */}
        <header className="app-header">
          <div className="logo-section">
            <span className="logo-icon">⏱️</span>
            <div>
              <h1 className="app-title">React Digital Clock & Timer</h1>
              <p className="app-subtitle">Built using React State (<code>useState</code>) & Hooks (<code>useEffect</code>, <code>useRef</code>)</p>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="tab-navigation">
          <button
            type="button"
            className={`tab-button ${activeTab === 'clock' ? 'active-clock' : ''}`}
            onClick={() => setActiveTab('clock')}
          >
            🕒 Live Digital Clock
          </button>
          <button
            type="button"
            className={`tab-button ${activeTab === 'stopwatch' ? 'active-stopwatch' : ''}`}
            onClick={() => setActiveTab('stopwatch')}
          >
            ⏱️ Stopwatch Timer
          </button>
          <button
            type="button"
            className={`tab-button ${activeTab === 'countdown' ? 'active-countdown' : ''}`}
            onClick={() => setActiveTab('countdown')}
          >
            ⏳ Countdown Timer
          </button>
        </nav>

        {/* Tab Content Display */}
        <section className="tab-content">
          {activeTab === 'clock' && <DigitalClock />}
          {activeTab === 'stopwatch' && <Stopwatch />}
          {activeTab === 'countdown' && <Countdown />}
        </section>

        {/* Footer */}
        <footer className="app-footer">
          <p>
            Developed for <strong>Question 2: Digital Clock Timer with Start, Pause, and Stop Controls</strong>
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
