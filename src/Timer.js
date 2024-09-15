// src/Timer.js

import React, { useState, useRef, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState(60); // Initial time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [inputDuration, setInputDuration] = useState(60); // For input field to set new duration
  const intervalRef = useRef(null);
  const progressRef = useRef(null);
  const notificationRef = useRef(null);
  const backgroundRef = useRef(null);

  // Start the timer
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            notificationRef.current.textContent = 'Time is up!';
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  // Pause the timer
  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  // Reset the timer
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTime(inputDuration);
    setIsRunning(false);
    notificationRef.current.textContent = '';
  };

  // Handle input change for setting new duration
  const handleInputChange = () => {
    setInputDuration(Number(progressRef.current.value));
  };

  // Update progress bar and background color based on remaining time
  useEffect(() => {
    if (progressRef.current) {
      const percentage = (time / inputDuration) * 100;
      progressRef.current.style.width = `${percentage}%`;

      if (backgroundRef.current) {
        if (time < 10) {
          backgroundRef.current.style.backgroundColor = 'red';
        } else {
          backgroundRef.current.style.backgroundColor = 'lightblue';
        }
      }
    }
  }, [time, inputDuration]);

  return (
    <div ref={backgroundRef} style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Timer</h2>
      <div style={{ marginBottom: '20px' }}>
        <div
          style={{
            height: '20px',
            width: '100%',
            backgroundColor: '#ccc',
            borderRadius: '5px',
            overflow: 'hidden',
            marginBottom: '10px',
          }}
        >
          <div
            ref={progressRef}
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: '#4caf50',
              transition: 'width 1s',
            }}
          ></div>
        </div>
        <p>
          Remaining Time: {Math.floor(time / 60)}:{('0' + (time % 60)).slice(-2)}
        </p>
      </div>
      <div>
        <button onClick={startTimer}>Start</button>
        <button onClick={pauseTimer}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <input
          type="number"
          ref={progressRef}
          defaultValue={inputDuration}
          onChange={handleInputChange}
        />
        <p ref={notificationRef} style={{ color: 'red', marginTop: '10px' }}></p>
      </div>
    </div>
  );
};

export default Timer;
