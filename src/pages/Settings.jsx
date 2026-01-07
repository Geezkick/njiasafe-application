import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSettings, FiBell, FiShield, FiGlobe, FiCreditCard, FiUser, FiLock, FiMoon, FiWifi, FiMap, FiDownload, FiTrash2, FiCheck } from 'react-icons/fi';
import AnimatedButton from '../components/AnimatedButton';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [notifications, setNotifications] = useState({
    safetyAlerts: true,
    routeUpdates: true,
    communityPosts: true,
    evStation: false,
    marketing: false,
    emergency: true
  });

  const tabs = [
    { id: 'general', label: 'General', icon: <FiSettings /> },
    { id: 'notifications', label: 'Notifications', icon: <FiBell /> },
    { id: 'privacy', label: 'Privacy', icon: <FiShield /> },
    { id: 'language', label: 'Language', icon: <FiGlobe /> },
    { id: 'payment', label: 'Payment', icon: <FiCreditCard /> },
    { id: 'account', label: 'Account', icon: <FiUser /> }
  ];

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-400 mt-2">Manage your account preferences and security</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-premium-card rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-800"><h3 className="font-semibold">Settings Menu</h3></div>
            <div className="p-2">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors mb-1 ${activeTab === tab.id ? 'bg-gradient-to-r from-njia-darkblue/20 to-njia-purple/20 text-njia-orange' : 'hover:bg-gray-800'}`}>
                  {tab.icon}<span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-br from-njia-darkblue to-njia-purple rounded-xl p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"><FiSettings className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold mb-2">Premium Account</h3>
              <p className="text-gray-300 mb-4">Full access to all features and priority support</p>
              <div className="text-sm space-y-2">
                <div className="flex justify-between"><span>Status:</span><span className="text-green-500">Active</span></div>
                <div className="flex justify-between"><span>Plan:</span><span>Premium Plus</span></div>
                <div className="flex justify-between"><span>Renewal:</span><span>Jan 15, 2024</span></div>
              </div>
              <AnimatedButton fullWidth className="mt-6">Manage Subscription</AnimatedButton>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-premium-card rounded-xl p-6">
            {activeTab === 'general' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-bold mb-6">General Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Appearance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-gray-900/50">
                        <div className="flex items-center justify-between mb-2">
                          <span>Dark Mode</span>
                          <div className="relative"><input type="checkbox" className="sr-only" defaultChecked /><div className="w-12 h-6 bg-njia-orange rounded-full"><div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full"></div></div></div>
                        </div>
                        <p className="text-sm text-gray-400">Use dark theme</p>
                      </div>
                      <div className="p-4 rounded-lg bg-gray-900/50">
                        <div className="flex items-center justify-between mb-2">
                          <span>Reduce Motion</span>
                          <div className="relative"><input type="checkbox" className="sr-only" /><div className="w-12 h-6 bg-gray-700 rounded-full"><div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"></div></div></div>
                        </div>
                        <p className="text-sm text-gray-400">Reduce animations</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Map Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div><p className="font-medium">Default Travel Mode</p><p className="text-sm text-gray-400">Set preferred travel mode</p></div>
                        <select className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg">
                          <option>Drive</option>
                          <option>Walk</option>
                          <option>Cycle</option>
                          <option>Transit</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div><p className="font-medium">Avoid Tolls</p><p className="text-sm text-gray-400">Route around toll roads</p></div>
                        <div className="relative"><input type="checkbox" className="sr-only" defaultChecked /><div className="w-12 h-6 bg-njia-orange rounded-full"><div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full"></div></div></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div><p className="font-medium">Avoid Highways</p><p className="text-sm text-gray-400">Prefer local routes</p></div>
                        <div className="relative"><input type="checkbox" className="sr-only" /><div className="w-12 h-6 bg-gray-700 rounded-full"><div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"></div></div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-bold mb-6">Notifications</h2>
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 rounded-lg bg-gray-900/50">
                      <div>
                        <p className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                        <p className="text-sm text-gray-400">
                          {key === 'safetyAlerts' && 'Immediate safety alerts'}
                          {key === 'routeUpdates' && 'Route changes and updates'}
                          {key === 'communityPosts' && 'New community posts'}
                          {key === 'evStation' && 'EV station availability'}
                          {key === 'marketing' && 'Promotional offers'}
                          {key === 'emergency' && 'Emergency broadcasts'}
                        </p>
                      </div>
                      <div className="relative">
                        <input type="checkbox" checked={value} onChange={() => handleNotificationChange(key)} className="sr-only" />
                        <div className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${value ? 'bg-njia-orange' : 'bg-gray-700'}`} onClick={() => handleNotificationChange(key)}>
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${value ? 'translate-x-7' : 'translate-x-1'}`} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'account' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Security</h3>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-gray-900/50">
                        <div className="flex items-center justify-between">
                          <div><p className="font-medium">Two-Factor Authentication</p><p className="text-sm text-gray-400">Add extra security to your account</p></div>
                          <AnimatedButton variant="outline" size="small">Enable</AnimatedButton>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg bg-gray-900/50">
                        <div className="flex items-center justify-between">
                          <div><p className="font-medium">Change Password</p><p className="text-sm text-gray-400">Update your password regularly</p></div>
                          <AnimatedButton variant="outline" size="small">Change</AnimatedButton>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-red-900/20 border border-red-800">
                    <h3 className="font-semibold mb-2 text-red-500">Danger Zone</h3>
                    <p className="text-sm text-gray-300 mb-4">These actions are irreversible. Please proceed with caution.</p>
                    <div className="flex space-x-3">
                      <AnimatedButton variant="outline" className="border-red-500 text-red-500">Deactivate Account</AnimatedButton>
                      <AnimatedButton variant="outline" className="border-red-500 text-red-500">Delete All Data</AnimatedButton>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;
