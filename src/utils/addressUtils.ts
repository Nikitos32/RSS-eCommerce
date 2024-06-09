import { Address, BaseAddress, Customer } from '@commercetools/platform-sdk';
import { AddressEditData } from '../components/AddressEdit';
import { AddressChange } from '../hooks/useApiUpdateProfile';

export type AddressForProfile = {
  id: string;
  isShipping: boolean;
  isBilling: boolean;
  isDeletable: boolean;
  isDefault: boolean; // if isDefault=true then only one must be true! isBilling or isShipping
  strAddress: string;
};

const makeAddress = (
  address: Address,
  isBilling: boolean,
  isShipping: boolean,
  isDefault: boolean,
  isDeletable: boolean
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
    isDeletable,
    strAddress: `${apartment}, ${streetNumber} ${streetName} street, ${city}, ${region}, ${postalCode}, ${country}`,
  };
};

export const checkAddressBilling = (
  addressId: string,
  billingAddressIds?: string[]
): boolean => {
  return billingAddressIds ? billingAddressIds.includes(addressId) : false;
};

export const checkAddressShipping = (
  addressId: string,
  shippingAddressIds?: string[]
): boolean => {
  return shippingAddressIds ? shippingAddressIds.includes(addressId) : false;
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
        true,
        false
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
        true,
        false
      );
      result.push(address);
    }
  }

  addresses.forEach((item) => {
    const id = item.id as string;
    const isDefaultBilling = id === defaultBillingAddressId;
    const isDefaultShipping = id === defaultShippingAddressId;
    if (isDefaultBilling && isDefaultShipping) {
      return;
    }

    const isBilling = checkAddressBilling(id, billingAddressIds);
    const isShipping = checkAddressShipping(id, shippingAddressIds);

    if (isBilling && isDefaultBilling) {
      return;
    }

    if (isShipping && isDefaultShipping) {
      return;
    }

    const isDeletable =
      id !== defaultBillingAddressId || id !== defaultShippingAddressId;

    const address = makeAddress(
      item,
      isBilling,
      isShipping,
      false,
      isDeletable
    );
    result.push(address);
  });

  return result;
};

const checkAddressFieldsChange = (
  editAddress: BaseAddress,
  initAddress: BaseAddress
): boolean => {
  if (!initAddress || !editAddress) {
    return false;
  }

  return (
    editAddress.firstName !== initAddress.firstName ||
    editAddress.lastName !== initAddress.lastName ||
    editAddress.apartment !== initAddress.apartment ||
    editAddress.streetNumber !== initAddress.streetNumber ||
    editAddress.streetName !== initAddress.streetName ||
    editAddress.city !== initAddress.city ||
    editAddress.region !== initAddress.region ||
    editAddress.postalCode !== initAddress.postalCode ||
    editAddress.country !== initAddress.country
  );
};

/**
 *
 * @describe prepare data for setChangeAddress
 * @returns AddressChange
 */
export const getAddressChange = (
  data: AddressEditData,
  customer: Customer
): AddressChange => {
  const addressId = data.addressId || '';
  const initAddress = customer?.addresses.filter(
    (item) => item.id === addressId
  )[0];

  const editAddress = {
    firstName: data.firstName,
    lastName: data.lastName,
    apartment: data.apartment,
    streetNumber: data.streetNumber,
    streetName: data.streetName,
    city: data.city,
    region: data.region,
    postalCode: data.postalCode,
    country: data.country,
  };

  const {
    shippingAddressIds = [],
    billingAddressIds = [],
    defaultBillingAddressId = '',
    defaultShippingAddressId = '',
  } = customer;

  const isShipping =
    data.isShipping !== checkAddressShipping(addressId, shippingAddressIds)
      ? data.isShipping
      : undefined;
  const isBilling =
    data.isBilling !== checkAddressBilling(addressId, billingAddressIds)
      ? data.isBilling
      : undefined;
  const isShippingDefault =
    data.isShippingDefault && addressId !== defaultShippingAddressId
      ? true
      : undefined;
  const isBillingDefault =
    data.isBillingDefault && addressId !== defaultBillingAddressId
      ? true
      : undefined;

  return {
    id: customer.id,
    version: customer.version,
    addressId,
    address: checkAddressFieldsChange(editAddress, initAddress)
      ? editAddress
      : undefined,
    isShipping,
    isShippingDefault,
    isBilling,
    isBillingDefault,
  };
};
