import {
  BaseAddress,
  ClientResponse,
  Customer,
  CustomerChangePassword,
  CustomerDraft,
  CustomerSetDateOfBirthAction,
  CustomerSetFirstNameAction,
  CustomerSetLastNameAction,
  CustomerSignInResult,
  CustomerSignin,
  CustomerUpdate,
  ErrorObject,
} from '@commercetools/platform-sdk';
import {
  CTResponse,
  CTResponseHandler,
  CustomerRequests,
  HttpStatusCode,
} from '../ct-client';

export class CustomerService {
  customerRequests: CustomerRequests = new CustomerRequests();
  async signUp(customerDraft: CustomerDraft): Promise<CTResponse> {
    try {
      const answer = await this.customerRequests.createCustomer(customerDraft);

      if (answer.statusCode === HttpStatusCode.CREATED_201) {
        return CTResponseHandler.makeSuccess(
          answer.statusCode,
          '',
          answer.body as CustomerSignInResult
        );
      } else {
        return CTResponseHandler.handleUnexpectedStatus(answer.statusCode);
      }
    } catch (error) {
      return CTResponseHandler.handleCatch(error as ClientResponse);
    }
  }

  async signIn(email: string, password: string): Promise<CTResponse> {
    const customerSign: CustomerSignin = {
      email: email.toLowerCase(),
      password,
    };

    const userExists = await this.checkUserExists(customerSign.email);

    if (!userExists.ok) {
      return userExists;
    }

    try {
      const answer = await this.customerRequests.login(customerSign);

      if (answer.statusCode === HttpStatusCode.OK_200) {
        return CTResponseHandler.makeSuccess(
          answer.statusCode,
          '',
          answer.body as CustomerSignInResult
        );
      } else {
        return CTResponseHandler.handleUnexpectedStatus(answer.statusCode);
      }
    } catch (error) {
      const response = CTResponseHandler.handleCatch(error as ClientResponse);

      const errors = response.data as ErrorObject[];

      if (
        response.status === HttpStatusCode.BAD_REQUEST_400 &&
        errors &&
        errors[0].code === 'InvalidCredentials'
      ) {
        response.message = 'Wrong password';
      }

      return response;
    }
  }

  async changePassword(
    customerChangePassword: CustomerChangePassword
  ): Promise<CTResponse> {
    try {
      const answer = await this.customerRequests.changePassword(
        customerChangePassword
      );
      if (answer.statusCode === HttpStatusCode.OK_200) {
        return CTResponseHandler.makeSuccess(
          answer.statusCode,
          '',
          answer.body as Customer
        );
      } else {
        return CTResponseHandler.handleUnexpectedStatus(answer.statusCode);
      }
    } catch (error) {
      return CTResponseHandler.handleCatch(error as ClientResponse);
    }
  }

  async getCustomerById(id: string): Promise<CTResponse> {
    try {
      const answer = await this.customerRequests.getCustomerById(id);

      if (answer.statusCode === HttpStatusCode.OK_200) {
        return CTResponseHandler.makeSuccess(
          answer.statusCode,
          '',
          answer.body as Customer
        );
      } else {
        return CTResponseHandler.handleUnexpectedStatus(answer.statusCode);
      }
    } catch (error) {
      return CTResponseHandler.handleCatch(error as ClientResponse);
    }
  }

  async updateCustomerProfile(
    id: string,
    version: number,
    firstName?: string,
    lastName?: string,
    dateOfBirth?: string
  ): Promise<CTResponse> {
    const customerUpdate: CustomerUpdate = { version, actions: [] };

    if (firstName) {
      customerUpdate.actions.push({ firstName } as CustomerSetFirstNameAction);
    }

    if (lastName) {
      customerUpdate.actions.push({ lastName } as CustomerSetLastNameAction);
    }

    if (dateOfBirth) {
      customerUpdate.actions.push({
        dateOfBirth,
      } as CustomerSetDateOfBirthAction);
    }

    if (!customerUpdate.actions.length) {
      return CTResponseHandler.makeError(
        HttpStatusCode.NO_CONTENT_204,
        'No changes to update',
        undefined
      );
    }

    try {
      const answer = await this.customerRequests.updateCustomer(
        id,
        customerUpdate
      );

      if (answer.statusCode === HttpStatusCode.OK_200) {
        return CTResponseHandler.makeSuccess(
          answer.statusCode,
          '',
          answer.body as Customer
        );
      } else {
        return CTResponseHandler.handleUnexpectedStatus(answer.statusCode);
      }
    } catch (error) {
      return CTResponseHandler.handleCatch(error as ClientResponse);
    }
  }

  private async checkUserExists(lowercaseEmail: string): Promise<CTResponse> {
    const queryArgs = {
      where: `lowercaseEmail="${lowercaseEmail}"`,
    };
    try {
      const answer =
        await this.customerRequests.checkCustomerExistsByQuery(queryArgs);
      switch (answer.statusCode) {
        case HttpStatusCode.OK_200: {
          return CTResponseHandler.makeSuccess(
            answer.statusCode,
            '',
            undefined
          );
        }
        default:
          return CTResponseHandler.handleUnexpectedStatus(answer.statusCode);
      }
    } catch (error) {
      const response = CTResponseHandler.handleCatch(error as ClientResponse);
      if (response.status === HttpStatusCode.NOT_FOUND_404) {
        response.message = 'The user with the specified email does not exist';
      }
      return response;
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
    const customerDraft: CustomerDraft = {
      email: email.toLowerCase(),
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

    const shippingAddresses = isDefaultAddress ? [0] : undefined;
    const defaultShippingAddress = isDefaultAddress ? 0 : undefined;
    const billingAddresses = isDefaultAddress ? [0] : undefined;
    const defaultBillingAddress = isDefaultAddress ? 0 : undefined;

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

  createDraftFromRegFormExtended(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    shippingStreetName: string,
    shippingCity: string,
    shippingPostalCode: string,
    shippingCountry: string,
    shippingIsDefaultAddress: boolean,
    billingStreetName: string,
    billingCity: string,
    billingPostalCode: string,
    billingCountry: string,
    billingIsDefaultAddress: boolean
  ): CustomerDraft {
    const shippingAddress = this.createAddress(
      shippingCountry,
      lastName,
      firstName,
      shippingStreetName,
      shippingCity,
      shippingPostalCode
    );

    const billingAddress = this.createAddress(
      billingCountry,
      lastName,
      firstName,
      billingStreetName,
      billingCity,
      billingPostalCode
    );

    const addresses = [shippingAddress, billingAddress];

    const shippingAddresses = [0];
    const defaultShippingAddress = shippingIsDefaultAddress ? 0 : undefined;
    const billingAddresses = [1];
    const defaultBillingAddress = billingIsDefaultAddress ? 1 : undefined;

    return this.createDraft(
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      addresses,
      shippingAddresses,
      defaultShippingAddress,
      billingAddresses,
      defaultBillingAddress
    );
  }
}
