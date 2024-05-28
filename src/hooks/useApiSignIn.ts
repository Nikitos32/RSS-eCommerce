import { CustomerSignInResult } from '@commercetools/platform-sdk';
import { CTResponse } from '../ct-client';
import { CustomerService } from '../services/customer.service';
import { useLocalStorage } from './useLocalStorage';

export function useApiSignIn(email: string, password: string) {
  const [, setId] = useLocalStorage('apiCustomerId', '');
  const [, setVersion] = useLocalStorage('apiCustomerVersion', 0);

  const customerService = new CustomerService();

  const signIn = async (): Promise<CTResponse> => {
    const response: CTResponse = await customerService.signIn(email, password);
    if (response.ok) {
      const data = response.data as CustomerSignInResult;
      setId(data.customer.id);
      setVersion(data.customer.version);
    }

    return response;
  };

  return { signIn };
}
