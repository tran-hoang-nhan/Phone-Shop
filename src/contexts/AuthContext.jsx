import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Set default axios header
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }

  // Load user on initial load
  useEffect(() => {
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Load user
  const loadUser = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/me');
      setUser(res.data.data);
    } catch (error) {
      console.error('Error loading user:', error);
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (name, email, password) => {
    const res = await axios.post('http://localhost:5000/api/auth/register', {
      name,
      email,
      password
    });

    const { success, token: newToken, data: userData } = res.data;
    
    if (success && newToken) {
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
      
      // Set default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    }
    
    return res.data;
  };

  // Login user
  const login = async (email, password) => {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password
    });

    const { success, token: newToken, data: userData } = res.data;
    
    if (success && newToken) {
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
      
      // Set default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    }
    
    return res.data;
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  // Update user details
  const updateUser = async (userData) => {
    const res = await axios.put('http://localhost:5000/api/auth/updatedetails', userData);
    setUser(res.data.data);
    return res.data;
  };

  // Update password
  const updatePassword = async (currentPassword, newPassword) => {
    const res = await axios.put('http://localhost:5000/api/auth/updatepassword', {
      currentPassword,
      newPassword
    });

    const { token: newToken, data: userData } = res.data;
    
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
    
    return res.data;
  };

  const value = {
    user,
    token,
    loading,
    register,
    login,
    logout,
    updateUser,
    updatePassword,
    loadUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };