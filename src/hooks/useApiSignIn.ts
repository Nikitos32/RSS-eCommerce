import { CustomerSignInResult } from '@commercetools/platform-sdk';
import { CTResponse } from '../ct-client';
import { CustomerService } from '../services/customer.service';
import { useAuth } from './useAuth';
import { ShoppingCartService } from '../services';

export function useApiSignIn(email: string, password: string) {
  const { setCustomerId, setAuthenticated } = useAuth();

  const customerService = new CustomerService();
  const shoppingCartService = new ShoppingCartService();

  const signIn = async (): Promise<CTResponse> => {
    const response: CTResponse = await customerService.signIn(email, password);

    const data = response.data as CustomerSignInResult;

    setAuthenticated(response.ok);
    if (response.ok) {
      setCustomerId(data.customer.id);

      const responseCart: CTResponse =
        await shoppingCartService.getActiveCartId(data.customer.id);
      console.log('Cart', responseCart); // add useShoppingCart
    } else {
      setCustomerId('');
    }

    return response;
  };

  return { signIn };
}
