import { ReactNode, createContext, useState } from 'react';
import { useAuth, useLocalStorage } from '../hooks';
import { ShoppingCartService } from '../services';
import { CTResponse, HttpStatusCode } from '../ct-client';
import {
  CustomerSignInResult,
  DiscountOnTotalPrice,
  GraphQLResponse,
  Image,
  LineItem,
  TypedMoney,
} from '@commercetools/platform-sdk';
import {
  ShoppingCartItem,
  ShoppingCart,
  ProductInShoppingCart,
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
  totalPrice: TypedMoney;
  setCartId: (activeCartId: string) => void;
  cartId: string;
  cartVersion: number;
  setCartAfterSignIn: (data: CustomerSignInResult) => Promise<CTResponse>;
  unsetCart: () => void;
  getCTCart: () => Promise<CTResponse>;
  getShoppingCartProducts: () => ProductInShoppingCart[];
  clearShoppingCart: () => Promise<CTResponse>;
  addPromoCode: (promoCode: string) => Promise<CTResponse>;
  discountOnTotalPrice: DiscountOnTotalPrice | undefined;
};

export const ShoppingCartContext = createContext<ShoppingCartContextType>(
  {} as ShoppingCartContextType
);

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const shoppingCartService = new ShoppingCartService();

  const [shoppingCart, setShoppingCart] = useState<ShoppingCart>();

  const [activeCartId, setActiveCartId] = useLocalStorage('apiCartId', '');

  const [updateInProgress, setUpdateInProgress] = useState(false);
  const answerUpdateInProgress = new Promise<CTResponse>((resolve) =>
    resolve({
      ok: false,
      status: HttpStatusCode.IM_USED_226,
      message: 'Concurrent request. Please try again.',
    })
  );

  const { authenticated, customerId } = useAuth();

  const cartId = activeCartId;
  const cartVersion = shoppingCart?.version || 0;
  const totalPrice = shoppingCart?.totalPrice || ({} as TypedMoney);
  const discountOnTotalPrice = shoppingCart?.discountOnTotalPrice;

  function getProductQuantity(productId: string) {
    const product = shoppingCart?.products[productId];
    return product ? product.quantity : 0;
  }

  function getShoppingCartProducts(): ProductInShoppingCart[] {
    const products = shoppingCart?.products;
    const empty: ProductInShoppingCart[] = [];
    return products ? Object.values(products) : empty;
  }
  function updateShoppingCart(response: GraphQLResponse) {
    const {
      id = '',
      version = 0,
      totalLineItemQuantity = 0,
      totalPrice = null,
      lineItems = [],
      discountOnTotalPrice,
    } = response.data.updateCart ||
    response.data.createCart ||
    response.data.cart;

    const products: ShoppingCartItem = {};

    if (lineItems) {
      lineItems.forEach((item: LineItem) => {
        const {
          productKey = '',
          productId = '',
          id = '',
          name = '',
          quantity = 0,
          variant,
          price,
        } = item;

        const productName = name as string;

        const firstImage = variant?.images ? variant?.images[0] : ({} as Image);

        const { url: imageUrl = '', label: imageLabel = productName } =
          firstImage;

        products[productId] = {
          productId,
          productKey,
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
      discountOnTotalPrice,
      products,
    };

    setShoppingCart(shoppingCartUpdate);
  }

  async function changeLineItemQuantity(
    lineItemId: string,
    quantity: number
  ): Promise<CTResponse> {
    if (updateInProgress) {
      return answerUpdateInProgress;
    }

    setUpdateInProgress(true);
    const answer = await shoppingCartService.changeLineItemQuantity(
      cartId,
      cartVersion,
      lineItemId,
      quantity > 0 ? quantity : 0
    );
    setUpdateInProgress(false);

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
    if (!cartId && !authenticated) {
      const newCartResponse =
        await shoppingCartService.createCartForAnonymous();
      if (newCartResponse.ok) {
        const newCart = newCartResponse.data as GraphQLResponse;
        setCartId(newCart.data.createCart.id);
        updateShoppingCart(newCart);
      }
      return newCartResponse;
    }
    const cartResponse = await shoppingCartService.getCart(cartId);
    if (cartResponse.ok) {
      const response = cartResponse.data as GraphQLResponse;
      updateShoppingCart(response);
    }
    return cartResponse;
  };

  const clearShoppingCart = async (): Promise<CTResponse> => {
    const answerDelete = await shoppingCartService.deleteCart(
      cartId,
      cartVersion
    );

    if (!answerDelete.ok) {
      return answerDelete;
    }

    unsetCart();

    if (authenticated) {
      const newCartResponse =
        await shoppingCartService.createCartForCustomer(customerId);
      if (newCartResponse.ok) {
        const newCart = newCartResponse.data as GraphQLResponse;
        updateShoppingCart(newCart);
        setCartId(newCart.data.createCart.id);
      }

      return newCartResponse;
    }

    const newCartResponse = await shoppingCartService.createCartForAnonymous();
    if (newCartResponse.ok) {
      const newCart = newCartResponse.data as GraphQLResponse;
      updateShoppingCart(newCart);
      setCartId(newCart.data.createCart.id);
    }

    return newCartResponse;
  };

  const addPromoCode = async (promoCode: string): Promise<CTResponse> => {
    const answer = await shoppingCartService.addDiscountCode(
      cartId,
      cartVersion,
      promoCode
    );

    if (!answer.ok) {
      return answer;
    }
    const response = answer.data as GraphQLResponse;
    updateShoppingCart(response);

    return answer;
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getProductQuantity,
        increaseProductQuantity,
        decreaseProductQuantity,
        removeProduct,
        total,
        totalPrice,
        cartId,
        setCartId,
        cartVersion,
        setCartAfterSignIn,
        unsetCart,
        getCTCart,
        getShoppingCartProducts,
        clearShoppingCart,
        addPromoCode,
        discountOnTotalPrice,
      }}
    >
      {' '}
      {children}
    </ShoppingCartContext.Provider>
  );
}
