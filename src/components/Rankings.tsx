import React from 'react';
import { Modal } from 'react-bootstrap';

import { calculateTotalScore } from './InputControls';
import { Puzzle } from './Puzzle';
import { minimumScoreForRank, ranks } from './Ranking';

export const Rankings: React.FC<{
  puzzle: Puzzle;
  showRankings: boolean;
  setShowRankings: (show: boolean) => void;
}> = ({ puzzle, showRankings, setShowRankings }) => {
  return (
    <Modal
      show={showRankings}
      onHide={() => setShowRankings(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h2>Rankings:</h2>
        <p>
          Ranks are based on a percentage of possible points in a puzzle. The
          minimum scores to reach each rank for today&apos;s are:
        </p>
        <ul>
          {ranks.map(([rank, minimumScorePercentage]) => (
            <li key={rank}>
              {rank} (
              {minimumScoreForRank(
                calculateTotalScore(puzzle),
                minimumScorePercentage,
              )}
              )
            </li>
          ))}
        </ul>
      </Modal.Body>
    </Modal>
  );
};
