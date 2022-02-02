import React, { useEffect, useState } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import PuzzleState from './components/PuzzleState';
import {
  DailyChallenge,
  loadDailyChallenge,
} from './components/DailyChallenge';
import { YesterdaysAnswers } from './components/YesterdaysAnswers';
import { Statistics } from './components/Statistics';
import { Rankings } from './components/Rankings';
import { Rules } from './components/Rules';

const App: () => JSX.Element = () => {
  const [showAnswers, setShowAnswers] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showRankings, setShowRankings] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [challenge, setChallenge] = useState<DailyChallenge>();

  useEffect(() => {
    loadDailyChallenge().then(setChallenge);
  }, []);

  return (
    <>
      <Navbar variant="light" bg="warning" expand="md">
        <Container>
          <Navbar.Brand href="#home">Spelling Bee</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => setShowAnswers(true)}>
                Yesterday&apos;s Answers
              </Nav.Link>
              <Nav.Link onClick={() => setShowStatistics(true)}>
                Statistics
              </Nav.Link>
              <NavDropdown title="More" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => setShowRules(true)}>
                  How to Play
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => setShowRankings(true)}>
                  Rankings
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid="md">
        <Row>
          <Col>
            {challenge && <PuzzleState puzzle={challenge.today} />}
            {challenge && (
              <YesterdaysAnswers
                puzzle={challenge.yesterday}
                showAnswers={showAnswers}
                setShowAnswers={setShowAnswers}
              />
            )}
            <Rules showRules={showRules} setShowRules={setShowRules} />
            {challenge && (
              <Rankings
                puzzle={challenge.today}
                showRankings={showRankings}
                setShowRankings={setShowRankings}
              />
            )}
            <Statistics
              showStatistics={showStatistics}
              setShowStatistics={setShowStatistics}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
