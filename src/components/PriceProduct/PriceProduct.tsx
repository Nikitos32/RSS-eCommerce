import { TypedMoney } from '@commercetools/platform-sdk';
import { convertPrice } from '../../utils/convertPrice';
import './priceProduct.css';

interface ProductPriceProps {
  initialPrice: TypedMoney;
  discountPrice?: TypedMoney | undefined;
  discountValue?: number | undefined;
}

export const PriceProduct = ({
  initialPrice,
  discountPrice = undefined,
  discountValue = undefined,
}: ProductPriceProps) => {
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
