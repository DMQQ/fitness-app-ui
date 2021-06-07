import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    async function GetFromAsyncStorage() {
      try {
        const data = await AsyncStorage.getItem("fitness_app_user");
        const parse = await JSON.parse(data);
        setIsAuth(parse);
      } catch (error) {
        console.log(error);
      }
    }
    GetFromAsyncStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
