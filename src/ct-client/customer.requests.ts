import {
  ByProjectKeyRequestBuilder,
  ClientResponse,
  CustomerDraft,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { apiRoot } from './client.builder';

export class CustomerRequests {
  private apiRoot: ByProjectKeyRequestBuilder;
  constructor() {
    this.apiRoot = apiRoot;
  }
  async createCustomer(
    customerDraft: CustomerDraft
  ): Promise<
    ClientResponse<CustomerSignInResult>
  > {
    const result = await this.apiRoot
      .customers()
      .post({ body: customerDraft })
      .execute();

    return result;
  }
}
