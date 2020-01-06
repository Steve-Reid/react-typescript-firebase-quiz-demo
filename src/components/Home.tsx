import * as React from 'react';
import { Link } from 'react-router-dom';

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <h1>Quiz App</h1>
      <Link to="/game" className="btn">
        Start Game
      </Link>
      <Link to="/highScores" className="btn">
        High Scores
      </Link>
    </>
  );
};
