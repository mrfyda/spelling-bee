import React, { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { Puzzle } from './Puzzle';
import { haveSameContents } from '../common/haveSameContents.js';
import { shuffle } from '../common/shuffle';

import './InputControls.scss';

export const isPangram = (puzzle: Puzzle, word: string): boolean => {
  return haveSameContents(
    word.split(''),
    puzzle.outerLetters.concat(puzzle.centerLetter),
  );
};

export const calculateScore = (puzzle: Puzzle, word: string): number => {
  let score = 0;
  if (word.length === 4) score += 1;
  if (word.length > 4) score += word.length;
  if (isPangram(puzzle, word)) score += 7;
  return score;
};

export const calculateTotalScore = (puzzle: Puzzle): number => {
  return puzzle.answers.reduce(
    (total, answer) => total + calculateScore(puzzle, answer),
    0,
  );
};

export const InputButton: React.FC<{
  letter: string;
  onClick: () => void;
}> = ({ letter, onClick }) => {
  return (
    <Button variant="secondary" className="middle" onClick={onClick}>
      {letter}
    </Button>
  );
};

export const InputControls: React.FC<{
  puzzle: Puzzle;
  guessedWords: string[];
  score: number;
  setGuessedWords: (answers: string[]) => void;
  setScore: (score: number) => void;
}> = ({ puzzle, guessedWords, score, setGuessedWords, setScore }) => {
  const guessInput = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  function isInvalid(word: string): string | undefined {
    if (guessedWords.includes(word))
      return `Word '${word}' was already guessed.`;
    if (!word.includes(puzzle.centerLetter))
      return `Word '${word}' doesn't use the center letter '${puzzle.centerLetter}'.`;
    if (word.length < 4) return `Word '${word}' is smaller than 4 letters.`;
    if (!puzzle.answers.includes(word)) return `Word '${word}' is not valid.`;
    return undefined;
  }

  function updateState(word: string): void {
    const answers: string[] = guessedWords;
    answers.push(word);
    setGuessedWords(answers);

    setScore(score + calculateScore(puzzle, word));
  }

  function guessWord(): void {
    if (!guessInput.current) return;
    const guess = guessInput.current.value.toLocaleLowerCase().trim();

    const errorMessage = isInvalid(guess);
    if (!errorMessage) {
      updateState(guess);
      gtag('event', 'guess_correct', { puzzle: puzzle.id, word: guess });
    } else {
      gtag('event', 'guess_incorrect', { puzzle: puzzle.id, word: guess });
    }

    setError(errorMessage);
    guessInput.current.value = '';
  }

  function addLetter(letter: string): void {
    if (guessInput.current)
      guessInput.current.value = guessInput.current.value.concat(letter);
  }

  function clear(): void {
    if (guessInput.current)
      guessInput.current.value = guessInput.current.value.slice(0, -1);
  }

  function onEnter(event: React.KeyboardEvent): void {
    if (event.key === 'Enter') {
      guessWord();
    }
  }

  function showHint(): void {
    gtag('event', 'hint');

    const randomWord = shuffle(
      puzzle.answers.filter(a => !guessedWords.includes(a)),
    )[0];
    const hint = randomWord
      .split('')
      .map((s, i) => {
        if (i % 3 === 0) return s;
        return '_';
      })
      .join(' ');
    // eslint-disable-next-line no-alert
    alert(hint);
  }

  return (
    <Container>
      <Row>
        <Col className="col-md-12 d-flex justify-content-center">
          <Form.Group className="mb-3">
            <Form.Control
              ref={guessInput}
              onKeyDown={e => onEnter(e)}
              type="text"
              placeholder="Type or click"
              autoFocus
            />
            <Form.Text className="text-muted">{error}</Form.Text>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col className="col-md-12 d-flex justify-content-center">
          <div className="hex-container">
            <div className="hex-row">
              <div className="hex invisible">
                <div className="left" />
                <div className="middle" />
                <div className="right" />
              </div>
              <div className="hex">
                <div className="left" />
                <InputButton
                  letter={puzzle.outerLetters[0]}
                  onClick={() => addLetter(puzzle.outerLetters[0])}
                />
                <div className="right" />
              </div>
              <div className="hex invisible">
                <div className="left" />
                <div className="middle" />
                <div className="right" />
              </div>
            </div>
            <div className="hex-row">
              <div className="hex">
                <div className="left" />
                <InputButton
                  letter={puzzle.outerLetters[1]}
                  onClick={() => addLetter(puzzle.outerLetters[1])}
                />
                <div className="right" />
              </div>
              <div className="hex even center">
                <div className="left" />
                <InputButton
                  letter={puzzle.centerLetter}
                  onClick={() => addLetter(puzzle.centerLetter)}
                />
                <div className="right" />
              </div>
              <div className="hex">
                <div className="left" />
                <InputButton
                  letter={puzzle.outerLetters[2]}
                  onClick={() => addLetter(puzzle.outerLetters[2])}
                />
                <div className="right" />
              </div>
            </div>
            <div className="hex-row">
              <div className="hex">
                <div className="left" />
                <InputButton
                  letter={puzzle.outerLetters[3]}
                  onClick={() => addLetter(puzzle.outerLetters[3])}
                />
                <div className="right" />
              </div>
              <div className="hex even">
                <div className="left" />
                <InputButton
                  letter={puzzle.outerLetters[4]}
                  onClick={() => addLetter(puzzle.outerLetters[4])}
                />
                <div className="right" />
              </div>
              <div className="hex">
                <div className="left" />
                <InputButton
                  letter={puzzle.outerLetters[5]}
                  onClick={() => addLetter(puzzle.outerLetters[5])}
                />
                <div className="right" />
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="col-md-12 d-flex justify-content-center mt-3">
          <Button
            className="mx-2"
            variant="outline-warning"
            onClick={() => clear()}
          >
            Delete
          </Button>{' '}
          <Button
            className="mx-2"
            variant="outline-warning"
            onClick={() => showHint()}
          >
            Hint
          </Button>{' '}
          <Button
            className="mx-2"
            variant="warning"
            onClick={() => guessWord()}
          >
            Enter
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
