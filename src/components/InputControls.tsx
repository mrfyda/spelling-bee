import React, { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';

import { Puzzle } from './Puzzle';
import { haveSameContents } from '../common/haveSameContents.js';
import { shuffle } from '../common/shuffle';

const Hex = styled.div`
  margin-left: -26px;
  .hex {
    float: left;
    margin-right: -26px;
    margin-bottom: -50px;
  }
  .hex .left {
    float: left;
    width: 0;
    border-right: 30px solid lightgray;
    border-top: 52px solid transparent;
    border-bottom: 52px solid transparent;
  }
  .hex .middle {
    float: left;
    width: 60px;
    height: 104px;
    background: lightgray;
    border: 0;
  }
  .hex .right {
    float: left;
    width: 0;
    border-left: 30px solid lightgray;
    border-top: 52px solid transparent;
    border-bottom: 52px solid transparent;
  }
  .hex-row {
    clear: left;
    min-width: 282px;
  }
  .hex.even {
    margin-top: 53px;
  }
  .hex.center .left {
    border-right: 30px solid #ffc107;
  }
  .hex.center .middle {
    background: #ffc107;
  }
  .hex.center .right {
    border-left: 30px solid #ffc107;
  }
  .hex button {
    border-radius: 0;
    color: black;
    font-weight: 700;
    font-size: 1.875em;
    text-transform: uppercase;
  }
`;

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
    const guess = guessInput.current.value.toLocaleLowerCase();

    const errorMessage = isInvalid(guess);
    if (!errorMessage) updateState(guess);

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
    const nextWord = shuffle(
      puzzle.answers.filter(a => !guessedWords.includes(a)),
    )[0];
    // eslint-disable-next-line no-alert
    alert(nextWord.replace(/(.).{1,3}/g, '$1 _ _ _ '));
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
          <Hex>
            <div className="hex-row">
              <div className="hex invisible">
                <div className="left" />
                <div className="middle" />
                <div className="right" />
              </div>
              <div className="hex">
                <div className="left" />
                <Button
                  className="middle"
                  onClick={() => addLetter(puzzle.outerLetters[0])}
                >
                  {puzzle.outerLetters[0]}
                </Button>
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
                <Button
                  className="middle"
                  onClick={() => addLetter(puzzle.outerLetters[1])}
                >
                  {puzzle.outerLetters[1]}
                </Button>
                <div className="right" />
              </div>
              <div className="hex even center">
                <div className="left" />
                <Button
                  className="middle"
                  onClick={() => addLetter(puzzle.centerLetter)}
                >
                  {puzzle.centerLetter}
                </Button>
                <div className="right" />
              </div>
              <div className="hex">
                <div className="left" />
                <Button
                  className="middle"
                  onClick={() => addLetter(puzzle.outerLetters[2])}
                >
                  {puzzle.outerLetters[2]}
                </Button>
                <div className="right" />
              </div>
            </div>
            <div className="hex-row">
              <div className="hex">
                <div className="left" />
                <Button
                  className="middle"
                  onClick={() => addLetter(puzzle.outerLetters[3])}
                >
                  {puzzle.outerLetters[3]}
                </Button>
                <div className="right" />
              </div>
              <div className="hex even">
                <div className="left" />
                <Button
                  className="middle"
                  onClick={() => addLetter(puzzle.outerLetters[4])}
                >
                  {puzzle.outerLetters[4]}
                </Button>
                <div className="right" />
              </div>
              <div className="hex">
                <div className="left" />
                <Button
                  className="middle"
                  onClick={() => addLetter(puzzle.outerLetters[5])}
                >
                  {puzzle.outerLetters[5]}
                </Button>
                <div className="right" />
              </div>
            </div>
          </Hex>
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
