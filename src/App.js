import React, { useState, useEffect } from 'react';
import './App.css';
import ProgressBar from './components/ProgressBar/ProgressBar';

let startTimerId = null
const App = () => {
  const [progress, setProgress] = useState(0);

  const startLoader = () => {
    if (progress >= 100) setProgress(0)
    if (startTimerId !== null) return
      startTimerId = setInterval(() => {
        setProgress(progress => progress + 1); 
    }, 100);
    
  }

  const pause = () => {
    clearInterval(startTimerId)
    startTimerId = null
  }

  useEffect(() => {
    if (progress >= 100) pause() 
  },[progress])

  return (
    <div className="app">
      <div className="app-header">
        <ProgressBar 
          progress={progress}
          size={300}
          strokeWidth={15}
          circleOneStroke='#d9edfe'
          circleTwoStroke='#ed004f'
        />
        <button onClick={startLoader}  className="playBtn">
          Play
        </button>
        <button onClick={pause}  className="pauseBtn">
          Pause
        </button>
      </div>
    </div>
  );
}

export default App;
