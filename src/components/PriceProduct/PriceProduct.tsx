import { ProductPrice } from '../../type/types/productPageType';
import { convertPrice } from '../../utils/convertPrice';
import './priceProduct.css';

export const PriceProduct = (price: ProductPrice) => {
  return (
    <div className="productData__pricesContainer text-xl font-medium">
      <span className="productData__discount">
        <span
          className={`${price.discounted ? 'productData__valueDiscount text-base' : ''}`}
        >
          {price.discounted
            ? `-${price.discounted.discount.value.permyriad / 100}%`
            : ''}
        </span>
        <span className="text-moonBrown">
          {price.discounted
            ? `${convertPrice(price.discounted.value.centAmount, price.discounted.value.fractionDigits)}€`
            : ''}
        </span>
      </span>
      <span
        className={`${price.discounted ? `text-moonNeutral-500 ml-7` : ''}`}
      >{`${convertPrice(price.value.centAmount, price.value.fractionDigits)}€`}</span>
    </div>
  );
};
