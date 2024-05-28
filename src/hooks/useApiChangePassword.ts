import { useEffect, useState } from 'react';
import { CustomerRequests } from '../ct-client';
import { useLocalStorage } from './useLocalStorage';
import { CustomerChangePassword } from '@commercetools/platform-sdk';

export function useApiChangePassword(
  currentPassword: string,
  newPassword: string
) {
  const [isOk, setIsOk] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [id] = useLocalStorage<string>('apiCustomerId', '');
  const [version] = useLocalStorage<number>('apiCustomerVersion', 0);

  const customerRequests: CustomerRequests = new CustomerRequests();

  const customerChangePassword: CustomerChangePassword = {
    id,
    version,
    currentPassword,
    newPassword,
  };

  const changePassword = async () => {
    setIsLoading(true);
    try {
      const result = customerRequests.changePassword(customerChangePassword);
      console.log(result);
    } catch (error) {
      setIsOk(false);
      setErrorMsg('Error');
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    changePassword();
  });

  return { isOk, isLoading, errorMsg };
}
