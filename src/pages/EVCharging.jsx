import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBatteryCharging, FiMapPin, FiClock, FiDollarSign, FiStar, FiFilter, FiNavigation, FiAlertCircle, FiCheckCircle, FiWifi } from 'react-icons/fi';
import AnimatedButton from '../components/AnimatedButton';

const EVCharging = () => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [filter, setFilter] = useState('all');

  const stations = [
    { id: 1, name: 'Green Energy Hub', location: 'Westlands, Nairobi', distance: '2.3 km', available: 4, total: 6, price: 'KES 45/kWh', rating: 4.8, fastCharging: true, amenities: ['Cafe', 'WiFi', 'Restroom'], status: 'available' },
    { id: 2, name: 'Solar Charge Center', location: 'Kilimani, Nairobi', distance: '3.1 km', available: 2, total: 4, price: 'KES 50/kWh', rating: 4.5, fastCharging: true, amenities: ['Lounge', 'WiFi'], status: 'available' },
    { id: 3, name: 'Eco Power Station', location: 'Karen, Nairobi', distance: '5.2 km', available: 0, total: 8, price: 'KES 40/kWh', rating: 4.9, fastCharging: true, amenities: ['Restaurant', 'WiFi', 'Shopping'], status: 'busy' },
    { id: 4, name: 'City Fast Charge', location: 'CBD, Nairobi', distance: '1.8 km', available: 3, total: 5, price: 'KES 55/kWh', rating: 4.3, fastCharging: false, amenities: ['WiFi'], status: 'available' }
  ];

  const filters = [
    { id: 'all', label: 'All Stations' },
    { id: 'available', label: 'Available Now' },
    { id: 'fast', label: 'Fast Charging' },
    { id: 'premium', label: 'Premium Amenities' }
  ];

  const filteredStations = stations.filter(station => {
    if (filter === 'all') return true;
    if (filter === 'available') return station.available > 0;
    if (filter === 'fast') return station.fastCharging;
    if (filter === 'premium') return station.amenities.length >= 3;
    return true;
  });

  const userStats = {
    sessions: 24,
    energyUsed: '342 kWh',
    savings: 'KES 12,450',
    carbonSaved: '2.3 tons'
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">EV Charging</h1>
            <p className="text-gray-400 mt-2">Find and book charging stations across the city</p>
          </div>
          <div className="mt-4 md:mt-0">
            <AnimatedButton variant="secondary"><FiBatteryCharging className="mr-2" />My Charging History</AnimatedButton>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Object.entries(userStats).map(([key, value], index) => (
          <motion.div key={key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-premium-card rounded-xl p-4">
            <p className="text-2xl font-bold text-njia-orange">{value}</p>
            <p className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-premium-card rounded-xl p-6">
            <div className="flex flex-wrap gap-2">
              {filters.map((filterItem) => (
                <button key={filterItem.id} onClick={() => setFilter(filterItem.id)} className={`px-4 py-2 rounded-lg transition-colors ${filter === filterItem.id ? 'bg-njia-orange text-white' : 'bg-gray-800 hover:bg-gray-700'}`}>
                  {filterItem.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStations.map((station) => (
              <motion.div key={station.id} whileHover={{ y: -5 }} onClick={() => setSelectedStation(station)} className={`bg-premium-card rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${selectedStation?.id === station.id ? 'border-njia-orange' : 'border-gray-800 hover:border-gray-700'}`}>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{station.name}</h3>
                      <div className="flex items-center text-gray-400 mt-1"><FiMapPin className="mr-1" /><span className="text-sm">{station.location}</span></div>
                    </div>
                    {station.fastCharging && <span className="px-2 py-1 text-xs bg-gradient-to-r from-njia-orange to-orange-600 rounded">FAST</span>}
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Availability</span>
                      <span className={`font-bold ${station.available > 0 ? 'text-green-500' : 'text-red-500'}`}>{station.available}/{station.total} available</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-yellow-500" style={{ width: `${(station.available / station.total) * 100}%` }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2"><FiNavigation className="text-gray-400" /><div><p className="text-sm text-gray-400">Distance</p><p className="font-medium">{station.distance}</p></div></div>
                    <div className="flex items-center space-x-2"><FiDollarSign className="text-gray-400" /><div><p className="text-sm text-gray-400">Price</p><p className="font-medium">{station.price}</p></div></div>
                    <div className="flex items-center space-x-2"><FiStar className="text-gray-400" /><div><p className="text-sm text-gray-400">Rating</p><p className="font-medium">{station.rating}</p></div></div>
                    <div className="flex items-center space-x-2"><FiClock className="text-gray-400" /><div><p className="text-sm text-gray-400">Status</p><p className={`font-medium ${station.status === 'available' ? 'text-green-500' : 'text-yellow-500'}`}>{station.status}</p></div></div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {station.amenities.map((amenity, index) => (<span key={index} className="px-2 py-1 text-xs bg-gray-800 rounded">{amenity}</span>))}
                  </div>

                  <AnimatedButton fullWidth disabled={station.available === 0} variant={station.available > 0 ? 'primary' : 'outline'}>
                    {station.available > 0 ? 'Book Charging Slot' : 'Fully Booked'}
                  </AnimatedButton>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {selectedStation ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gradient-to-br from-njia-darkblue to-njia-purple rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Selected Station</h3>
              <div className="space-y-3">
                <div className="flex justify-between"><span>Station</span><span className="font-bold">{selectedStation.name}</span></div>
                <div className="flex justify-between"><span>Location</span><span className="font-bold">{selectedStation.location}</span></div>
                <div className="flex justify-between"><span>Distance</span><span className="font-bold">{selectedStation.distance}</span></div>
                <div className="flex justify-between"><span>Available Slots</span><span className="font-bold">{selectedStation.available}/{selectedStation.total}</span></div>
                <div className="flex justify-between"><span>Price</span><span className="font-bold">{selectedStation.price}</span></div>
                <div className="flex justify-between"><span>Fast Charging</span><span className="font-bold">{selectedStation.fastCharging ? 'Yes' : 'No'}</span></div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-2">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStation.amenities.map((amenity, index) => (<span key={index} className="px-3 py-1 bg-white/20 rounded-lg text-sm">{amenity}</span>))}
                </div>
              </div>

              <AnimatedButton fullWidth className="mt-6">Book Now</AnimatedButton>
            </motion.div>
          ) : (
            <div className="bg-premium-card rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4"><FiBatteryCharging className="w-8 h-8 text-gray-400" /></div>
              <h3 className="text-lg font-semibold mb-2">Select a Station</h3>
              <p className="text-gray-400">Click on a charging station to view details and book</p>
            </div>
          )}

          <div className="bg-premium-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Quick Booking</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Vehicle Type</label>
                <select className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange">
                  <option>Tesla Model 3</option>
                  <option>Nissan Leaf</option>
                  <option>BMW i3</option>
                  <option>Other EV</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Charging Duration</label>
                <select className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange">
                  <option>30 minutes (Fast)</option>
                  <option>1 hour (Standard)</option>
                  <option>2 hours (Full Charge)</option>
                  <option>Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Payment Method</label>
                <select className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange">
                  <option>M-Pesa</option>
                  <option>Debit Card</option>
                  <option>Credit Card</option>
                  <option>Prepaid Balance</option>
                </select>
              </div>
              <AnimatedButton fullWidth>Find Available Stations</AnimatedButton>
            </div>
          </div>

          <div className="bg-premium-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Environmental Impact</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-gray-900/50">
                <div><p className="font-medium">Carbon Saved</p><p className="text-sm text-gray-400">This month</p></div>
                <div className="text-right"><p className="text-xl font-bold text-green-500">2.3 tons</p><p className="text-xs text-gray-400">CO₂ equivalent</p></div>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-gray-900/50">
                <div><p className="font-medium">Money Saved</p><p className="text-sm text-gray-400">vs. gasoline</p></div>
                <div className="text-right"><p className="text-xl font-bold text-njia-orange">KES 12,450</p><p className="text-xs text-gray-400">This month</p></div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-sm text-center text-gray-400">Driving towards a greener future</p>
            </div>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 bg-gradient-to-r from-njia-darkblue via-njia-purple to-njia-darkblue rounded-xl p-8">
        <div className="flex flex-col md:flexRow items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Premium Charging Benefits</h3>
            <p className="text-gray-300">Access exclusive stations, faster charging, and priority booking with Premium</p>
          </div>
          <div className="mt-4 md:mt-0">
            <AnimatedButton variant="secondary" size="large">Upgrade to Premium</AnimatedButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default EVCharging;
