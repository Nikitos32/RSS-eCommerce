import { ReactNode, createContext } from 'react';
import { useLocalStorage } from '../hooks';

type Props = {
  children?: ReactNode;
};

type AuthContextType = {
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void;
  customerId: string;
  setCustomerId: (newState: string) => void;
};

const initialValue = {
  authenticated: false,
  setAuthenticated: () => {},
  customerId: '',
  setCustomerId: () => {},
};

const AuthContext = createContext<AuthContextType>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const [authenticated, setAuthenticated] = useLocalStorage(
    'authenticated',
    initialValue.authenticated
  );
  const [customerId, setCustomerId] = useLocalStorage('apiCustomerId', '');
  return (
    <AuthContext.Provider
      value={{ authenticated, setAuthenticated, customerId, setCustomerId }}
    >
      {' '}
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
