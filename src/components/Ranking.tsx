import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { Puzzle } from './Puzzle';

export const Ranking: React.FC<{ puzzle: Puzzle; guessedWords: string[] }> = ({
  puzzle,
  guessedWords,
}) => {
  return (
    <ProgressBar now={(guessedWords.length * 100) / puzzle.answers.length} />
  );
};
