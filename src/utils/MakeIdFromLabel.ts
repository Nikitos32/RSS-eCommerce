/***
 * @description make unique id from string for use in css as #selector
 * @param label:string - usually label for field
 * @returns
 */
export const makeIdFromLabel = (label: string): string => {
  const partsForId = label
    .trim()
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .split(' ')
    .map((item) => item.toLowerCase());

  const randomPart = Math.random().toString(16).split('.')[1];

  return ['id', ...partsForId, randomPart].join('-');
};
