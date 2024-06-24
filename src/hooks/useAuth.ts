import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useShoppingCart } from './useShoppingCart';

export const useAuth = () => {
  const { authenticated, setAuthenticated, customerId, setCustomerId } =
    useContext(AuthContext);
  const setLoggedIn = (customerId: string) => {
    setCustomerId(customerId);
    setAuthenticated(true);
  };

  const { unsetCart } = useShoppingCart();

  const setLoggedOut = () => {
    setCustomerId('');
    setAuthenticated(false);
    unsetCart();
  };
  return { authenticated, customerId, setLoggedIn, setLoggedOut };
};
