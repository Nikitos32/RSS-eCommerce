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

export const ProductPage = () => {
  const { key } = useParams();
  const { loading, product } = useApiGetProduct(key);
  const productData = product?.data.product.masterData.current as ProductAPI;
  console.log(productData);
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
              <div className="font-bold">{productData.name}</div>
              <div className="font-medium">
                <span className="mr-4">$35</span>
                <span className="text-moonNeutral-500">$50</span>
              </div>
            </div>
            <div>
              <ButtonSignUp
                btnContent="ADD TO CARD"
                customClass="productData__toCard"
              />
            </div>
            <div>{productData.description}</div>
          </div>
        </section>
      )}
    </article>
  );
};
