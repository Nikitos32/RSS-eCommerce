import { Price } from '@commercetools/platform-sdk';
import { countMoneySum, formatPrice } from '../utils';

type CartItemPriceProps = { price: Price; quantity: number };
function CartItemPrice({ price, quantity }: CartItemPriceProps) {
  const { value: valuePrice, discounted } = price;

  const actualPrice = discounted ? discounted.value : valuePrice;

  return (
    <div className="self-center text-center">
      {!!discounted && <p>TODO Add Discount Name</p>}
      <p className="text-gray-800 font-normal text-xl">
        {discounted ? (
          <>
            <span className="line-through">
              {formatPrice(countMoneySum(valuePrice))}
            </span>{' '}
            <span>{formatPrice(countMoneySum(actualPrice))}</span>
          </>
        ) : (
          <span>{formatPrice(countMoneySum(actualPrice))}</span>
        )}
        ・{quantity} = {formatPrice(countMoneySum(actualPrice, quantity))}
      </p>
    </div>
  );
}

export default CartItemPrice;
