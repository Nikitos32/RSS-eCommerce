import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

export const useAuth = () => {
  const { authenticated, setAuthenticated, customerId, setCustomerId } =
    useContext(AuthContext);
  const setLoggedIn = (customerId: string) => {
    setCustomerId(customerId);
    setAuthenticated(true);
  };

  const setLoggedOut = () => {
    setCustomerId('');
    setAuthenticated(false);
  };
  return { authenticated, customerId, setLoggedIn, setLoggedOut };
};
