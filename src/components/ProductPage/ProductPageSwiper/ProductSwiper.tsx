import { useState } from 'react';
import { EnlargedImageModal } from './EnlargedImageModal/EnlargedImageModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Thumbs, Controller, Navigation } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types';
import { ImagesProduct } from '../../../type/types/productPageType';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './productSwiper.css';

type ProductSwiperProps = {
  images: ImagesProduct[];
};

export const ProductSwiper = ({ images }: ProductSwiperProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [flagDialog, setFlagDialog] = useState(false);
  const [dialogImage, setCurrentImage] = useState<SwiperType | null>(null);
  const [mainSlide, setMainSlide] = useState<SwiperType | null>(null);

  return (
    <>
      <div>
        <Swiper
          onClick={() => {
            setFlagDialog(true);
          }}
          navigation={true}
          controller={{ control: mainSlide }}
          onSwiper={setCurrentImage}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs, Controller, Navigation]}
          spaceBetween={5}
          allowTouchMove={false}
          centeredSlides={true}
          className="productImg__main-swiper"
        >
          {images.map((img, index) => (
            <SwiperSlide className="productImg__slide" key={index}>
              <img src={img.url} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          grabCursor={true}
          slidesPerView={5}
          spaceBetween={5}
          freeMode={true}
          watchSlidesProgress={true}
          centerInsufficientSlides={true}
          modules={[FreeMode, Thumbs, Navigation]}
          className="productImg__footer-swiper"
        >
          {images.length > 1
            ? images.map((img, index) => (
                <SwiperSlide
                  className="productImg__slide productImg__footer-slide"
                  key={index}
                >
                  <div className="swiper-zoom-container">
                    <img className="productImg__footer-img" src={img.url} />
                  </div>
                </SwiperSlide>
              ))
            : ''}
        </Swiper>
      </div>
      <EnlargedImageModal
        images={images}
        currentImage={dialogImage}
        flagDialog={flagDialog}
        onclick={() => setFlagDialog(false)}
        setCurrentImage={setMainSlide}
      />
    </>
  );
};
