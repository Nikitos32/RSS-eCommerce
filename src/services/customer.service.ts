import {
  BaseAddress,
  ClientResponse,
  CustomerDraft,
  CustomerSignInResult,
  CustomerSignin,
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

  async signIn(
    email: string,
    password: string
  ): Promise<CTResponse> {
    const customerSign: CustomerSignin =
      { email, password };
    try {
      const answer =
        await this.customerRequests.login(
          customerSign
        );

      if (
        answer.statusCode ===
        HttpStatusCode.OK_200
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

  createDraft(
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    dateOfBirth?: string,
    addresses?: BaseAddress[],
    shippingAddresses?: number[],
    defaultShippingAddress?: number,
    billingAddresses?: number[],
    defaultBillingAddress?: number
  ): CustomerDraft {
    const customerDraft: CustomerDraft =
      {
        email,
        password,
        firstName,
        lastName,
        dateOfBirth,
        addresses,
        defaultShippingAddress,
        shippingAddresses,
        defaultBillingAddress,
        billingAddresses,
      };
    return customerDraft;
  }

  createAddress(
    country: string,
    firstName?: string,
    lastName?: string,
    streetName?: string,
    city?: string,
    postalCode?: string
  ): BaseAddress {
    const address: BaseAddress = {
      country,
      firstName,
      lastName,
      streetName,
      city,
      postalCode,
    };
    return address;
  }

  createDraftFromRegForm(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    streetName: string,
    city: string,
    postalCode: string,
    country: string,
    isDefaultAddress: boolean
  ): CustomerDraft {
    const address = this.createAddress(
      country,
      lastName,
      firstName,
      streetName,
      city,
      postalCode
    );

    const shippingAddresses =
      isDefaultAddress
        ? [0]
        : undefined;
    const defaultShippingAddress =
      isDefaultAddress ? 0 : undefined;
    const billingAddresses =
      isDefaultAddress
        ? [0]
        : undefined;
    const defaultBillingAddress =
      isDefaultAddress ? 0 : undefined;

    return this.createDraft(
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      [address],
      shippingAddresses,
      defaultShippingAddress,
      billingAddresses,
      defaultBillingAddress
    );
  }
}
