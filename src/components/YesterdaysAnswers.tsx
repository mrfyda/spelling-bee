import React from 'react';
import { ListGroup, Modal } from 'react-bootstrap';

import { Puzzle } from './Puzzle';
import { isPangram } from './InputControls';
import useLocalStorage from '../hooks/useLocalStorage';

export const YesterdaysAnswers: React.FC<{
  puzzle: Puzzle;
  showAnswers: boolean;
  setShowAnswers: (show: boolean) => void;
}> = ({ puzzle, showAnswers, setShowAnswers }) => {
  const [yesterdayGuessedWords] = useLocalStorage<string[]>(
    `${puzzle.id}|guessedWords`,
    [],
  );

  return (
    <Modal
      show={showAnswers}
      onHide={() => setShowAnswers(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h2>Yesterday&apos;s Answers:</h2>
        <ListGroup
          variant="flush"
          className="d-block"
          style={{ columnCount: 3 }}
        >
          {puzzle.answers.map(answer => {
            return (
              <ListGroup.Item
                key={answer}
                className={
                  `${isPangram(puzzle, answer) ? 'fw-bold' : ''}` +
                  ` ` +
                  `${
                    !yesterdayGuessedWords.includes(answer) ? 'text-danger' : ''
                  }`
                }
              >
                {answer}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
};
