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

const initAddressNew: AddressNew = {
  id: '',
  version: 0,
  address: undefined,
};
export function useApiUpdateProfile() {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [profileUpdates, setProfileUpdates] = useState(initProfileUpdates);
  const [newAddress, setNewAddress] = useState(initAddressNew);
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
      setErrorMsg(response.message as string);
      if (response.ok) {
        setCustomerAfterUpdate(response.data as Customer);
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
      setErrorMsg(response.message as string);
      if (response.ok) {
        setCustomerAfterUpdate(response.data as Customer);
      }
      setLoading(false);
    };

    addAddress();
  }, [newAddress]);

  return {
    loading,
    ok,
    errorMsg,
    setProfileUpdates,
    setNewAddress,
    customerAfterUpdate,
  };
}
