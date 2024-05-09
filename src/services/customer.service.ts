import {
  ClientResponse,
  CustomerDraft,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';
import {
  CTResponse,
  CTResponseHandler,
  CustomerRequests,
  HttpStatusCode,
} from '../ct-client';

export class CustomerService {
  customerRequests: CustomerRequests =
    new CustomerRequests();
  async add(
    customerDraft: CustomerDraft
  ): Promise<CTResponse> {
    try {
      const answer =
        await this.customerRequests.createCustomer(
          customerDraft
        );

      if (
        answer.statusCode ===
        HttpStatusCode.CREATED_201
      ) {
        return CTResponseHandler.makeSuccess(
          answer.statusCode,
          '',
          (
            answer.body as CustomerSignInResult
          ).customer
        );
      } else {
        return CTResponseHandler.makeError(
          answer.statusCode || 0,
          'Unknown Problem',
          undefined
        );
      }
    } catch (error) {
      return CTResponseHandler.handleCatch(
        error as ClientResponse
      );
    }
  }
}
