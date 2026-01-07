import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMap, FiUser, FiSettings, FiBell, FiLogOut, FiMenu, FiX, FiHome, FiBatteryCharging, FiUsers, FiMessageSquare, FiNavigation, FiGlobe, FiRadio } from 'react-icons/fi';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LanguageSwitch from './LanguageSwitch';

const Header = ({ language, setLanguage, subscription }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [userName, setUserName] = useState('User');
  const [userSubscription, setUserSubscription] = useState('free');
  const [profileImage, setProfileImage] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=brian');
  const navigate = useNavigate();
  const location = useLocation();

  // LinkedIn image URL for the logo
  const logoUrl = "https://media.licdn.com/dms/image/v2/D4D22AQG0Atyt2w2ZFQ/feedshare-shrink_800/B4DZsegFI0K8Ag-/0/1765743287150?e=1769644800&v=beta&t=V7uxIxe8F4wdKGtZV1dK5Es4vQeMVFohcxtotEeb-Yw";

  // Load user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('njiasafe_user');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        if (parsedData.name) setUserName(parsedData.name);
        if (parsedData.subscription) setUserSubscription(parsedData.subscription);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }

    const savedImage = localStorage.getItem('njiasafe_profile_image');
    if (savedImage) {
      setProfileImage(savedImage);
    }

    const userSub = localStorage.getItem('njiasafe_subscription');
    if (userSub) {
      setUserSubscription(userSub);
    }
  }, [subscription]);

  // ONLY the requested navigation items
  const navItems = [
    { 
      path: '/', 
      icon: <FiHome />, 
      label: 'Dashboard', 
      description: 'Overview',
      color: 'text-blue-400'
    },
    { 
      path: '/smart-map', 
      icon: <FiMap />, 
      label: 'Smart Map', 
      description: 'Interactive Maps',
      color: 'text-green-400'
    },
    { 
      path: '/v2v', 
      icon: <FiRadio />, 
      label: 'V2V Connect', 
      description: 'Vehicle Network',
      color: 'text-purple-400'
    },
    { 
      path: '/ev-charging', 
      icon: <FiBatteryCharging />, 
      label: 'EV Charging', 
      description: 'Charging Stations',
      color: 'text-yellow-400'
    },
    { 
      path: '/community', 
      icon: <FiUsers />, 
      label: 'Community', 
      description: 'User Community',
      color: 'text-pink-400'
    },
    { 
      path: '/social', 
      icon: <FiMessageSquare />, 
      label: 'Social', 
      description: 'Social Platform',
      color: 'text-indigo-400'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('njiasafe_token');
    localStorage.removeItem('njiasafe_subscription');
    localStorage.removeItem('njiasafe_language');
    navigate('/login');
  };

  const handleNotificationClick = () => {
    setUnreadNotifications(0);
    navigate('/notifications');
  };

  // Get subscription display text
  const getSubscriptionText = () => {
    switch(userSubscription) {
      case 'premium': return 'Premium';
      case 'enterprise': return 'Enterprise';
      default: return 'Free';
    }
  };

  // Check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Format welcome message with user's first name
  const getWelcomeMessage = () => {
    const firstName = userName.split(' ')[0];
    return `Welcome back, ${firstName}!`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur-xl border-b border-gray-800 shadow-2xl">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* Logo and Menu Button */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="lg:hidden text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            
            <Link to="/" className="flex items-center space-x-3 group">
              {/* Circular Logo with LinkedIn image */}
              <div className="relative w-10 h-10">
                {/* Animated border */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-transparent rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg, #1e3a8a, #8b5cf6, #f59e0b, #1e3a8a)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    padding: '2px',
                  }}
                />
                
                {/* LinkedIn Image */}
                <div className="absolute inset-1 rounded-full overflow-hidden bg-white flex items-center justify-center">
                  <img 
                    src={logoUrl}
                    alt="NJIA SAFE Logo" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/logos/logo.svg';
                    }}
                  />
                </div>
              </div>
              
              {/* App Name */}
              <div className="hidden md:block">
                <h1 className="text-xl font-bold tracking-tight">
                  <span className="text-blue-400">NJIA</span>
                  <span className="text-orange-500"> SAFE</span>
                </h1>
                <p className="text-xs text-gray-400">{getWelcomeMessage()}</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - ONLY requested items, all visible */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  relative group flex flex-col items-center px-4 py-3 rounded-xl transition-all duration-300
                  min-w-[110px] mx-0.5
                  ${isActive(item.path) 
                    ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 text-white border border-blue-500/30' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }
                `}
              >
                <div className={`flex items-center space-x-2 ${item.color}`}>
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-semibold">{item.label}</span>
                </div>
                <span className="text-xs text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity truncate w-full text-center">
                  {item.description}
                </span>
                
                {/* Active indicator */}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Language Switch - Desktop */}
            <div className="hidden md:block">
              <LanguageSwitch language={language} setLanguage={setLanguage} />
            </div>

            {/* Notifications */}
            <button
              onClick={handleNotificationClick}
              className="relative p-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300 group"
            >
              <FiBell className="text-gray-300 group-hover:text-white text-lg" />
              {unreadNotifications > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-xs rounded-full flex items-center justify-center animate-pulse border border-gray-900"
                >
                  {unreadNotifications}
                </motion.span>
              )}
            </button>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300 group"
              >
                {/* Profile image */}
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-orange-500/70 group-hover:border-orange-500 transition-colors">
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=brian';
                    }}
                  />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-white">{userName}</p>
                  <p className="text-xs text-gray-400 capitalize">{getSubscriptionText()} Member</p>
                </div>
              </button>

              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800 overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-gray-800">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500">
                          <img 
                            src={profileImage} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=brian';
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-bold text-white">{userName}</p>
                          <p className="text-sm text-gray-400 capitalize">{getSubscriptionText()} Member</p>
                          <p className="text-xs text-blue-400 mt-1">{getWelcomeMessage()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-2">
                      {/* Profile links - Minimal options */}
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors mb-1"
                      >
                        <FiUser />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors mb-1"
                      >
                        <FiSettings />
                        <span>Settings</span>
                      </Link>
                    </div>

                    <div className="p-4 border-t border-gray-800">
                      <div className="flex items-center space-x-2 mb-3">
                        <FiGlobe className="text-gray-400" />
                        <span className="text-sm text-gray-400">Language:</span>
                        <div className="ml-auto">
                          <LanguageSwitch language={language} setLanguage={setLanguage} />
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:opacity-90 transition-opacity font-medium"
                      >
                        <FiLogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-gray-900/95 backdrop-blur-lg rounded-xl mt-4 border border-gray-800"
            >
              <div className="pt-4 pb-2">
                {/* Mobile Welcome Message */}
                <div className="px-4 mb-4">
                  <p className="text-lg font-bold text-white">{getWelcomeMessage()}</p>
                  <p className="text-sm text-gray-400">What would you like to do today?</p>
                </div>
                
                {/* Mobile Language Switch */}
                <div className="mb-4 px-4">
                  <LanguageSwitch language={language} setLanguage={setLanguage} />
                </div>
                
                {/* All Navigation Items in Mobile */}
                <div className="grid grid-cols-3 gap-3 px-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`
                        flex flex-col items-center p-4 rounded-xl transition-all
                        ${isActive(item.path)
                          ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 text-white border border-blue-500/30'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }
                      `}
                    >
                      <span className={`text-2xl mb-2 ${item.color}`}>{item.icon}</span>
                      <span className="text-sm font-medium text-center mb-1">{item.label}</span>
                      <span className="text-xs text-gray-400 text-center">{item.description}</span>
                    </Link>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-800 px-4">
                  {/* Mobile Profile Info */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500">
                      <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=brian';
                        }}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-white">{userName}</p>
                      <p className="text-xs text-gray-400 capitalize">{getSubscriptionText()} Member</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:opacity-90 transition-opacity font-medium"
                  >
                    <FiLogOut /><span>Logout</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
