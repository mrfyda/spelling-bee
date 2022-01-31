import React from 'react';
import { Button } from 'react-bootstrap';
import { isPangram } from './InputControls';

import { Puzzle } from './Puzzle';
import { calculateCurrentRank } from './Ranking';

export const Share: React.FC<{
  puzzle: Puzzle;
  guessedWords: string[];
  score: number;
}> = ({ puzzle, guessedWords, score }) => {
  const pangrams = guessedWords.filter(w => isPangram(puzzle, w));
  const rank = calculateCurrentRank(puzzle, score);

  return (
    <Button
      variant="warning"
      onClick={() => {
        navigator.share({
          title: document.title,
          text:
            `I've made it to ${rank}! ${score}/${guessedWords.length}/${pangrams.length}` +
            '\n' +
            `🟨🟨🟨⬜️⬜️` +
            '\n' +
            `${window.location.href}`,
        });
      }}
    >
      Share
    </Button>
  );
};
