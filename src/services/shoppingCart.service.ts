import { CartDraft, Money } from '@commercetools/platform-sdk';
import { CTResponse, CTResponseHandler, HttpStatusCode } from '../ct-client';
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
      }
      value {
        centAmount
        fractionDigits
        currencyCode
      }
    }
  }
`;

export interface ProductInShoppingCart {
  [productId: string]: {
    lineItemId: string;
    name: string;
    quantity: number;
    imageUrl: string;
    imageLabel: string;
    price: Money;
  };
}

export interface ShoppingCart {
  id: string;
  version: number;
  totalLineItemQuantity: number;
  totalPrice: Money;
  products: ProductInShoppingCart;
}

export class ShoppingCartService {
  graphqlRequest = new GraphqlRequest();
  /**
   * @description checks if user with `customerId` has any active shopping carts
   * and returns the ID of last modified one.
   *
   * @param customerId string
   *
   * @return CTResponse
   */

  async getActiveCartId(customerId: string): Promise<CTResponse> {
    const query = `
      query {
        carts(where:"customerId=\\"${customerId}\\" and cartState=\\"Active\\"",
            sort:"lastModifiedAt Desc") {
          total
          results {
            id
          }
        }
      }`;
    const variables = {};

    try {
      const answer = await this.graphqlRequest.make({ query, variables });

      const { total, results } = answer.body.data;

      if (answer.statusCode === HttpStatusCode.OK_200 && total) {
        return CTResponseHandler.makeSuccess(answer.statusCode, '', results[0]);
      }

      if (answer.statusCode === HttpStatusCode.OK_200 && !total) {
        return CTResponseHandler.makeError(
          HttpStatusCode.NOT_FOUND_404,
          'No Active Shopping Cart Found',
          undefined
        );
      }

      return CTResponseHandler.handleUnexpectedStatus(answer.statusCode);
    } catch (error) {
      return CTResponseHandler.handleCatch(error);
    }
  }

  private async createCart(cartDraft: CartDraft): Promise<CTResponse> {
    const query = `
      mutation ($cartDraft: CartDraft!) {
        createCart(draft: $cartDraft) {
          ${CART_DATA_TO_RECEIVE}
        }
      }
    `;

    const variables = { cartDraft, locale: VITE_CTP_LOCALE };

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

  async increaseProductQuantity(
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
}
