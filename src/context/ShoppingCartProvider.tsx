import { ReactNode, createContext, useState } from 'react';
import { useLocalStorage } from '../hooks';
import { ShoppingCartService } from '../services';
import { CTResponse } from '../ct-client';
import {
  CustomerSignInResult,
  GraphQLResponse,
  Image,
  LineItem,
} from '@commercetools/platform-sdk';
import {
  ProductInShoppingCart,
  ShoppingCart,
} from '../services/shoppingCart.service';

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

  const [shoppingCart, setShoppingCart] = useState<ShoppingCart>();

  const [activeCartId, setActiveCartId] = useLocalStorage('apiCartId', '');

  const cartId = activeCartId;
  const cartVersion = shoppingCart?.version || 0;

  function getProductQuantity(productId: string) {
    return (
      cartItems.find((item) => item.productId === productId)?.quantity || 0
    );
  }

  function updateShoppingCart(response: GraphQLResponse) {
    const {
      id = '',
      version = 0,
      totalLineItemQuantity = 0,
      totalPrice = null,
      lineItems = [],
    } = response.data.updateCart ||
    response.data.createCart ||
    response.data.cart;

    const products: ProductInShoppingCart = {};

    if (lineItems) {
      lineItems.forEach((item: LineItem) => {
        const {
          productId = '',
          name = '',
          quantity = 0,
          variant,
          price: { value: price },
        } = item;

        const productName = name as string;

        const firstImage = variant?.images ? variant?.images[0] : ({} as Image);

        const { url: imageUrl = '', label: imageLabel = productName } =
          firstImage;

        products[productId] = {
          name: productName,
          quantity,
          price,
          imageUrl,
          imageLabel,
        };
      });
    }
    const shoppingCartUpdate: ShoppingCart = {
      id,
      version,
      totalPrice,
      totalLineItemQuantity,
      products,
    };
    console.log('updateShoppingCart', shoppingCartUpdate);

    setShoppingCart(shoppingCartUpdate);
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
    updateShoppingCart(response);

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

  const total = shoppingCart?.totalLineItemQuantity || 0;

  function setCartId(activeCartId: string) {
    setActiveCartId(activeCartId);
  }

  const setCartAfterSignIn = async (
    data: CustomerSignInResult
  ): Promise<CTResponse> => {
    if (data.cart) {
      const cartResponse = await shoppingCartService.getCart(data.cart.id);
      if (cartResponse.ok) {
        const response = cartResponse.data as GraphQLResponse;
        updateShoppingCart(response);
      }
      setCartId(data.cart.id);
      return cartResponse;
    }

    const newCartResponse = await shoppingCartService.createCartForCustomer(
      data.customer.id
    );
    if (newCartResponse.ok) {
      const newCart = newCartResponse.data as GraphQLResponse;
      updateShoppingCart(newCart);
      setCartId(newCart.data.createCart.id);
    }

    return newCartResponse;
  };

  const unsetCart = () => {
    setCartId('');
    setShoppingCart(undefined);
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
        setCartAfterSignIn,
        unsetCart,
      }}
    >
      {' '}
      {children}
    </ShoppingCartContext.Provider>
  );
}
