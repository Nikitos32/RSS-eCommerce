import { ReactNode, createContext, useState } from 'react';
import { useLocalStorage } from '../hooks';
import { ShoppingCartService } from '../services';
import { CTResponse } from '../ct-client';
import {
  CustomerSignInResult,
  GraphQLResponse,
} from '@commercetools/platform-sdk';

type ShoppingCartProviderProps = {
  children?: ReactNode;
};

type CartItem = {
  productId: string;
  quantity: number;
};

type ShoppingCartContextType = {
  getProductQuantity: (productId: string) => number;
  increaseProductQuantity: (productId: string) => Promise<CTResponse>;
  decreaseProductQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
  total: number;
  setCartId: (activeCartId: string) => void;
  cartId: string;
  cartVersion: number;
  setCartVersion: (cartVersion: number) => void;
  setCartAfterSignIn: (data: CustomerSignInResult) => Promise<CTResponse>;
  unsetCart: () => void;
};

export const ShoppingCartContext = createContext<ShoppingCartContextType>(
  {} as ShoppingCartContextType
);

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'mockCartItems',
    []
  );
  const shoppingCartService = new ShoppingCartService();

  const [activeCartId, setActiveCartId] = useLocalStorage('apiCartId', '');
  const [activeCartVersion, setActiveCartVersion] = useState(0);

  const cartId = activeCartId;
  const cartVersion = activeCartVersion;

  function getProductQuantity(productId: string) {
    return (
      cartItems.find((item) => item.productId === productId)?.quantity || 0
    );
  }
  async function increaseProductQuantity(
    productId: string
  ): Promise<CTResponse> {
    const answer = await shoppingCartService.increaseProductQuantity(
      cartId,
      cartVersion,
      productId
    );

    if (!answer.ok) {
      return answer;
    }
    const response = answer.data as GraphQLResponse;
    setCartVersion(response.data.updateCart.version);

    setCartItems((currentItems) => {
      if (
        currentItems.find((item) => item.productId === productId) === undefined
      ) {
        return [...currentItems, { productId: productId, quantity: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.productId === productId) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });

    return answer;
  }

  function decreaseProductQuantity(productId: string) {
    setCartItems((currentItems) => {
      if (
        currentItems.find((item) => item.productId === productId)?.quantity ===
        1
      ) {
        return currentItems.filter((item) => item.productId !== productId);
      } else {
        return currentItems.map((item) => {
          if (item.productId === productId) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeProduct(productId: string) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.productId !== productId);
    });
  }

  const total = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function setCartId(activeCartId: string) {
    setActiveCartId(activeCartId);
  }

  function setCartVersion(cartVersion: number) {
    setActiveCartVersion(cartVersion);
  }

  const setCartAfterSignIn = async (
    data: CustomerSignInResult
  ): Promise<CTResponse> => {
    if (data.cart) {
      setCartId(data.cart.id);
      setCartVersion(data.cart.version);
      return new Promise((resolve) =>
        resolve({ ok: true, message: '', data, status: 200 })
      );
    }

    const responseNewCart = await shoppingCartService.createCartForCustomer(
      data.customer.id
    );
    if (responseNewCart.ok) {
      const newCart = responseNewCart.data as GraphQLResponse;
      setCartId(newCart.data.createCart.id);
      setCartVersion(newCart.data.cart.version);
    }

    return responseNewCart;
  };

  const unsetCart = () => {
    setCartId('');
    setCartVersion(0);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getProductQuantity,
        increaseProductQuantity,
        decreaseProductQuantity,
        removeProduct,
        total,
        cartId,
        setCartId,
        cartVersion,
        setCartVersion,
        setCartAfterSignIn,
        unsetCart,
      }}
    >
      {' '}
      {children}
    </ShoppingCartContext.Provider>
  );
}
