import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBell, FiCheck, FiTrash2, FiSettings, FiFilter, FiArchive, FiClock, FiAlertTriangle, FiShield, FiNavigation, FiBatteryCharging, FiMapPin } from 'react-icons/fi';
import AnimatedButton from '../components/AnimatedButton';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Route Alert', message: 'Safer route available to your destination via Ngong Road', time: '5 min ago', read: false, type: 'route', priority: 'high' },
    { id: 2, title: 'EV Station Available', message: 'Fast charging station opened at Greenspan Mall', time: '1 hour ago', read: false, type: 'ev', priority: 'medium' },
    { id: 3, title: 'Safety Update', message: 'Police patrol increased in Westlands area', time: '2 hours ago', read: true, type: 'safety', priority: 'high' },
    { id: 4, title: 'Community Alert', message: 'New safety report posted in Kilimani', time: '1 day ago', read: true, type: 'community', priority: 'low' },
    { id: 5, title: 'Traffic Alert', message: 'Heavy traffic on Mombasa Road due to accident', time: '2 days ago', read: true, type: 'traffic', priority: 'high' },
    { id: 6, title: 'Weather Warning', message: 'Heavy rain expected in Nairobi this evening', time: '3 days ago', read: true, type: 'weather', priority: 'medium' },
    { id: 7, title: 'Maintenance Alert', message: 'Road maintenance on Waiyaki Way tomorrow', time: '1 week ago', read: true, type: 'maintenance', priority: 'low' },
    { id: 8, title: 'Subscription Update', message: 'Your premium subscription has been renewed', time: '1 week ago', read: true, type: 'subscription', priority: 'low' }
  ]);

  const [filter, setFilter] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState([]);

  const notificationTypes = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'route', label: 'Routes', count: notifications.filter(n => n.type === 'route').length },
    { id: 'safety', label: 'Safety', count: notifications.filter(n => n.type === 'safety').length },
    { id: 'ev', label: 'EV', count: notifications.filter(n => n.type === 'ev').length },
    { id: 'traffic', label: 'Traffic', count: notifications.filter(n => n.type === 'traffic').length }
  ];

  const getTypeIcon = (type) => {
    switch(type) {
      case 'route': return <FiNavigation className="w-4 h-4" />;
      case 'safety': return <FiShield className="w-4 h-4" />;
      case 'ev': return <FiBatteryCharging className="w-4 h-4" />;
      case 'traffic': return <FiAlertTriangle className="w-4 h-4" />;
      case 'weather': return '🌧️';
      case 'community': return <FiMapPin className="w-4 h-4" />;
      default: return <FiBell className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'route': return 'from-green-500 to-emerald-600';
      case 'safety': return 'from-blue-500 to-cyan-600';
      case 'ev': return 'from-yellow-500 to-orange-600';
      case 'traffic': return 'from-red-500 to-pink-600';
      case 'weather': return 'from-purple-500 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-500 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const deleteSelected = () => {
    setNotifications(prev => prev.filter(notif => !selectedNotifications.includes(notif.id)));
    setSelectedNotifications([]);
  };

  const toggleSelect = (id) => {
    setSelectedNotifications(prev => 
      prev.includes(id) ? prev.filter(notifId => notifId !== id) : [...prev, id]
    );
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-njia-orange to-orange-600 rounded-xl flex items-center justify-center">
                <FiBell className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Notifications</h1>
                <p className="text-gray-400 mt-2">Stay updated with alerts and safety information</p>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <AnimatedButton variant="outline" onClick={markAllAsRead}>
              <FiCheck className="mr-2" />
              Mark All Read
            </AnimatedButton>
            <AnimatedButton onClick={() => window.location.href = '/settings'}>
              <FiSettings className="mr-2" />
              Notification Settings
            </AnimatedButton>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-premium-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-300">Filters</h3>
            <div className="space-y-2">
              {notificationTypes.map((type) => (
                <button key={type.id} onClick={() => setFilter(type.id)} className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors ${filter === type.id ? 'bg-njia-darkblue text-white' : 'hover:bg-gray-800'}`}>
                  <div className="flex items-center space-x-3">
                    <FiFilter className="w-4 h-4" />
                    <span>{type.label}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded ${filter === type.id ? 'bg-white text-njia-darkblue' : 'bg-gray-700'}`}>{type.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-premium-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-300">Quick Actions</h3>
            <div className="space-y-3">
              <button onClick={markAllAsRead} className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                <FiCheck className="w-4 h-4" />
                <span>Mark All as Read</span>
              </button>
              <button onClick={deleteSelected} disabled={selectedNotifications.length === 0} className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${selectedNotifications.length > 0 ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-gray-800 opacity-50 cursor-not-allowed'}`}>
                <FiTrash2 className="w-4 h-4" />
                <span>Delete Selected ({selectedNotifications.length})</span>
              </button>
              <button onClick={() => setSelectedNotifications(notifications.map(n => n.id))} className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                <FiArchive className="w-4 h-4" />
                <span>Select All</span>
              </button>
            </div>
          </div>

          <div className="bg-premium-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-300">Notification Stats</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Unread</span>
                  <span className="text-sm font-bold">{notifications.filter(n => !n.read).length}</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-njia-darkblue to-njia-purple" style={{ width: `${(notifications.filter(n => !n.read).length / notifications.length) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">High Priority</span>
                  <span className="text-sm font-bold">{notifications.filter(n => n.priority === 'high').length}</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-500 to-pink-600" style={{ width: `${(notifications.filter(n => n.priority === 'high').length / notifications.length) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">This Week</span>
                  <span className="text-sm font-bold">12</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-premium-card rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">All Notifications</h2>
                  <p className="text-gray-400">{filteredNotifications.length} notifications found</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-400">Sorted by: </span>
                  <select className="px-3 py-1.5 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-njia-orange">
                    <option>Newest First</option>
                    <option>Priority</option>
                    <option>Unread First</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="max-h-[600px] overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiBell className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No notifications</h3>
                  <p className="text-gray-400">You're all caught up!</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-800">
                  {filteredNotifications.map((notification) => (
                    <motion.div key={notification.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className={`p-6 hover:bg-gray-900/50 transition-colors ${!notification.read ? 'bg-blue-900/10' : ''}`}>
                      <div className="flex items-start space-x-4">
                        <input type="checkbox" checked={selectedNotifications.includes(notification.id)} onChange={() => toggleSelect(notification.id)} className="mt-1" />
                        
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getTypeColor(notification.type)} flex items-center justify-center flex-shrink-0`}>
                          <span className="text-xl">{getTypeIcon(notification.type)}</span>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-bold">{notification.title}</h3>
                              <span className={`px-2 py-1 text-xs rounded ${getPriorityColor(notification.priority)}`}>
                                {notification.priority.toUpperCase()}
                              </span>
                              {!notification.read && (
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <FiClock className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-400">{notification.time}</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-300 mb-3">{notification.message}</p>
                          
                          <div className="flex items-center space-x-3">
                            {!notification.read && (
                              <button onClick={() => markAsRead(notification.id)} className="text-sm text-blue-500 hover:text-blue-400 transition-colors">
                                Mark as read
                              </button>
                            )}
                            <button onClick={() => deleteNotification(notification.id)} className="text-sm text-red-500 hover:text-red-400 transition-colors">
                              Delete
                            </button>
                            <button className="text-sm text-njia-orange hover:text-orange-400 transition-colors">
                              View details
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-800 bg-gray-900/50">
              <div className="flex items-center justify-between">
                <p className="text-gray-400">
                  {selectedNotifications.length} selected • {notifications.filter(n => !n.read).length} unread
                </p>
                <div className="flex space-x-3">
                  <AnimatedButton variant="outline" onClick={() => setSelectedNotifications([])}>
                    Clear Selection
                  </AnimatedButton>
                  <AnimatedButton variant="secondary" onClick={() => window.location.href = '/settings#notifications'}>
                    Manage Preferences
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-premium-card rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <FiBell className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{notifications.length}</p>
                  <p className="text-gray-400">Total Notifications</p>
                </div>
              </div>
            </div>
            <div className="bg-premium-card rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <FiAlertTriangle className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{notifications.filter(n => n.priority === 'high').length}</p>
                  <p className="text-gray-400">High Priority</p>
                </div>
              </div>
            </div>
            <div className="bg-premium-card rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <FiClock className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">24h</p>
                  <p className="text-gray-400">Avg Response Time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
