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
  ShoppingCartItem,
  ShoppingCart,
} from '../services/shoppingCart.service';

type ShoppingCartProviderProps = {
  children?: ReactNode;
};

type ShoppingCartContextType = {
  getProductQuantity: (productId: string) => number;
  increaseProductQuantity: (productId: string) => Promise<CTResponse>;
  decreaseProductQuantity: (productId: string) => Promise<CTResponse>;
  removeProduct: (productId: string) => Promise<CTResponse>;
  total: number;
  setCartId: (activeCartId: string) => void;
  cartId: string;
  cartVersion: number;
  setCartAfterSignIn: (data: CustomerSignInResult) => Promise<CTResponse>;
  unsetCart: () => void;
  getCTCart: () => Promise<CTResponse>;
};

export const ShoppingCartContext = createContext<ShoppingCartContextType>(
  {} as ShoppingCartContextType
);

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const shoppingCartService = new ShoppingCartService();

  const [shoppingCart, setShoppingCart] = useState<ShoppingCart>();

  const [activeCartId, setActiveCartId] = useLocalStorage('apiCartId', '');

  const cartId = activeCartId;
  const cartVersion = shoppingCart?.version || 0;

  function getProductQuantity(productId: string) {
    const product = shoppingCart?.products[productId];
    return product ? product.quantity : 0;
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

    const products: ShoppingCartItem = {};

    if (lineItems) {
      lineItems.forEach((item: LineItem) => {
        const {
          productId = '',
          id = '',
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
          productId,
          name: productName,
          lineItemId: id,
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

    setShoppingCart(shoppingCartUpdate);
  }

  async function changeLineItemQuantity(
    lineItemId: string,
    quantity: number
  ): Promise<CTResponse> {
    const answer = await shoppingCartService.changeLineItemQuantity(
      cartId,
      cartVersion,
      lineItemId,
      quantity > 0 ? quantity : 0
    );

    if (!answer.ok) {
      return answer;
    }
    const response = answer.data as GraphQLResponse;
    updateShoppingCart(response);

    return answer;
  }

  async function increaseProductQuantity(
    productId: string
  ): Promise<CTResponse> {
    const productInCart = shoppingCart?.products[productId];
    if (!productInCart) {
      const answer = await shoppingCartService.addLineItem(
        cartId,
        cartVersion,
        productId
      );

      if (!answer.ok) {
        return answer;
      }
      const response = answer.data as GraphQLResponse;
      updateShoppingCart(response);
      return answer;
    }

    const { lineItemId, quantity } = productInCart;
    const answer = changeLineItemQuantity(lineItemId, quantity + 1);

    return answer;
  }

  async function decreaseProductQuantity(
    productId: string
  ): Promise<CTResponse> {
    const productInCart = shoppingCart?.products[productId];
    if (!productInCart) {
      return new Promise((resolve) =>
        resolve({ ok: false, status: 404, message: 'Wrong productID' })
      );
    }

    const { lineItemId, quantity } = productInCart;
    const answer = changeLineItemQuantity(lineItemId, quantity - 1);

    return answer;
  }

  async function removeProduct(productId: string): Promise<CTResponse> {
    const productInCart = shoppingCart?.products[productId];
    if (!productInCart) {
      return new Promise((resolve) =>
        resolve({ ok: false, status: 404, message: 'Wrong productID' })
      );
    }

    const { lineItemId } = productInCart;
    const answer = changeLineItemQuantity(lineItemId, 0);

    return answer;
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

  const getCTCart = async (): Promise<CTResponse> => {
    if (!cartId) {
      return new Promise((resolve) =>
        resolve({ ok: false, status: 404, message: 'No Cart ID' })
      );
    }
    const cartResponse = await shoppingCartService.getCart(cartId);
    if (cartResponse.ok) {
      const response = cartResponse.data as GraphQLResponse;
      updateShoppingCart(response);
    }
    return cartResponse;
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
        getCTCart,
      }}
    >
      {' '}
      {children}
    </ShoppingCartContext.Provider>
  );
}
