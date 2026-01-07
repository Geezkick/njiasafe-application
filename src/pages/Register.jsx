import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiPhone, FiMapPin } from 'react-icons/fi';
import AnimatedButton from '../components/AnimatedButton';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', location: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('njiasafe_token', 'demo_token');
    localStorage.setItem('njiasafe_subscription', 'free');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-njia-darkblue to-njia-purple rounded-2xl p-8">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><span className="text-xl font-bold text-white">N</span></div>
                <h1 className="text-3xl font-bold text-white"><span>NJIA</span><span className="text-njia-orange">SAFE</span></h1>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Join the Premium Safety Network</h2>
              <p className="text-gray-300">Experience the future of safe travel with our exclusive features</p>
            </div>
          </div>

          <div className="bg-premium-card rounded-2xl p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold">Create Premium Account</h2>
              <p className="text-gray-400 mt-2">Start your free trial today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Full Name *</label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange" placeholder="John Doe" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email Address *</label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange" placeholder="you@example.com" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                  <div className="relative">
                    <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange" placeholder="254 712 345 678" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Location</label>
                  <div className="relative">
                    <FiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange" placeholder="City, Country" />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-2">Create Password *</label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange" placeholder="••••••••" required />
                  </div>
                </div>
              </div>

              <AnimatedButton type="submit" fullWidth size="large">Create Account</AnimatedButton>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-800">
              <div className="text-center">
                <p className="text-sm text-gray-400">By creating an account, you agree to our premium terms</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">© {new Date().getFullYear()} NJIASAFE Premium. All rights reserved.<br /><span className="text-njia-orange">Developed by Brian Nyarienya</span></p>
      </motion.div>
    </div>
  );
};
export default Register;
