// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// interface User {
//   id: string;
//   email: string;
//   name: string;
//   type: 'farmer' | 'consumer';
//   location: string;
//   avatar?: string;
//   farmName?: string;
//   phone?: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string, userType: 'farmer' | 'consumer') => Promise<boolean>;
//   register: (userData: RegisterData) => Promise<boolean>;
//   logout: () => void;
//   isLoading: boolean;
//   isAuthenticated: boolean;
// }

// interface RegisterData {
//   email: string;
//   password: string;
//   name: string;
//   type: 'farmer' | 'consumer';
//   location: string;
//   phone?: string;
//   farmName?: string;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Mock users database
//   // const mockUsers: User[] = [
//   //   {
//   //     id: '1',
//   //     email: 'farmer@example.com',
//   //     name: 'Raj Patel',
//   //     type: 'farmer',
//   //     location: 'Pune, Maharashtra',
//   //     farmName: 'Green Valley Farm',
//   //     phone: '+91 9876543210'
//   //   },
//   //   {
//   //     id: '2',
//   //     email: 'consumer@example.com',
//   //     name: 'Priya Sharma',
//   //     type: 'consumer',
//   //     location: 'Mumbai, Maharashtra',
//   //     phone: '+91 9876543211'
//   //   }
//   // ];

//   useEffect(() => {
//     // Check for stored authentication
//     const storedUser = localStorage.getItem('farmaid_user');
//     if (storedUser) {
//       try {
//         setUser(JSON.parse(storedUser));
//       } catch (error) {
//         localStorage.removeItem('farmaid_user');
//       }
//     }
//     setIsLoading(false);
//   }, []);

//   const login = async (email: string, password: string, userType: 'farmer' | 'consumer'): Promise<boolean> => {
//     setIsLoading(true);
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     // Find user in mock database
//     const foundUser = mockUsers.find(u => 
//       u.email === email && u.type === userType
//     );
    
//     if (foundUser && password === 'password') { // Simple password check for demo
//       setUser(foundUser);
//       localStorage.setItem('farmaid_user', JSON.stringify(foundUser));
//       setIsLoading(false);
//       return true;
//     }
    
//     setIsLoading(false);
//     return false;
//   };

//   const register = async (userData: RegisterData): Promise<boolean> => {
//     setIsLoading(true);
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     // Check if user already exists
//     const existingUser = mockUsers.find(u => u.email === userData.email);
//     if (existingUser) {
//       setIsLoading(false);
//       return false;
//     }
    
//     // Create new user
//     const newUser: User = {
//       id: Date.now().toString(),
//       email: userData.email,
//       name: userData.name,
//       type: userData.type,
//       location: userData.location,
//       phone: userData.phone,
//       farmName: userData.farmName
//     };
    
//     mockUsers.push(newUser);
//     setUser(newUser);
//     localStorage.setItem('farmaid_user', JSON.stringify(newUser));
//     setIsLoading(false);
//     return true;
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('farmaid_user');
//   };

//   const isAuthenticated = user !== null;

//   return (
//     <AuthContext.Provider value={{
//       user,
//       login,
//       register,
//       logout,
//       isLoading,
//       isAuthenticated
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import { supabase } from '../lib/supabaseClient';

// interface User {
//   id: string;
//   email: string;
//   type: 'farmer' | 'consumer';
// }

// interface RegisterData {
//   email: string;
//   password: string;
//   type: 'farmer' | 'consumer';
// }

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   login: (email: string, password: string, userType: 'farmer' | 'consumer') => Promise<boolean>;
//   register: (userData: RegisterData) => Promise<boolean>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const login = async (email, password, userType) => {
//   console.log("🔵 AuthContext login called with", email, userType);
//   // rest of the login code...
// };


// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // ✅ Load user on initial app start
//   useEffect(() => {
//     const getUser = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       const currentUser = session?.user;

//       if (currentUser) {
//         const { data: profile, error } = await supabase
//           .from('user_profiles')
//           .select('role')
//           .eq('id', currentUser.id)
//           .single();

//         if (error) console.error('Error loading profile on load:', error);

