import React, { createContext, useState, useContext } from 'react';

export const UserContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <UserContext.Provider value={{ user, token, setUser, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);