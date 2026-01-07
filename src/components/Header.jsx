import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMap, FiUser, FiSettings, FiBell, FiLogOut, FiMenu, FiX, FiHome, FiBatteryCharging, FiUsers, FiMessageSquare, FiNavigation, FiShield } from 'react-icons/fi';
import { motion } from 'framer-motion';
import LanguageSwitch from './LanguageSwitch';

const Header = ({ language, setLanguage, subscription }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { path: '/', icon: <FiHome />, label: 'Dashboard' },
    { path: '/v2v', icon: <FiMessageSquare />, label: 'V2V Network' },
    { path: '/smart-map', icon: <FiNavigation />, label: 'Smart Map' },
    { path: '/routes', icon: <FiMap />, label: 'Routes' },
    { path: '/ev-charging', icon: <FiBatteryCharging />, label: 'EV Charging' },
    { path: '/government-insurance', icon: <FiShield />, label: 'Gov & Insurance' },
    { path: '/community', icon: <FiUsers />, label: 'Community' },
    { path: '/social', icon: <FiMessageSquare />, label: 'Social' },
    { path: '/profile', icon: <FiUser />, label: 'Profile' },
    { path: '/settings', icon: <FiSettings />, label: 'Settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('njiasafe_token');
    navigate('/login');
  };

  return (
    <motion.header initial={{ y: -100 }} animate={{ y: 0 }} className="fixed top-0 left-0 right-0 bg-premium-card/90 backdrop-blur-lg border-b border-njia-orange/20 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-njia-darkblue to-njia-purple rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold"><span className="text-white">NJIA</span></span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-njia-orange rounded-full animate-pulse-glow"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold"><span className="text-njia-darkblue">NJIA</span><span className="text-njia-orange">SAFE</span></h1>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-0.5 rounded ${subscription === 'premium' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gray-600'}`}>
                  {subscription === 'premium' ? 'PREMIUM' : 'FREE'}
                </span>
                <p className="text-xs text-gray-400">Premium Safe Routes</p>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.slice(0, 6).map((item) => (
              <Link key={item.path} to={item.path} className="flex items-center space-x-2 text-gray-300 hover:text-njia-orange transition-colors group">
                <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <LanguageSwitch language={language} setLanguage={setLanguage} />
            <Link to="/subscription" className={`px-3 py-1.5 rounded-lg text-sm font-medium ${subscription === 'premium' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-njia-darkblue to-njia-purple'}`}>
              {subscription === 'premium' ? '⭐ Premium' : '🆓 Free'}
            </Link>
            <button onClick={() => {}} className="relative p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
              <FiBell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-njia-orange rounded-full animate-pulse"></span>
            </button>
            <button onClick={handleLogout} className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-njia-darkblue to-njia-purple rounded-lg hover:opacity-90 transition-opacity">
              <FiLogOut /><span>Logout</span>
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                  {item.icon}<span>{item.label}</span>
                </Link>
              ))}
              <button onClick={handleLogout} className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-njia-darkblue to-njia-purple rounded-lg hover:opacity-90 transition-opacity">
                <FiLogOut /><span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};
export default Header;
