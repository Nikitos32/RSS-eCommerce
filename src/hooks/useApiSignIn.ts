import { CustomerSignInResult } from '@commercetools/platform-sdk';
import { CTResponse } from '../ct-client';
import { CustomerService } from '../services/customer.service';
import { useAuth } from './useAuth';
import { useShoppingCart } from './useShoppingCart';

export function useApiSignIn() {
  const { setLoggedIn, setLoggedOut } = useAuth();
  const { setCartAfterSignIn, cartId } = useShoppingCart();

  const customerService = new CustomerService();

  const signIn = async (
    email: string,
    password: string
  ): Promise<CTResponse> => {
    const anonymousCartId = cartId ? cartId : undefined;
    const response: CTResponse = await customerService.signIn(
      email,
      password,
      anonymousCartId
    );

    const data = response.data as CustomerSignInResult;

    if (response.ok) {
      setLoggedIn(data.customer.id);
      setCartAfterSignIn(data);
    } else {
      setLoggedOut();
    }

    return response;
  };

  return { signIn };
}
