import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// AuthContext তৈরি করা
const AuthContext = createContext();

// Custom Hook for accessing Auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ টোকেন যাচাই ও ব্যবহারকারী ডেটা লোড করা (On page reload)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // JWT টোকেন থেকে ডেটা ডিকোড করে ব্যবহারকারীর তথ্য নিতে পারেন
      try {
        const decoded = JSON.parse(atob(token.split('.')[1])); // Base64 ডিকোড
        setUser({ token, ...decoded }); // ব্যবহারকারী তথ্য স্টোর করা
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
    setLoading(false);
  }, []);

  // ✅ লগইন ফাংশন
  const login = (token) => {
    localStorage.setItem('token', token);
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setUser({ token, ...decoded });
      navigate('/admin-dashboard');
    } catch (error) {
      console.error("Invalid token", error);
      logout();  // টোকেন ভুল হলে লগ আউট করা
    }
  };

  // ✅ লগ আউট ফাংশন
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  // ✅ Context Value প্রদান করা
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
