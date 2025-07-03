// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { supabase } from '../lib/supabaseClient';

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
//   logout: () => void;
//   isLoading: boolean;
//   isAuthenticated: boolean;
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

//   useEffect(() => {
//     const getUser = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       const currentUser = session?.user;

//       if (currentUser) {
//         const { data: profile, error } = await supabase
//           .from('user_profiles')
//           .select('*')
//           .eq('id', currentUser.id)
//           .single();

//         if (error) console.error('Error loading profile on load:', error);

//         if (profile) {
//           setUser({
//             id: currentUser.id,
//             email: currentUser.email || '',
//             type: profile.role,
//             name: profile.name,
//             location: profile.location,
//             farmName: profile.farm_name,
//             phone: profile.phone
//           });
//         }
//       }
//       setIsLoading(false);
//     };

//     getUser();

//     const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
//       if (session?.user) {
//         const { data: profile } = await supabase
//           .from('user_profiles')
//           .select('*')
//           .eq('id', session.user.id)
//           .single();

//         if (profile) {
//             setUser({
//               id: session.user.id,
//               email: session.user.email || '',
//               type: profile.role,
//               name: profile.name,
//               location: profile.location,
//               farmName: profile.farm_name,
//               phone: profile.phone
//             });
//         } else {
//           setUser(null);
//         }
//       } else {
//         setUser(null);
//       }

//       setIsLoading(false);
//     });

//     return () => {
//       listener?.subscription.unsubscribe();
//     };
//   }, []);

//   const logout = async () => {
//     await supabase.auth.signOut();
//     setUser(null);
//   };

//   const isAuthenticated = user !== null;

//   return (
//     <AuthContext.Provider value={{
//       user,
//       logout,
//       isLoading,
//       isAuthenticated
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// ------------------------------------------------------------------------------------------------------------------------

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
//   const mockUsers: User[] = [
//     {
//       id: '1',
//       email: 'farmer@example.com',
//       name: 'Raj Patel',
//       type: 'farmer',
//       location: 'Pune, Maharashtra',
//       farmName: 'Green Valley Farm',
//       phone: '+91 9876543210'
//     },
//     {
//       id: '2',
//       email: 'consumer@example.com',
//       name: 'Priya Sharma',
//       type: 'consumer',
//       location: 'Mumbai, Maharashtra',
//       phone: '+91 9876543211'
//     }
//   ];

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

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, authHelpers, FarmerProfile, ConsumerProfile } from '../lib/supabase.ts';
import { User } from '@supabase/supabase-js';

interface AuthUser {
  id: string;
  phone_number: string;
  name?: string; // For farmers
  type: 'farmer' | 'consumer';
  location: string;
  profile: FarmerProfile | ConsumerProfile;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (phone_number: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface RegisterData {
  email: string; // Optional for phone-based auth
  phone_number: string;
  password: string;
  type: 'farmer' | 'consumer';
  // Farmer specific
  name?: string;
  bio?: string;
  location: string;
  experience?: number;
  crops_we_grow?: string[];
  profile_image?: string;
  // Consumer specific
  consumer_type?: 'personal' | 'business';
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
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const getSession = async () => {
      try {
        const session = await authHelpers.getCurrentSession();
        if (session?.user) {
          await loadUserProfile(session.user);
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await loadUserProfile(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (authUser: User) => {
    try {
      const userType = authUser.user_metadata?.user_type;
      let profile = null;

      if (userType === 'farmer') {
        const { data } = await supabase
          .from('farmers') // TODO: Replace with your actual table name
          .select('*')
          .eq('id', authUser.id)
          .single();
        profile = data;
      } else if (userType === 'consumer') {
        const { data } = await supabase
          .from('consumers') // TODO: Replace with your actual table name
          .select('*')
          .eq('id', authUser.id)
          .single();
        profile = data;
      }

      if (profile) {
        setUser({
          id: authUser.id,
          phone_number: profile.phone_number,
          name: profile.name || undefined,
          type: userType,
          location: profile.location,
          profile
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const result = await authHelpers.signIn(email, password);
      
      if (result.user && result.profile) {
        setUser({
          id: result.user.id,
          phone_number: result.profile.phone_number,
          name: (result.profile as FarmerProfile).name || undefined,
          type: result.userType as 'farmer' | 'consumer',
          location: result.profile.location,
          profile: result.profile
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      let result;
      
      if (userData.type === 'farmer') {
        result = await authHelpers.signUpFarmer({
          email: userData.email,
          phone_number: userData.phone_number,
          password: userData.password,
          name: userData.name!,
          bio: userData.bio,
          farm_location: userData.location,
          experience: userData.experience!,
          crops_we_grow: userData.crops_we_grow,
          profile_image: userData.profile_image
        });
      } else {
        result = await authHelpers.signUpConsumer({
          email: userData.email,
          phone_number: userData.phone_number,
          password: userData.password,
          location: userData.location,
          consumer_type: userData.consumer_type!
        });
      }

      if (result.user && result.profile) {
        setUser({
          id: result.user.id,
          phone_number: result.profile.phone_number,
          name: (result.profile as FarmerProfile).name || undefined,
          type: userData.type,
          location: result.profile.location,
          profile: result.profile
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authHelpers.signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
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