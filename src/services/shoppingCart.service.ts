import {
  CartDraft,
  DiscountOnTotalPrice,
  Price,
  TypedMoney,
} from '@commercetools/platform-sdk';

import { CTResponse, CTResponseHandler } from '../ct-client';
import { GraphqlRequest } from '../ct-client/graphql.request';

const {
  VITE_CTP_LOCALE = 'en-GB',
  VITE_CTP_CURRENCY = 'EUR',
  VITE_CTP_COUNTRY = 'DE',
} = import.meta.env;

const CART_DATA_TO_RECEIVE = `
  id
  version
  totalLineItemQuantity
  totalPrice {
    centAmount
    fractionDigits
  }
  lineItems {
    id
    productKey
    productId
    name(locale: $locale)
    quantity
    variant {
      images {
        url
        label
      }
    }
    price {
      discounted {
        value {
          centAmount
          fractionDigits
        }
        discount{
          name(locale: $locale)
        }
      }
      value {
        centAmount
        fractionDigits
        currencyCode
      }
    }
  }
  discountOnTotalPrice {
    discountedAmount {
      centAmount
      fractionDigits
      currencyCode
    }
    includedDiscounts {
      discount {
        name(locale: $locale)
      }
      discountedAmount {
        fractionDigits
        centAmount
        currencyCode
      }
    }
  }
`;

export interface ProductInShoppingCart {
  productId: string;
  productKey: string;
  lineItemId: string;
  name: string;
  quantity: number;
  imageUrl: string;
  imageLabel: string;
  price: Price;
}
export interface ShoppingCartItem {
  [productId: string]: ProductInShoppingCart;
}

export interface ShoppingCart {
  id: string;
  version: number;
  totalLineItemQuantity: number;
  totalPrice: TypedMoney;
  discountOnTotalPrice: DiscountOnTotalPrice;
  products: ShoppingCartItem;
}

export class ShoppingCartService {
  graphqlRequest = new GraphqlRequest();

  private async createCart(cartDraft: CartDraft): Promise<CTResponse> {
    const query = `
      mutation ($cartDraft: CartDraft!) {
        createCart(draft: $cartDraft) {
          id
          version
          totalLineItemQuantity
        }
      }
    `;

    const variables = { cartDraft };

    try {
      const answer = await this.graphqlRequest.make({ query, variables });

      return CTResponseHandler.handleGraphql(answer);
    } catch (error) {
      return CTResponseHandler.handleCatch(error);
    }
  }

  async createCartForCustomer(customerId: string): Promise<CTResponse> {
    const cartDraft: CartDraft = {
      currency: VITE_CTP_CURRENCY,
      country: VITE_CTP_COUNTRY,
      locale: VITE_CTP_LOCALE,
      customerId,
    };

    return await this.createCart(cartDraft);
  }

  async addLineItem(
    cartId: string,
    cartVersion: number,
    productId: string
  ): Promise<CTResponse> {
    const query = `
      mutation ($cartId: String, $cartVersion: Long!, $productId:String, $locale: Locale) {
        updateCart(id: $cartId, version: $cartVersion, actions: [{addLineItem: {productId: $productId}}]) {
          ${CART_DATA_TO_RECEIVE}
        }
      }
    `;

    const variables = {
      cartId,
      cartVersion,
      productId,
      locale: VITE_CTP_LOCALE,
    };

    try {
      const answer = await this.graphqlRequest.make({ query, variables });

      return CTResponseHandler.handleGraphql(answer);
    } catch (error) {
      return CTResponseHandler.handleCatch(error);
    }
  }

  async getCart(cartId: string): Promise<CTResponse> {
    const query = `
      query ($cartId: String!, $locale: Locale!) {
        cart(id: $cartId) {
         ${CART_DATA_TO_RECEIVE}
        }
      }
    `;

    const variables = { cartId, locale: VITE_CTP_LOCALE };

    try {
      const answer = await this.graphqlRequest.make({ query, variables });

      return CTResponseHandler.handleGraphql(answer);
    } catch (error) {
      return CTResponseHandler.handleCatch(error);
    }
  }

  async changeLineItemQuantity(
    cartId: string,
    cartVersion: number,
    lineItemId: string,
    quantity: number
  ): Promise<CTResponse> {
    const query = `
      mutation ($cartId: String, $cartVersion: Long!, $locale: Locale, $lineItemId: String, $quantity: Long!) {
        updateCart(id: $cartId, version: $cartVersion, actions: [{changeLineItemQuantity: {lineItemId: $lineItemId, quantity: $quantity}}]) {
          ${CART_DATA_TO_RECEIVE}
        }
      }
    `;

    const variables = {
      cartId,
      cartVersion,
      locale: VITE_CTP_LOCALE,
      lineItemId,
      quantity,
    };

    try {
      const answer = await this.graphqlRequest.make({ query, variables });

      return CTResponseHandler.handleGraphql(answer);
    } catch (error) {
      return CTResponseHandler.handleCatch(error);
    }
  }

  async deleteCart(cartId: string, cartVersion: number): Promise<CTResponse> {
    const query = `
      mutation ($cartId: String, $cartVersion: Long!) {
        deleteCart(id: $cartId, version: $cartVersion) {
          id
        }
      }
    `;
    const variables = {
      cartId,
      cartVersion,
    };
    try {
      const answer = await this.graphqlRequest.make({ query, variables });

      return CTResponseHandler.handleGraphql(answer);
    } catch (error) {
      return CTResponseHandler.handleCatch(error);
    }
  }

  async addDiscountCode(
    cartId: string,
    cartVersion: number,
    promoCode: string
  ): Promise<CTResponse> {
    const query = `
      mutation ($cartId: String, $cartVersion: Long!, $locale: Locale, $promoCode: String!, $validateDuplicates:Boolean) {
        updateCart(id: $cartId, version: $cartVersion, actions: [{addDiscountCode: {code: $promoCode, validateDuplicates:$validateDuplicates}}]) {
          ${CART_DATA_TO_RECEIVE}
        }
      }
    `;
    const variables = {
      cartId,
      cartVersion,
      promoCode,
      validateDuplicates: true,
      locale: VITE_CTP_LOCALE,
    };

    try {
      const answer = await this.graphqlRequest.make({ query, variables });

      return CTResponseHandler.handleGraphql(answer);
    } catch (error) {
      return CTResponseHandler.handleCatch(error);
    }
  }
}
