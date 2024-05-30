import { useState } from 'react';
import { EnlargedImageModal } from './EnlargedImageModal/EnlargedImageModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Thumbs } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import './productSwiper.css';

type ProductSwiperProps = {
  images: string[];
};

export const ProductSwiper = ({ images }: ProductSwiperProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [flagDialog, setFlagDialog] = useState(false);
  const [currentImage, setCurrentImage] = useState<SwiperType | null>(null);

  return (
    <>
      <div>
        <Swiper
          onClick={(swiper) => {
            setCurrentImage(swiper);
            setFlagDialog(true);
          }}
          onTouchEnd={() => setFlagDialog(true)}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs]}
          allowTouchMove={false}
          centeredSlides={true}
          className="productImg__main-swiper"
        >
          {images.map((img, index) => (
            <SwiperSlide className="productImg__slide" key={index}>
              <img
                src={img}
                // onClick={() => {
                //   setCurrentImage(img);
                // }}
              />
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
          {images.length > 1
            ? images.map((img, index) => (
                <SwiperSlide className="productImg__slide" key={index}>
                  <img src={img} />
                </SwiperSlide>
              ))
            : ''}
        </Swiper>
      </div>
      <EnlargedImageModal
        images={images}
        currentImage={currentImage}
        flagDialog={flagDialog}
        onclick={() => setFlagDialog(false)}
      />
    </>
  );
};
