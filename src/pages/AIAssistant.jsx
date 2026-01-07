import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMessageSquare, FiSend, FiUser, FiCpu, FiTrendingUp, FiAlertTriangle, FiMap, FiNavigation, FiBatteryCharging, FiShield, FiDownload, FiCopy, FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import AnimatedButton from '../components/AnimatedButton';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your NJIA SAFE AI Assistant. How can I help you with navigation, safety, or route planning today?", sender: 'ai', time: '10:00 AM' },
    { id: 2, text: "Show me safe routes to Westlands", sender: 'user', time: '10:01 AM' },
    { id: 3, text: "I've found 3 safe routes to Westlands. Route A has police patrols every 2km, Route B has the best lighting, and Route C has the shortest travel time. Which would you prefer?", sender: 'ai', time: '10:02 AM' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const aiFeatures = [
    { icon: '🛡️', title: 'Safety Analysis', description: 'AI-powered safety scoring for all routes' },
    { icon: '🗺️', title: 'Route Optimization', description: 'Intelligent route planning based on multiple factors' },
    { icon: '⚡', title: 'EV Planning', description: 'Smart EV charging station recommendations' },
    { icon: '👮', title: 'Patrol Prediction', description: 'Predict police patrol locations and times' },
    { icon: '🌧️', title: 'Weather Adaptation', description: 'Adjust routes based on weather conditions' },
    { icon: '🚗', title: 'Traffic Prediction', description: 'Real-time traffic analysis and avoidance' }
  ];

  const quickQuestions = [
    "Show safe routes to CBD",
    "Find EV charging stations",
    "Check traffic conditions",
    "Best route for night travel",
    "Police patrol locations",
    "Weather-affected routes"
  ];

  const aiInsights = [
    { title: 'Safety Trend', value: '+15%', description: 'Safer routes this week', color: 'from-green-500 to-emerald-600' },
    { title: 'Travel Time', value: '-12%', description: 'Reduced travel time', color: 'from-blue-500 to-cyan-600' },
    { title: 'EV Usage', value: '+28%', description: 'Increased EV adoption', color: 'from-purple-500 to-pink-600' },
    { title: 'Alert Accuracy', value: '94%', description: 'AI prediction accuracy', color: 'from-orange-500 to-red-600' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "I've analyzed your request and found optimal routes based on current conditions.",
        "Based on safety data, I recommend taking the Ngong Road route with increased police presence.",
        "Considering current traffic patterns, the Mombasa Road alternative would save you 15 minutes.",
        "I've identified 3 EV charging stations along your route that match your vehicle's specifications.",
        "Weather conditions suggest avoiding the lower Eastern bypass due to potential flooding."
      ];

      const aiMessage = {
        id: messages.length + 2,
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickQuestion = (question) => {
    setInputText(question);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <FiCpu className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">AI Assistant</h1>
                <p className="text-gray-400 mt-2">Intelligent navigation analysis and route optimization</p>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <AnimatedButton variant="outline">
              <FiDownload className="mr-2" />
              Export Chat
            </AnimatedButton>
            <AnimatedButton>
              <FiMap className="mr-2" />
              View AI Routes
            </AnimatedButton>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-premium-card rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <FiCpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">NJIA SAFE AI Assistant</h3>
                    <p className="text-sm text-gray-400">Always learning, always protecting</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-500">Online</span>
                </div>
              </div>
            </div>

            <div className="h-[500px] overflow-y-auto p-6 space-y-6">
              {messages.map((message) => (
                <motion.div key={message.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.sender === 'user' ? 'bg-gradient-to-r from-njia-darkblue to-njia-purple' : 'bg-gray-800'} rounded-2xl p-4`}>
                    <div className="flex items-start space-x-3">
                      {message.sender === 'ai' && (
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <FiCpu className="w-4 h-4" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p>{message.text}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-400">{message.time}</span>
                          {message.sender === 'ai' && (
                            <button onClick={() => copyToClipboard(message.text)} className="text-gray-400 hover:text-white transition-colors">
                              <FiCopy className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                      {message.sender === 'user' && (
                        <div className="w-8 h-8 bg-gradient-to-br from-njia-orange to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <FiUser className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 rounded-2xl p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                        <FiCpu className="w-4 h-4" />
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-800 bg-gray-900/50">
              <div className="mb-3">
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <button key={index} onClick={() => handleQuickQuestion(question)} className="px-3 py-1.5 text-sm bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                      {question}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex space-x-3">
                <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Ask about routes, safety, EV stations, or traffic..." className="flex-1 px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange" />
                <AnimatedButton onClick={handleSendMessage} loading={isLoading}>
                  <FiSend className="mr-2" />
                  Send
                </AnimatedButton>
              </div>
              <div className="flex justify-between items-center mt-3">
                <div className="flex space-x-4">
                  <button className="text-gray-400 hover:text-white transition-colors">Clear Chat</button>
                  <button className="text-gray-400 hover:text-white transition-colors">Suggestions</button>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">AI is analyzing real-time data</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-premium-card rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-6 text-gray-300">AI Insights</h3>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-900/50">
                    <div>
                      <p className="font-medium">{insight.title}</p>
                      <p className="text-sm text-gray-400">{insight.description}</p>
                    </div>
                    <div className={`px-4 py-2 bg-gradient-to-r ${insight.color} rounded-lg`}>
                      <p className="text-xl font-bold">{insight.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-premium-card rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-6 text-gray-300">AI Capabilities</h3>
              <div className="space-y-4">
                {aiFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-900/50">
                    <span className="text-2xl">{feature.icon}</span>
                    <div>
                      <p className="font-medium">{feature.title}</p>
                      <p className="text-sm text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-premium-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-300">AI Recommendations</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                <div className="flex items-start space-x-3">
                  <FiTrendingUp className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Route Optimization</p>
                    <p className="text-sm text-gray-300">Ngong Road route currently has 25% less traffic</p>
                    <p className="text-xs text-gray-400 mt-1">Updated 5 min ago</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                <div className="flex items-start space-x-3">
                  <FiBatteryCharging className="text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold">EV Station Alert</p>
                    <p className="text-sm text-gray-300">Fast charging available at Greenspan Mall</p>
                    <p className="text-xs text-gray-400 mt-1">15 min wait time</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
                <div className="flex items-start space-x-3">
                  <FiAlertTriangle className="text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Safety Alert</p>
                    <p className="text-sm text-gray-300">Avoid Mombasa Road between 6-8 PM</p>
                    <p className="text-xs text-gray-400 mt-1">High risk area</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <div className="flex items-start space-x-3">
                  <FiShield className="text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Patrol Schedule</p>
                    <p className="text-sm text-gray-300">Police patrol increased in Westlands tonight</p>
                    <p className="text-xs text-gray-400 mt-1">From 8 PM to 6 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-premium-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-300">AI Learning</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Route Prediction Accuracy</span>
                <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 w-3/4"></div>
                </div>
                <span className="text-sm font-bold">85%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Safety Score Accuracy</span>
                <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 w-4/5"></div>
                </div>
                <span className="text-sm font-bold">92%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Traffic Prediction</span>
                <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-2/3"></div>
                </div>
                <span className="text-sm font-bold">78%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>EV Station Accuracy</span>
                <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 w-9/10"></div>
                </div>
                <span className="text-sm font-bold">95%</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-800">
              <p className="text-sm text-gray-400 text-center">AI improves with every interaction</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCpu className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium AI Features</h3>
              <p className="text-gray-300 mb-4">Get advanced AI predictions, personalized route optimization, and priority processing</p>
              <div className="space-y-3">
                <AnimatedButton variant="secondary" fullWidth>Upgrade AI Features</AnimatedButton>
                <AnimatedButton variant="outline" fullWidth>View AI Analytics</AnimatedButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
