// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { LoginForm } from '../../components/auth/LoginForm';
// import { useAuth } from '../../context/AuthContext';

// export const LoginPage: React.FC = () => {
//   const { userType } = useParams<{ userType: 'farmer' | 'consumer' }>();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   // Redirect if already logged in
//   React.useEffect(() => {
//   console.log("🚀 user in LoginPage:", user);
//   if (user) {
//     const redirectPath = user.type === 'farmer' ? '/farmer/dashboard' : '/consumer/dashboard';
//     navigate(redirectPath, { replace: true });
//   }
// }, [user, navigate]);


//   if (!userType || (userType !== 'farmer' && userType !== 'consumer')) {
//     navigate('/', { replace: true });
//     return null;
//   }

//   const handleLoginSuccess = () => {
//     const redirectPath = userType === 'farmer' ? '/farmer/dashboard' : '/consumer/dashboard';
//     navigate(redirectPath, { replace: true });
//   };

//   return <LoginForm userType={userType} onSuccess={handleLoginSuccess} />;
// };

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LoginForm } from '../../components/auth/LoginForm';
import { useAuth } from '../../context/AuthContext';

export const LoginPage: React.FC = () => {
  const { userType } = useParams<{ userType: 'farmer' | 'consumer' }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      const redirectPath = user.type === 'farmer' ? '/farmer/dashboard' : '/consumer/dashboard';
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate]);

  if (!userType || (userType !== 'farmer' && userType !== 'consumer')) {
    navigate('/', { replace: true });
    return null;
  }

  const handleLoginSuccess = () => {
    const redirectPath = userType === 'farmer' ? '/farmer/dashboard' : '/consumer/dashboard';
    navigate(redirectPath, { replace: true });
  };

  return <LoginForm userType={userType} onSuccess={handleLoginSuccess} />;
};
