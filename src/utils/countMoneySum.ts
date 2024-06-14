import { TypedMoney } from '@commercetools/platform-sdk';

export const countMoneySum = (
  price: TypedMoney,
  quantity: number = 1
): number => {
  const { centAmount, fractionDigits } = price;
  return (centAmount / Math.pow(10, fractionDigits)) * quantity;
};
