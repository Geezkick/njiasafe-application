import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-premium-dark via-gray-900 to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-njia-darkblue via-njia-purple to-njia-orange rounded-2xl flex items-center justify-center mx-auto animate-pulse-glow">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-24 h-24 border-4 border-white/20 border-t-white rounded-full">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-2xl font-bold"><span className="text-white">NJIA</span><span className="text-njia-orange">SAFE</span></span>
              </div>
            </motion.div>
          </div>
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -top-2 -right-2 w-8 h-8 bg-njia-orange rounded-full" />
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="absolute -bottom-2 -left-2 w-8 h-8 bg-njia-purple rounded-full" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-2xl font-bold mb-4"><span className="text-njia-darkblue">NJIA</span><span className="text-njia-orange">SAFE</span><span className="text-white"> Premium</span></h2>
          <p className="text-gray-400 mb-6">Loading premium experience...</p>
        </motion.div>

        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto">
          <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2, ease: "easeInOut" }} className="h-full bg-gradient-to-r from-njia-darkblue via-njia-purple to-njia-orange" />
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-gray-500 text-sm mt-8">Developed by Brian Nyarienya</motion.p>
      </div>
    </div>
  );
};
export default LoadingScreen;
