import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Confetti from 'react-confetti';

import { Puzzle } from './Puzzle';
import { Share } from './Share';
import useLocalStorage from '../hooks/useLocalStorage';
import { calculateTotalScore } from './InputControls';

export const EndGameModal: React.FC<{
  puzzle: Puzzle;
  guessedWords: string[];
  score: number;
}> = ({ puzzle, guessedWords, score }) => {
  const [showModal, setShowModal] = useState(false);
  const [featureFlag, setFeatureFlag] = useState(false);
  const [dismissed, setDismissed] = useLocalStorage<boolean>(
    `${puzzle.id}|endgame`,
    false,
  );

  const hide = (): void => {
    setShowModal(false);
    setDismissed(true);
  };

  useEffect(() => {
    if (score >= calculateTotalScore(puzzle) && !dismissed) {
      setShowModal(true);
    }

    // TODO: get data from third-party
    setFeatureFlag(true)
    
  }, [dismissed, puzzle, score]);

  return (
    <>
      {showModal && <Confetti />}
      <Modal
        show={showModal}
        onHide={hide}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
      >
        <Modal.Body>
          <h2>Congratulations</h2>
          <p>You&apos;ve guessed all of today&apos;s words!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-warning" className="mx-2" onClick={hide}>
            See words
          </Button>
          <Share puzzle={puzzle} score={score} guessedWords={guessedWords} />
        </Modal.Footer>
      </Modal>
    </>
  );
};
