import { Puzzle } from './Puzzle';
import { PuzzleLoader } from './PuzzleLoader';

export interface DailyChallenge {
  today: Puzzle;
  yesterday: Puzzle;
}

const getPuzzleFilename = (date: Date): string => {
  return (
    `${String(date.getUTCDate()).padStart(2, '0')}` +
    `${String(date.getUTCMonth() + 1).padStart(2, '0')}` +
    `${date.getUTCFullYear()}` +
    `-pt.json`
  );
};

export const loadDailyChallenge = async (): Promise<DailyChallenge> => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const t = await PuzzleLoader.load(
    `/spelling-bee/puzzles/${getPuzzleFilename(today)}`,
  );
  const y = await PuzzleLoader.load(
    `/spelling-bee/puzzles/${getPuzzleFilename(yesterday)}`,
  );
  return { today: t, yesterday: y };
};
