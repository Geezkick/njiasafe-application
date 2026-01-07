import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMap, FiNavigation, FiTarget, FiClock, FiShield, FiTrendingUp, FiAlertCircle, FiFilter, FiDownload, FiShare2 } from 'react-icons/fi';
import AnimatedButton from '../components/AnimatedButton';
import TravelModeSelector from '../components/TravelModeSelector';

const RoutesPage = () => {
  const [travelMode, setTravelMode] = useState('drive');
  const [savedRoutes, setSavedRoutes] = useState([
    { id: 1, name: 'Home to Work', distance: '12.5 km', time: '25 min', safety: '9.2/10', saved: true },
    { id: 2, name: 'CBD to Westlands', distance: '8.3 km', time: '18 min', safety: '8.7/10', saved: true },
    { id: 3, name: 'Airport Route', distance: '22.1 km', time: '35 min', safety: '8.5/10', saved: false }
  ]);

  const recentRoutes = [
    { from: 'Kilimani', to: 'CBD', time: '15 min', distance: '5.2 km', safety: '9.0/10', timeOfDay: 'Morning' },
    { from: 'Westlands', to: 'Karen', time: '28 min', distance: '14.7 km', safety: '8.8/10', timeOfDay: 'Evening' },
    { from: 'Thika Road', to: 'Mombasa Road', time: '22 min', distance: '11.3 km', safety: '8.3/10', timeOfDay: 'Afternoon' }
  ];

  const handleRouteSave = (routeId) => {
    setSavedRoutes(prev => prev.map(route => 
      route.id === routeId ? { ...route, saved: !route.saved } : route
    ));
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Smart Routes</h1>
            <p className="text-gray-400 mt-2">Find optimal routes based on safety, traffic, and efficiency</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <AnimatedButton variant="outline">
              <FiDownload className="mr-2" />
              Export
            </AnimatedButton>
            <AnimatedButton>
              <FiShare2 className="mr-2" />
              Share Route
            </AnimatedButton>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-premium-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Route Planner</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <input type="text" placeholder="Starting point" className="w-full px-12 py-4 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange" />
                <FiMap className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative">
                <input type="text" placeholder="Destination" className="w-full px-12 py-4 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange" />
                <FiTarget className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="mt-6">
              <TravelModeSelector mode={travelMode} setMode={setTravelMode} />
            </div>
            <div className="mt-6 flex justify-between">
              <AnimatedButton variant="secondary">
                <FiFilter className="mr-2" />
                Add Stops
              </AnimatedButton>
              <AnimatedButton>
                <FiNavigation className="mr-2" />
                Find Route
              </AnimatedButton>
            </div>
          </div>

          <div className="bg-premium-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-300">Route Preview</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Safety Score:</span>
                <span className="text-xl font-bold text-green-500">9.2/10</span>
              </div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-njia-darkblue to-njia-purple rounded-lg flex items-center justify-center">
                    <FiMap className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold">Kilimani to CBD</p>
                    <p className="text-sm text-gray-400">Via Ngong Road</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-njia-orange">15 min</p>
                  <p className="text-sm text-gray-400">5.2 km</p>
                </div>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-green-500 w-full"></div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center p-3 rounded-lg bg-gray-800/50">
                  <p className="text-sm text-gray-400">Traffic</p>
                  <p className="text-lg font-bold text-green-500">Light</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-gray-800/50">
                  <p className="text-sm text-gray-400">Police</p>
                  <p className="text-lg font-bold text-blue-500">3 Patrols</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-gray-800/50">
                  <p className="text-sm text-gray-400">EV Stations</p>
                  <p className="text-lg font-bold text-purple-500">2 Nearby</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <AnimatedButton variant="outline">Alternative Routes</AnimatedButton>
              <AnimatedButton>Start Navigation</AnimatedButton>
            </div>
          </div>

          <div className="bg-premium-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-300">Recent Routes</h3>
            <div className="space-y-4">
              {recentRoutes.map((route, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="flex items-center justify-between p-4 rounded-lg bg-gray-900/50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-njia-darkblue to-njia-purple rounded-lg flex items-center justify-center">
                      <FiClock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold">{route.from} → {route.to}</p>
                      <p className="text-sm text-gray-400">{route.timeOfDay}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-njia-orange">{route.time}</p>
                    <div className="flex items-center space-x-2">
                      <FiShield className="text-green-500" />
                      <span className="text-sm">{route.safety}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-premium-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-300">Saved Routes</h3>
              <FiTrendingUp className="text-njia-orange" />
            </div>
            <div className="space-y-4">
              {savedRoutes.map((route) => (
                <div key={route.id} className="p-4 rounded-lg bg-gray-900/50">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-bold">{route.name}</p>
                      <p className="text-sm text-gray-400">{route.distance} • {route.time}</p>
                    </div>
                    <button onClick={() => handleRouteSave(route.id)} className={`p-2 rounded-lg ${route.saved ? 'text-red-500 bg-red-500/10' : 'text-gray-400 hover:text-njia-orange'}`}>
                      {route.saved ? 'Saved' : 'Save'}
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <FiShield className="text-green-500" />
                      <span className="text-green-500 font-bold">{route.safety}</span>
                      <span className="text-sm text-gray-400">Safety</span>
                    </div>
                    <AnimatedButton size="small" variant="ghost">Navigate</AnimatedButton>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-800">
              <AnimatedButton fullWidth>Save Current Route</AnimatedButton>
            </div>
          </div>

          <div className="bg-premium-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-300">Route Alerts</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <div className="flex items-start space-x-3">
                  <FiAlertCircle className="text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Accident Reported</p>
                    <p className="text-sm text-gray-300">Ngong Road near Adams Arcade</p>
                    <p className="text-xs text-gray-400 mt-1">10 minutes ago</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <div className="flex items-start space-x-3">
                  <FiAlertCircle className="text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Heavy Traffic</p>
                    <p className="text-sm text-gray-300">Mombasa Road, Mlolongo section</p>
                    <p className="text-xs text-gray-400 mt-1">25 minutes ago</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <div className="flex items-start space-x-3">
                  <FiAlertCircle className="text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Road Construction</p>
                    <p className="text-sm text-gray-300">Waiyaki Way, Westlands roundabout</p>
                    <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-njia-darkblue to-njia-purple rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Smart Routing Features</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Real-time safety scoring</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>EV charging station integration</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Police patrol visibility</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Weather-aware routing</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Time-of-day optimization</span>
              </li>
            </ul>
            <p className="text-sm text-center mt-4 opacity-90">Optimized for safety and efficiency</p>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 bg-gradient-to-r from-njia-darkblue via-njia-purple to-njia-darkblue rounded-xl p-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Premium Route Optimization</h3>
            <p className="text-gray-300">Get AI-powered route suggestions, offline navigation, and advanced safety analytics</p>
          </div>
          <div className="mt-4 md:mt-0">
            <AnimatedButton variant="secondary" size="large" onClick={() => window.location.href = '/subscription'}>
              Upgrade to Premium
            </AnimatedButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RoutesPage;
