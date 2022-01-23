import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import useLocalStorage from '../hooks/useLocalStorage';
import { GuessedWords } from './GuessedWords';
import { InputControls } from './InputControls';
import { Puzzle } from './Puzzle';
import { Ranking } from './Ranking';

const PuzzleState: React.FC<{ puzzle: Puzzle }> = ({ puzzle }) => {
  const [guessedWords, setGuessedWords] = useLocalStorage<string[]>(
    `${puzzle.id}|guessedWords`,
    [],
  );
  const [score, setScore] = useLocalStorage<number>(`${puzzle.id}|score`, 0);

  return (
    <Row className="d-flex">
      <Col className="col-12 col-md-6 align-items-center order-2 order-md-1">
        <Container className="my-5">
          <InputControls
            puzzle={puzzle}
            guessedWords={guessedWords}
            score={score}
            setGuessedWords={setGuessedWords}
            setScore={setScore}
          />
        </Container>
      </Col>
      <Col className="col-12 col-md-6 order-1 order-md-2">
        <Container className="my-2">
          <Ranking puzzle={puzzle} guessedWords={guessedWords} />
        </Container>
        <Container className="my-2">
          <GuessedWords puzzle={puzzle} guessedWords={guessedWords} />
        </Container>
      </Col>
    </Row>
  );
};

export default PuzzleState;
