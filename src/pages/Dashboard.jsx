import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiMap, FiBatteryCharging, FiUsers, FiMessageSquare, FiNavigation, 
  FiShield, FiTrendingUp, FiAlertCircle, FiCalendar, FiStar, 
  FiBarChart2, FiGlobe, FiTruck, FiDollarSign, FiUser, FiHome,
  FiActivity, FiCreditCard, FiSettings, FiClock, FiCheckCircle,
  FiEdit2, FiZap
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { getUserProfilePic } from '../utils/setupDefaultUser';

const Dashboard = () => {
  const [userName, setUserName] = useState('User');
  const [userProfilePic, setUserProfilePic] = useState('');
  const [userData, setUserData] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [stats, setStats] = useState({
    trips: 24,
    distance: '1,240 km',
    carbonSaved: '45 kg',
    chargingSessions: 12
  });

  // Load user data
  useEffect(() => {
    const userData = localStorage.getItem('njiasafe_user');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setUserData(parsedData);
        if (parsedData.name) setUserName(parsedData.name);
        if (parsedData.stats) setStats(parsedData.stats);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }

    // Get profile picture
    const profilePic = getUserProfilePic();
    setUserProfilePic(profilePic);

    // Load recent activity
    const activity = [
      { id: 1, type: 'trip', title: 'Nairobi to Mombasa', time: '2 hours ago', icon: <FiTruck />, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
      { id: 2, type: 'charging', title: 'EV Charging Session', time: '5 hours ago', icon: <FiBatteryCharging />, color: 'text-green-500', bgColor: 'bg-green-500/10' },
      { id: 3, type: 'community', title: 'New Community Post', time: '1 day ago', icon: <FiUsers />, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
      { id: 4, type: 'alert', title: 'Route Alert Resolved', time: '2 days ago', icon: <FiAlertCircle />, color: 'text-orange-500', bgColor: 'bg-orange-500/10' }
    ];
    setRecentActivity(activity);
  }, []);

  // Get user's first name
  const getFirstName = () => {
    return userName.split(' ')[0];
  };

  // Get initials for avatar
  const getInitials = () => {
    return userName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getPlanType = () => {
    if (!userData || !userData.plan) return 'PREMIUM';
    return userData.plan.toUpperCase();
  };

  const getAccountStatus = () => {
    if (!userData || !userData.plan) return 'ACTIVE';
    return userData.status || 'ACTIVE';
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

  const getDaysRemaining = () => {
    if (!userData || !userData.expiresAt) return 365;
    try {
      const expires = new Date(userData.expiresAt);
      const today = new Date();
      const diffTime = expires - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    } catch (error) {
      return 365;
    }
  };

  // Quick action cards with icons
  const quickActions = [
    { 
      title: 'Smart Map', 
      description: 'Interactive maps & real-time traffic', 
      icon: <FiMap className="text-3xl" />, 
      color: 'from-blue-500 to-cyan-500',
      path: '/smart-map'
    },
    { 
      title: 'V2V Connect', 
      description: 'Vehicle-to-vehicle network', 
      icon: <FiNavigation className="text-3xl" />, 
      color: 'from-purple-500 to-pink-500',
      path: '/v2v'
    },
    { 
      title: 'EV Charging', 
      description: 'Charging stations locator', 
      icon: <FiBatteryCharging className="text-3xl" />, 
      color: 'from-green-500 to-emerald-500',
      path: '/ev-charging'
    },
    { 
      title: 'Community', 
      description: 'User community & alerts', 
      icon: <FiUsers className="text-3xl" />, 
      color: 'from-orange-500 to-red-500',
      path: '/community'
    },
    { 
      title: 'Social Platform', 
      description: 'Social platform for users', 
      icon: <FiMessageSquare className="text-3xl" />, 
      color: 'from-indigo-500 to-blue-500',
      path: '/social'
    },
    { 
      title: 'Insurance', 
      description: 'Government coverage', 
      icon: <FiShield className="text-3xl" />, 
      color: 'from-red-500 to-orange-500',
      path: '/government-insurance'
    }
  ];

  // Stats cards with icons
  const statCards = [
    { label: 'Total Trips', value: stats.trips, icon: <FiTruck className="text-2xl" />, color: 'text-blue-500', bgColor: 'bg-blue-500/10', change: '+12%' },
    { label: 'Distance Covered', value: stats.distance, icon: <FiGlobe className="text-2xl" />, color: 'text-green-500', bgColor: 'bg-green-500/10', change: '+8%' },
    { label: 'Carbon Saved', value: stats.carbonSaved, icon: <FiTrendingUp className="text-2xl" />, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10', change: '+15%' },
    { label: 'Charging Sessions', value: stats.chargingSessions, icon: <FiBatteryCharging className="text-2xl" />, color: 'text-orange-500', bgColor: 'bg-orange-500/10', change: '+5%' }
  ];

  // Premium features with icons
  const premiumFeatures = [
    { 
      title: 'Enhanced Insurance', 
      description: 'Government-backed coverage', 
      icon: <FiShield className="text-xl text-green-400" />,
      buttonText: 'View',
      path: '/government-insurance',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    },
    { 
      title: 'Easy Payments', 
      description: 'Manage subscriptions & bills', 
      icon: <FiDollarSign className="text-xl text-green-400" />,
      buttonText: 'Pay Now',
      path: '/payment',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    },
    { 
      title: 'Advanced Analytics', 
      description: 'Detailed journey insights', 
      icon: <FiBarChart2 className="text-xl text-purple-400" />,
      buttonText: 'Explore',
      path: '/settings',
      buttonColor: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  const daysRemaining = getDaysRemaining();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 text-white pt-4 px-4 md:px-6 pb-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <div className="flex items-center mb-4">
              <div className="relative">
                {userProfilePic ? (
                  <img 
                    src={userProfilePic} 
                    alt={userName}
                    className="w-20 h-20 rounded-full border-4 border-gray-800 mr-4 object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center border-4 border-gray-800 mr-4">
                    <span className="text-white font-bold text-2xl">{getInitials()}</span>
                  </div>
                )}
                <Link 
                  to="/profile"
                  className="absolute bottom-0 right-4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-2 border-gray-800 hover:bg-blue-700 transition-colors"
                >
                  <FiEdit2 className="text-white text-sm" />
                </Link>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  Welcome back, {getFirstName()}! 👋
                </h1>
                <p className="text-gray-400 text-lg">
                  Here's what's happening with your NJIA SAFE experience today.
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm text-gray-300">{getAccountStatus()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  getPlanType() === 'PREMIUM' 
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
                    : getPlanType() === 'ENTERPRISE'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                }`}>
                  {getPlanType()} PLAN
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FiClock className="text-gray-400" />
                <span className="text-sm text-gray-300">
                  {daysRemaining} days remaining
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FiCalendar className="text-gray-400" />
                <span className="text-sm text-gray-300">
                  Expires: {userData ? formatDate(userData.expiresAt) : 'N/A'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <div className="text-right">
                <p className="text-sm text-gray-400">Today's Date</p>
                <p className="text-xl font-bold">{new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <FiCalendar className="text-3xl text-blue-400" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <FiActivity className="mr-2 text-blue-400" />
          Your Journey Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-5 border border-gray-700 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-green-400 text-sm mt-2 flex items-center">
                    <FiTrendingUp className="mr-1" /> {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor} ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold flex items-center">
            <FiNavigation className="mr-2 text-orange-400" />
            Quick Actions
          </h2>
          <Link to="/settings" className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
            <FiSettings className="mr-1" />
            View All Features
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={action.path}
                className={`block bg-gradient-to-br ${action.color} rounded-xl p-5 text-center shadow-xl hover:shadow-2xl transition-all duration-300`}
              >
                <div className="mb-3 flex justify-center">
                  <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm">
                    {action.icon}
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <FiClock className="mr-2 text-orange-400" />
              Recent Activity
            </h2>
            <Link to="/notifications" className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
              <FiCheckCircle className="mr-1" />
              See All
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center p-4 rounded-lg bg-gray-900/50 hover:bg-gray-800/70 transition-colors group"
              >
                <div className={`p-3 rounded-lg ${activity.bgColor} ${activity.color} mr-4 group-hover:scale-110 transition-transform`}>
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">{activity.title}</h4>
                  <p className="text-gray-400 text-sm">{activity.time}</p>
                </div>
                <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
                  View <FiNavigation className="ml-1" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Account Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-br from-blue-900/30 to-orange-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-700/30"
        >
          <div className="flex items-center mb-6">
            <FiShield className="text-2xl text-blue-400 mr-3" />
            <h2 className="text-2xl font-bold">
              <span className="text-blue-400">NJIA</span>{' '}
              <span className="text-orange-400">SAFE</span> Account
            </h2>
          </div>
          
          {/* Account Details */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">Plan Type</p>
                <p className="text-xl font-bold text-orange-400">{getPlanType()}</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">Status</p>
                <p className={`text-xl font-bold ${
                  getAccountStatus() === 'ACTIVE' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {getAccountStatus()}
                </p>
              </div>
            </div>
            
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-400">Subscription Progress</p>
                <p className="font-bold text-blue-400">{daysRemaining} days left</p>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-orange-500 h-2 rounded-full" 
                  style={{ width: `${Math.min(100, (daysRemaining / 365) * 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>Started: {userData ? formatDate(userData.startedAt) : 'N/A'}</span>
                <span>Expires: {userData ? formatDate(userData.expiresAt) : 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Account Features */}
          <div className="space-y-4">
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center space-x-3">
                  {feature.icon}
                  <div>
                    <p className="font-bold">{feature.title}</p>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </div>
                <Link 
                  to={feature.path} 
                  className={`px-4 py-2 ${feature.buttonColor} rounded text-sm transition-colors flex items-center`}
                >
                  {feature.buttonText} <FiNavigation className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
          
          {/* Trial Status */}
          {userData && userData.trial === false && (
            <div className="mt-6 p-4 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-lg border border-green-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold flex items-center">
                    <FiCheckCircle className="mr-2 text-green-400" />
                    Full Subscription Active
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    You're on a full premium plan. No trial restrictions apply.
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-400">100%</p>
                  <p className="text-xs text-gray-400">Active</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom Info Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-700">
              <img 
                src="https://media.licdn.com/dms/image/v2/D4D22AQG0Atyt2w2ZFQ/feedshare-shrink_800/B4DZsegFI0K8Ag-/0/1765743287150?e=1769644800&v=beta&t=V7uxIxe8F4wdKGtZV1dK5Es4vQeMVFohcxtotEeb-Yw" 
                alt="NJIA SAFE Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-bold">
                <span className="text-blue-400">NJIA</span>{' '}
                <span className="text-orange-400">SAFE</span> Dashboard
              </p>
              <p className="text-sm text-gray-400">Your complete safety and navigation companion</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">24/7</p>
              <p className="text-xs text-gray-400">Support</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">99.9%</p>
              <p className="text-xs text-gray-400">Uptime</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-400">
                <FiZap className="inline mr-1" />
                5.0
              </p>
              <p className="text-xs text-gray-400">Rating</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
