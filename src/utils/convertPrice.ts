export const convertPrice = function (
  centAmount: number | undefined,
  fractionDigits: number | undefined
) {
  if (!centAmount || !fractionDigits) return 'No price';
  const floatAmount = centAmount / Math.pow(10, fractionDigits);
  return Number.isInteger(floatAmount)
    ? floatAmount.toFixed(0)
    : floatAmount.toFixed(fractionDigits);
};
