import React, { useEffect, useRef, useState } from 'react';
import { Button, Overlay, Tooltip } from 'react-bootstrap';
import { isMobile } from 'react-device-detect';

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

  const [show, setShow] = useState(false);
  const target = useRef(null);

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

  function handleShare(): void {
    gtag('event', 'share');

    const shareMessage =
      `I've made it to ${shareStatistics.rank}! ${shareStatistics.score}/${shareStatistics.guessedWords}/${shareStatistics.pangrams}` +
      `\n${range(1, shareStatistics.progress)
        .map(() => '🟨')
        .join('')}${range(1, 5 - shareStatistics.progress)
        .map(() => '⬜️')
        .join('')}\n` +
      `${window.location.href}`;

    if (isMobile) {
      navigator.share({ title: document.title, text: shareMessage });
    } else {
      navigator.clipboard.writeText(shareMessage);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 2000);
    }
  }

  return (
    <>
      <Button ref={target} variant="warning" onClick={() => handleShare()}>
        Share
      </Button>
      <Overlay target={target.current} show={show} placement="bottom">
        {props => (
          <Tooltip id="share-overlay" {...props}>
            Copied results to clipboard
          </Tooltip>
        )}
      </Overlay>
    </>
  );
};
