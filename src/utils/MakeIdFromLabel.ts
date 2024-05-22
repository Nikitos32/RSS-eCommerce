/***
 * @description make unique id from string for use in css as #selector
 * @param label:string - usually label for field
 * @return string
 */
export const makeIdFromLabel = (label: string): string => {
  const labelParts = (label || 'no label')
    .trim()
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .split(' ')
    .map((item) => item.toLowerCase());

  const randomPart = Math.random().toString(16).split('.')[1];

  return ['id', ...labelParts, randomPart].join('-');
};
