import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (token) => {
    console.log('Login token:', token);
    await AsyncStorage.setItem('userToken', token);
    const decode = jwtDecode(token)
    setUser(decode);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    setUser(null);
  };

  const loadUser = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
