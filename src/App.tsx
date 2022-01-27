import React, { useEffect, useState } from 'react';
import { Modal, Nav, Navbar, NavDropdown } from 'react-bootstrap';
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

const App: () => JSX.Element = () => {
  const [showAnswers, setShowAnswers] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [challenge, setChallenge] = useState<DailyChallenge>();

  useEffect(() => {
    loadDailyChallenge().then(setChallenge);
  }, []);

  return (
    <>
      <Navbar bg="light" expand="md">
        <Container>
          <Navbar.Brand href="#home">Spelling Bee</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => setShowAnswers(true)}>
                Yesterday&apos;s Answers
              </Nav.Link>
              <NavDropdown title="More" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => setShowRules(true)}>
                  How to Play
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => setShowStatistics(true)}>
                  Statistics
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
            <Modal
              show={showRules}
              onHide={() => setShowRules(false)}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Body>
                <h2>Rules:</h2>
                <ul>
                  <li>Words must contain at least 4 letters.</li>
                  <li>Words must include the center letter.</li>
                  <li>
                    No words that are obscure, hyphenated, or proper nouns.
                  </li>
                  <li>No cussing either, sorry.</li>
                  <li>Letters can be used more than once.</li>
                </ul>
                <h2>Score points to increase your rating:</h2>
                <ul>
                  <li>4-letter words are worth 1 point each.</li>
                  <li>Longer words earn 1 point per letter.</li>
                  <li>
                    Each puzzle includes at least one “pangram” which uses every{' '}
                    letter. These are worth 7 extra points!
                  </li>
                </ul>
              </Modal.Body>
            </Modal>
            {challenge && (
              <YesterdaysAnswers
                puzzle={challenge.yesterday}
                showAnswers={showAnswers}
                setShowAnswers={setShowAnswers}
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
