import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  const logoUrl = "https://media.licdn.com/dms/image/v2/D4D22AQG0Atyt2w2ZFQ/feedshare-shrink_800/B4DZsegFI0K8Ag-/0/1765743287150?e=1769644800&v=beta&t=V7uxIxe8F4wdKGtZV1dK5Es4vQeMVFohcxtotEeb-Yw";

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-950 to-black z-50 flex flex-col items-center justify-center p-4">
      <div className="relative max-w-md w-full">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-njia-darkblue/20 via-njia-purple/20 to-njia-orange/20 rounded-3xl blur-3xl animate-pulse"></div>
        
        {/* Main content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl"
        >
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-8">
            {/* Circular Logo Container */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="relative w-40 h-40 mb-6"
            >
              {/* Animated outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-transparent rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #1e3a8a, #8b5cf6, #f59e0b, #1e3a8a)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  padding: '4px',
                }}
              />
              
              {/* Logo Image in circle */}
              <div className="absolute inset-4 rounded-full overflow-hidden bg-gray-900 flex items-center justify-center p-2">
                <img 
                  src={logoUrl}
                  alt="NJIA SAFE Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    // Fallback to text if image fails
                    const fallback = document.createElement('div');
                    fallback.className = 'flex flex-col items-center justify-center h-full';
                    fallback.innerHTML = `
                      <div class="text-4xl font-bold">
                        <span class="text-njia-darkblue">NJIA</span>
                        <span class="text-njia-orange"> SAFE</span>
                      </div>
                    `;
                    e.target.parentNode.appendChild(fallback);
                  }}
                />
              </div>
            </motion.div>
            
            {/* App Name with gradient */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <h1 className="text-5xl font-bold mb-2">
                <span className="text-njia-darkblue">NJIA</span>
                <span className="text-njia-orange"> SAFE</span>
              </h1>
              <p className="text-gray-400 mt-2 text-sm">Secure Navigation & Community Platform</p>
              {/* New Slogan */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-njia-orange font-semibold mt-3 text-lg"
              >
                Smart Navigation Built for Africa
              </motion.p>
            </motion.div>
          </div>

          {/* Loading Indicator */}
          <div className="space-y-4">
            {/* Progress Bar */}
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-njia-darkblue to-njia-orange"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
            
            {/* Loading dots */}
            <div className="flex justify-center space-x-6">
              {['Loading', 'System', 'Maps', 'Ready'].map((label, index) => (
                <motion.div
                  key={label}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-njia-darkblue to-njia-purple rounded-full mb-2">
                    <motion.div
                      className="w-3 h-3 bg-njia-orange rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-500 text-sm">
              Loading your secure navigation experience...
            </p>
            <p className="text-gray-600 text-xs mt-2">
              Stay safe on your journey with NJIA SAFE
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Background pattern */}
      <div className="fixed inset-0 -z-10 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
};

export default LoadingScreen;
