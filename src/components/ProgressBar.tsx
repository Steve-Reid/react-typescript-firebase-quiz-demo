import * as React from 'react';

interface ProgressBarProps {
  current: number;
  max?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  max = 10,
  current,
}: ProgressBarProps) => {
  const width = (current / max) * 100;
  return (
    <div id="progressBar">
      <div id="progressBarFull" style={{ width: `${width}%` }} />
    </div>
  );
};
