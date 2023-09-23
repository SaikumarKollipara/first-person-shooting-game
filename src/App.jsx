import React, { useState } from 'react';
import Experience from './components/Experience';

export default function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    localStorage.getItem('highScore') || 0
  );
  function updateScore(value) {
    setScore((prev) => prev + value);
  }
  if (score > highScore) {
    setHighScore(score);
    localStorage.setItem('highScore', score);
  }
  return (
    <>
      <div className="crosshair"></div>
      <div className="score">
        Score:
        <span> {score}</span>
      </div>
      <div className="high-score">
        High Score:
        <span> {highScore}</span>
      </div>
      <Experience updateScore={updateScore} />
    </>
  );
}
