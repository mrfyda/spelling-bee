import React from 'react';
import { Modal } from 'react-bootstrap';

import { Puzzle } from './Puzzle';
import useLocalStorage from '../hooks/useLocalStorage';
import { WordList } from './WordList';

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
      scrollable
    >
      <Modal.Body>
        <h2>Yesterday&apos;s Answers:</h2>
        <p>
          <strong>
            <span className="text-warning">{`${puzzle.centerLetter.toUpperCase()} `}</span>
            {puzzle.outerLetters.map(l => l.toUpperCase()).join(' ')}
          </strong>
        </p>
        <WordList
          classNames="d-md-block"
          puzzle={puzzle}
          answers={puzzle.answers}
          guessedWords={yesterdayGuessedWords}
        />
      </Modal.Body>
    </Modal>
  );
};
