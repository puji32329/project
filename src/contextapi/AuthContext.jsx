import { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Provider component to manage login states and user data
export function AuthProvider({ children }) 
{
  // Load initial state from localStorage or default to false/null
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('isAdminLoggedIn') === 'true';
  });

  const [isTenantLoggedIn, setIsTenantLoggedIn] = useState(() => {
    return localStorage.getItem('isTenantLoggedIn') === 'true';
  });
  
  const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState(() => {
    return localStorage.getItem('isOwnerLoggedIn') === 'true';
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isAdminLoggedIn', isAdminLoggedIn);
    localStorage.setItem('isTenantLoggedIn', isTenantLoggedIn);
    localStorage.setItem('isOwnerLoggedIn', isOwnerLoggedIn);
  }, [isAdminLoggedIn, isTenantLoggedIn, isOwnerLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        isTenantLoggedIn,
        setIsTenantLoggedIn,
        isOwnerLoggedIn,
        setIsOwnerLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access the context
export const useAuth = () => useContext(AuthContext);
