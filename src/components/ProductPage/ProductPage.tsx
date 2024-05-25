import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { ButtonSignUp } from '../UI/ButtonSignUp/ButtonSignUp';
import { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './productPage.css';

export const ProductPage = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <article className="productPage">
      <section className="product">
        <div className="product__component productImg">
          <Swiper
            loop={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            centeredSlides={true}
            className="productImg__main-swiper"
          >
            <SwiperSlide className="productImg_main-slide">
              <img src="https://content2.rozetka.com.ua/goods/images/big/367689832.jpg" />
            </SwiperSlide>
            <SwiperSlide className="productImg_main-slide">
              <img src="https://content2.rozetka.com.ua/goods/images/big/367689833.jpg" />
            </SwiperSlide>
            <SwiperSlide className="productImg_main-slide">
              <img src="https://content1.rozetka.com.ua/goods/images/big/367689834.jpg" />
            </SwiperSlide>
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            slidesPerView={5}
            freeMode={true}
            watchSlidesProgress={true}
            centerInsufficientSlides={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="product__main-swiper"
          >
            <SwiperSlide>
              <img src="https://content2.rozetka.com.ua/goods/images/big/367689832.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://content2.rozetka.com.ua/goods/images/big/367689833.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://content1.rozetka.com.ua/goods/images/big/367689834.jpg" />
            </SwiperSlide>
          </Swiper>
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
          <div></div>
        </div>
      </section>
    </article>
  );
};
