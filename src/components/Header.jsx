import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMap, FiUser, FiSettings, FiBell, FiLogOut, FiMenu, FiX, FiHome, FiBatteryCharging, FiUsers, FiMessageSquare, FiNavigation, FiShield, FiMessageCircle, FiCreditCard, FiShoppingCart, FiGlobe, FiDollarSign } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import LanguageSwitch from './LanguageSwitch';

const Header = ({ language, setLanguage, subscription }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [userName, setUserName] = useState('Brian Nyarienya');
  const [profileImage, setProfileImage] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=brian');
  const navigate = useNavigate();

  const logoUrl = "https://media.licdn.com/dms/image/v2/D4D22AQG0Atyt2w2ZFQ/feedshare-shrink_800/B4DZsegFI0K8Ag-/0/1765743287150?e=1769644800&v=beta&t=V7uxIxe8F4wdKGtZV1dK5Es4vQeMVFohcxtotEeb-Yw";

  // Load user data from localStorage to match UserProfile.jsx
  useEffect(() => {
    // Load saved user data
    const userData = localStorage.getItem('njiasafe_user');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        if (parsedData.name) setUserName(parsedData.name);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }

    // Load saved profile image from localStorage (same as UserProfile.jsx)
    const savedImage = localStorage.getItem('njiasafe_profile_image');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const navItems = [
    { path: '/', icon: <FiHome />, label: 'Dashboard', color: 'text-blue-400' },
    { path: '/smart-map', icon: <FiMap />, label: 'Smart Map', color: 'text-green-400' },
    { path: '/v2v', icon: <FiNavigation />, label: 'V2V Connect', color: 'text-purple-400' },
    { path: '/ev-charging', icon: <FiBatteryCharging />, label: 'EV Charging', color: 'text-yellow-400' },
    { path: '/community', icon: <FiUsers />, label: 'Community', color: 'text-pink-400' },
    { path: '/social', icon: <FiMessageSquare />, label: 'Social', color: 'text-indigo-400' },
    { path: '/ai-assistant', icon: <FiMessageCircle />, label: 'AI Assistant', color: 'text-cyan-400' },
    { path: '/government-insurance', icon: <FiShield />, label: 'Insurance', color: 'text-red-400' },
    { path: '/subscription', icon: <FiCreditCard />, label: 'Subscription', color: 'text-orange-400' },
    { path: '/payment', icon: <FiDollarSign />, label: 'Payment', color: 'text-green-400' },
    { path: '/settings', icon: <FiSettings />, label: 'Settings', color: 'text-gray-400' },
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

  // Function to update profile image when changed in UserProfile
  const updateProfileImage = (newImage) => {
    setProfileImage(newImage);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Menu Button */}
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-gray-400 hover:text-white">
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            
            <Link to="/" className="flex items-center space-x-3">
              {/* Circular Logo */}
              <div className="relative w-10 h-10">
                {/* Animated border */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-transparent rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg, #1e3a8a, #8b5cf6, #f59e0b, #1e3a8a)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    padding: '1px',
                  }}
                />
                
                {/* Logo Image */}
                <div className="absolute inset-1 rounded-full overflow-hidden bg-gray-900 flex items-center justify-center">
                  <img 
                    src={logoUrl}
                    alt="NJIA SAFE Logo" 
                    className="w-full h-full object-contain p-1"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      // Fallback to text
                      const fallback = document.createElement('div');
                      fallback.className = 'flex items-center justify-center h-full w-full';
                      fallback.innerHTML = `
                        <div class="text-xs font-bold">
                          <span class="text-njia-darkblue">N</span>
                          <span class="text-njia-orange">S</span>
                        </div>
                      `;
                      e.target.parentNode.appendChild(fallback);
                    }}
                  />
                </div>
              </div>
              
              {/* App Name */}
              <div className="hidden md:block">
                <h1 className="text-xl font-bold">
                  <span className="text-njia-darkblue">NJIA</span>
                  <span className="text-njia-orange"> SAFE</span>
                </h1>
                <p className="text-xs text-gray-400">Smart Navigation Built for Africa</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.slice(0, 6).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${
                  window.location.pathname === item.path
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <span className={item.color}>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Language Switch */}
            <div className="hidden md:block">
              <LanguageSwitch language={language} setLanguage={setLanguage} />
            </div>

            {/* Notifications */}
            <button
              onClick={handleNotificationClick}
              className="relative p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <FiBell className="text-gray-300" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-xs rounded-full flex items-center justify-center animate-pulse">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                {/* Profile image - same as UserProfile.jsx */}
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-njia-orange">
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
                  <p className="text-sm font-medium">{userName}</p>
                  <p className="text-xs text-gray-400 capitalize">Premium Member</p>
                </div>
              </button>

              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-64 bg-gray-900 rounded-xl shadow-2xl border border-gray-800 overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-gray-800">
                      <div className="flex items-center space-x-3">
                        {/* Larger profile image - same as UserProfile.jsx */}
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-njia-orange">
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
                          <p className="font-bold">{userName}</p>
                          <p className="text-sm text-gray-400">Premium Member</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-2">
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <FiUser className="text-gray-400" />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <FiSettings className="text-gray-400" />
                        <span>Settings</span>
                      </Link>
                      <Link
                        to="/subscription"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <FiCreditCard className="text-gray-400" />
                        <span>Subscription</span>
                      </Link>
                      <Link
                        to="/payment"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <FiDollarSign className="text-gray-400" />
                        <span>Make Payment</span>
                      </Link>
                      <Link
                        to="/government-insurance"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <FiShield className="text-gray-400" />
                        <span>Insurance</span>
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
                        className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-njia-darkblue to-njia-purple rounded-lg hover:opacity-90 transition-opacity"
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
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-4 pb-2 border-t border-gray-800 mt-4">
                {/* Mobile Language Switch */}
                <div className="mb-4 px-2">
                  <LanguageSwitch language={language} setLanguage={setLanguage} />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                        window.location.pathname === item.path
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                      }`}
                    >
                      <span className={item.color}>{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-800">
                  {/* Mobile Profile Info */}
                  <div className="flex items-center space-x-3 mb-4 px-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-njia-orange">
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
                      <p className="font-medium">{userName}</p>
                      <p className="text-xs text-gray-400">Premium Member</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-njia-darkblue to-njia-purple rounded-lg hover:opacity-90 transition-opacity"
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
