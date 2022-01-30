import React from 'react';
import { Modal } from 'react-bootstrap';

export const Rules: React.FC<{
  showRules: boolean;
  setShowRules: (show: boolean) => void;
}> = ({ showRules, setShowRules }) => {
  return (
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
          <li>No words that are obscure, hyphenated, or proper nouns.</li>
          <li>No cussing either, sorry.</li>
          <li>Letters can be used more than once.</li>
        </ul>
        <h2>Score points to increase your rating:</h2>
        <ul>
          <li>4-letter words are worth 1 point each.</li>
          <li>Longer words earn 1 point per letter.</li>
          <li>
            Each puzzle includes at least one “pangram” which uses every letter.
            These are worth 7 extra points!
          </li>
        </ul>
      </Modal.Body>
    </Modal>
  );
};
