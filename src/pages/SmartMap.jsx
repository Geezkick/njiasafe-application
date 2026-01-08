import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMap, FiNavigation, FiFilter, FiLayers, FiSearch, FiAlertTriangle, FiEye, FiEyeOff, FiSettings, FiDownload, FiShare2, FiTarget, FiZoomIn, FiZoomOut } from 'react-icons/fi';
import AnimatedButton from '../components/AnimatedButton';
import { useTranslation } from '../hooks/useTranslation';

const SmartMap = ({ subscription }) => {
  const [mapLayers, setMapLayers] = useState({
    traffic: true,
    safety: true,
    evStations: false,
    police: true,
    accidents: true,
    roadQuality: false
  });
  const [selectedLayer, setSelectedLayer] = useState('safety');
  const [viewMode, setViewMode] = useState('standard');
  const [searchQuery, setSearchQuery] = useState('');
  const [liveData, setLiveData] = useState({
    vehicles: 1247,
    incidents: 8,
    avgSpeed: '45 km/h',
    safetyScore: '8.9/10'
  });
  
  const { t } = useTranslation();

  const mapLayersList = [
    { id: 'traffic', name: t('traffic_flow'), icon: '🚗', color: 'text-blue-500', premium: false },
    { id: 'safety', name: t('safety_heatmap'), icon: '🛡️', color: 'text-green-500', premium: false },
    { id: 'evStations', name: t('ev_stations'), icon: '⚡', color: 'text-yellow-500', premium: true },
    { id: 'police', name: t('police_patrols'), icon: '👮', color: 'text-blue-400', premium: true },
    { id: 'accidents', name: t('accident_zones'), icon: '⚠️', color: 'text-red-500', premium: false },
    { id: 'roadQuality', name: t('road_quality'), icon: '🛣️', color: 'text-orange-500', premium: true }
  ];

  const viewModes = [
    { id: 'standard', name: t('standard'), icon: '🗺️' },
    { id: 'satellite', name: t('satellite'), icon: '🛰️' },
    { id: 'hybrid', name: t('hybrid'), icon: '🌍' },
    { id: 'night', name: t('night'), icon: '🌙' }
  ];

  const handleLayerToggle = (layerId) => {
    if (mapLayersList.find(l => l.id === layerId)?.premium && subscription !== 'premium') {
      alert('This layer is available only for Premium users');
      return;
    }
    setMapLayers(prev => ({ ...prev, [layerId]: !prev[layerId] }));
  };

  return (
    <div className="animate-fade-in pt-4 px-4 md:px-6">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{t('smart_map')}</h1>
            <p className="text-gray-400 mt-2">{t('interactive_maps')}</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <AnimatedButton variant="outline">
              <FiDownload className="mr-2" />
              {t('export_map')}
            </AnimatedButton>
            <AnimatedButton>
              <FiShare2 className="mr-2" />
              {t('share')}
            </AnimatedButton>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-premium-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-300">{t('map_layers')}</h3>
            <div className="space-y-3">
              {mapLayersList.map((layer) => (
                <div key={layer.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{layer.icon}</span>
                    <div>
                      <p className="font-medium">{layer.name}</p>
                      {layer.premium && (
                        <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-500 rounded">Premium</span>
                      )}
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={mapLayers[layer.id]}
                      onChange={() => handleLayerToggle(layer.id)}
                      className="sr-only"
                      disabled={layer.premium && subscription !== 'premium'}
                    />
                    <div
                      className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${layer.premium && subscription !== 'premium' ? 'opacity-50 cursor-not-allowed' : ''} ${
                        mapLayers[layer.id] ? 'bg-green-500' : 'bg-gray-700'
                      }`}
                      onClick={() => handleLayerToggle(layer.id)}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          mapLayers[layer.id] ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-premium-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-300">{t('view_mode')}</h3>
            <div className="grid grid-cols-2 gap-3">
              {viewModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                    viewMode === mode.id
                      ? 'border-njia-orange bg-njia-orange/10'
                      : 'border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <span className="text-2xl mb-2">{mode.icon}</span>
                  <span className="text-sm font-medium">{mode.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-premium-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-300">{t('live_map_data')}</h3>
            <div className="space-y-3">
              {Object.entries(liveData).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-3 rounded-lg bg-gray-900/50">
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="font-bold text-njia-orange">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-premium-card rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <div className="relative">
                    <FiMap className="w-8 h-8 text-njia-orange" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{t('live_interactive_map')}</h2>
                    <p className="text-gray-400">Nairobi Metropolitan Area • {t('updated_just_now')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('search_location')}
                      className="pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange"
                    />
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <AnimatedButton variant="secondary" size="small">
                    <FiTarget className="mr-2" />
                    {t('locate_me')}
                  </AnimatedButton>
                </div>
              </div>
            </div>

            <div className="relative h-[600px] bg-gradient-to-br from-njia-darkblue/30 via-gray-900 to-njia-purple/30">
              {/* Simulated Map */}
              <div className="absolute inset-0">
                {/* Base Map */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
                
                {/* Roads */}
                <div className="absolute inset-0">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Major Highways */}
                    <path d="M10,50 L90,50" stroke="#ff6d00" strokeWidth="2" strokeDasharray="5,5" />
                    <path d="M30,20 L70,80" stroke="#1a237e" strokeWidth="1.5" />
                    <path d="M20,80 L80,20" stroke="#1a237e" strokeWidth="1.5" />
                    
                    {/* Safety Zones */}
                    {mapLayers.safety && (
                      <>
                        <circle cx="30" cy="30" r="8" fill="rgba(0,255,0,0.2)" stroke="rgba(0,255,0,0.5)" strokeWidth="1" />
                        <circle cx="70" cy="70" r="6" fill="rgba(0,255,0,0.2)" stroke="rgba(0,255,0,0.5)" strokeWidth="1" />
                        <circle cx="50" cy="50" r="10" fill="rgba(255,255,0,0.2)" stroke="rgba(255,255,0,0.5)" strokeWidth="1" />
                      </>
                    )}
                    
                    {/* Traffic Flow */}
                    {mapLayers.traffic && (
                      <>
                        <circle cx="40" cy="40" r="3" fill="#ff6d00" className="animate-pulse" />
                        <circle cx="60" cy="60" r="3" fill="#ff6d00" className="animate-pulse" />
                        <circle cx="40" cy="60" r="3" fill="#1a237e" className="animate-pulse" />
                      </>
                    )}
                    
                    {/* EV Stations */}
                    {mapLayers.evStations && subscription === 'premium' && (
                      <>
                        <circle cx="25" cy="50" r="4" fill="#7b1fa2" stroke="white" strokeWidth="1" />
                        <circle cx="75" cy="25" r="4" fill="#7b1fa2" stroke="white" strokeWidth="1" />
                      </>
                    )}
                    
                    {/* Police Patrols */}
                    {mapLayers.police && subscription === 'premium' && (
                      <>
                        <circle cx="35" cy="65" r="3" fill="#3b82f6" className="animate-pulse" />
                        <circle cx="65" cy="35" r="3" fill="#3b82f6" className="animate-pulse" />
                      </>
                    )}
                    
                    {/* Accident Zones */}
                    {mapLayers.accidents && (
                      <circle cx="20" cy="20" r="5" fill="rgba(255,0,0,0.3)" stroke="red" strokeWidth="1">
                        <animate attributeName="r" values="5;7;5" dur="1s" repeatCount="indefinite" />
                      </circle>
                    )}
                  </svg>
                </div>

                {/* User Location */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-r from-njia-darkblue to-njia-purple rounded-full flex items-center justify-center animate-pulse">
                      <FiNavigation className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute -inset-4 border-2 border-njia-orange/50 rounded-full animate-ping"></div>
                  </div>
                </div>

                {/* Map Controls */}
                <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                  <button className="p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
                    <FiZoomIn className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
                    <FiZoomOut className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
                    <FiLayers className="w-5 h-5" />
                  </button>
                </div>

                {/* Legend */}
                <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Map Legend</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Safe Zone</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>Moderate Zone</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span>High Risk</span>
                    </div>
                    {subscription === 'premium' && (
                      <>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <span>EV Station</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span>Police Patrol</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-800 bg-gray-900/50">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Current Location Safety</p>
                  <p className="text-sm text-gray-400">Central Business District, Nairobi</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-500">8.9/10</p>
                    <p className="text-sm text-gray-400">Safety Score</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-njia-orange">85%</p>
                    <p className="text-sm text-gray-400">Route Safety</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Analytics */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-premium-card rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <FiAlertTriangle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-gray-400">Active Alerts</p>
                </div>
              </div>
            </div>
            <div className="bg-premium-card rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <FiNavigation className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1.2k</p>
                  <p className="text-gray-400">Vehicles Tracked</p>
                </div>
              </div>
            </div>
            <div className="bg-premium-card rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <FiMap className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">98%</p>
                  <p className="text-gray-400">Map Accuracy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {subscription === 'free' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 bg-gradient-to-r from-njia-darkblue via-njia-purple to-njia-darkblue rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Unlock Advanced Smart Map Features</h3>
              <p className="text-gray-300">Get access to EV station locations, police patrol tracking, road quality data, and more with Premium</p>
            </div>
            <div className="mt-4 md:mt-0">
              <AnimatedButton variant="secondary" size="large" onClick={() => window.location.href = '/subscription'}>
                Upgrade to Premium
              </AnimatedButton>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SmartMap;
