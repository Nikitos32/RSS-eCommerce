import { ProductSwiper } from './ProductPageSwiper/ProductSwiper';
import { ButtonSignUp } from '../UI/ButtonSignUp/ButtonSignUp';
import { useApiGetProduct } from '../../hooks';
import { useParams } from 'react-router-dom';
import { ProductAPI } from '../../type/types/productPageType';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './productPage.css';
import Spinner from '../Spinner';

const convertPrice = function (
  centAmount: number | undefined,
  fractionDigits: number | undefined
) {
  if (!centAmount || !fractionDigits) return 'No price';
  const floatAmount = centAmount / Math.pow(10, fractionDigits);
  return Number.isInteger(floatAmount)
    ? floatAmount.toFixed(0)
    : floatAmount.toFixed(fractionDigits);
};

export const ProductPage = () => {
  const { key } = useParams();
  const { loading, product } = useApiGetProduct(key);

  const productData = product?.data.product.masterData.current as ProductAPI;
  const price = productData?.masterVariant.prices.find(
    (priceEl) => priceEl.value.currencyCode === 'EUR'
  );

  return (
    <article className="productPage">
      <Spinner isLoading={loading} />
      {!loading && (
        <section className="product">
          <div className="product__component productImg">
            <ProductSwiper images={productData.masterVariant.images} />
          </div>
          <div className="product__component productData">
            <div className="productData__title">
              <div className="text-2xl font-bold">{productData.name}</div>
              <div className="productData__pricesContainer text-xl font-medium">
                <span className="productData__discount">
                  <span
                    className={`${price?.discounted ? 'productData__valueDiscount text-base' : ''}`}
                  >
                    {price?.discounted
                      ? `-${price?.discounted.discount.value.permyriad / 100}%`
                      : ''}
                  </span>
                  <span className="text-moonBrown">
                    {price?.discounted
                      ? `${convertPrice(price?.discounted.value.centAmount, price?.discounted.value.fractionDigits)}€`
                      : ''}
                  </span>
                </span>
                <span
                  className={`${price?.discounted ? `text-moonNeutral-500 ml-7` : ''}`}
                >{`${convertPrice(price?.value.centAmount, price?.value.fractionDigits)}€`}</span>
              </div>
            </div>
            <div>
              <ButtonSignUp
                btnContent="ADD TO CARD"
                customClass="productData__toCard"
              />
            </div>
            <div className="productinfo">
              <h3 className="productinfo__title">Details</h3>
              {productData.description}
            </div>
          </div>
        </section>
      )}
    </article>
  );
};
