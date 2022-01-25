/* eslint-disable no-param-reassign */
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

export function shuffle<T>(array: Array<T>): Array<T> {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
