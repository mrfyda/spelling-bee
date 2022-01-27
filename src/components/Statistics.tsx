import React from 'react';
import { Modal } from 'react-bootstrap';
import { BarChart, Bar, XAxis } from 'recharts';

export const Statistics: React.FC<{
  showStatistics: boolean;
  setShowStatistics: (show: boolean) => void;
}> = ({ showStatistics, setShowStatistics }) => {
  const data = Object.keys({ ...localStorage })
    .filter(k => k.includes('|score'))
    .map(k => {
      const id = k.split('|')[0];
      const score = localStorage.getItem(k);
      return { id, score };
    })
    .sort((a, b) => (a.id > b.id ? 1 : -1));
  return (
    <Modal
      show={showStatistics}
      onHide={() => setShowStatistics(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h2>Statistics:</h2>
        <BarChart width={766} height={400} data={data}>
          <Bar dataKey="score" fill="#8884d8" />
          <XAxis dataKey="id" />
        </BarChart>
      </Modal.Body>
    </Modal>
  );
};
