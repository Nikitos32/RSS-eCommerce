import { Price } from '@commercetools/platform-sdk';
import { countMoneySum, formatPrice } from '../utils';
import { ProductPrice } from '../type/types/productPageType';

type CartItemPriceProps = { price: Price; quantity: number };
function CartItemPrice({ price, quantity }: CartItemPriceProps) {
  const { value: valuePrice, discounted } = price;

  const actualPrice = discounted ? discounted.value : valuePrice;

  const discountName =
    (price as unknown as ProductPrice).discounted?.discount?.name || '';

  return (
    <div className="self-center text-center">
      {!!discounted && <p className="text-moonBrown">{discountName}</p>}
      <p className="text-moonNeutral-700 font-normal text-lg">
        {discounted ? (
          <>
            <span className="line-through text-moonNeutral-600">
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
