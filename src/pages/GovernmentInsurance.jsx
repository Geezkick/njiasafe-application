import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiFileText, FiBarChart2, FiAlertTriangle, FiCheckCircle, FiDownload, FiUpload, FiEye, FiLock, FiGlobe, FiUsers, FiTrendingUp, FiDatabase } from 'react-icons/fi';
import AnimatedButton from '../components/AnimatedButton';

const GovernmentInsurance = () => {
  const [activeTab, setActiveTab] = useState('government');
  const [dataSharing, setDataSharing] = useState({
    accidentData: true,
    trafficPatterns: true,
    roadConditions: false,
    vehicleStats: true,
    anonymousUsage: true
  });

  const governmentData = [
    { metric: 'Total Accidents Reported', value: '1,247', change: '-12%', trend: 'down' },
    { metric: 'Average Response Time', value: '8.2 min', change: '-15%', trend: 'down' },
    { metric: 'Road Safety Index', value: '8.9/10', change: '+5%', trend: 'up' },
    { metric: 'Patrol Coverage', value: '94%', change: '+8%', trend: 'up' }
  ];

  const insuranceData = [
    { company: 'Jubilee Insurance', discount: '25%', criteria: 'Safe Driver', status: 'active' },
    { company: 'APA Insurance', discount: '20%', criteria: 'Low Mileage', status: 'active' },
    { company: 'Britam', discount: '30%', criteria: 'Premium User', status: 'active' },
    { company: 'UAP Old Mutual', discount: '15%', criteria: 'Community Member', status: 'pending' }
  ];

  const roadIncidents = [
    { id: 1, location: 'Thika Road', type: 'Accident', severity: 'High', time: '2 hours ago', status: 'Resolved' },
    { id: 2, location: 'Mombasa Road', type: 'Traffic', severity: 'Medium', time: '4 hours ago', status: 'Monitoring' },
    { id: 3, location: 'Waiyaki Way', type: 'Road Work', severity: 'Low', time: '6 hours ago', status: 'Ongoing' },
    { id: 4, location: 'Ngong Road', type: 'Security', severity: 'Medium', time: '8 hours ago', status: 'Patrolling' }
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Government & Insurance Portal</h1>
            <p className="text-gray-400 mt-2">Data sharing platform for road safety and insurance benefits</p>
          </div>
          <div className="mt-4 md:mt-0">
            <AnimatedButton>
              <FiDownload className="mr-2" />
              Download Report
            </AnimatedButton>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-premium-card rounded-xl p-6">
            <div className="flex space-x-4 mb-6">
              <button onClick={() => setActiveTab('government')} className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'government' ? 'bg-njia-orange text-white' : 'hover:bg-gray-800'}`}>
                Government Data
              </button>
              <button onClick={() => setActiveTab('insurance')} className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'insurance' ? 'bg-njia-orange text-white' : 'hover:bg-gray-800'}`}>
                Insurance Partners
              </button>
              <button onClick={() => setActiveTab('incidents')} className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'incidents' ? 'bg-njia-orange text-white' : 'hover:bg-gray-800'}`}>
                Live Incidents
              </button>
            </div>

            {activeTab === 'government' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-300">Government Safety Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  {governmentData.map((item, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gray-900/50">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-400">{item.metric}</p>
                          <p className="text-2xl font-bold mt-2">{item.value}</p>
                        </div>
                        <div className={`flex items-center space-x-1 ${item.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                          {item.trend === 'up' ? <FiTrendingUp /> : <FiTrendingUp className="transform rotate-180" />}
                          <span className="text-sm">{item.change}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-lg bg-gray-900/50">
                  <h4 className="font-semibold mb-3">Data Sharing Impact</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <FiCheckCircle className="text-green-500" />
                      <span>Reduced accident rates by 23% in monitored areas</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FiCheckCircle className="text-green-500" />
                      <span>Improved emergency response times by 35%</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FiCheckCircle className="text-green-500" />
                      <span>Enhanced road maintenance planning</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === 'insurance' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-300">Insurance Partners & Benefits</h3>
                <div className="space-y-4">
                  {insuranceData.map((insurance, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gray-900/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-njia-darkblue to-njia-purple rounded-lg flex items-center justify-center">
                            <span className="font-bold">{insurance.company.charAt(0)}</span>
                          </div>
                          <div>
                            <h4 className="font-bold">{insurance.company}</h4>
                            <p className="text-sm text-gray-400">{insurance.criteria}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-500">{insurance.discount}</p>
                          <span className={`text-xs px-2 py-1 rounded ${insurance.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                            {insurance.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-r from-njia-darkblue to-njia-purple">
                  <h4 className="font-semibold mb-2">Your Insurance Benefits</h4>
                  <p className="text-sm">Based on your safety score and driving behavior, you qualify for up to 30% insurance discounts.</p>
                  <AnimatedButton variant="secondary" className="mt-4">
                    Apply for Discount
                  </AnimatedButton>
                </div>
              </motion.div>
            )}

            {activeTab === 'incidents' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-300">Live Road Incidents</h3>
                <div className="space-y-3">
                  {roadIncidents.map((incident) => (
                    <div key={incident.id} className="p-4 rounded-lg bg-gray-900/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-lg ${incident.severity === 'High' ? 'bg-red-500/20 text-red-500' : incident.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-500'}`}>
                            <FiAlertTriangle />
                          </div>
                          <div>
                            <h4 className="font-bold">{incident.location}</h4>
                            <p className="text-sm text-gray-400">{incident.type} • {incident.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 text-xs rounded ${incident.status === 'Resolved' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                            {incident.status}
                          </span>
                          <p className="text-sm text-gray-400 mt-1">Severity: {incident.severity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div className="bg-premium-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-300">Data Collection & Privacy</h3>
            <div className="space-y-4">
              {Object.entries(dataSharing).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50">
                  <div>
                    <p className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                    <p className="text-sm text-gray-400">
                      {key === 'accidentData' && 'Share accident location and severity data'}
                      {key === 'trafficPatterns' && 'Share traffic flow and congestion data'}
                      {key === 'roadConditions' && 'Share road quality and maintenance needs'}
                      {key === 'vehicleStats' && 'Share anonymized vehicle statistics'}
                      {key === 'anonymousUsage' && 'Share anonymized usage patterns'}
                    </p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => setDataSharing(prev => ({ ...prev, [key]: !prev[key] }))}
                      className="sr-only"
                    />
                    <div
                      className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${value ? 'bg-njia-orange' : 'bg-gray-700'}`}
                      onClick={() => setDataSharing(prev => ({ ...prev, [key]: !prev[key] }))}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          value ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">Your data helps improve road safety for everyone</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-br from-njia-darkblue to-njia-purple rounded-xl p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">Data Security</h3>
              <p className="text-gray-300 mt-2">Your data is encrypted and protected</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <FiLock className="text-green-500" />
                <span>End-to-end encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiEye className="text-blue-500" />
                <span>Transparent data usage</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiUsers className="text-purple-500" />
                <span>Community-driven safety</span>
              </div>
            </div>
          </div>

          <div className="bg-premium-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-300">Government Partners</h3>
            <div className="space-y-4">
              {[
                { name: 'National Transport Authority', logo: '🚔', status: 'Active' },
                { name: 'Traffic Police Department', logo: '👮', status: 'Active' },
                { name: 'Road Safety Council', logo: '🛣️', status: 'Active' },
                { name: 'Emergency Services', logo: '🚑', status: 'Connected' }
              ].map((partner, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{partner.logo}</span>
                    <div>
                      <p className="font-medium">{partner.name}</p>
                      <p className="text-xs text-gray-400">Data sharing partner</p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-500/20 text-green-500 rounded">{partner.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-premium-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Your Contribution</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Data Points Shared</span>
                <span className="font-bold">12,458</span>
              </div>
              <div className="flex justify-between">
                <span>Safety Reports</span>
                <span className="font-bold">347</span>
              </div>
              <div className="flex justify-between">
                <span>Community Impact</span>
                <span className="font-bold text-green-500">High</span>
              </div>
              <div className="flex justify-between">
                <span>Insurance Savings</span>
                <span className="font-bold text-njia-orange">KES 45,600</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-800">
              <p className="text-sm text-center text-gray-400">Thank you for making roads safer!</p>
            </div>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 bg-premium-card rounded-xl p-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-green-500/20 rounded-lg">
              <FiDatabase className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Real-time Road Data Collection</h3>
              <p className="text-gray-300">Help government agencies monitor road security and improve safety for all</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <AnimatedButton variant="secondary">
              Learn More About Data Sharing
            </AnimatedButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GovernmentInsurance;
