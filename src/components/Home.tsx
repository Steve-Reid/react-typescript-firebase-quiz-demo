import * as React from 'react';

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  return (
    <div className="container">
      <h1>Quiz App</h1>
      <a href="/game" className="btn">
        Start Game
      </a>
      <a href="/highScores" className="btn">
        High Scores
      </a>
    </div>
  );
};
