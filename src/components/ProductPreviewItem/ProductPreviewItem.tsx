import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { useState } from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { MdOutlineViewInAr } from 'react-icons/md';

export const ProductPreviewItem = () => {
  const [rating, setRating] = useState(3.28);
  return (
    <div className="bg-slate-300 w-4/5 rounded pl-3 pb-3 pt-3 flex gap-20">
      <div>
        <img
          src="../RSS-eCommerce/public/photos/bc-1.webp"
          alt="photo"
          className="size-44 rounded"
        />
      </div>
      <div className="flex flex-col w-2/5 gap-5 pt-3">
        <div className="flex flex-col gap-1">
          <p className="text-gray-500">Chairs</p>
          <p className="font-semibold">Upholstered chair with wooden legs</p>
        </div>
        <p className="w-full text-gray-500">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta,
          dolores?
        </p>
      </div>
      <div className="flex w-2/5 flex-col gap-5 pt-3">
        <div className="flex items-center flex-col gap-2">
          <p className="font-semibold">$359.99</p>
          <Rating
            readOnly
            style={{ maxWidth: 100 }}
            value={rating}
            onChange={setRating}
          />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <a className="cursor-pointer flex gap-1 justify-center items-center">
            View Details <MdOutlineViewInAr />
          </a>
          <button className="flex gap-2 w-2/3 justify-center items-center h-14 border-2 border-stone-950">
            <IoCartOutline className="size-6" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
