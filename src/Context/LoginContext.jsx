import React, { createContext, useEffect, useState, useMemo } from 'react';
import { User } from '../Pages/User/Users';

export const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
  const [loginData, setLogin] = useState(null);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let sessionData = localStorage.getItem("suviadmin");
    sessionData = JSON.parse(sessionData);
    if (sessionData && loginData === null) {
      handleLogin(sessionData);
    }
    setLoading(false);
  }, [loginData]);

  const handleLogin = async (userData) => {
    await setLogin(userData);
    localStorage.setItem("suviadmin", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setLogin(null);
    localStorage.removeItem("suviadmin");
    setCart(null);
  };

  const loginContextValue = useMemo(
    () => ({
      loginData,
      handleLogin,
      handleLogout,
      cart,
      setCart
    }),
    [loginData, cart]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <LoginContext.Provider value={loginContextValue}>
      {children}
    </LoginContext.Provider>
  );
};
