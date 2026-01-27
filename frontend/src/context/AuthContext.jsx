import React, { createContext, useState, useEffect, useContext } from 'react';
import { authApi } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Проверка токена при загрузке страницы
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const userData = await authApi.getMe();
          // Так как в БД нет имени, генерируем его из email для отображения
          const displayName = userData.email.split('@')[0]; 
          setUser({ ...userData, name: displayName });
        } catch (error) {
          console.error("Ошибка проверки сессии:", error);
          localStorage.removeItem('access_token');
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    const data = await authApi.login(email, password);
    localStorage.setItem('access_token', data.access_token);
    
    // Сразу подгружаем данные юзера
    const userData = await authApi.getMe();
    const displayName = userData.email.split('@')[0];
    setUser({ ...userData, name: displayName });
    return userData;
  };

  const register = async (name, email, password) => {
    // name передаем, но он пока не сохранится в БД
    await authApi.register(email, password, name);
    // После регистрации сразу логиним
    return login(email, password);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);