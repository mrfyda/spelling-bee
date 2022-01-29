import React from 'react';
import { ProgressBar } from 'react-bootstrap';

import { calculateScore } from './InputControls';
import { Puzzle } from './Puzzle';

type Rank =
  | 'Beginner'
  | 'Good Start'
  | 'Moving Up'
  | 'Good'
  | 'Solid'
  | 'Nice'
  | 'Great'
  | 'Amazing'
  | 'Genius';

export const Ranking: React.FC<{
  puzzle: Puzzle;
  score: number;
}> = ({ puzzle, score }) => {
  const totalScore = puzzle.answers.reduce(
    (total, answer) => total + calculateScore(puzzle, answer),
    0,
  );
  const rank: Rank = 'Beginner';

  return (
    <ProgressBar
      variant="warning"
      now={(score * 100) / totalScore}
      label={`${rank} - ${score}`}
    />
  );
};
