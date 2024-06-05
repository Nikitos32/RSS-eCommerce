import { useEffect, useState } from 'react';

import { useLocalStorage } from './useLocalStorage';
import { Customer, CustomerChangePassword } from '@commercetools/platform-sdk';
import { CustomerService } from '../services/customer.service';
import { CTResponse } from '../ct-client';
import { useAuth } from '.';

export function useApiChangePassword(
  currentPassword: string,
  newPassword: string
) {
  const [isOk, setIsOk] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [response, setResponse] = useState<CTResponse>();

  const { customerId: id } = useAuth();
  const [version, setVersion] = useLocalStorage('apiCustomerVersion', 0);

  const customerService: CustomerService = new CustomerService();

  const customerChangePassword: CustomerChangePassword = {
    id,
    version,
    currentPassword,
    newPassword,
  };

  const changePassword = async (): Promise<CTResponse> => {
    setIsLoading(true);

    const answer = await customerService.changePassword(customerChangePassword);

    setResponse({ ...response, ...answer });

    setIsLoading(false);
    if (answer.ok) {
      const data = answer.data as Customer;
      setVersion(data.version);
    }

    return answer;
  };

  useEffect(() => {
    setErrorMsg(response?.message || '');
    setIsOk(response?.ok || false);
  }, [response]);

  return { isOk, isLoading, errorMsg, changePassword };
}
