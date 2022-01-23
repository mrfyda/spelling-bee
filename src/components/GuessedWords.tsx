import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { isPangram } from './InputControls';
import { Puzzle } from './Puzzle';

export const GuessedWords: React.FC<{
  puzzle: Puzzle;
  guessedWords: string[];
}> = ({ puzzle, guessedWords }) => {
  return (
    <>
      <p>You have found {guessedWords.length} words</p>
      <ListGroup variant="flush" className="d-none d-md-block">
        {guessedWords.map(answer => {
          return (
            <ListGroup.Item
              key={answer}
              className={`${isPangram(puzzle, answer) ? 'fw-bold' : ''}`}
            >
              {answer}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
};
