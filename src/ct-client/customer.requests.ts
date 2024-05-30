import {
  ByProjectKeyRequestBuilder,
  ClientResponse,
  CustomerChangePassword,
  CustomerDraft,
  CustomerSignInResult,
  CustomerSignin,
} from '@commercetools/platform-sdk';
import { apiRoot } from './client.builder';

export class CustomerRequests {
  private apiRoot: ByProjectKeyRequestBuilder;
  constructor() {
    this.apiRoot = apiRoot;
  }
  async createCustomer(
    customerDraft: CustomerDraft
  ): Promise<ClientResponse<CustomerSignInResult>> {
    const result = await this.apiRoot
      .customers()
      .post({ body: customerDraft })
      .execute();

    return result;
  }

  async login(
    customerSignin: CustomerSignin
  ): Promise<ClientResponse<CustomerSignInResult>> {
    const result = await this.apiRoot
      .login()
      .post({ body: customerSignin })
      .execute();

    return result;
  }

  async checkCustomerExistsByQuery(queryArgs: {
    where: string;
  }): Promise<ClientResponse> {
    const result = await this.apiRoot.customers().head({ queryArgs }).execute();
    return result;
  }

  async changePassword(
    customerChangePassword: CustomerChangePassword
  ): Promise<ClientResponse> {
    const result = await this.apiRoot
      .customers()
      .password()
      .post({ body: customerChangePassword })
      .execute();
    return result;
  }

  async getCustomerById(id: string): Promise<ClientResponse> {
    const result = await this.apiRoot
      .customers()
      .withId({ ID: id })
      .get()
      .execute();
    return result;
  }
}
