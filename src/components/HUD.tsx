import * as React from 'react';
import { ProgressBar } from './ProgressBar';

interface HUDProps {
  score: number;
  questionNumber: number;
}

export const HUD: React.FC<HUDProps> = ({
  score,
  questionNumber,
}: HUDProps) => {
  return (
    <div id="hud">
      <div className="hud-item">
        <p className="hud-prefix">Question {questionNumber}/10</p>
        <ProgressBar current={questionNumber} />
      </div>
      <div className="hud-item">
        <p className="hud-prefix">Score</p>
        <h1 className="hud-main-text">{score}</h1>
      </div>
    </div>
  );
};
