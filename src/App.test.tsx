import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main sections', () => {
  render(<App />);
  expect(screen.getByText(/Spelling Bee/i)).toBeInTheDocument();
});
