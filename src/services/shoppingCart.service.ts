import { ClientResponse } from '@commercetools/platform-sdk';
import { CTResponse, CTResponseHandler, HttpStatusCode } from '../ct-client';
import { GraphqlRequest } from '../ct-client/graphql.request';

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
      return CTResponseHandler.handleCatch(error as ClientResponse);
    }
  }
}
