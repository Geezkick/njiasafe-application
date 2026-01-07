import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiStar, FiZap, FiShield, FiGlobe, FiUsers, FiNavigation, FiMessageSquare, FiMap, FiBatteryCharging, FiTrendingUp } from 'react-icons/fi';
import AnimatedButton from '../components/AnimatedButton';

const Subscription = ({ subscription, setSubscription }) => {
  const [selectedPlan, setSelectedPlan] = useState(subscription);
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = {
    free: {
      name: 'Free',
      price: { monthly: 'KES 0', yearly: 'KES 0' },
      features: [
        { icon: <FiCheck />, text: 'Basic route planning', available: true },
        { icon: <FiCheck />, text: 'Community access', available: true },
        { icon: <FiCheck />, text: 'Basic safety alerts', available: true },
        { icon: <FiCheck />, text: 'Limited V2V range (2km)', available: true },
        { icon: <FiStar />, text: 'Basic map layers', available: true },
        { icon: <FiStar />, text: 'Standard support', available: true },
        { icon: <FiZap />, text: 'EV station basic info', available: false },
        { icon: <FiShield />, text: 'Advanced V2V features', available: false },
        { icon: <FiGlobe />, text: 'Smart map premium layers', available: false },
        { icon: <FiUsers />, text: 'Priority community features', available: false },
        { icon: <FiTrendingUp />, text: 'Insurance discounts', available: false },
        { icon: <FiMessageSquare />, text: 'Unlimited messaging', available: false }
      ]
    },
    premium: {
      name: 'Premium',
      price: { monthly: 'KES 1,499', yearly: 'KES 14,999' },
      features: [
        { icon: <FiCheck />, text: 'Advanced route planning', available: true },
        { icon: <FiCheck />, text: 'Full community access', available: true },
        { icon: <FiCheck />, text: 'Real-time safety alerts', available: true },
        { icon: <FiCheck />, text: 'Extended V2V range (5km)', available: true },
        { icon: <FiCheck />, text: 'All map layers', available: true },
        { icon: <FiCheck />, text: 'Priority support', available: true },
        { icon: <FiCheck />, text: 'EV station premium info', available: true },
        { icon: <FiCheck />, text: 'Advanced V2V features', available: true },
        { icon: <FiCheck />, text: 'Smart map premium layers', available: true },
        { icon: <FiCheck />, text: 'Priority community features', available: true },
        { icon: <FiCheck />, text: 'Insurance discounts', available: true },
        { icon: <FiCheck />, text: 'Unlimited messaging', available: true }
      ]
    }
  };

  const featuresComparison = [
    { category: 'V2V Network', free: 'Basic (2km range)', premium: 'Advanced (5km range)' },
    { category: 'Smart Map Layers', free: '3 Basic Layers', premium: 'All 6 Layers' },
    { category: 'Real-time Alerts', free: 'Standard', premium: 'Priority' },
    { category: 'Community Features', free: 'Basic Access', premium: 'Priority Access' },
    { category: 'Data Collection', free: 'Limited', premium: 'Full Access' },
    { category: 'Insurance Benefits', free: 'None', premium: 'Up to 30% Discount' },
    { category: 'EV Charging Info', free: 'Basic', premium: 'Premium Details' },
    { category: 'Support', free: 'Standard', premium: 'Priority 24/7' }
  ];

  const handleUpgrade = () => {
    localStorage.setItem('njiasafe_subscription', selectedPlan);
    setSubscription(selectedPlan);
    alert(`Successfully upgraded to ${selectedPlan} plan!`);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Choose Your Plan</h1>
        <p className="text-gray-400 mt-2">Select the perfect plan for your safety needs</p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="bg-gray-900 rounded-lg p-1 inline-flex">
          <button onClick={() => setBillingCycle('monthly')} className={`px-6 py-2 rounded-md transition-colors ${billingCycle === 'monthly' ? 'bg-njia-orange text-white' : 'hover:bg-gray-800'}`}>
            Monthly
          </button>
          <button onClick={() => setBillingCycle('yearly')} className={`px-6 py-2 rounded-md transition-colors ${billingCycle === 'yearly' ? 'bg-njia-orange text-white' : 'hover:bg-gray-800'}`}>
            Yearly <span className="text-green-500 text-sm ml-1">Save 17%</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Free Plan */}
        <motion.div whileHover={{ y: -5 }} className={`bg-premium-card rounded-2xl p-8 border-2 ${selectedPlan === 'free' ? 'border-njia-orange' : 'border-gray-800'}`}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full mb-4">
              <FiStar className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold">Free</h2>
            <div className="mt-4">
              <span className="text-4xl font-bold">{plans.free.price[billingCycle]}</span>
              <span className="text-gray-400">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
            </div>
            <p className="text-gray-400 mt-2">Basic safety features for everyone</p>
          </div>

          <div className="space-y-4 mb-8">
            {plans.free.features.slice(0, 6).map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`p-1 rounded ${feature.available ? 'bg-green-500/20 text-green-500' : 'bg-gray-800 text-gray-500'}`}>
                  {feature.icon}
                </div>
                <span className={feature.available ? '' : 'text-gray-500'}>{feature.text}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setSelectedPlan('free')}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${selectedPlan === 'free' ? 'bg-njia-orange text-white' : 'bg-gray-800 hover:bg-gray-700'}`}
          >
            {subscription === 'free' ? 'Current Plan' : 'Select Free Plan'}
          </button>
        </motion.div>

        {/* Premium Plan */}
        <motion.div whileHover={{ y: -5 }} className={`bg-gradient-to-br from-njia-darkblue via-njia-purple to-njia-darkblue rounded-2xl p-8 border-2 ${selectedPlan === 'premium' ? 'border-yellow-500' : 'border-transparent'} relative`}>
          {subscription === 'premium' && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="px-4 py-1 bg-yellow-500 text-white rounded-full text-sm font-semibold">Current Plan</span>
            </div>
          )}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full mb-4">
              <FiStar className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Premium</h2>
            <div className="mt-4">
              <span className="text-4xl font-bold">{plans.premium.price[billingCycle]}</span>
              <span className="text-gray-300">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
            </div>
            <p className="text-gray-300 mt-2">Complete safety package with all features</p>
          </div>

          <div className="space-y-4 mb-8">
            {plans.premium.features.slice(0, 6).map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="p-1 rounded bg-green-500/20 text-green-500">
                  {feature.icon}
                </div>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setSelectedPlan('premium')}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${selectedPlan === 'premium' ? 'bg-yellow-500 text-white' : 'bg-white/20 hover:bg-white/30 text-white'}`}
          >
            {subscription === 'premium' ? 'Current Plan' : 'Select Premium Plan'}
          </button>
        </motion.div>
      </div>

      {/* Features Comparison */}
      <div className="mt-16 bg-premium-card rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Feature Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-4 font-semibold">Feature</th>
                <th className="text-center py-4 font-semibold">Free Plan</th>
                <th className="text-center py-4 font-semibold">Premium Plan</th>
              </tr>
            </thead>
            <tbody>
              {featuresComparison.map((feature, index) => (
                <tr key={index} className="border-b border-gray-800/50">
                  <td className="py-4 font-medium">{feature.category}</td>
                  <td className="text-center py-4 text-gray-400">{feature.free}</td>
                  <td className="text-center py-4 text-njia-orange font-semibold">{feature.premium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Premium Features Showcase */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">Premium Exclusive Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-premium-card rounded-xl p-6">
            <div className="p-3 bg-yellow-500/20 rounded-lg w-fit mb-4">
              <FiMessageSquare className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="text-lg font-bold mb-2">Advanced V2V Network</h3>
            <p className="text-gray-400">Extended 5km range, unlimited messaging, and priority alerts</p>
          </div>
          <div className="bg-premium-card rounded-xl p-6">
            <div className="p-3 bg-purple-500/20 rounded-lg w-fit mb-4">
              <FiMap className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-bold mb-2">Smart Map Premium</h3>
            <p className="text-gray-400">Access to all map layers including EV stations and police patrols</p>
          </div>
          <div className="bg-premium-card rounded-xl p-6">
            <div className="p-3 bg-green-500/20 rounded-lg w-fit mb-4">
              <FiShield className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-lg font-bold mb-2">Insurance Benefits</h3>
            <p className="text-gray-400">Up to 30% discount on insurance from partner companies</p>
          </div>
        </div>
      </div>

      {/* Action Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-16 bg-gradient-to-r from-njia-darkblue via-njia-purple to-njia-darkblue rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Upgrade Your Safety?</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of users who trust NJIASAFE Premium for their daily travel safety needs
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <AnimatedButton size="large" variant="secondary" onClick={handleUpgrade}>
            {selectedPlan === 'premium' && subscription !== 'premium' ? 'Upgrade to Premium' : 'Stay with Current Plan'}
          </AnimatedButton>
          <AnimatedButton size="large" variant="outline">
            Contact Sales
          </AnimatedButton>
        </div>
        <p className="text-sm text-gray-300 mt-6">30-day money-back guarantee • Cancel anytime • No hidden fees</p>
      </motion.div>
    </div>
  );
};

export default Subscription;
