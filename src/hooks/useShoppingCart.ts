import { useContext, useState } from 'react';
import { ShoppingCartContext } from '../context/ShoppingCartProvider';
import { ShoppingCartService } from '../services';
import {
  CustomerSignInResult,
  GraphQLResponse,
} from '@commercetools/platform-sdk';

export const useShoppingCart = () => {
  const {
    setCartId,
    getProductQuantity,
    increaseProductQuantity,
    decreaseProductQuantity,
    total,
    removeProduct,
  } = useContext(ShoppingCartContext);

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(true);
  const [message, setMessage] = useState('');

  const setCart = async (data: CustomerSignInResult) => {
    if (data.cart) {
      setCartId(data.cart.id);
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
    }
    setMessage(responseNewCart.message);

    setLoading(false);
  };

  const unsetCart = () => {
    setCartId('');
  };

  return {
    getProductQuantity,
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProduct,
    total,
    setCart,
    unsetCart,
    ok,
    loading,
    message,
  };
};
