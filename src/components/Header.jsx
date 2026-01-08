import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiBell, FiUser, FiLogOut, FiMenu, FiX, FiHome, FiShield, FiSettings, FiCreditCard, FiZap, FiDollarSign, FiUsers } from 'react-icons/fi';
import { getUserProfilePic } from '../utils/setupDefaultUser';

const Header = ({ subscription, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [userName, setUserName] = useState('User');
  const [userProfilePic, setUserProfilePic] = useState('');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem('njiasafe_user');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setUserData(parsedData);
        if (parsedData.name) setUserName(parsedData.name);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }

    // Get profile picture
    const profilePic = getUserProfilePic();
    setUserProfilePic(profilePic);
  }, []);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('njiasafe_user');
      localStorage.removeItem('njiasafe_token');
      navigate('/login');
    }
  };

  const handleMakePayment = () => {
    navigate('/payment');
    setIsMenuOpen(false);
  };

  const handleV2V = () => {
    navigate('/v2v');
    setIsMenuOpen(false);
  };

  const handleCommunity = () => {
    navigate('/community');
    setIsMenuOpen(false);
  };

  const getFirstName = () => {
    return userName.split(' ')[0];
  };

  const getInitials = () => {
    return userName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getAccountStatus = () => {
    if (!userData || !userData.plan) return 'ACTIVE';
    return userData.status || 'ACTIVE';
  };

  const getPlanType = () => {
    if (!userData || !userData.plan) return subscription.toUpperCase();
    return userData.plan.toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      return 'N/A';
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-gray-900/95 backdrop-blur-lg border-b border-gray-800 shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-700">
                <img 
                  src="https://media.licdn.com/dms/image/v2/D4D22AQG0Atyt2w2ZFQ/feedshare-shrink_800/B4DZsegFI0K8Ag-/0/1765743287150?e=1769644800&v=beta&t=V7uxIxe8F4wdKGtZV1dK5Es4vQeMVFohcxtotEeb-Yw" 
                  alt="NJIA SAFE Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold">
                  <span className="text-blue-500">NJIA</span>{' '}
                  <span className="text-orange-500">SAFE</span>
                </h1>
                <p className="text-xs text-gray-400">
                  Smart Navigation Built for Africa
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  Developed by Brian Nyarienya
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                isActive('/') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <FiHome className="mr-2" />
              Dashboard
            </Link>
            <Link
              to="/smart-map"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/smart-map') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              Smart Map
            </Link>
            <Link
              to="/v2v"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/v2v') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <FiZap className="inline mr-2" />
              V2V Network
            </Link>
            <Link
              to="/community"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/community') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <FiUsers className="inline mr-2" />
              Community
            </Link>
            <Link
              to="/ev-charging"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/ev-charging') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              EV Charging
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Make Payment Button - Always Visible */}
            <button
              onClick={handleMakePayment}
              className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg transition-all font-bold"
            >
              <FiDollarSign />
              <span>Make Payment</span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors relative"
              >
                <FiBell size={22} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-4 border-b border-gray-700">
                    <h3 className="font-bold">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="p-4 border-b border-gray-700 hover:bg-gray-700/50 cursor-pointer">
                        <p className="font-medium">New alert in your area</p>
                        <p className="text-sm text-gray-400">2 hours ago</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-700">
                    <Link to="/notifications" className="block text-center text-blue-400 hover:text-blue-300 text-sm">
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                {userProfilePic ? (
                  <img 
                    src={userProfilePic} 
                    alt={userName}
                    className="w-10 h-10 rounded-full border-2 border-gray-700 object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold">{getInitials()}</span>
                  </div>
                )}
                <div className="hidden lg:block text-left">
                  <p className="font-medium">{getFirstName()}</p>
                  <p className="text-xs text-gray-400">{getPlanType()} Plan</p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                      {userProfilePic ? (
                        <img 
                          src={userProfilePic} 
                          alt={userName}
                          className="w-16 h-16 rounded-full border-2 border-gray-600 object-cover shadow-lg"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-xl">{getInitials()}</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-bold text-lg">{userName}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            getPlanType() === 'PREMIUM' 
                              ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
                              : getPlanType() === 'ENTERPRISE'
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                              : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                          }`}>
                            {getPlanType()}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            getAccountStatus() === 'ACTIVE' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {getAccountStatus()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Quick Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <button
                        onClick={handleMakePayment}
                        className="flex items-center justify-center space-x-2 px-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg transition-all text-sm font-bold"
                      >
                        <FiDollarSign />
                        <span>Make Payment</span>
                      </button>
                      <button
                        onClick={handleV2V}
                        className="flex items-center justify-center space-x-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg transition-all text-sm font-bold"
                      >
                        <FiZap />
                        <span>V2V Network</span>
                      </button>
                    </div>
                    
                    {/* Account Details */}
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Plan:</span>
                          <span className="font-bold">{getPlanType()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Status:</span>
                          <span className={`font-bold ${
                            getAccountStatus() === 'ACTIVE' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {getAccountStatus()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Trial:</span>
                          <span className="font-bold">
                            {userData && userData.trial === false ? 'No' : 'Yes'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Expires:</span>
                          <span className="font-bold">
                            {userData ? formatDate(userData.expiresAt) : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-3 hover:bg-gray-700/50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FiUser className="mr-3" />
                      My Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-3 hover:bg-gray-700/50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FiSettings className="mr-3" />
                      Settings
                    </Link>
                    <Link
                      to="/subscription"
                      className="flex items-center px-4 py-3 hover:bg-gray-700/50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FiCreditCard className="mr-3" />
                      Subscription
                    </Link>
                    <Link
                      to="/community"
                      className="flex items-center px-4 py-3 hover:bg-gray-700/50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FiUsers className="mr-3" />
                      Community
                    </Link>
                  </div>
                  <div className="p-3 border-t border-gray-700">
                    <div className="text-xs text-gray-500 text-center mb-2">
                      Smart Navigation Built for Africa • Developed by Brian Nyarienya
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                    >
                      <FiLogOut className="mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/"
                className={`px-4 py-3 rounded-lg text-center transition-colors ${
                  isActive('/') 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/smart-map"
                className={`px-4 py-3 rounded-lg text-center transition-colors ${
                  isActive('/smart-map') 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Smart Map
              </Link>
              <Link
                to="/v2v"
                className={`px-4 py-3 rounded-lg text-center transition-colors ${
                  isActive('/v2v') 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                V2V Network
              </Link>
              <Link
                to="/community"
                className={`px-4 py-3 rounded-lg text-center transition-colors ${
                  isActive('/community') 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Community
              </Link>
              <Link
                to="/ev-charging"
                className={`px-4 py-3 rounded-lg text-center transition-colors ${
                  isActive('/ev-charging') 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                EV Charging
              </Link>
            </div>
            
            {/* Mobile Payment Button */}
            <button
              onClick={handleMakePayment}
              className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg transition-all font-bold flex items-center justify-center"
            >
              <FiDollarSign className="mr-2" />
              Make Payment
            </button>

            {/* Developer Credits Mobile */}
            <div className="mt-4 text-center text-xs text-gray-500 pt-4 border-t border-gray-800">
              <p>Smart Navigation Built for Africa</p>
              <p>Developed by Brian Nyarienya</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
