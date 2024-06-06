import { CustomerSignInResult } from '@commercetools/platform-sdk';
import { CTResponse } from '../ct-client';
import { CustomerService } from '../services/customer.service';
import { useAuth } from './useAuth';

export function useApiSignIn(email: string, password: string) {
  const { setCustomerId, setAuthenticated } = useAuth();

  const customerService = new CustomerService();

  const signIn = async (): Promise<CTResponse> => {
    const response: CTResponse = await customerService.signIn(email, password);

    const data = response.data as CustomerSignInResult;

    setAuthenticated(response.ok);
    if (response.ok) {
      setCustomerId(data.customer.id);
    } else {
      setCustomerId('');
    }

    return response;
  };

  return { signIn };
}
