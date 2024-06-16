import { useEffect, useState } from 'react';
import { useShoppingCart } from '../hooks';
import CartItem from '../components/CartItem';
import UserInputString from '../components/UserInputString';
import { countMoneySum, formatPrice } from '../utils';
import Spinner from '../components/Spinner';
import { CartEmpty } from '../components/CartEmpty/CartEmpty';

function Cart() {
  const inputStringInitState = {
    value: '',
    valid: true,
    visibleClue: false,
    focus: false,
    readonly: false,
  };

  const {
    refreshShoppingCart,
    getShoppingCartProducts,
    totalPrice,
    loading,
    clearShoppingCart,
    addPromoCode,
  } = useShoppingCart();

  useEffect(() => {
    refreshShoppingCart();
  }, []); //  will only run on load

  const products = getShoppingCartProducts();

  const isCartEmpty = products.length === 0;

  const [promoCode, setPromoCode] = useState(inputStringInitState);

  const [confirmClear, setConfirmClear] = useState(false);

  function ConfirmClear() {
    return (
      <>
        <button
          className="mx-1 my-2 bg-moonNeutral-700 text-moonNeutral-100 rounded-lg px-4 py-2 hover:bg-moonNeutral-600 focus:outline-none focus:shadow-outline disabled:bg-moonNeutral-500"
          type="button"
          onClick={() => {
            clearShoppingCart();
            setConfirmClear(false);
          }}
        >
          Confirm Clear All
        </button>
        <button
          className="mx-1 my-2 bg-moonBlack text-moonNeutral-100 rounded-lg px-4 py-2 hover:bg-moonNeutral-600 focus:outline-none focus:shadow-outline disabled:bg-moonNeutral-500"
          type="button"
          onClick={() => setConfirmClear(false)}
        >
          Cancel
        </button>
      </>
    );
  }

  return (
    <section className="bg-moonNeutral-200 pt-5">
      <h1 className="mb-5 text-center text-2xl font-bold">Cart Items</h1>
      {!confirmClear && !loading && !isCartEmpty && (
        <button
          className="mx-1 my-2 bg-moonNeutral-700 text-moonNeutral-100 rounded-lg px-4 py-2 hover:bg-moonNeutral-600 focus:outline-none focus:shadow-outline disabled:bg-moonNeutral-500"
          type="button"
          onClick={() => setConfirmClear(true)}
        >
          Clear All
        </button>
      )}
      {confirmClear && <ConfirmClear />}
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        {!loading && isCartEmpty && <CartEmpty />}
        {!isCartEmpty && (
          <div className="rounded-lg md:w-2/3">
            {products.map((product) => (
              <CartItem key={product.lineItemId} product={product} />
            ))}
          </div>
        )}
        {/*-- Sub total */}
        {!isCartEmpty && (
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-1 flex justify-center gap-1 content-end">
              <div className="">
                <UserInputString
                  type="text"
                  label="Promo Code"
                  placeHolder="Enter Code"
                  autocomplete="off"
                  state={promoCode}
                  setState={setPromoCode}
                />
              </div>
              <button
                className="bg-moonBlack text-moonNeutral-100 rounded-lg px-4 py-2 hover:bg-moonNeutral-600 focus:outline-none focus:shadow-outline disabled:bg-moonNeutral-500 disabled:cursor-not-allowed self-end"
                type="button"
                disabled={!promoCode.value}
                onClick={() => {
                  addPromoCode(promoCode.value);
                }}
              >
                Redeem
              </button>
            </div>
            <div className="mb-2 flex justify-between">
              <p className="text-moonNeutral-700">Subtotal</p>
              <p className="text-moonNeutral-700">TBD</p>
            </div>
            <div className="flex justify-between">
              <p className="text-moonNeutral-700">Shipping</p>
              <p className="text-moonNeutral-700">TBD</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">
                  {formatPrice(countMoneySum(totalPrice))}
                </p>
                <p className="text-sm text-moonNeutral-700">including VAT</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-moonBlack py-1.5 font-medium text-blue-50 hover:bg-moonNeutral-700">
              Check out
            </button>
          </div>
        )}
      </div>
      <Spinner isLoading={loading} />
    </section>
  );
}

export default Cart;
