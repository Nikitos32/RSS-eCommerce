import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { useState } from 'react';
import { MdOutlineViewInAr } from 'react-icons/md';
import { PriceProduct } from '../PriceProduct/PriceProduct';
import { Price } from '@commercetools/platform-sdk';
import {
  ProductDiscount,
  CartDiscountValueRelative,
} from '@commercetools/platform-sdk';
import { Link } from 'react-router-dom';
import CartControl from '../CartControl';

interface ProductPreviewItemProps {
  imgUrl: string;
  productCategory: string;
  productName: string;
  productDescription: string;
  price: Price | undefined;
  id: string;
  productId: string;
}

export const ProductPreviewItem = ({
  imgUrl,
  productCategory,
  productName,
  productDescription,
  price,
  id,
  productId,
}: ProductPreviewItemProps) => {
  const [rating, setRating] = useState(3.28);
  const discount = price?.discounted?.discount as ProductDiscount | undefined;
  const discountValue = discount?.value as CartDiscountValueRelative;

  return (
    <div className="transition duration-700 ease-in-out bg-slate-300 max-w-72 md:max-w-none md:w-full xl:w-4/5 m-auto lg:m-0 rounded p-3 flex flex-col md:flex-row gap-4 md:gap-20 hover:shadow-[1px_1px_8px]">
      <div>
        <img
          loading="lazy"
          src={imgUrl}
          alt="photo"
          className="size-64 md:size-44 m-auto max-w-none rounded"
        />
      </div>
      <div className="flex flex-col w-auto md:w-2/5 gap-5 pt-3">
        <div className="flex flex-col gap-1">
          <p className="text-gray-500">{productCategory}</p>
          <p className="font-semibold">{productName}</p>
        </div>
        <p className="w-full text-gray-500 line-clamp-3">
          {productDescription}
        </p>
      </div>
      <div className="flex w-auto md:w-2/5 flex-col gap-5 pt-3">
        <div className="flex items-center flex-col gap-2">
          {price ? (
            <PriceProduct
              initialPrice={price.value}
              discountPrice={price.discounted?.value}
              discountValue={discountValue.permyriad}
            />
          ) : (
            'Unavailable'
          )}
          <Rating
            readOnly
            style={{ maxWidth: 100 }}
            value={rating}
            onChange={setRating}
          />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <Link
            to={`/product/${id}`}
            className="cursor-pointer flex gap-1 justify-center items-center"
          >
            View Details <MdOutlineViewInAr />
          </Link>
          <CartControl productId={productId} />
        </div>
      </div>
    </div>
  );
};
