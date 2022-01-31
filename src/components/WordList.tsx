import React from 'react';
import { ListGroup } from 'react-bootstrap';

import { isPangram } from './InputControls';
import { Puzzle } from './Puzzle';

export const WordList: React.FC<{
  classNames: string;
  puzzle: Puzzle;
  answers: string[];
  guessedWords: string[];
}> = ({ classNames, puzzle, answers, guessedWords }) => {
  return (
    <ListGroup
      variant="flush"
      className={classNames}
      style={{
        columnCount: 3,
        columnFill: 'auto',
        height: 'calc(var(--vh, 1vh) * 50)',
      }}
    >
      {answers.map(answer => {
        return (
          <ListGroup.Item
            key={answer}
            className={
              `${isPangram(puzzle, answer) ? 'fw-bold' : ''}` +
              ` ` +
              `${!guessedWords.includes(answer) ? 'text-danger' : ''}`
            }
          >
            {answer}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};
