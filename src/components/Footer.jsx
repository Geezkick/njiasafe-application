import React from 'react';
import { Link } from 'react-router-dom';
import { FiNavigation, FiShield, FiClock, FiHelpCircle } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-premium-card border-t border-gray-800 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-njia-darkblue to-njia-purple rounded-lg flex items-center justify-center"><span className="font-bold text-white">N</span></div>
              <h2 className="text-xl font-bold"><span className="text-njia-darkblue">NJIA</span><span className="text-njia-orange">SAFE</span></h2>
            </div>
            <p className="text-gray-400 text-sm">Premium safe routes and community protection platform. Making every journey secure and efficient.</p>
            <p className="text-gray-500 text-xs mt-4">Developed by Brian Nyarienya</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-njia-orange">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/routes" className="text-gray-400 hover:text-njia-orange transition-colors">Safe Routes</Link></li>
              <li><Link to="/ev-charging" className="text-gray-400 hover:text-njia-orange transition-colors">EV Charging</Link></li>
              <li><Link to="/community" className="text-gray-400 hover:text-njia-orange transition-colors">Community</Link></li>
              <li><Link to="/v2v" className="text-gray-400 hover:text-njia-orange transition-colors">V2V Network</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-njia-orange">Features</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-400"><FiNavigation className="text-njia-purple" /><span>Real-time Navigation</span></li>
              <li className="flex items-center space-x-2 text-gray-400"><FiShield className="text-njia-purple" /><span>Safety Alerts</span></li>
              <li className="flex items-center space-x-2 text-gray-400"><FiClock className="text-njia-purple" /><span>ETAs & Live Updates</span></li>
              <li className="flex items-center space-x-2 text-gray-400"><FiHelpCircle className="text-njia-purple" /><span>24/7 Support</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-njia-orange">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe to receive safety alerts and updates</p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="flex-1 px-4 py-2 bg-gray-900 border border-gray-800 rounded-l-lg focus:outline-none focus:border-njia-orange" />
              <button className="px-4 py-2 bg-gradient-to-r from-njia-darkblue to-njia-purple rounded-r-lg hover:opacity-90 transition-opacity">Subscribe</button>
            </div>
            <div className="mt-6 flex space-x-4">
              <button className="text-gray-400 hover:text-njia-orange transition-colors">Terms</button>
              <button className="text-gray-400 hover:text-njia-orange transition-colors">Privacy</button>
              <button className="text-gray-400 hover:text-njia-orange transition-colors">Contact</button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} NJIASAFE Premium. All rights reserved. <span className="text-njia-orange ml-2">Making Travel Safe Again</span></p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
