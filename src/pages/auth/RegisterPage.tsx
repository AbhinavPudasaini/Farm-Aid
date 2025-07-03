import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RegisterForm } from '../../components/auth/RegisterForm';
import { useAuth } from '../../context/AuthContext';

export const RegisterPage: React.FC = () => {
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

  const handleRegisterSuccess = () => {
    const redirectPath = userType === 'farmer' ? '/farmer/dashboard' : '/consumer/dashboard';
    navigate(redirectPath, { replace: true });
  };

  return <RegisterForm userType={userType} onSuccess={handleRegisterSuccess} />;
};