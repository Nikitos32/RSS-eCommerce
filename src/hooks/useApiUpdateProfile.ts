import { useEffect, useState } from 'react';
import { CustomerService } from '../services';
import { Customer } from '@commercetools/platform-sdk';

const initProfileUpdates = {
  id: '',
  version: 0,
  email: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
};

export function useApiUpdateProfile() {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [profileUpdates, setProfileUpdates] = useState(initProfileUpdates);
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
  return {
    loading,
    ok,
    errorMsg,
    setProfileUpdates,
    customerAfterUpdate,
  };
}
