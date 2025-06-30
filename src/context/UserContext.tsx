import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface User {
  id: string;
  name: string;
  type: 'farmer' | 'consumer';
  location: string;
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { user: authUser, isAuthenticated } = useAuth();

  // Convert auth user to legacy user format for backward compatibility
  const user = authUser ? {
    id: authUser.id,
    name: authUser.name,
    type: authUser.type,
    location: authUser.location,
    avatar: authUser.avatar
  } : null;

  const setUser = () => {
    // This is now handled by AuthContext
    console.warn('setUser is deprecated. Use AuthContext instead.');
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn: isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};