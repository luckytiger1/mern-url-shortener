import { createContext } from 'react';

const AuthContext = createContext({
  token: null,
  userId: null,
  login: (a: any, b: any) => {},
  logout: () => {},
  isAuthenticated: false,
});

export default AuthContext;
