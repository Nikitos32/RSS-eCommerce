import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Thumbs } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './productSwiper.css';

type ProductSwiperProps = {
  images: string[];
};

export const ProductSwiper = ({ images }: ProductSwiperProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  return (
    <>
      <Swiper
        loop={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        centeredSlides={true}
        className="productImg__main-swiper"
      >
        {images.map((img, index) => (
          <SwiperSlide className="productImg__slide" key={index}>
            <img src={img} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        slidesPerView={5}
        freeMode={true}
        centerInsufficientSlides={true}
        modules={[FreeMode, Thumbs]}
        className="productImg__footer-swiper"
      >
        {images.map((img, index) => (
          <SwiperSlide className="productImg__slide" key={index}>
            <img src={img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
