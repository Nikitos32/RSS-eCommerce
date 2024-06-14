import { useEffect } from 'react';
import { useShoppingCart } from '../hooks';
import CartItem from '../components/CartItem';

function Cart() {
  const { refreshShoppingCart, getShoppingCartProducts } = useShoppingCart();

  useEffect(() => {
    refreshShoppingCart();
  }, []); //  will only run on load

  const products = getShoppingCartProducts();

  return (
    <section className="bg-moonNeutral-200 pt-5">
      <h1 className="mb-5 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {products.map((product) => (
            <CartItem key={product.lineItemId} product={product} />
          ))}
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
