import {
  ProductDiscount,
  CartDiscountValueRelative,
  TypedMoney,
  Price,
} from '@commercetools/platform-sdk';
import { convertPrice } from '../../utils/convertPrice';
import './priceProduct.css';

interface PriceProductArguments {
  initialPrice: TypedMoney;
  discountPrice?: TypedMoney | undefined;
  discountValue?: number | undefined;
}

type PriceProductProps = Price | PriceProductArguments;

export const PriceProduct = (price: PriceProductProps) => {
  const isPriceProductArguments = (
    price: PriceProductProps
  ): price is PriceProductArguments => {
    return (price as PriceProductArguments).initialPrice !== undefined;
  };

  if (!isPriceProductArguments(price)) {
    const discount = price?.discounted?.discount as ProductDiscount | undefined;
    const discountValue = discount?.value as
      | CartDiscountValueRelative
      | undefined;

    return (
      <PriceProduct
        initialPrice={price.value}
        discountPrice={price.discounted?.value}
        discountValue={discountValue?.permyriad}
      />
    );
  }

  const { initialPrice, discountPrice, discountValue } = price;

  return (
    <div className="productData__pricesContainer text-xl font-medium">
      <span className="productData__discount">
        <span
          className={`${discountValue ? 'productData__valueDiscount text-base' : ''}`}
        >
          {discountValue ? `-${discountValue / 100}%` : ''}
        </span>
        <span className="text-moonBrown">
          {discountPrice
            ? `${convertPrice(discountPrice.centAmount, discountPrice.fractionDigits)}€`
            : ''}
        </span>
      </span>
      <span
        className={`${discountPrice ? `text-moonNeutral-500 ml-7` : ''}`}
      >{`${convertPrice(initialPrice.centAmount, initialPrice.fractionDigits)}€`}</span>
    </div>
  );
};
