import { View, Text } from 'react-native'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentUser } from '../lib/appwrite'

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cached_aiDailyRes, setCached_aiDailyRes] = useState(null);
    const [cached_aiTotalRes, setCached_aiTotalRes] = useState(null);

    useEffect(() => {
      getCurrentUser()
          .then((res) => {
              if (res) {
                  setIsLoggedIn(true);
                  setUser(res);
              } else {
                  setIsLoggedIn(false);
                  setUser(null);
              }
          })
          .catch((error) => {
              console.log(error);
          })
          .finally(() => {
              setIsLoading(false);
          })
  }, []);

  return (
    <GlobalContext.Provider
        value={{
            user, setUser,
            isLoading,
            isLoggedIn, setIsLoggedIn,
            cached_aiDailyRes, setCached_aiDailyRes,
            cached_aiTotalRes, setCached_aiTotalRes
        }}
    >
        {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider