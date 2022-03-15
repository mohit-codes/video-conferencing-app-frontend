/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  return (
    <AuthContext.Provider value={{ setToken, setUser, token, user }}>
      {children}
    </AuthContext.Provider>
  );
};
