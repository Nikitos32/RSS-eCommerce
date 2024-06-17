import { useContext, useState } from 'react';
import { ShoppingCartContext } from '../context/ShoppingCartProvider';
import { CustomerSignInResult } from '@commercetools/platform-sdk';
import { toast } from 'react-toastify';
import { HttpStatusCode } from '../ct-client';

export const useShoppingCart = () => {
  const {
    cartId,
    cartVersion,
    getProductQuantity,
    increaseProductQuantity,
    decreaseProductQuantity,
    total,
    totalPrice,
    removeProduct,
    setCartAfterSignIn,
    unsetCart,
    getCTCart,
    getShoppingCartProducts,
    clearShoppingCart,
  } = useContext(ShoppingCartContext);

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(true);
  const [message, setMessage] = useState('');

  const setCartAfterSignInHook = async (data: CustomerSignInResult) => {
    setLoading(true);

    const responseNewCart = await setCartAfterSignIn(data);
    setOk(responseNewCart.ok);
    setMessage(responseNewCart.message);

    setLoading(false);
  };

  const increaseProductQuantityHook = async (productId: string) => {
    setLoading(true);
    const answer = await increaseProductQuantity(productId);
    setOk(answer.ok);

    setMessage(answer.message);

    if (!answer.ok) {
      if (answer.status === HttpStatusCode.IM_USED_226) {
        toast.warning(answer.message);
      } else {
        toast.error(answer.message);
      }
    }

    setLoading(false);
  };

  const decreaseProductQuantityHook = async (productId: string) => {
    setLoading(true);

    const answer = await decreaseProductQuantity(productId);
    setOk(answer.ok);

    setMessage(answer.message);

    if (!answer.ok) {
      if (answer.status === HttpStatusCode.IM_USED_226) {
        toast.warning(answer.message);
      } else {
        toast.error(answer.message);
      }
    }

    setLoading(false);
  };
  const removeProductHook = async (productId: string) => {
    setLoading(true);

    const answer = await removeProduct(productId);
    setOk(answer.ok);

    setMessage(answer.message);

    if (!answer.ok) {
      toast.error(answer.message);
    }

    setLoading(false);
  };

  const refreshShoppingCart = async () => {
    setLoading(true);

    const answer = await getCTCart();
    setOk(answer.ok);

    setMessage(answer.message as string);

    if (!answer.ok) {
      toast.error(answer.message);
    }

    setLoading(false);
  };
  const clearShoppingCartHook = async () => {
    setLoading(true);
    const answer = await clearShoppingCart();
    setOk(answer.ok);

    setMessage(answer.message as string);

    if (!answer.ok) {
      toast.error(answer.message);
    }
    setLoading(false);
  };

  return {
    getProductQuantity,
    increaseProductQuantity: increaseProductQuantityHook,
    decreaseProductQuantity: decreaseProductQuantityHook,
    removeProduct: removeProductHook,
    total,
    totalPrice,
    setCartAfterSignIn: setCartAfterSignInHook,
    unsetCart,
    cartVersion,
    cartId,
    ok,
    loading,
    message,
    refreshShoppingCart,
    getShoppingCartProducts,
    clearShoppingCart: clearShoppingCartHook,
  };
};
