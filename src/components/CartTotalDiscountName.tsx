import {
  CartDiscount,
  DiscountedTotalPricePortion,
  TypedMoney,
} from '@commercetools/platform-sdk';
import { countMoneySum, formatPrice } from '../utils';

type CartTotalDiscountNameProps = {
  discountedTotalPricePortion: DiscountedTotalPricePortion;
};
function CartTotalDiscountName({
  discountedTotalPricePortion,
}: CartTotalDiscountNameProps) {
  const { discount = {} as CartDiscount, discountedAmount = {} as TypedMoney } =
    discountedTotalPricePortion;
  const { name = 'NA' } = discount as unknown as CartDiscount;
  return (
    <div className="mb-2 flex justify-between">
      <p className="text-moonNeutral-700">{name as string}</p>
      <p className="text-moonNeutral-700">
        - {formatPrice(countMoneySum(discountedAmount))}
      </p>
    </div>
  );
}

export default CartTotalDiscountName;
