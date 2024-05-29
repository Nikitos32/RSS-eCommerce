import { IoCloseCircle } from 'react-icons/io5';
import './enlargedImageModal.css';

type ProductSwiperProps = {
  currentImage: string;
  flagDialog: boolean;
  onclick: () => void;
};

export const EnlargedImageModal = ({
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
        <img className="productDialog__img" src={currentImage} alt="product" />
      </div>
    </dialog>
  );
};
