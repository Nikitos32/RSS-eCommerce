import { IoCloseCircle } from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Thumbs, Mousewheel, Pagination } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './enlargedImageModal.css';

type ProductSwiperProps = {
  images: string[];
  currentImage: SwiperType | null;
  flagDialog: boolean;
  onclick: () => void;
};

export const EnlargedImageModal = ({
  images,
  currentImage,
  flagDialog,
  onclick,
}: ProductSwiperProps) => {
  return (
    <dialog
      className={`productDialog ${flagDialog ? 'productDialog_active' : ''}`}
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
          modules={[FreeMode, Thumbs, Mousewheel, Pagination]}
          thumbs={{ swiper: currentImage }}
          direction="vertical"
          mousewheel={true}
          pagination={{
            clickable: true,
          }}
          zoom={true}
          centeredSlides={true}
          slidesPerView={1}
          spaceBetween={5}
          className="productDialog__img"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="swiper-zoom-container">
                <img className="object-contain h-full" src={img} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </dialog>
  );
};
