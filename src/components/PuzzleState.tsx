import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import useLocalStorage from '../hooks/useLocalStorage';
import { WordList } from './WordList';
import { InputControls } from './InputControls';
import { Puzzle } from './Puzzle';
import { Ranking } from './Ranking';
import { Share } from './Share';
import { EndGame } from './EndGame';

const PuzzleState: React.FC<{ puzzle: Puzzle }> = ({ puzzle }) => {
  const [guessedWords, setGuessedWords] = useLocalStorage<string[]>(
    `${puzzle.id}|guessedWords`,
    [],
  );
  const [score, setScore] = useLocalStorage<number>(`${puzzle.id}|score`, 0);

  return (
    <>
      <Row className="d-flex">
        <Col className="col-12 col-md-6 align-items-center order-2 order-md-1">
          <Container className="my-2 my-md-5">
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
          <Container className="my-2 my-md-5">
            <Row className="align-items-center">
              <Col className="col-8 com-md-10">
                <Ranking puzzle={puzzle} score={score} />
              </Col>
              <Col className="col-4 com-md-col-2">
                <Share
                  puzzle={puzzle}
                  score={score}
                  guessedWords={guessedWords}
                />
              </Col>
            </Row>
          </Container>
          <Container className="my-2">
            <p>You have found {guessedWords.length} words</p>
            <WordList
              classNames="d-none d-md-block"
              puzzle={puzzle}
              answers={guessedWords}
              guessedWords={guessedWords}
            />
          </Container>
        </Col>
      </Row>
      <EndGame puzzle={puzzle} score={score} guessedWords={guessedWords} />
    </>
  );
};

export default PuzzleState;
