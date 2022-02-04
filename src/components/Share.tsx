import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import { calculateTotalScore, isPangram } from './InputControls';
import { Puzzle } from './Puzzle';
import { calculateCurrentRank, Rank } from './Ranking';

type ShareStatistics = {
  score: number;
  guessedWords: number;
  pangrams: number;
  rank: Rank;
  progress: number;
};

const initialShareStatistics: ShareStatistics = {
  score: 0,
  guessedWords: 0,
  pangrams: 0,
  rank: 'Beginner',
  progress: 0,
};

function range(start: number, end: number): Array<number> {
  return Array.from({ length: end - start + 1 }, (_, i) => i);
}

export const Share: React.FC<{
  puzzle: Puzzle;
  guessedWords: string[];
  score: number;
}> = ({ puzzle, guessedWords, score }) => {
  const [shareStatistics, setShareStatistics] = useState(
    initialShareStatistics,
  );

  useEffect(() => {
    const pangrams = guessedWords.filter(w => isPangram(puzzle, w));
    const totalScore = calculateTotalScore(puzzle);
    const progress = Math.floor((score * 5) / totalScore);

    setShareStatistics({
      score,
      rank: calculateCurrentRank(puzzle, score),
      guessedWords: guessedWords.length,
      pangrams: pangrams.length,
      progress,
    });
  }, [guessedWords, puzzle, score]);

  return (
    <Button
      variant="warning"
      onClick={() => {
        gtag('event', 'share');

        navigator.share({
          title: document.title,
          text:
            `I've made it to ${shareStatistics.rank}! ${shareStatistics.score}/${shareStatistics.guessedWords}/${shareStatistics.pangrams}` +
            `\n${range(1, shareStatistics.progress)
              .map(() => '🟨')
              .join('')}${range(1, 5 - shareStatistics.progress)
              .map(() => '⬜️')
              .join('')}\n` +
            `${window.location.href}`,
        });
      }}
    >
      Share
    </Button>
  );
};
