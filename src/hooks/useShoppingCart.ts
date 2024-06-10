import { useContext, useState } from 'react';
import { ShoppingCartContext } from '../context/ShoppingCartProvider';
import { ShoppingCartService } from '../services';

export const useShoppingCart = () => {
  const {
    setCartId,
    getProductQuantity,
    increaseProductQuantity,
    decreaseProductQuantity,
    total,
  } = useContext(ShoppingCartContext);

  const [loading, setLoadingCart] = useState(false);
  const [ok, setOk] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const loadCart = async (customerId: string) => {
    const shoppingCartService = new ShoppingCartService();

    setLoadingCart(true);
    const responseActive =
      await shoppingCartService.getActiveCartId(customerId);
    setOk(responseActive.ok);
    setErrorMsg(responseActive.message as string);
    if (responseActive.ok) {
      setCartId(responseActive.data as string);
    }
    setLoadingCart(false);
  };
  return {
    getProductQuantity,
    increaseProductQuantity,
    decreaseProductQuantity,
    total,
    loadCart,
    ok,
    loading,
    errorMsg,
  };
};
