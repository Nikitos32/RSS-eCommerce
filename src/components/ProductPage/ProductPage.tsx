import { ProductSwiper } from './ProductPageSwiper/ProductSwiper';
import { ButtonSignUp } from '../UI/ButtonSignUp/ButtonSignUp';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './productPage.css';

const images = [
  'https://content2.rozetka.com.ua/goods/images/big/367689832.jpg',
  'https://content2.rozetka.com.ua/goods/images/big/367689833.jpg',
  'https://content1.rozetka.com.ua/goods/images/big/367689834.jpg',
];

export const ProductPage = () => {
  return (
    <article className="productPage">
      <section className="product">
        <div className="product__component productImg">
          <ProductSwiper images={images} />
        </div>
        <div className="product__component productData">
          <div className="productData__title">
            <div className="font-bold">Marin White Dinner Plate</div>
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
        </div>
      </section>
    </article>
  );
};
