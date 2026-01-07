import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiWifi, FiMessageSquare, FiAlertTriangle, FiUsers, FiShield, FiBell } from 'react-icons/fi';
import AnimatedButton from '../components/AnimatedButton';

const SmartAppV2V = ({ subscription }) => {
  const [isConnected, setIsConnected] = useState(true);
  const [messages, setMessages] = useState([
    { id: 1, user: 'Driver_254', message: 'Accident ahead on Thika Road', time: '2 min ago', priority: 'high' },
    { id: 2, user: 'Safety_Patrol', message: 'Road clear on Mombasa Road', time: '5 min ago', priority: 'medium' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() && subscription === 'premium') {
      const newMsg = {
        id: messages.length + 1,
        user: 'You',
        message: newMessage,
        time: 'Just now',
        priority: 'medium'
      };
      setMessages([newMsg, ...messages]);
      setNewMessage('');
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Vehicle-to-Vehicle (V2V) Network</h1>
            <p className="text-gray-400 mt-2">Real-time communication between vehicles for enhanced safety</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${isConnected ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
            </div>
            <button onClick={() => setIsConnected(!isConnected)} className="px-4 py-2 bg-njia-darkblue rounded-lg hover:opacity-90 transition-opacity">
              {isConnected ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-premium-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-300">Emergency Alert System</h3>
                <p className="text-gray-400 text-sm">Broadcast alerts to nearby vehicles</p>
              </div>
              <FiAlertTriangle className="text-njia-orange text-2xl" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              {['normal', 'warning', 'emergency'].map((level) => (
                <button key={level} className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-800 hover:border-gray-700 transition-all">
                  <div className={`p-3 rounded-full ${level === 'emergency' ? 'bg-red-500' : level === 'warning' ? 'bg-yellow-500' : 'bg-green-500'} mb-3`}>
                    {level === 'emergency' ? <FiAlertTriangle /> : level === 'warning' ? <FiBell /> : <FiWifi />}
                  </div>
                  <span className="font-semibold capitalize">{level}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-premium-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-300">Live Message Board</h3>
                <p className="text-gray-400 text-sm">Communicate with nearby vehicles</p>
              </div>
              <div className="flex items-center space-x-2">
                <FiWifi className="text-njia-purple" />
                <span className="text-sm">Range: {subscription === 'premium' ? '5km' : '2km'}</span>
              </div>
            </div>

            <div className="h-96 overflow-y-auto mb-4 space-y-3 pr-2">
              {messages.map((msg) => (
                <motion.div key={msg.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className={`p-4 rounded-lg border-l-4 ${msg.priority === 'high' ? 'border-red-500 bg-red-500/10' : msg.priority === 'medium' ? 'border-yellow-500 bg-yellow-500/10' : 'border-green-500 bg-green-500/10'}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-njia-darkblue to-njia-purple rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">{msg.user.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{msg.user}</h4>
                        <p className="text-gray-300">{msg.message}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{msg.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex space-x-3">
              <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder={subscription === 'premium' ? "Type your message..." : "Upgrade to Premium to send messages"} className="flex-1 px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange" disabled={subscription !== 'premium'} />
              <AnimatedButton onClick={handleSendMessage} disabled={subscription !== 'premium'}>
                <FiMessageSquare className="mr-2" />
                {subscription === 'premium' ? 'Send' : 'Premium Only'}
              </AnimatedButton>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-premium-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-300">Nearby Vehicles</h3>
                <p className="text-gray-400 text-sm">Connected in your network</p>
              </div>
              <FiUsers className="text-njia-orange" />
            </div>

            <div className="space-y-4">
              {[
                { id: 1, name: 'Toyota 4x4', distance: '0.2km', status: 'safe' },
                { id: 2, name: 'Motorcycle', distance: '0.5km', status: 'warning' },
                { id: 3, name: 'EV Taxi', distance: '0.8km', status: 'safe' },
              ].map((vehicle) => (
                <div key={vehicle.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${vehicle.status === 'safe' ? 'bg-green-500' : vehicle.status === 'warning' ? 'bg-yellow-500' : 'bg-gray-500'}`} />
                    <div>
                      <p className="font-medium">{vehicle.name}</p>
                      <p className="text-sm text-gray-400">{vehicle.distance} away</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 text-xs bg-njia-darkblue rounded hover:opacity-90 transition-opacity">Connect</button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-njia-darkblue to-njia-purple rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">V2V Features</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <FiShield className="text-green-500" />
                <span>Encrypted Communication</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiWifi className="text-blue-500" />
                <span>Real-time Data Sharing</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiBell className="text-njia-orange" />
                <span>Emergency Alerts</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/20">
              <p className="text-sm text-center">Real-time protection for your journey</p>
            </div>
          </div>
        </div>
      </div>

      {subscription === 'free' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 bg-gradient-to-r from-yellow-900/50 via-yellow-800/30 to-yellow-900/50 border border-yellow-800 rounded-xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                <FiMessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Upgrade to Premium V2V</h3>
                <p className="text-gray-300">Unlock full V2V communication, extended range, and priority alerts</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <AnimatedButton variant="secondary" onClick={() => window.location.href = '/subscription'}>
                Upgrade Now
              </AnimatedButton>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
export default SmartAppV2V;
