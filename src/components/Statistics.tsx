import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';

export const Statistics: React.FC<{
  showStatistics: boolean;
  setShowStatistics: (show: boolean) => void;
}> = ({ showStatistics, setShowStatistics }) => {
  const defaultData: {date: string, score: string | null}[] = []
  const [data, setData] = useState(defaultData);

  useEffect(() => {
  const data = Object.keys({ ...localStorage })
    .filter(k => k.includes('|score'))
    .map(k => {
      const id = k.split('|')[0];
      const score = localStorage.getItem(k);
      const regex = /(\d{2})(\d{2})(\d{4})/;
      const match = regex.exec(id);
      let date = new Date();
      if (match && match.length > 2)
        date = new Date(
          parseInt(match[3], 10),
          parseInt(match[2], 10) - 1,
          parseInt(match[1], 10),
        );
      return { date, score };
    })
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .map(({ date, score }) => {
      return {
        date: date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        score,
      };
    });
    setData(data)
  }, []);

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
        <ResponsiveContainer minHeight={400}>
          <BarChart width={766} height={400} data={data}>
            <Bar dataKey="score" fill="#ffc107" label />
            <XAxis dataKey="date" interval="preserveStartEnd" />
          </BarChart>
        </ResponsiveContainer>
      </Modal.Body>
    </Modal>
  );
};
