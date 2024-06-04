import { ReactNode, createContext } from 'react';
import { useLocalStorage } from '../hooks';

type Props = {
  children?: ReactNode;
};

type AuthContextType = {
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void;
};

const initialValue = {
  authenticated: false,
  setAuthenticated: () => {},
};

const AuthContext = createContext<AuthContextType>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const [authenticated, setAuthenticated] = useLocalStorage(
    'authenticated',
    initialValue.authenticated
  );
  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {' '}
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
