import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiMap, FiBatteryCharging, FiUsers, FiMessageSquare, FiShield, FiSettings, FiHelpCircle, FiZap, FiNavigation } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Dashboard', icon: <FiHome />, path: '/' },
    { name: 'Smart Map', icon: <FiMap />, path: '/smart-map' },
    { name: 'EV Charging', icon: <FiBatteryCharging />, path: '/ev-charging' },
    { name: 'Community', icon: <FiUsers />, path: '/community' },
    { name: 'Social', icon: <FiMessageSquare />, path: '/social' },
    { name: 'Insurance', icon: <FiShield />, path: '/government-insurance' },
    { name: 'V2V', icon: <FiZap />, path: '/v2v' },
    { name: 'Settings', icon: <FiSettings />, path: '/settings' },
  ];

  return (
    <footer className="bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 mt-8">
      <div className="container mx-auto px-4 py-6">
        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
          {footerLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-800/50 transition-colors group"
            >
              <div className="text-gray-400 group-hover:text-blue-400 transition-colors mb-1">
                {link.icon}
              </div>
              <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
                {link.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-6"></div>

        {/* Copyright and Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-700">
                <img 
                  src="https://media.licdn.com/dms/image/v2/D4D22AQG0Atyt2w2ZFQ/feedshare-shrink_800/B4DZsegFI0K8Ag-/0/1765743287150?e=1769644800&v=beta&t=V7uxIxe8F4wdKGtZV1dK5Es4vQeMVFohcxtotEeb-Yw" 
                  alt="NJIA SAFE Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  <span className="text-blue-400">NJIA</span>{' '}
                  <span className="text-orange-400">SAFE</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Smart Navigation Built for Africa
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Your trusted partner for safe and smart journeys across East Africa
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Developed by Brian Nyarienya
            </p>
          </div>

          <div className="text-sm text-gray-400">
            <p>© {currentYear} NJIA SAFE. All rights reserved.</p>
            <div className="flex space-x-4 mt-2">
              <Link to="/privacy" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="hover:text-blue-400 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-6 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-gray-300">System Status: All Systems Operational</span>
            </div>
            <div className="text-xs text-gray-500">
              Smart Navigation Built for Africa • Developed by Brian Nyarienya
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
