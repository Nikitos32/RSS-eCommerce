import { useContext, useEffect, useState } from 'react';
import { ShoppingCartContext } from '../context/ShoppingCartProvider';
import { ShoppingCartService } from '../services';
import {
  CustomerSignInResult,
  GraphQLResponse,
} from '@commercetools/platform-sdk';
import { useAuth } from '.';

export const useShoppingCart = () => {
  const {
    setCartId,
    getProductQuantity,
    increaseProductQuantity,
    decreaseProductQuantity,
    total,
  } = useContext(ShoppingCartContext);

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(true);
  const [message, setMessage] = useState('');

  const { customerId } = useAuth();

  useEffect(() => {
    if (!customerId) {
      setCartId('');
    }
  }, [customerId, setCartId]);

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

  return {
    getProductQuantity,
    increaseProductQuantity,
    decreaseProductQuantity,
    total,
    setCart,
    ok,
    loading,
    errorMsg: message,
  };
};
