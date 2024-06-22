import {
  ByProjectKeyRequestBuilder,
  GraphQLResponse,
  ClientResponse,
  GraphQLRequest,
} from '@commercetools/platform-sdk';
import { apiRoot } from './client.builder';

export class GraphqlRequest {
  private apiRoot: ByProjectKeyRequestBuilder;
  constructor() {
    this.apiRoot = apiRoot;
  }

  async make(
    request: GraphQLRequest
  ): Promise<ClientResponse<GraphQLResponse>> {
    const result = await this.apiRoot
      .graphql()
      .post({ body: request })
      .execute();

    return result;
  }
}
