import { useEffect, useState } from 'react';
import { CustomerService } from '../services';
import { BaseAddress, Customer } from '@commercetools/platform-sdk';

const initProfileUpdates = {
  id: '',
  version: 0,
  email: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
};
type AddressNew = {
  id: string;
  version: number;
  address?: BaseAddress;
};

export type AddressChange = {
  id: string;
  version: number;
  addressId?: string;
  address?: BaseAddress;
  isShipping?: boolean;
  isShippingDefault?: boolean;
  isBilling?: boolean;
  isBillingDefault?: boolean;
};

const initAddressNew: AddressNew = {
  id: '',
  version: 0,
  address: undefined,
};

const initAddressChange: AddressChange = {
  id: '',
  version: 0,
  addressId: '',
  address: undefined,
  isShipping: undefined,
  isShippingDefault: undefined,
  isBilling: undefined,
  isBillingDefault: undefined,
};
export function useApiUpdateProfile() {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [profileUpdates, setProfileUpdates] = useState(initProfileUpdates);
  const [newAddress, setNewAddress] = useState(initAddressNew);
  const [changeAddress, setChangeAddress] = useState(initAddressChange);
  const [removeAddress, setRemoveAddress] = useState(initAddressChange);
  const [customerAfterUpdate, setCustomerAfterUpdate] = useState<Customer>();

  useEffect(() => {
    const { id, version, email, firstName, lastName, dateOfBirth } =
      profileUpdates;

    if (!id || !(email || firstName || lastName || dateOfBirth)) {
      return;
    }

    const getCustomer = async () => {
      const customerService = new CustomerService();
      setLoading(true);
      const response = await customerService.updateCustomerProfile(
        id,
        version,
        email,
        firstName,
        lastName,
        dateOfBirth
      );
      setOk(response.ok);
      if (response.ok) {
        setCustomerAfterUpdate(response.data as Customer);
        setMessage('Profile Updated');
      } else {
        setMessage(response.message as string);
      }
      setLoading(false);
    };

    getCustomer();
  }, [profileUpdates]);

  useEffect(() => {
    const { id, version, address } = newAddress;
    if (!id || !address) {
      return;
    }

    const addAddress = async () => {
      const customerService = new CustomerService();
      setLoading(true);
      const response = await customerService.updateCustomerAddAddress(
        id,
        version,
        address
      );
      setOk(response.ok);
      setMessage(response.message as string);
      if (response.ok) {
        setCustomerAfterUpdate(response.data as Customer);
        setMessage('New Address Added');
      } else {
        setMessage(response.message as string);
      }
      setLoading(false);
    };

    addAddress();
  }, [newAddress]);

  useEffect(() => {
    const {
      id,
      version,
      addressId,
      address,
      isShipping,
      isBilling,
      isShippingDefault,
      isBillingDefault,
    } = changeAddress;

    if (!id || !addressId) {
      return;
    }

    const updateAddress = async () => {
      const customerService = new CustomerService();
      setLoading(true);
      const response = await customerService.updateCustomerChangeAddress(
        id,
        version,
        addressId,
        address,
        isShipping,
        isShippingDefault,
        isBilling,
        isBillingDefault
      );
      setOk(response.ok);
      setMessage(response.message as string);
      if (response.ok) {
        setCustomerAfterUpdate(response.data as Customer);
        setMessage('Address Updated');
      } else {
        setMessage(response.message as string);
      }
      setLoading(false);
    };

    updateAddress();
  }, [changeAddress]);

  useEffect(() => {
    const { id, version, addressId = '' } = removeAddress;
    if (!id) {
      return;
    }
    const deleteAddress = async () => {
      const customerService = new CustomerService();
      setLoading(true);
      const response = await customerService.updateCustomerDeleteAddress(
        id,
        version,
        addressId
      );
      setOk(response.ok);
      setMessage(response.message as string);
      if (response.ok) {
        setCustomerAfterUpdate(response.data as Customer);
        setMessage('Address Deleted');
      } else {
        setMessage(response.message as string);
      }
      setLoading(false);
    };

    deleteAddress();
  }, [removeAddress]);
  return {
    loading,
    ok,
    message,
    setProfileUpdates,
    setNewAddress,
    setChangeAddress,
    setRemoveAddress,
    customerAfterUpdate,
  };
}
