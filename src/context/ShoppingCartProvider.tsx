import { ReactNode, createContext, useState } from 'react';
import { useLocalStorage } from '../hooks';

type ShoppingCartProviderProps = {
  children?: ReactNode;
};

type CartItem = {
  productId: string;
  quantity: number;
};

type ShoppingCartContextType = {
  getProductQuantity: (productId: string) => number;
  increaseProductQuantity: (productId: string) => void;
  decreaseProductQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
  total: number;
  setCartId: (activeCartId: string) => void;
  cartId: string;
  cartVersion: number;
  setCartVersion: (cartVersion: number) => void;
};

export const ShoppingCartContext = createContext<ShoppingCartContextType>(
  {} as ShoppingCartContextType
);

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'mockCartItems',
    []
  );

  const [activeCartId, setActiveCartId] = useLocalStorage('apiCartId', '');
  const [activeCartVersion, setActiveCartVersion] = useState(0);

  function getProductQuantity(productId: string) {
    return (
      cartItems.find((item) => item.productId === productId)?.quantity || 0
    );
  }
  function increaseProductQuantity(productId: string) {
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

  const cartId = activeCartId;
  const cartVersion = activeCartVersion;

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
      }}
    >
      {' '}
      {children}
    </ShoppingCartContext.Provider>
  );
}
