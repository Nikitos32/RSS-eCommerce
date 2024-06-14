import { TypedMoney } from '@commercetools/platform-sdk';

export const countProductSum = (
  price: TypedMoney,
  quantity: number
): string => {
  const { centAmount, fractionDigits } = price;
  const floatAmount = (centAmount / Math.pow(10, fractionDigits)) * quantity;
  return Number.isInteger(floatAmount)
    ? floatAmount.toFixed(0)
    : floatAmount.toFixed(fractionDigits);
};