//         if (profile?.role === 'farmer' || profile?.role === 'consumer') {
//           setUser({
//             id: currentUser.id,
//             email: currentUser.email || '',
//             type: profile.role,
//           });
//         }
//       }

//       setIsLoading(false);
//     };

//     getUser();

//     // ✅ Real-time session change (login/logout)
//     const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
//       if (session?.user) {
//         const { data: profile } = await supabase
//           .from('user_profiles')
//           .select('role')
//           .eq('id', session.user.id)
//           .single();

//         if (profile?.role === 'farmer' || profile?.role === 'consumer') {
//           setUser({
//             id: session.user.id,
//             email: session.user.email || '',
//             type: profile.role,
//           });
//         } else {
//           setUser(null);
//         }
//       } else {
//         setUser(null);
//       }

//       setIsLoading(false); // ✅ Fix: previously missing
//     });

//     return () => {
//       listener?.subscription.unsubscribe();
//     };
//   }, []);

//   const login = async (email: string, password: string, userType: 'farmer' | 'consumer'): Promise<boolean> => {
//     setIsLoading(true);
//     const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    

//     if (error || !data.user) {
//       console.error('Login error:', error);
//       setIsLoading(false);
//       return false;
//     }

//     const { data: profile } = await supabase
//       .from('user_profiles')
//       .select('role')
//       .eq('id', data.user.id)
//       .single();

//     if (!profile || profile.role !== userType) {
//       console.warn('Login failed: user role mismatch');
//       setIsLoading(false);
//       return false;
//     }

//     console.log("🧠 setting user:", {
//       id: data.user.id,
//       email: data.user.email,
//       type: profile.role,  
// });


//     setUser({
//       id: data.user.id,
//       email: data.user.email || '',
//       type: profile.role,
//     });

//     setIsLoading(false);
//     return true;
//   };

//   const register = async (userData: RegisterData): Promise<boolean> => {
//     setIsLoading(true);
//     const { data, error } = await supabase.auth.signUp({
//       email: userData.email,
//       password: userData.password,
//     });

//     if (error || !data.user) {
//       console.error('Register error:', error);
//       setIsLoading(false);
//       return false;
//     }

//     const { error: profileError } = await supabase.from('user_profiles').insert([
//       {
//         id: data.user.id,
//         role: userData.type,
//       },
//     ]);

//     if (profileError) {
//       console.error('Error inserting user profile:', profileError);
//       setIsLoading(false);
//       return false;
//     }

//     setUser({
//       id: data.user.id,
//       email: data.user.email,
//       type: userData.type,
//     });

//     setIsLoading(false);
//     return true;
//   };

//   const logout = async () => {
//     await supabase.auth.signOut();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, login, register, logout, isAuthenticated: !!user, isLoading }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  type: 'farmer' | 'consumer';
  location: string;
  avatar?: string;
  farmName?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: 'farmer' | 'consumer') => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  type: 'farmer' | 'consumer';
  location: string;
  phone?: string;
  farmName?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock users database
  const mockUsers: User[] = [
    {
      id: '1',
      email: 'farmer@example.com',
      name: 'Raj Patel',
      type: 'farmer',
      location: 'Pune, Maharashtra',
      farmName: 'Green Valley Farm',
      phone: '+91 9876543210'
    },
    {
      id: '2',
      email: 'consumer@example.com',
      name: 'Priya Sharma',
      type: 'consumer',
      location: 'Mumbai, Maharashtra',
      phone: '+91 9876543211'
    }
  ];

  useEffect(() => {
    // Check for stored authentication
    const storedUser = localStorage.getItem('farmaid_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('farmaid_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, userType: 'farmer' | 'consumer'): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user in mock database
    const foundUser = mockUsers.find(u => 
      u.email === email && u.type === userType
    );
    
    if (foundUser && password === 'password') { // Simple password check for demo
      setUser(foundUser);
      localStorage.setItem('farmaid_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      type: userData.type,
      location: userData.location,
      phone: userData.phone,
      farmName: userData.farmName
    };
    
    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem('farmaid_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('farmaid_user');
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isLoading,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};