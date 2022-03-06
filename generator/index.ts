#!/usr/bin/env ts-node

import * as fs from 'fs';

import { shuffle } from '../src/common/shuffle';

function choice<T>(choices: Array<T>): T {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function generate(): void {
  const dictionary = fs.readFileSync('public/wordlist.txt', 'utf8');
  const lines = dictionary.split(/\r?\n/);

  const words = lines.map(l => l.trim()).filter(l => l.length >= 4);

  let setsInDictionary: Array<Set<string>> = [];

  words.forEach(word => {
    const wordAsSet = new Set(word.split(''));
    if (wordAsSet.size === 7) setsInDictionary.push(wordAsSet);
  });

  while (setsInDictionary.length > 0) {
    const allLetters = choice(setsInDictionary);
    const [centerLetter, ...letters] = Array.from(allLetters);

    const answers: string[] = [];
    const pangrams: string[] = [];

    words.forEach(word => {
      const wordAsSet = new Set(word.split(''));
      if (
        word.split('').every(c => allLetters.has(c)) &&
        word.includes(centerLetter)
      )
        answers.push(word);
      if (wordAsSet.size === 7) pangrams.push(word);
    });

    setsInDictionary = setsInDictionary.filter(e => e !== allLetters);

    if (pangrams.length > 0 && answers.length >= 25 && answers.length <= 30) {
      const puzzle = {
        centerLetter,
        outerLetters: shuffle(letters),
        answers,
      };

      fs.writeFileSync(
        'public/puzzles/xx032022-pt.json',
        JSON.stringify(puzzle, null, 2),
        'utf8',
      );
      break;
    }
  }
}

generate();
