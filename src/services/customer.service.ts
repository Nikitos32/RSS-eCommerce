import {
  BaseAddress,
  ClientResponse,
  Customer,
  CustomerAddAddressAction,
  CustomerAddBillingAddressIdAction,
  CustomerAddShippingAddressIdAction,
  CustomerChangeAddressAction,
  CustomerChangeEmailAction,
  CustomerChangePassword,
  CustomerDraft,
  CustomerRemoveBillingAddressIdAction,
  CustomerRemoveShippingAddressIdAction,
  CustomerSetDateOfBirthAction,
  CustomerSetDefaultBillingAddressAction,
  CustomerSetDefaultShippingAddressAction,
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
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string
  ): Promise<CTResponse> {
    const customerUpdate: CustomerUpdate = { version, actions: [] };

    if (email) {
      customerUpdate.actions.push({
        email,
        action: 'changeEmail',
      } as CustomerChangeEmailAction);
    }

    if (firstName) {
      customerUpdate.actions.push({
        firstName,
        action: 'setFirstName',
      } as CustomerSetFirstNameAction);
    }

    if (lastName) {
      customerUpdate.actions.push({
        lastName,
        action: 'setLastName',
      } as CustomerSetLastNameAction);
    }

    if (dateOfBirth) {
      customerUpdate.actions.push({
        dateOfBirth,
        action: 'setDateOfBirth',
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

  async updateCustomerAddAddress(
    id: string,
    version: number,
    address: BaseAddress
  ): Promise<CTResponse> {
    const customerUpdate: CustomerUpdate = { version, actions: [] };

    if (address) {
      customerUpdate.actions.push({
        address,
        action: 'addAddress',
      } as CustomerAddAddressAction);
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

  async updateCustomerChangeAddress(
    id: string,
    version: number,
    addressId: string,
    address?: BaseAddress,
    isShipping?: boolean,
    isShippingDefault?: boolean,
    isBilling?: boolean,
    isBillingDefault?: boolean
  ): Promise<CTResponse> {
    const customerUpdate: CustomerUpdate = { version, actions: [] };

    if (address) {
      customerUpdate.actions.push({
        addressId,
        address,
        action: 'changeAddress',
      } as CustomerChangeAddressAction);
    }

    if (isShipping !== undefined) {
      const action:
        | CustomerAddShippingAddressIdAction
        | CustomerRemoveShippingAddressIdAction = isShipping
        ? ({
            addressId,
            action: 'addShippingAddressId',
          } as CustomerAddShippingAddressIdAction)
        : ({
            addressId,
            action: 'removeShippingAddressId',
          } as CustomerRemoveShippingAddressIdAction);

      customerUpdate.actions.push(action);
    }

    if (isShippingDefault !== undefined && isShippingDefault) {
      customerUpdate.actions.push({
        addressId,
        action: 'setDefaultShippingAddress',
      } as CustomerSetDefaultShippingAddressAction);
    }

    if (isBilling !== undefined) {
      const action:
        | CustomerAddBillingAddressIdAction
        | CustomerRemoveBillingAddressIdAction = isBilling
        ? ({
            addressId,
            action: 'addBillingAddressId',
          } as CustomerAddBillingAddressIdAction)
        : ({
            addressId,
            action: 'removeBillingAddressId',
          } as CustomerRemoveBillingAddressIdAction);

      customerUpdate.actions.push(action);
    }

    if (isBillingDefault !== undefined && isBillingDefault) {
      customerUpdate.actions.push({
        addressId,
        action: 'setDefaultBillingAddress',
      } as CustomerSetDefaultBillingAddressAction);
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
