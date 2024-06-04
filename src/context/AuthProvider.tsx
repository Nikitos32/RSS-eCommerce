import { ReactNode, createContext, useState } from 'react';

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
  const [authenticated, setAuthenticated] = useState(
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
