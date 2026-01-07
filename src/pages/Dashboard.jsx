import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiNavigation, FiMap, FiUsers, FiBatteryCharging, FiTrendingUp, FiShield, FiClock, FiAlertCircle, FiCreditCard, FiDollarSign, FiCheckCircle, FiZap, FiBell, FiCalendar, FiBarChart, FiArrowRight, FiGlobe } from 'react-icons/fi';
import TravelModeSelector from '../components/TravelModeSelector';
import AnimatedButton from '../components/AnimatedButton';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [travelMode, setTravelMode] = useState('drive');
  const logoUrl = "https://media.licdn.com/dms/image/v2/D4D22AQG0Atyt2w2ZFQ/feedshare-shrink_800/B4DZsegFI0K8Ag-/0/1765743287150?e=1769644800&v=beta&t=V7uxIxe8F4wdKGtZV1dK5Es4vQeMVFohcxtotEeb-Yw";
  
  const stats = [
    { icon: <FiNavigation />, label: 'Active Routes', value: '24', change: '+12%', color: 'text-blue-500', link: '/routes' },
    { icon: <FiShield />, label: 'Safety Score', value: '9.8/10', change: '+0.2', color: 'text-green-500', link: '/government-insurance' },
    { icon: <FiUsers />, label: 'Community Online', value: '1.2k', change: '+5%', color: 'text-purple-500', link: '/community' },
    { icon: <FiBatteryCharging />, label: 'EV Stations', value: '48', change: '+3', color: 'text-orange-500', link: '/ev-charging' }
  ];

  const quickActions = [
    { icon: <FiDollarSign />, label: 'Make Payment', description: 'Pay subscription', color: 'from-green-500 to-emerald-600', link: '/payment' },
    { icon: <FiCreditCard />, label: 'Subscription', description: 'Manage plan', color: 'from-blue-500 to-cyan-600', link: '/subscription' },
    { icon: <FiShield />, label: 'Insurance', description: 'View benefits', color: 'from-red-500 to-red-600', link: '/government-insurance' },
    { icon: <FiBell />, label: 'Alerts', description: '3 new alerts', color: 'from-yellow-500 to-orange-600', link: '/notifications' }
  ];

  const recentPayments = [
    { id: 1, service: 'Premium Plan', amount: 'Ksh 899', date: 'Today', status: 'paid', method: 'M-Pesa' },
    { id: 2, service: 'Insurance', amount: 'Ksh 1,500', date: '2 days ago', status: 'paid', method: 'Card' },
    { id: 3, service: 'EV Charging', amount: 'Ksh 350', date: '1 week ago', status: 'pending', method: 'M-Pesa' }
  ];

  const insuranceBenefits = [
    { benefit: 'Accident Coverage', status: 'Active', value: 'KES 500,000' },
    { benefit: 'Roadside Assistance', status: 'Active', value: '24/7' },
    { benefit: 'Medical Cover', status: 'Active', value: 'KES 200,000' },
    { benefit: 'Theft Protection', status: 'Active', value: 'KES 300,000' }
  ];

  return (
    <div className="animate-fade-in">
      {/* Header with Logo */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            {/* Circular Logo */}
            <div className="relative w-16 h-16">
              {/* Animated ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-transparent rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #1e3a8a, #8b5cf6, #f59e0b, #1e3a8a)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  padding: '2px',
                }}
              />
              
              {/* Logo Image */}
              <div className="absolute inset-2 rounded-full overflow-hidden bg-gray-900 flex items-center justify-center p-1">
                <img 
                  src={logoUrl}
                  alt="NJIA SAFE Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    // Fallback to text
                    const fallback = document.createElement('div');
                    fallback.className = 'flex flex-col items-center justify-center h-full w-full';
                    fallback.innerHTML = `
                      <div class="text-lg font-bold">
                        <span class="text-njia-darkblue">NJIA</span>
                        <span class="text-njia-orange"> SAFE</span>
                      </div>
                    `;
                    e.target.parentNode.appendChild(fallback);
                  }}
                />
              </div>
            </div>
            
            {/* Welcome Text */}
            <div>
              <h1 className="text-3xl font-bold">
                Welcome back, <span className="text-njia-orange">Premium User</span>
              </h1>
              <p className="text-gray-400 mt-2">Your safety dashboard is optimized for today's journey</p>
              {/* New Slogan */}
              <div className="flex items-center space-x-2 mt-1">
                <FiGlobe className="text-njia-orange w-4 h-4" />
                <p className="text-njia-darkblue font-semibold text-sm">
                  Smart Navigation Built for Africa
                </p>
              </div>
            </div>
          </div>
          
          {/* Stats Summary */}
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-njia-darkblue">NJIA</div>
              <div className="text-xs text-gray-400">Navigation</div>
            </div>
            <div className="h-8 w-px bg-gray-700"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-njia-orange">SAFE</div>
              <div className="text-xs text-gray-400">Security</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Link key={stat.label} to={stat.link}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: index * 0.1 }} 
              className="bg-premium-card rounded-xl p-6 border border-gray-800 hover:border-njia-orange/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg bg-gray-900 ${stat.color}`}>{stat.icon}</div>
                <span className="text-sm text-gray-400">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold mt-4">{stat.value}</h3>
              <p className="text-gray-400 mt-1">{stat.label}</p>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Travel & Quick Actions */}
        <div className="lg:col-span-2 space-y-8">
          {/* Travel Mode Selector */}
          <div className="bg-premium-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-300">Plan Your Journey</h3>
              <span className="text-xs px-2 py-1 bg-green-500/20 text-green-500 rounded">Live Traffic</span>
            </div>
            <TravelModeSelector selectedMode={travelMode} onModeChange={setTravelMode} />
            <div className="mt-6 grid grid-cols-2 gap-4">
              <AnimatedButton fullWidth>
                <FiNavigation className="mr-2" />
                Start Navigation
              </AnimatedButton>
              <AnimatedButton variant="outline" fullWidth>
                <FiMap className="mr-2" />
                View Map
              </AnimatedButton>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-premium-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-300">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link key={action.label} to={action.link}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center p-4 rounded-xl bg-gray-900/50 hover:bg-gray-900 border border-gray-800 hover:border-gray-700 transition-all w-full"
                  >
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${action.color} flex items-center justify-center mb-3`}>
                      <span className="text-xl text-white">{action.icon}</span>
                    </div>
                    <h4 className="font-bold text-sm mb-1">{action.label}</h4>
                    <p className="text-xs text-gray-400 text-center">{action.description}</p>
                  </motion.button>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-premium-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-300">Recent Activity</h3>
              <Link to="/notifications" className="text-sm text-njia-orange hover:text-orange-400">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {[
                { time: '10:30 AM', action: 'Route optimized for traffic', icon: '🔄', color: 'text-blue-500' },
                { time: '09:15 AM', action: 'Payment received - Premium Plan', icon: '💰', color: 'text-green-500' },
                { time: 'Yesterday', action: 'Safety alert: Road construction', icon: '⚠️', color: 'text-yellow-500' },
                { time: '2 days ago', action: 'Insurance claim submitted', icon: '🛡️', color: 'text-red-500' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-900/50">
                  <div className={`text-2xl ${activity.color}`}>{activity.icon}</div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-400">{activity.time}</p>
                  </div>
                  <FiCheckCircle className="text-green-500" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Payment & Insurance */}
        <div className="space-y-8">
          {/* Payment Status */}
          <div className="bg-premium-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-300">Payment Status</h3>
              <span className="text-xs px-2 py-1 bg-green-500/20 text-green-500 rounded">Active</span>
            </div>
            
            <div className="space-y-4 mb-6">
              {recentPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50">
                  <div>
                    <p className="font-medium">{payment.service}</p>
                    <p className="text-sm text-gray-400">{payment.date} • {payment.method}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{payment.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      payment.status === 'paid' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/payment">
              <AnimatedButton fullWidth>
                <FiDollarSign className="mr-2" />
                Make New Payment
                <FiArrowRight className="ml-2" />
              </AnimatedButton>
            </Link>
          </div>

          {/* Insurance Benefits */}
          <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-300">Insurance Benefits</h3>
              <FiShield className="text-red-500" />
            </div>
            
            <div className="space-y-3 mb-6">
              {insuranceBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/30">
                  <div>
                    <p className="font-medium">{benefit.benefit}</p>
                    <p className="text-xs text-gray-400">Status: {benefit.status}</p>
                  </div>
                  <p className="font-bold text-red-400">{benefit.value}</p>
                </div>
              ))}
            </div>

            <Link to="/government-insurance">
              <AnimatedButton variant="secondary" fullWidth>
                <FiShield className="mr-2" />
                View Insurance Details
              </AnimatedButton>
            </Link>
          </div>

          {/* Subscription Status */}
          <div className="bg-gradient-to-br from-njia-darkblue/10 to-njia-purple/10 border border-njia-purple/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-300">Your Plan</h3>
                <p className="text-2xl font-bold text-njia-orange">Premium</p>
              </div>
              <FiZap className="text-yellow-500 text-2xl" />
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Renewal Date</span>
                <span className="font-medium">Jan 15, 2024</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Monthly Cost</span>
                <span className="font-bold text-green-500">Ksh 899</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Status</span>
                <span className="px-2 py-1 bg-green-500/20 text-green-500 text-xs rounded">Active</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link to="/subscription">
                <button className="w-full py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-sm">
                  Manage Plan
                </button>
              </Link>
              <Link to="/payment">
                <button className="w-full py-2 bg-njia-orange hover:bg-orange-600 rounded-lg transition-colors text-sm">
                  Upgrade
                </button>
              </Link>
            </div>
          </div>

          {/* Logo Branding Card */}
          <div className="bg-gradient-to-br from-njia-darkblue/20 to-njia-orange/20 border border-gray-800 rounded-xl p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-20 h-20 mb-4">
                {/* Circular logo */}
                <div className="absolute inset-0 rounded-full overflow-hidden bg-gray-900 flex items-center justify-center p-2">
                  <img 
                    src={logoUrl}
                    alt="NJIA SAFE Logo" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'flex flex-col items-center justify-center h-full w-full';
                      fallback.innerHTML = `
                        <div class="text-2xl font-bold">
                          <span class="text-njia-darkblue">NJIA</span>
                          <span class="text-njia-orange"> SAFE</span>
                        </div>
                      `;
                      e.target.parentNode.appendChild(fallback);
                    }}
                  />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-2">
                <span className="text-njia-darkblue">NJIA</span>
                <span className="text-njia-orange"> SAFE</span>
              </h2>
              <p className="text-gray-400 text-sm mb-2">
                Secure Navigation & Community Platform
              </p>
              {/* New Slogan */}
              <div className="flex items-center justify-center space-x-1 mt-1">
                <FiGlobe className="text-njia-orange w-3 h-3" />
                <p className="text-njia-darkblue font-semibold text-xs">
                  Smart Navigation Built for Africa
                </p>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-njia-darkblue"></div>
                <div className="w-3 h-3 rounded-full bg-njia-purple"></div>
                <div className="w-3 h-3 rounded-full bg-njia-orange"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 bg-gradient-to-r from-njia-darkblue to-njia-orange rounded-xl p-6"
      >
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-900 flex items-center justify-center">
              <img 
                src={logoUrl}
                alt="NJIA SAFE Logo" 
                className="w-10 h-10 object-contain"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold">Complete Your Safety Profile</h3>
              <p className="text-gray-300">Update payment methods and insurance details for full protection</p>
              <div className="flex items-center space-x-1 mt-1">
                <FiGlobe className="text-yellow-300 w-3 h-3" />
                <p className="text-yellow-100 text-sm font-medium">
                  Smart Navigation Built for Africa
                </p>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <Link to="/payment">
              <AnimatedButton variant="secondary">
                <FiDollarSign className="mr-2" />
                Update Payment
              </AnimatedButton>
            </Link>
            <Link to="/government-insurance">
              <AnimatedButton>
                <FiShield className="mr-2" />
                Check Insurance
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
