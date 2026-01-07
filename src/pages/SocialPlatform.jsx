import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMessageSquare, FiUsers, FiBell, FiHeart, FiShare2, FiCamera, FiVideo, FiMapPin, FiTrendingUp, FiStar, FiSend } from 'react-icons/fi';
import AnimatedButton from '../components/AnimatedButton';

const SocialPlatform = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [newPost, setNewPost] = useState('');

  const socialFeed = [
    { id: 1, user: 'TravelerPro', handle: '@travel_pro', avatar: '🧳', content: 'Just discovered the most scenic safe route to Ngong Hills via NJIASAFE! The community recommendations never disappoint.', media: 'route', time: '1 hour ago', likes: 245, shares: 42, comments: 18, verified: true },
    { id: 2, user: 'EVAdventures', handle: '@ev_kenya', avatar: '⚡', content: 'Charging up at the new solar-powered station in Westlands. Loving the lounge area while waiting! #EVCommunity', media: 'charging', time: '3 hours ago', likes: 189, shares: 31, comments: 24, verified: true },
    { id: 3, user: 'SafetyFirst', handle: '@safety_patrol', avatar: '🛡️', content: 'Night patrol completed in Kilimani area. All routes clear and safe. Remember to use the buddy system for late travel!', time: '5 hours ago', likes: 312, shares: 67, comments: 35, verified: true }
  ];

  const trendingTopics = [
    { tag: '#SafeRoutesNairobi', posts: '1.2k' },
    { tag: '#EVKenya', posts: '856' },
    { tag: '#CommunityPatrol', posts: '723' },
    { tag: '#NightTravelTips', posts: '542' }
  ];

  const suggestedConnections = [
    { name: 'RouteMaster', mutual: 12, avatar: '🗺️' },
    { name: 'UrbanExplorer', mutual: 8, avatar: '🏙️' },
    { name: 'GreenTravel', mutual: 15, avatar: '🌿' },
    { name: 'TechCommuter', mutual: 6, avatar: '💻' }
  ];

  const userStats = {
    followers: '2.4k',
    following: '345',
    posts: '124',
    safetyScore: '9.6'
  };

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      console.log('New social post:', newPost);
      setNewPost('');
    }
  };

  const tabs = [
    { id: 'feed', label: 'Feed' },
    { id: 'explore', label: 'Explore' },
    { id: 'groups', label: 'Groups' },
    { id: 'events', label: 'Events' }
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Social Platform</h1>
            <p className="text-gray-400 mt-2">Connect with fellow travelers and share experiences</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <button className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"><FiBell /></button>
            <AnimatedButton><FiMessageSquare className="mr-2" />New Message</AnimatedButton>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-premium-card rounded-xl p-6">
            <div className="flex space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-njia-darkblue to-njia-purple rounded-full flex items-center justify-center">
                <span className="text-xl">👤</span>
              </div>
              <div className="flex-1">
                <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} placeholder="Share your travel experiences, safety tips, or route discoveries..." className="w-full h-32 px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange resize-none" />
                <div className="flex justify-between items-center mt-4">
                  <div className="flex space-x-3">
                    <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors"><FiCamera /></button>
                    <button className="p-2 text-gray-400 hover:text-green-500 transition-colors"><FiVideo /></button>
                    <button className="p-2 text-gray-400 hover:text-njia-orange transition-colors"><FiMapPin /></button>
                  </div>
                  <div className="flex space-x-3">
                    <select className="px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange">
                      <option>Public</option>
                      <option>Followers</option>
                      <option>Private</option>
                    </select>
                    <AnimatedButton onClick={handlePostSubmit}><FiSend className="mr-2" />Post</AnimatedButton>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-premium-card rounded-xl p-4">
            <div className="flex space-x-4">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-lg transition-colors ${activeTab === tab.id ? 'bg-njia-orange text-white' : 'hover:bg-gray-800'}`}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {socialFeed.map((post) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-premium-card rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center text-2xl">{post.avatar}</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold">{post.user}</h3>
                        {post.verified && <span className="px-2 py-1 text-xs bg-blue-500 rounded">Verified</span>}
                      </div>
                      <p className="text-gray-400">{post.handle}</p>
                      <p className="text-gray-400 text-sm">{post.time}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-white">•••</button>
                </div>

                <p className="mb-4">{post.content}</p>

                {post.media && (
                  <div className="mb-4 rounded-lg overflow-hidden bg-gray-900">
                    <div className="h-48 bg-gradient-to-br from-njia-darkblue/30 via-gray-900/50 to-njia-purple/30 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">{post.media === 'route' ? '🗺️' : '⚡'}</div>
                        <p className="text-gray-300">{post.media === 'route' ? 'Route Visualization' : 'Charging Station'}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors"><FiHeart /><span>{post.likes}</span></button>
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-500 transition-colors"><FiMessageSquare /><span>{post.comments}</span></button>
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-green-500 transition-colors"><FiShare2 /><span>{post.shares}</span></button>
                  </div>
                  <button className="text-gray-400 hover:text-njia-orange transition-colors">Save</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-premium-card rounded-xl p-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-njia-darkblue to-njia-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👤</span>
              </div>
              <h3 className="text-xl font-bold">You</h3>
              <p className="text-gray-400">@premium_member</p>
              <div className="flex justify-center space-x-2 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (<FiStar key={star} className="text-yellow-500 fill-yellow-500" />))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              {Object.entries(userStats).map(([key, value]) => (
                <div key={key} className="text-center p-3 rounded-lg bg-gray-900/50">
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="text-sm text-gray-400 capitalize">{key}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-800">
              <AnimatedButton fullWidth>Edit Profile</AnimatedButton>
            </div>
          </div>

          <div className="bg-premium-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-300">Trending</h3>
              <FiTrendingUp className="text-njia-orange" />
            </div>
            <div className="space-y-4">
              {trendingTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50 hover:bg-gray-900 cursor-pointer transition-colors">
                  <div>
                    <p className="font-medium">{topic.tag}</p>
                    <p className="text-sm text-gray-400">{topic.posts} posts</p>
                  </div>
                  <button className="px-3 py-1 text-xs bg-njia-darkblue rounded hover:opacity-90 transition-opacity">Follow</button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-premium-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-300">Suggested Connections</h3>
            <div className="space-y-4">
              {suggestedConnections.map((connection, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-xl">{connection.avatar}</div>
                    <div>
                      <p className="font-medium">{connection.name}</p>
                      <p className="text-xs text-gray-400">{connection.mutual} mutual connections</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 text-xs bg-njia-orange rounded hover:opacity-90 transition-opacity">Connect</button>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-800">
              <button className="w-full text-center text-njia-orange hover:underline">View all suggestions</button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-njia-darkblue to-njia-purple rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Your Groups</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/10">
                <div className="flex items-center space-x-3"><FiUsers className="text-xl" /><div><p className="font-medium">Night Travelers</p><p className="text-sm opacity-90">842 members</p></div></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/10">
                <div className="flex items-center space-x-3"><FiMessageSquare className="text-xl" /><div><p className="font-medium">EV Enthusiasts</p><p className="text-sm opacity-90">1.2k members</p></div></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/10">
                <div className="flex items-center space-x-3"><FiMapPin className="text-xl" /><div><p className="font-medium">Route Explorers</p><p className="text-sm opacity-90">568 members</p></div></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="mt-6">
              <AnimatedButton fullWidth variant="secondary">Explore More Groups</AnimatedButton>
            </div>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 bg-premium-card rounded-xl p-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Live Community Events</h3>
            <p className="text-gray-300">Join live discussions, safety workshops, and group patrols</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <AnimatedButton variant="outline">View Calendar</AnimatedButton>
            <AnimatedButton>Create Event</AnimatedButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default SocialPlatform;
