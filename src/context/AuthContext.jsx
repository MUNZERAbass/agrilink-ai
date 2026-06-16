import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('agrilink_user');
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const register = async (data) => {
    const res = await api.post('/auth/register', data);
    localStorage.setItem('agrilink_user', JSON.stringify(res.data));
    setUser(res.data);
    toast.success(`Welcome, ${res.data.name}! 🌿`);
    return res.data;
  };

  const login = async (data) => {
    const res = await api.post('/auth/login', data);
    localStorage.setItem('agrilink_user', JSON.stringify(res.data));
    setUser(res.data);
    toast.success(`Welcome back, ${res.data.name}! 👋`);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('agrilink_user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);