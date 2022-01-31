import React, { useEffect, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';

import { calculateTotalScore } from './InputControls';
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

export const ranks: [Rank, number][] = [
  ['Beginner', 0],
  ['Good Start', 2],
  ['Moving Up', 5],
  ['Good', 8],
  ['Solid', 15],
  ['Nice', 25],
  ['Great', 40],
  ['Amazing', 50],
  ['Genius', 70],
];

export function calculateCurrentRank(puzzle: Puzzle, score: number): Rank {
  const [rank] = ranks
    .filter(
      ([, minimumScorePercentage]) =>
        minimumScorePercentage <=
        Math.floor((score / calculateTotalScore(puzzle)) * 100),
    )
    .slice(-1)[0];
  return rank;
}

export const Ranking: React.FC<{
  puzzle: Puzzle;
  score: number;
}> = ({ puzzle, score }) => {
  const [currentRank, setCurrentRank] = useState('Beginner');

  useEffect(() => {
    setCurrentRank(calculateCurrentRank(puzzle, score));
  }, [puzzle, score]);

  return (
    <ProgressBar
      variant="warning"
      now={(score * 100) / calculateTotalScore(puzzle)}
      label={`${currentRank} - ${score}`}
      style={{ height: 38 }}
    />
  );
};
