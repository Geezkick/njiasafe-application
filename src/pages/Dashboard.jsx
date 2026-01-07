import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiNavigation, FiMap, FiUsers, FiBatteryCharging, FiTrendingUp, FiShield, FiClock, FiAlertCircle } from 'react-icons/fi';
import TravelModeSelector from '../components/TravelModeSelector';
import AnimatedButton from '../components/AnimatedButton';

const Dashboard = () => {
  const [travelMode, setTravelMode] = useState('drive');
  const stats = [
    { icon: <FiNavigation />, label: 'Active Routes', value: '24', change: '+12%', color: 'text-blue-500' },
    { icon: <FiShield />, label: 'Safety Score', value: '9.8/10', change: '+0.2', color: 'text-green-500' },
    { icon: <FiUsers />, label: 'Community Online', value: '1.2k', change: '+5%', color: 'text-purple-500' },
    { icon: <FiBatteryCharging />, label: 'EV Stations', value: '48', change: '+3', color: 'text-orange-500' }
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, <span className="text-njia-orange">Premium User</span></h1>
        <p className="text-gray-400 mt-2">Your safety dashboard is optimized for today's journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-premium-card rounded-xl p-6 border border-gray-800 hover:border-njia-orange/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg bg-gray-900 ${stat.color}`}>{stat.icon}</div>
              <span className="text-sm text-gray-400">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold mt-4">{stat.value}</h3>
            <p className="text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <TravelModeSelector mode={travelMode} setMode={setTravelMode} />
          <div className="bg-premium-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Quick Actions</h3>
            <div className="space-y-3">
              <AnimatedButton fullWidth variant="primary"><FiMap className="mr-2" />Plan New Route</AnimatedButton>
              <AnimatedButton fullWidth variant="secondary"><FiUsers className="mr-2" />Join Community Patrol</AnimatedButton>
              <AnimatedButton fullWidth variant="outline"><FiBatteryCharging className="mr-2" />Find EV Station</AnimatedButton>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-premium-card rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div><h3 className="text-lg font-semibold text-gray-300">Live Route Preview</h3><p className="text-gray-400 text-sm">Real-time optimized path</p></div>
            </div>
            <div className="relative h-64 bg-gradient-to-br from-njia-darkblue/20 via-gray-900 to-njia-purple/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-njia-darkblue via-njia-orange to-njia-purple transform -translate-y-1/2"></div>
                  <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
                    <div className="w-8 h-8 bg-njia-darkblue rounded-full flex items-center justify-center animate-pulse"><FiNavigation className="text-white" /></div>
                  </div>
                  <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                    <div className="w-8 h-8 bg-njia-orange rounded-full flex items-center justify-center animate-pulse"><FiMap className="text-white" /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8 bg-gradient-to-r from-njia-darkblue via-njia-purple to-njia-darkblue rounded-xl p-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div><h3 className="text-2xl font-bold">Premium Experience Activated</h3><p className="text-gray-300 mt-2">Access all premium features including real-time alerts, priority support, and advanced routing</p></div>
          <div className="mt-4 md:mt-0"><AnimatedButton variant="secondary" size="large">Explore Premium Features</AnimatedButton></div>
        </div>
      </motion.div>
    </div>
  );
};
export default Dashboard;
