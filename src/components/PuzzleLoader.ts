import { Puzzle } from './Puzzle';

export class PuzzleLoader {
  public static async load(puzzle: string): Promise<Puzzle> {
    return fetch(puzzle).then(r => r.json());
  }
}
