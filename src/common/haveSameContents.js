/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-restricted-syntax */
export const haveSameContents = (a, b) => {
  for (const v of new Set([...a, ...b]))
    if (a.filter(e => e === v).length !== b.filter(e => e === v).length)
      return false;
  return true;
};
