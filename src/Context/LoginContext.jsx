import React, { createContext, useEffect, useState, useMemo } from 'react';
import { User } from '../Pages/User/Users';
import Loading from '../Components/Loading/Loading';
import { Navigate } from 'react-router-dom';

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
  //logging out user after a 45 minute session;
  useEffect(() => {
    if (loginData!=null) {
      console.log("Triggred logout after 45")
      const logoutAfterFortyFive = setTimeout(() => {
        handleLogout();
      }, 45 * 60 * 1000); //log out after 45 minutes
      return () => {
        clearTimeout(logoutAfterFortyFive);
      };
    }
  }, [loginData]);


  const handleLogin = async (userData) => {
    await setLogin(userData);
    localStorage.setItem("suviadmin", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setLogin(null);
    alert("Logged Out");
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
    return <Loading/>
  }

  return (
    <LoginContext.Provider value={loginContextValue}>
      {children}
    </LoginContext.Provider>
  );
};
