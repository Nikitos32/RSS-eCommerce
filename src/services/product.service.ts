import { ClientResponse } from '@commercetools/platform-sdk';
import { CTResponse, CTResponseHandler, HttpStatusCode } from '../ct-client';
import { GraphqlRequest } from '../ct-client/graphql.request';

export class ProductService {
  graphqlRequest = new GraphqlRequest();

  async getProductById(
    id: string,
    locale: string = 'en-US'
  ): Promise<CTResponse> {
    const query = `
    query($id: String, $locale: Locale) {
      product(id: $id) {
        key
        masterData {
          current {
            skus
            name(locale: $locale)
            description(locale: $locale)
            categories {
              id
              name(locale:$locale)
            }
          }
        }
      }
    }
    `;

    const variables = { id, locale };

    try {
      const answer = await this.graphqlRequest.make({ query, variables });

      const { product } = answer.body.data;

      if (answer.statusCode === HttpStatusCode.OK_200 && product) {
        return CTResponseHandler.makeSuccess(
          answer.statusCode,
          '',
          answer.body
        );
      }

      if (answer.statusCode === HttpStatusCode.OK_200 && !product) {
        return CTResponseHandler.makeError(
          HttpStatusCode.NOT_FOUND_404,
          'Not Found Product',
          undefined
        );
      }

      return CTResponseHandler.handleUnexpectedStatus(answer.statusCode);
    } catch (error) {
      return CTResponseHandler.handleCatch(error as ClientResponse);
    }
  }
}
