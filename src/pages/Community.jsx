import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiMessageSquare, FiMapPin, FiBell, FiShield, FiStar, FiTrendingUp, FiHeart, FiSend, FiAlertCircle } from 'react-icons/fi';
import AnimatedButton from '../components/AnimatedButton';

const Community = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [newPost, setNewPost] = useState('');

  const communityStats = [
    { label: 'Active Members', value: '12,458', change: '+5%' },
    { label: 'Patrols Today', value: '347', change: '+12%' },
    { label: 'Safety Reports', value: '1,243', change: '+8%' },
    { label: 'Response Time', value: '2.3min', change: '-15%' }
  ];

  const communityPosts = [
    { id: 1, user: 'SafetyPatrol_254', avatar: '🛡️', content: 'Just completed a safety patrol in Westlands area. All routes are clear and safe for night travel.', time: '2 hours ago', likes: 124, comments: 23, verified: true },
    { id: 2, user: 'EV_Enthusiast', avatar: '⚡', content: 'New fast charging station opened at Green Mall. 8 slots available with lounge access.', time: '4 hours ago', likes: 89, comments: 15, verified: true },
    { id: 3, user: 'RoadWatch_Nairobi', avatar: '👁️', content: 'Heavy traffic reported on Mombasa Road due to ongoing construction. Consider alternative routes.', time: '6 hours ago', likes: 156, comments: 42, verified: true }
  ];

  const activePatrols = [
    { id: 1, area: 'Westlands', members: 12, status: 'active' },
    { id: 2, area: 'Kilimani', members: 8, status: 'active' },
    { id: 3, area: 'CBD', members: 15, status: 'full' },
    { id: 4, area: 'Karen', members: 6, status: 'active' }
  ];

  const safetyTips = [
    { tip: 'Always share your route with trusted contacts', icon: '👥' },
    { tip: 'Use well-lit routes during night travel', icon: '💡' },
    { tip: 'Keep emergency contacts easily accessible', icon: '📱' },
    { tip: 'Report suspicious activities immediately', icon: '🚨' }
  ];

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      console.log('New post:', newPost);
      setNewPost('');
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Community</h1>
            <p className="text-gray-400 mt-2">Connect, share, and stay safe together</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <AnimatedButton variant="secondary"><FiBell className="mr-2" />Create Alert</AnimatedButton>
            <AnimatedButton><FiUsers className="mr-2" />Start Patrol</AnimatedButton>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {communityStats.map((stat, index) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-premium-card rounded-xl p-4">
            <div className="flex justify-between items-start">
              <div><p className="text-2xl font-bold">{stat.value}</p><p className="text-sm text-gray-400">{stat.label}</p></div>
              <span className={`text-xs px-2 py-1 rounded ${stat.change.startsWith('+') ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-premium-card rounded-xl p-4">
            <div className="flex space-x-4">
              {['feed', 'patrols', 'alerts', 'events'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg transition-colors capitalize ${activeTab === tab ? 'bg-njia-orange text-white' : 'hover:bg-gray-800'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-premium-card rounded-xl p-6">
            <div className="flex space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-njia-darkblue to-njia-purple rounded-full flex items-center justify-center">
                <span className="text-xl">👤</span>
              </div>
              <div className="flex-1">
                <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} placeholder="Share safety updates, route information, or community alerts..." className="w-full h-32 px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange resize-none" />
                <div className="flex justify-between items-center mt-3">
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-white transition-colors"><FiMapPin /></button>
                    <button className="p-2 text-gray-400 hover:text-white transition-colors"><FiAlertCircle /></button>
                    <button className="p-2 text-gray-400 hover:text-white transition-colors"><FiShield /></button>
                  </div>
                  <AnimatedButton onClick={handlePostSubmit}><FiSend className="mr-2" />Post</AnimatedButton>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {communityPosts.map((post) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-premium-card rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-2xl">{post.avatar}</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold">{post.user}</h3>
                        {post.verified && <span className="px-2 py-1 text-xs bg-blue-500 rounded">Verified</span>}
                      </div>
                      <p className="text-gray-400 text-sm">{post.time}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-white">•••</button>
                </div>

                <p className="mb-4">{post.content}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors"><FiHeart /><span>{post.likes}</span></button>
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-njia-orange transition-colors"><FiMessageSquare /><span>{post.comments}</span></button>
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-green-500 transition-colors"><FiShield /><span>Report</span></button>
                  </div>
                  <button className="text-gray-400 hover:text-white">Share</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-premium-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-300">Active Patrols</h3>
              <FiShield className="text-njia-orange" />
            </div>
            <div className="space-y-4">
              {activePatrols.map((patrol) => (
                <div key={patrol.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${patrol.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                    <div><p className="font-medium">{patrol.area}</p><p className="text-sm text-gray-400">{patrol.members} members</p></div>
                  </div>
                  <button className="px-3 py-1 text-xs bg-njia-darkblue rounded hover:opacity-90 transition-opacity">Join</button>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-800">
              <AnimatedButton fullWidth>Start New Patrol</AnimatedButton>
            </div>
          </div>

          <div className="bg-premium-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-300">Safety Tips</h3>
            <div className="space-y-4">
              {safetyTips.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-900/50">
                  <span className="text-2xl">{item.icon}</span>
                  <p className="text-sm">{item.tip}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-premium-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-300">Top Contributors</h3>
            <div className="space-y-4">
              {[
                { name: 'SafetyFirst', reports: 124, role: 'Patrol Leader' },
                { name: 'RouteMaster', reports: 98, role: 'Route Expert' },
                { name: 'EV_Guru', reports: 76, role: 'EV Specialist' },
                { name: 'NightWatch', reports: 65, role: 'Night Patrol' }
              ].map((contributor, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-njia-darkblue to-njia-purple rounded-full flex items-center justify-center">
                      <span className="font-bold">{contributor.name.charAt(0)}</span>
                    </div>
                    <div><p className="font-medium">{contributor.name}</p><p className="text-xs text-gray-400">{contributor.role}</p></div>
                  </div>
                  <div className="text-right"><p className="font-bold text-njia-orange">{contributor.reports}</p><p className="text-xs text-gray-400">reports</p></div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-njia-darkblue to-njia-purple rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Community Guidelines</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2"><FiCheckCircle className="mt-1 flex-shrink-0" /><span>Share accurate and verified information</span></li>
              <li className="flex items-start space-x-2"><FiCheckCircle className="mt-1 flex-shrink-0" /><span>Respect all community members</span></li>
              <li className="flex items-start space-x-2"><FiCheckCircle className="mt-1 flex-shrink-0" /><span>Report emergencies immediately</span></li>
              <li className="flex items-start space-x-2"><FiCheckCircle className="mt-1 flex-shrink-0" /><span>Help maintain safe routes for all</span></li>
            </ul>
            <p className="text-sm text-center mt-4 opacity-90">Together, we make travel safer</p>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 bg-gradient-to-r from-red-900/50 via-red-800/30 to-red-900/50 border border-red-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-pulse"><FiAlertCircle className="w-6 h-6" /></div>
            <div><h3 className="text-xl font-bold">Emergency Alert System</h3><p className="text-gray-300">Send immediate alerts to community and authorities</p></div>
          </div>
          <div className="mt-4 md:mt-0">
            <AnimatedButton variant="secondary">Trigger Emergency Alert</AnimatedButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default Community;
