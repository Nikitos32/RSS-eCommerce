import { useShoppingCart } from '../hooks';

type CartControlProps = {
  productKey: string;
};
function CartControl({ productKey }: CartControlProps) {
  const {
    getProductQuantity,
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProduct,
  } = useShoppingCart();

  const quantity = getProductQuantity(productKey);

  return (
    <div className="flex flex-row gap-2 justify-center">
      {quantity > 0 && (
        <div className="flex items-center border-moonNeutral-300">
          <span
            onClick={() => decreaseProductQuantity(productKey)}
            className="cursor-pointer rounded-l bg-moonNeutral-300 py-1 px-3.5 duration-100 hover:bg-moonBlack hover:text-blue-50"
          >
            {' '}
            -{' '}
          </span>
          <span className="h-8 w-8 border bg-white text-center py-1 ">
            {quantity}
          </span>
          <span
            onClick={() => increaseProductQuantity(productKey)}
            className="cursor-pointer rounded-r bg-moonNeutral-300 py-1 px-3 duration-100 hover:bg-moonBlack hover:text-blue-50"
          >
            {' '}
            +{' '}
          </span>
        </div>
      )}
      {quantity === 0 && (
        <button
          className="bg-moonBlack text-moonNeutral-100 rounded-lg px-4 py-2 hover:bg-moonNeutral-600 focus:outline-none focus:shadow-outline disabled:bg-moonNeutral-500"
          type="button"
          onClick={() => increaseProductQuantity(productKey)}
        >
          Add To Cart
        </button>
      )}
      {quantity > 0 && (
        <button
          className="bg-moonNeutral-700 text-moonNeutral-100 rounded-lg px-4 py-2 hover:bg-moonNeutral-600 focus:outline-none focus:shadow-outline disabled:bg-moonNeutral-500"
          type="button"
          onClick={() => removeProduct(productKey)}
        >
          Remove From Cart
        </button>
      )}
    </div>
  );
}

export default CartControl;
