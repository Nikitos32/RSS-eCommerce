import { ProductSwiper } from './ProductPageSwiper/ProductSwiper';
import { PriceProduct } from '../PriceProduct/PriceProduct';
import { useApiGetProduct } from '../../hooks';
import { useParams } from 'react-router-dom';
import {
  ProductData,
  ProductDiscount,
  CartDiscountValueRelative,
} from '@commercetools/platform-sdk';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './productPage.css';
import Spinner from '../Spinner';
import NotFoundPage from '../../pages/NotFoundPage';
import CartControl from '../CartControl';

export const ProductPage = () => {
  const { key } = useParams();
  const { ok, loading, product } = useApiGetProduct(key);

  if (!loading && !ok) {
    return <NotFoundPage />;
  }

  const productData = product?.data.product.masterData.current as ProductData;
  const price = productData?.masterVariant?.prices?.find(
    (priceEl) => priceEl.value.currencyCode === 'EUR'
  );
  const discount = price?.discounted?.discount as ProductDiscount | undefined;
  const discountValue = discount?.value as CartDiscountValueRelative;
  return (
    <article className="productPage">
      <Spinner isLoading={loading} />
      {!loading && (
        <section className="product">
          <div className="product__component productImg">
            {productData.masterVariant.images ? (
              <ProductSwiper images={productData.masterVariant.images} />
            ) : (
              ''
            )}
          </div>
          <div className="product__component productData">
            <div className="productData__title">
              <div className="text-2xl font-bold">{`${productData.name}`}</div>
              {price ? (
                <PriceProduct
                  initialPrice={price.value}
                  discountPrice={price.discounted?.value}
                  discountValue={discountValue.permyriad}
                />
              ) : (
                'Unavailable'
              )}
            </div>
            <div>
              <CartControl productId={product?.data.product.id || ''} />
            </div>
            <div className="productinfo">
              <h3 className="productinfo__title">Details</h3>
              {`${productData.description}`}
            </div>
          </div>
        </section>
      )}
    </article>
  );
};
