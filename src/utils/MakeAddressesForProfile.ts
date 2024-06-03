import { Address, Customer } from '@commercetools/platform-sdk';

export type AddressForProfile = {
  id: string;
  isShipping: boolean;
  isBilling: boolean;
  isDefault: boolean; // if isDefault=true then only one must be true! isBilling or isShipping
  strAddress: string;
};

const makeAddress = (
  address: Address,
  isBilling: boolean,
  isShipping: boolean,
  isDefault: boolean
): AddressForProfile => {
  const {
    streetName = '',
    streetNumber = '',
    region = '',
    apartment = '',
    city = '',
    postalCode = '',
    country = '',
  } = address;
  return {
    id: address.id as string,
    isDefault,
    isShipping,
    isBilling,
    strAddress: `${apartment}, ${streetNumber} ${streetName} street, ${city}, ${region}, ${postalCode}, ${country}`,
  };
};

/**
 *
 * @describe Default address can be on index 0 and/or 1
 * @returns array of addresses for rendering.
 */
export const makeAddressesForProfile = (
  customer: Customer
): AddressForProfile[] => {
  const result: AddressForProfile[] = [];
  if (!customer) {
    return result;
  }

  const {
    billingAddressIds,
    shippingAddressIds,
    defaultBillingAddressId,
    defaultShippingAddressId,
  } = customer;

  const addresses = customer.addresses as Address[];

  if (defaultShippingAddressId) {
    const defaultShipping: Address = addresses.filter(
      (address) => address.id === defaultShippingAddressId
    )[0];
    if (defaultShipping) {
      const address: AddressForProfile = makeAddress(
        defaultShipping,
        false,
        true,
        true
      );
      result.push(address);
    }
  }

  if (defaultBillingAddressId) {
    const defaultBilling: Address = addresses.filter(
      (address) => address.id === defaultBillingAddressId
    )[0];
    if (defaultBilling) {
      const address: AddressForProfile = makeAddress(
        defaultBilling,
        true,
        false,
        true
      );
      result.push(address);
    }
  }

  addresses.forEach((item) => {
    const id = item.id as string;
    if (id === defaultBillingAddressId || id === defaultShippingAddressId) {
      return;
    }
    const isBilling = billingAddressIds
      ? billingAddressIds.includes(id)
      : false;
    const isShipping = shippingAddressIds
      ? shippingAddressIds.includes(id)
      : false;

    const address = makeAddress(item, isBilling, isShipping, false);
    result.push(address);
  });

  return result;
};
