import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

import { Puzzle } from './Puzzle';
import { calculateCurrentRank, minimumScoreForRank, ranks } from './Ranking';
import { Share } from './Share';
import useLocalStorage from '../hooks/useLocalStorage';
import { calculateTotalScore } from './InputControls';

export const EndGame: React.FC<{
  puzzle: Puzzle;
  guessedWords: string[];
  score: number;
}> = ({ puzzle, guessedWords, score }) => {
  const [showEndGame, setShowEndGame] = useState(false);
  const [dismissed, setDismissed] = useLocalStorage<boolean>(
    `${puzzle.id}|endgame`,
    false,
  );

  const hide = (): void => {
    setShowEndGame(false);
    setDismissed(true);
  };

  useEffect(() => {
    const [, minimumScorePercentageForGenius] = ranks.filter(
      ([rank]) => rank === 'Genius',
    )[0];

    if (
      score >=
        minimumScoreForRank(
          calculateTotalScore(puzzle),
          minimumScorePercentageForGenius,
        ) &&
      !dismissed
    ) {
      setShowEndGame(true);
    }
  }, [dismissed, puzzle, score]);

  return (
    <Modal
      show={showEndGame}
      onHide={hide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
    >
      <Modal.Body>
        <h2>Congratulations</h2>
        <p>You&apos;ve made it to {calculateCurrentRank(puzzle, score)}!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-warning" className="mx-2" onClick={hide}>
          Continue guessing
        </Button>
        <Share puzzle={puzzle} score={score} guessedWords={guessedWords} />
      </Modal.Footer>
    </Modal>
  );
};
