import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock } from 'react-icons/fi';
import AnimatedButton from '../components/AnimatedButton';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('njiasafe_token', 'demo_token');
    localStorage.setItem('njiasafe_subscription', 'premium');
    setIsAuthenticated(true);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-njia-darkblue to-njia-purple rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold text-white">N</span>
            </div>
            <h1 className="text-3xl font-bold"><span className="text-njia-darkblue">NJIA</span><span className="text-njia-orange">SAFE</span></h1>
          </div>
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-gray-400 mt-2">Sign in to your premium account</p>
        </div>

        <div className="bg-premium-card rounded-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange" placeholder="you@example.com" required />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm text-gray-400">Password</label>
                <Link to="/forgot-password" className="text-sm text-njia-orange hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange" placeholder="••••••••" required />
              </div>
            </div>

            <AnimatedButton type="submit" fullWidth size="large">Sign In</AnimatedButton>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="text-center">
              <p className="text-gray-400">Don't have an account? <Link to="/register" className="text-njia-orange hover:underline">Sign up</Link></p>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">© {new Date().getFullYear()} NJIASAFE Premium. All rights reserved.<br /><span className="text-njia-orange">Developed by Brian Nyarienya</span></p>
      </motion.div>
    </div>
  );
};
export default Login;
