import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem('loginUser'));
    return savedUser || { isLoggedIn: false, userInfo: {} };
  });

  // Update cookies whenever loginUser changes
  useEffect(() => {
    localStorage.setItem('loginUser', JSON.stringify(loginUser));
  }, [loginUser]);

  const logout = () => {
    // Clear cookies on logout
    localStorage.removeItem('loginUser');
    setLoginUser({ isLoggedIn: false, userInfo: {} });
  };

  return (
    <UserContext.Provider value={{ loginUser, setLoginUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
