import {
  ByProjectKeyRequestBuilder,
  ClientResponse,
  CustomerDraft,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { apiRoot } from './ClientBuilder';

export class CustomerRepository {
  private apiRoot: ByProjectKeyRequestBuilder;
  constructor() {
    this.apiRoot = apiRoot;
  }
  createCustomer(
    customerDraft: CustomerDraft
  ): Promise<
    ClientResponse<CustomerSignInResult>
  > {
    return this.apiRoot
      .customers()
      .post({ body: customerDraft })
      .execute();
  }
}
