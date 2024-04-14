import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [ loginUser, setLoginUser ] = useState({
    isLoggedIn: false,
    userInfo:{}
  });

  return (
    <UserContext.Provider value={{  loginUser, setLoginUser  }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
