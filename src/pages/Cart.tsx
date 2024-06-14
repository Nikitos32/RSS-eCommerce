import { useEffect } from 'react';
import { PriceProduct } from '../components/PriceProduct/PriceProduct';
import { useShoppingCart } from '../hooks';
import CartItem from '../components/CartItem';

function Cart() {
  const { refreshShoppingCart } = useShoppingCart();
  useEffect(() => {
    refreshShoppingCart();
  }, []); //  will only run on load

  return (
    <section className="bg-moonNeutral-200 pt-5">
      <h1 className="mb-5 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          <CartItem />
          <div className="cartProduct justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <img
              src="https://picsum.photos/id/40/100/100"
              alt="product-image"
              className="w-full rounded-lg sm:w-40"
            />
            <div className="cartProduct__containerData sm:ml-4 sm:flex sm:w-full sm:justify-between">
              <div className="cartProduct__name mt-5 sm:mt-0">
                <h2 className="text-lg font-bold text-gray-900">Item 2</h2>
                <p className="mt-1 text-xs text-moonNeutral-700">Description</p>
              </div>
              <div className="cartProduct__priceData mt-4 flex justify-between sm:justify-normal sm:flex-col items-end sm:space-y-6 sm:mt-0 ">
                <div className="cartProduct__quantity w-min mr-2 flex items-center border-moonNeutral-300">
                  <span className="cursor-pointer rounded-l bg-moonNeutral-300 py-1 px-3.5 duration-100 hover:bg-moonBlack hover:text-blue-50">
                    {' '}
                    -{' '}
                  </span>
                  <input
                    className="h-8 w-8 border bg-white text-center text-xs outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    type="number"
                    value="2"
                    min="1"
                  />
                  <span className="cursor-pointer rounded-r bg-moonNeutral-300 py-1 px-3 duration-100 hover:bg-moonBlack hover:text-blue-50">
                    {' '}
                    +{' '}
                  </span>
                </div>
                <div className="cartProduct__containerPrice flex items-end space-x-4">
                  <PriceProduct
                    initialPrice={{ centAmount: 26000, fractionDigits: 2 }}
                    discountPrice={{ centAmount: 13000, fractionDigits: 2 }}
                    discountValue={5000}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 mb-1.5 cursor-pointer duration-150 hover:text-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*-- Sub total */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-moonNeutral-700">Subtotal</p>
            <p className="text-moonNeutral-700">$129.99</p>
          </div>
          <div className="flex justify-between">
            <p className="text-moonNeutral-700">Shipping</p>
            <p className="text-moonNeutral-700">$4.99</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">$134.98</p>
              <p className="text-sm text-moonNeutral-700">including VAT</p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-moonBlack py-1.5 font-medium text-blue-50 hover:bg-moonNeutral-700">
            Check out
          </button>
        </div>
      </div>
    </section>
  );
}

export default Cart;
