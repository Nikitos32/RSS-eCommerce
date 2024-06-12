import { useContext, useState } from 'react';
import { ShoppingCartContext } from '../context/ShoppingCartProvider';
import { ShoppingCartService } from '../services';
import {
  CustomerSignInResult,
  GraphQLResponse,
} from '@commercetools/platform-sdk';
import { toast } from 'react-toastify';

export const useShoppingCart = () => {
  const {
    setCartId,
    cartId,
    cartVersion,
    setCartVersion,
    getProductQuantity,
    increaseProductQuantity,
    decreaseProductQuantity,
    total,
    removeProduct,
  } = useContext(ShoppingCartContext);

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(true);
  const [message, setMessage] = useState('');

  const shoppingCartService = new ShoppingCartService();

  const setCart = async (data: CustomerSignInResult) => {
    if (data.cart) {
      setCartId(data.cart.id);
      setCartVersion(data.cart.version);
      return;
    }

    const shoppingCartService = new ShoppingCartService();

    setLoading(true);

    const responseNewCart = await shoppingCartService.createCartForCustomer(
      data.customer.id
    );
    setOk(responseNewCart.ok);
    if (responseNewCart.ok) {
      const newCart = responseNewCart.data as GraphQLResponse;
      setCartId(newCart.data.createCart.id);
      setCartVersion(newCart.data.cart.version);
    }
    setMessage(responseNewCart.message);

    setLoading(false);
  };

  const unsetCart = () => {
    setCartId('');
    setCartVersion(0);
  };

  const increaseProductQuantityCT = async (productId: string) => {
    setLoading(true);

    const answer = await shoppingCartService.increaseProductQuantity(
      cartId,
      cartVersion,
      productId
    );
    setOk(answer.ok);
    setMessage(answer.message);
    if (answer.ok) {
      const response = answer.data as GraphQLResponse;
      setCartVersion(response.data.updateCart.version);
      increaseProductQuantity(productId);
    } else {
      toast.error(answer.message);
    }
    setLoading(false);
  };

  return {
    getProductQuantity,
    increaseProductQuantity: increaseProductQuantityCT,
    decreaseProductQuantity,
    removeProduct,
    total,
    setCart,
    unsetCart,
    cartId,
    ok,
    loading,
    message,
  };
};
