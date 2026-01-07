import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMap, FiNavigation, FiClock, FiShield, FiFilter, FiStar, FiAlertCircle, FiTrendingUp, FiUsers } from 'react-icons/fi';
import TravelModeSelector from '../components/TravelModeSelector';
import AnimatedButton from '../components/AnimatedButton';

const Routes = () => {
  const [travelMode, setTravelMode] = useState('drive');
  const [selectedRoute, setSelectedRoute] = useState(null);

  const routes = [
    { id: 1, name: 'City Center Express', duration: '15 min', safety: 9.8, distance: '8.2 km', traffic: 'Low', alerts: 0, premium: true },
    { id: 2, name: 'Scenic Safe Route', duration: '20 min', safety: 9.9, distance: '9.5 km', traffic: 'Very Low', alerts: 1, premium: true },
    { id: 3, name: 'Quickest Path', duration: '12 min', safety: 8.5, distance: '7.8 km', traffic: 'Medium', alerts: 2, premium: false },
    { id: 4, name: 'Community Recommended', duration: '18 min', safety: 9.7, distance: '9.0 km', traffic: 'Low', alerts: 0, premium: false }
  ];

  const safetyZones = [
    { name: 'Westlands', safety: 9.9, incidents: 0 },
    { name: 'Kilimani', safety: 9.7, incidents: 1 },
    { name: 'Karen', safety: 9.8, incidents: 0 },
    { name: 'CBD', safety: 9.2, incidents: 3 },
    { name: 'Thika Road', safety: 9.0, incidents: 2 }
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Safe Routes</h1>
        <p className="text-gray-400 mt-2">Find the safest and most efficient paths to your destination</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-premium-card rounded-xl p-6">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm text-gray-400 mb-2">From</label>
                <input type="text" placeholder="Current location or address" className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange" />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-400 mb-2">To</label>
                <input type="text" placeholder="Destination address" className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange" />
              </div>
            </div>
            <TravelModeSelector mode={travelMode} setMode={setTravelMode} />
          </div>

          <div className="bg-premium-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div><h3 className="text-lg font-semibold text-gray-300">Available Routes</h3><p className="text-gray-400 text-sm">Sorted by safety score</p></div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"><FiFilter /><span>Filter</span></button>
            </div>

            <div className="space-y-4">
              {routes.map((route) => (
                <motion.div key={route.id} whileHover={{ scale: 1.01 }} onClick={() => setSelectedRoute(route)} className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedRoute?.id === route.id ? 'border-njia-orange bg-njia-orange/10' : 'border-gray-800 hover:border-gray-700'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-njia-darkblue to-njia-purple rounded-lg flex items-center justify-center"><FiMap className="w-6 h-6" /></div>
                      <div>
                        <div className="flex items-center space-x-2"><h4 className="font-bold">{route.name}</h4>{route.premium && <span className="px-2 py-1 text-xs bg-njia-orange rounded">PREMIUM</span>}</div>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="flex items-center text-sm text-gray-400"><FiClock className="mr-1" /> {route.duration}</span>
                          <span className="flex items-center text-sm text-gray-400"><FiNavigation className="mr-1" /> {route.distance}</span>
                          <span className="flex items-center text-sm text-gray-400"><FiTrendingUp className="mr-1" /> {route.traffic}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2"><FiShield className="text-njia-orange" /><span className="text-xl font-bold">{route.safety}</span><span className="text-gray-400">/10</span></div>
                      <p className="text-sm text-gray-400">Safety Score</p>
                    </div>
                  </div>
                  {route.alerts > 0 && <div className="mt-3 flex items-center space-x-2 text-yellow-500"><FiAlertCircle /><span className="text-sm">{route.alerts} alert(s) on this route</span></div>}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-premium-card rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-800"><h3 className="text-lg font-semibold text-gray-300">Route Preview</h3></div>
            <div className="h-64 relative bg-gradient-to-br from-njia-darkblue/20 via-gray-900 to-njia-purple/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-48">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <path d="M10,50 Q25,30 40,40 Q55,50 70,35 Q85,20 90,50" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" />
                    <defs><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#1a237e" /><stop offset="50%" stopColor="#ff6d00" /><stop offset="100%" stopColor="#7b1fa2" /></linearGradient></defs>
                  </svg>
                  <div className="absolute" style={{ left: '5%', top: '45%' }}><div className="w-6 h-6 bg-njia-darkblue rounded-full border-2 border-white flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-full"></div></div></div>
                  <div className="absolute" style={{ left: '85%', top: '45%' }}><div className="w-6 h-6 bg-njia-orange rounded-full border-2 border-white flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-full"></div></div></div>
                  {[1, 2, 3].map((i) => (<div key={i} className="absolute w-3 h-3 bg-green-500 rounded-full border-2 border-white" style={{ left: `${20 + i * 20}%`, top: `${35 + Math.sin(i) * 10}%` }} />))}
                  <div className="absolute" style={{ left: '60%', top: '30%' }}><div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-premium-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-300">Safety Zones</h3>
            <div className="space-y-4">
              {safetyZones.map((zone) => (
                <div key={zone.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${zone.safety >= 9.5 ? 'bg-green-500' : zone.safety >= 8.5 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                    <div><p className="font-medium">{zone.name}</p><p className="text-sm text-gray-400">{zone.incidents} incidents (24h)</p></div>
                  </div>
                  <div className="text-right"><p className="font-bold text-njia-orange">{zone.safety}</p><p className="text-xs text-gray-400">Safety Score</p></div>
                </div>
              ))}
            </div>
          </div>

          {selectedRoute && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-njia-darkblue to-njia-purple rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Route Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between"><span>Route Name</span><span className="font-bold">{selectedRoute.name}</span></div>
                <div className="flex justify-between"><span>Estimated Time</span><span className="font-bold">{selectedRoute.duration}</span></div>
                <div className="flex justify-between"><span>Distance</span><span className="font-bold">{selectedRoute.distance}</span></div>
                <div className="flex justify-between"><span>Traffic Level</span><span className="font-bold">{selectedRoute.traffic}</span></div>
                <div className="flex justify-between"><span>Safety Score</span><span className="font-bold">{selectedRoute.safety}/10</span></div>
                <div className="flex justify-between"><span>Active Alerts</span><span className="font-bold">{selectedRoute.alerts}</span></div>
              </div>
              <AnimatedButton fullWidth className="mt-6">Start Navigation</AnimatedButton>
            </motion.div>
          )}

          <div className="bg-premium-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Safety Tips</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-900/50"><FiUsers className="text-njia-orange mt-1" /><div><p className="font-medium">Travel in Groups</p><p className="text-sm text-gray-400">Join community patrols during off-hours</p></div></div>
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-900/50"><FiAlertCircle className="text-njia-orange mt-1" /><div><p className="font-medium">Stay Alert</p><p className="text-sm text-gray-400">Report suspicious activities immediately</p></div></div>
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-900/50"><FiStar className="text-njia-orange mt-1" /><div><p className="font-medium">Use Recommended Routes</p><p className="text-sm text-gray-400">Stick to community-verified paths</p></div></div>
            </div>
          </div>

          <div className="bg-premium-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Community Rating</h3>
            <div className="text-center">
              <div className="text-5xl font-bold text-njia-orange mb-2">4.8</div>
              <div className="flex justify-center mb-2">{[1, 2, 3, 4, 5].map((star) => (<FiStar key={star} className="text-yellow-500 fill-yellow-500" />))}</div>
              <p className="text-gray-400">Based on 1,247 user reviews</p>
              <p className="text-sm text-gray-500 mt-2">98% feel safer using NJIASAFE routes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Routes;
