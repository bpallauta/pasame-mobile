import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const API_URL = 'https://pasame-api.onrender.com';

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar sesión guardada al iniciar la app
    const loadSession = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          // Obtener datos del usuario desde la nube
          const response = await fetch(`${API_URL}/api/v1/auth/me`, {
            headers: { Authorization: `Bearer ${storedToken}` }
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setToken(storedToken);
          } else {
            await AsyncStorage.removeItem('userToken');
          }
        }
      } catch (e) {
        console.error("Error al cargar sesión", e);
      } finally {
        setLoading(false);
      }
    };
    loadSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // API form-data format para OAuth2
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Error al iniciar sesión');
      }

      setUser(data.user);
      setToken(data.access_token);
      await AsyncStorage.setItem('userToken', data.access_token);
      return true;
    } catch (e: any) {
      Alert.alert('Error', e.message);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Error al registrarse');
      }
      
      // Auto-login después de registrarse
      return await login(email, password);
    } catch (e: any) {
      Alert.alert('Error', e.message);
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('userToken');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
