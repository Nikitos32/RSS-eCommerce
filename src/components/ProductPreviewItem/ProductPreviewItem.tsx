import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { useState } from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { MdOutlineViewInAr } from 'react-icons/md';
import { FaEuroSign } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface ProductPreviewItemProps {
  imgUrl: string;
  productCategory: string;
  productName: string;
  productDescription: string;
  productPrice: string;
  /*  productOldPrice: string; */
  id: string;
}

export const ProductPreviewItem = ({
  imgUrl,
  productCategory,
  productName,
  productDescription,
  productPrice,
  /*   productOldPrice, */
  id,
}: ProductPreviewItemProps) => {
  const [rating, setRating] = useState(3.28);
  return (
    <div className="transition duration-700 ease-in-out bg-slate-300 max-w-72 md:max-w-none md:w-full xl:w-4/5 m-auto lg:m-0 rounded p-3 flex flex-col md:flex-row gap-4 md:gap-20 hover:shadow-[1px_1px_8px]">
      <div>
        <img
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
          <p className="font-semibold flex flex-nowrap">
            <span
              className={`flex items-center flex-nowrap `} /* ${productOldPrice ? 'text-moonBrown mr-4' : ''} */
            >
              {productPrice}
              <FaEuroSign />
            </span>
            <span
              className={`text-moonNeutral-500 line-through flex items-center flex-nowrap `} /* ${productOldPrice ? '' : 'hidden'} */
            >
              {/* {productOldPrice} */}
              <FaEuroSign />
            </span>
          </p>
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
          <button className="transition duration-700 ease-in-out flex gap-2 w-2/3 min-w-44 px-1 text-nowrap justify-center items-center h-14 border-2 border-stone-950 hover:bg-orange-400 hover:text-white">
            <IoCartOutline className="size-6" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
