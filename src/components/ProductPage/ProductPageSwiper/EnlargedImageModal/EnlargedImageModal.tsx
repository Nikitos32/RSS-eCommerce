import { IoCloseCircle } from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  FreeMode,
  Thumbs,
  Mousewheel,
  Pagination,
  Controller,
} from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types';
import { ImagesProduct } from '../../../../type/types/productPageType';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './enlargedImageModal.css';

type ProductSwiperProps = {
  images: ImagesProduct[];
  currentImage: SwiperType | null;
  flagDialog: boolean;
  onclick: () => void;
  setCurrentImage: (arg0: SwiperType) => void;
};

export const EnlargedImageModal = ({
  images,
  currentImage,
  flagDialog,
  onclick,
  setCurrentImage,
}: ProductSwiperProps) => {
  return (
    <dialog
      className={`productDialog ${flagDialog ? 'productDialog_active z-50' : ''}`}
      onClick={onclick}
    >
      <div
        className="productDialog_container"
        onClick={(event) => event.stopPropagation()}
      >
        <div>
          <IoCloseCircle
            onClick={onclick}
            className="ml-auto text-3xl text-moonBlack hover:text-black transition-colors cursor-pointer"
          />
        </div>
        <Swiper
          modules={[FreeMode, Thumbs, Mousewheel, Pagination, Controller]}
          controller={{ control: currentImage }}
          onSwiper={setCurrentImage}
          direction="vertical"
          grabCursor={true}
          mousewheel={true}
          pagination={{
            clickable: true,
          }}
          centeredSlides={true}
          slidesPerView={1}
          spaceBetween={10}
          className="productDialog__swiper"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="swiper-zoom-container">
                <img className="object-contain h-full" src={img.url} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </dialog>
  );
};
