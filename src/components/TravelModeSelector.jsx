import React from 'react';
import { motion } from 'framer-motion';
import { FiCar, FiUser, FiBicycle, FiNavigation } from 'react-icons/fi';

const TravelModeSelector = ({ mode, setMode }) => {
  const modes = [
    { id: 'drive', label: 'Drive', icon: <FiCar />, color: 'from-njia-darkblue to-blue-600' },
    { id: 'walk', label: 'Walk', icon: <FiUser />, color: 'from-njia-orange to-orange-500' },
    { id: 'cycle', label: 'Cycle', icon: <FiBicycle />, color: 'from-njia-purple to-purple-500' },
    { id: 'transit', label: 'Transit', icon: <FiNavigation />, color: 'from-green-500 to-emerald-500' }
  ];

  return (
    <div className="bg-premium-card rounded-xl p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-300">Travel Mode</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {modes.map((item) => (
          <motion.button key={item.id} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} onClick={() => setMode(item.id)} className={`relative p-4 rounded-lg transition-all ${mode === item.id ? `bg-gradient-to-br ${item.color} shadow-lg` : 'bg-gray-900 hover:bg-gray-800'}`}>
            {mode === item.id && <motion.div layoutId="activeMode" className="absolute inset-0 border-2 border-white/20 rounded-lg" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
            <div className="relative z-10 flex flex-col items-center">
              <div className={`text-2xl mb-2 ${mode === item.id ? 'text-white' : 'text-gray-400'}`}>{item.icon}</div>
              <span className={`text-sm font-medium ${mode === item.id ? 'text-white' : 'text-gray-300'}`}>{item.label}</span>
            </div>
            {mode === item.id && <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse" />}
          </motion.button>
        ))}
      </div>
      
      {mode && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3 bg-gray-900/50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Estimated Time:</span>
            <span className="text-xl font-bold text-njia-orange">{mode === 'drive' ? '15 min' : mode === 'walk' ? '45 min' : mode === 'cycle' ? '25 min' : '30 min'}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-400">Safety Score:</span>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (<div key={star} className={`w-2 h-2 rounded-full mx-1 ${star <= (mode === 'walk' ? 5 : mode === 'cycle' ? 4 : 3) ? 'bg-green-500' : 'bg-gray-700'}`} />))}
              <span className="ml-2 text-sm text-gray-300">{mode === 'walk' ? 'Very Safe' : mode === 'cycle' ? 'Safe' : 'Moderate'}</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
export default TravelModeSelector;
