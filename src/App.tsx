import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { FarmerDashboard } from './pages/farmer/FarmerDashboard';
import { CropPlanner } from './pages/farmer/CropPlanner';
import VoiceAssistant from './pages/farmer/VoiceAssistant';
import { ProductListing } from './pages/farmer/ProductListing';
import { FarmerProfile } from './pages/farmer/FarmerProfile';
import { ConsumerDashboard } from './pages/consumer/ConsumerDashboard';
import { MarketplaceFeed } from './pages/consumer/MarketplaceFeed';
import { FarmerProfiles } from './pages/consumer/FarmerProfiles';
import { DemandBoard } from './pages/consumer/DemandBoard';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login/:userType" element={<LoginPage />} />
              <Route path="/register/:userType" element={<RegisterPage />} />
              
              {/* Farmer Routes */}
              <Route 
                path="/farmer/dashboard" 
                element={
                  <ProtectedRoute userType="farmer">
                    <FarmerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/farmer/crop-planner" 
                element={
                  <ProtectedRoute userType="farmer">
                    <CropPlanner />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/farmer/voice-assistant" 
                element={
                  <ProtectedRoute userType="farmer">
                    <VoiceAssistant />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/farmer/product-listing" 
                element={
                  <ProtectedRoute userType="farmer">
                    <ProductListing />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/farmer/profile" 
                element={
                  <ProtectedRoute userType="farmer">
                    <FarmerProfile />
                  </ProtectedRoute>
                } 
              />
              
              {/* Consumer Routes */}
              <Route 
                path="/consumer/dashboard" 
                element={
                  <ProtectedRoute userType="consumer">
                    <ConsumerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/consumer/marketplace" 
                element={
                  <ProtectedRoute userType="consumer">
                    <MarketplaceFeed />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/consumer/farmers" 
                element={
                  <ProtectedRoute userType="consumer">
                    <FarmerProfiles />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/consumer/demand-board" 
                element={
                  <ProtectedRoute userType="consumer">
                    <DemandBoard />
                  </ProtectedRoute>
                } 
              />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;