import { ReactNode, createContext } from 'react';
import { useLocalStorage } from '../hooks';

type ShoppingCartProviderProps = {
  children?: ReactNode;
};

type CartItem = {
  key: string;
  quantity: number;
};

type ShoppingCartContextType = {
  getProductQuantity: (key: string) => number;
  increaseProductQuantity: (key: string) => void;
  decreaseProductQuantity: (key: string) => void;
  removeProduct: (key: string) => void;
  total: number;
};

export const ShoppingCartContext = createContext<ShoppingCartContextType>(
  {} as ShoppingCartContextType
);

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'mockCartItems',
    []
  );

  function getProductQuantity(key: string) {
    return cartItems.find((item) => item.key === key)?.quantity || 0;
  }
  function increaseProductQuantity(key: string) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.key === key) === undefined) {
        return [...currentItems, { key, quantity: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.key === key) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseProductQuantity(key: string) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.key === key)?.quantity === 1) {
        return currentItems.filter((item) => item.key !== key);
      } else {
        return currentItems.map((item) => {
          if (item.key === key) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeProduct(key: string) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.key !== key);
    });
  }

  const total = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  return (
    <ShoppingCartContext.Provider
      value={{
        getProductQuantity,
        increaseProductQuantity,
        decreaseProductQuantity,
        removeProduct,
        total,
      }}
    >
      {' '}
      {children}
    </ShoppingCartContext.Provider>
  );
}
