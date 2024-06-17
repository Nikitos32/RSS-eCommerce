import { TypedMoney } from '@commercetools/platform-sdk';

export const countMoneySum = (
  price: TypedMoney,
  quantity: number = 1
): number => {
  const { centAmount = 0, fractionDigits = 0 } = price;
  return (centAmount / Math.pow(10, fractionDigits)) * quantity;
};
