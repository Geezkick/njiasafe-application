import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import Dashboard from './pages/Dashboard';
import SmartAppV2V from './pages/SmartAppV2V';
import SmartMap from './pages/SmartMap';
import GovernmentInsurance from './pages/GovernmentInsurance';
import Subscription from './pages/Subscription';
import Payment from './pages/Payment';
import UserProfile from './pages/UserProfile';
import RoutesPage from './pages/Routes';
import EVCharging from './pages/EVCharging';
import Community from './pages/Community';
import SocialPlatform from './pages/SocialPlatform';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import AIAssistant from './pages/AIAssistant';
import Notifications from './pages/Notifications';
import { setupDefaultUser } from './utils/setupDefaultUser';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [subscription, setSubscription] = useState('premium');

  useEffect(() => {
    // Setup default user for demo
    setupDefaultUser();
    
    setTimeout(() => setIsLoading(false), 500);
    const token = localStorage.getItem('njiasafe_token');
    const userData = localStorage.getItem('njiasafe_user');
    
    if (token && userData) {
      try {
        const parsedData = JSON.parse(userData);
        setIsAuthenticated(true);
        setSubscription(parsedData.plan?.toLowerCase() || parsedData.subscription || 'premium');
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('njiasafe_user');
    localStorage.removeItem('njiasafe_token');
    setIsAuthenticated(false);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 text-white">
      <Toaster position="top-right" toastOptions={{ style: { background: '#1a1f36', color: '#fff', border: '1px solid #ff6d00' } }} />
      
      {isAuthenticated && <Header subscription={subscription} onLogout={handleLogout} />}
      
      <main className={`${isAuthenticated ? 'pt-4' : 'pt-0'} min-h-screen`}>
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/v2v" element={isAuthenticated ? <SmartAppV2V subscription={subscription} /> : <Navigate to="/login" />} />
          <Route path="/smart-map" element={isAuthenticated ? <SmartMap subscription={subscription} /> : <Navigate to="/login" />} />
          <Route path="/government-insurance" element={isAuthenticated ? <GovernmentInsurance /> : <Navigate to="/login" />} />
          <Route path="/subscription" element={isAuthenticated ? <Subscription subscription={subscription} setSubscription={setSubscription} /> : <Navigate to="/login" />} />
          <Route path="/payment" element={isAuthenticated ? <Payment /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />} />
          <Route path="/routes" element={isAuthenticated ? <RoutesPage /> : <Navigate to="/login" />} />
          <Route path="/ev-charging" element={isAuthenticated ? <EVCharging /> : <Navigate to="/login" />} />
          <Route path="/community" element={isAuthenticated ? <Community /> : <Navigate to="/login" />} />
          <Route path="/social" element={isAuthenticated ? <SocialPlatform /> : <Navigate to="/login" />} />
          <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} />
          <Route path="/ai-assistant" element={isAuthenticated ? <AIAssistant /> : <Navigate to="/login" />} />
          <Route path="/notifications" element={isAuthenticated ? <Notifications /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      {isAuthenticated && <Footer />}
    </div>
  );
}

export default App;
