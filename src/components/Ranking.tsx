import React from 'react';
import { ProgressBar } from 'react-bootstrap';

import { calculateScore } from './InputControls';
import { Puzzle } from './Puzzle';

export const Ranking: React.FC<{
  puzzle: Puzzle;
  score: number;
}> = ({ puzzle, score }) => {
  const totalScore = puzzle.answers.reduce(
    (total, answer) => total + calculateScore(puzzle, answer),
    0,
  );

  return <ProgressBar now={(score * 100) / totalScore} />;
};
