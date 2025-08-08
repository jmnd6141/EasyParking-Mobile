import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [password, setPass] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser, password, setPass, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
