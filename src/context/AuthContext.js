import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUser(user);
      setIsAuth(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuth, setIsAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};



