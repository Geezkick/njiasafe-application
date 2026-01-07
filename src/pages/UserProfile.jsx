import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMapPin, FiShield, FiStar, FiEdit2, FiCamera, FiCheck, FiCalendar, FiNavigation, FiDownload, FiShare2, FiGlobe, FiSettings, FiBell, FiTrendingUp, FiAward, FiTarget } from 'react-icons/fi';
import AnimatedButton from '../components/AnimatedButton';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=brian');
  const fileInputRef = useRef(null);

  const [userData, setUserData] = useState({
    name: 'Brian Nyarienya',
    email: 'brian@njiasafe.com',
    phone: '+254 712 345 678',
    location: 'Nairobi, Kenya',
    memberSince: 'Jan 15, 2023',
    safetyScore: 9.8,
    tripsCompleted: 247,
    distanceTraveled: '5,842 km',
    carbonSaved: '342 kg',
    subscription: 'premium',
    language: 'en',
    notifications: true
  });

  const [editData, setEditData] = useState({ ...userData });

  const badges = [
    { id: 1, name: 'Safety Pioneer', icon: '🛡️', earned: true, description: '100+ safe trips' },
    { id: 2, name: 'Route Master', icon: '🗺️', earned: true, description: '50 routes explored' },
    { id: 3, name: 'EV Champion', icon: '⚡', earned: true, description: 'EV enthusiast' },
    { id: 4, name: 'Community Leader', icon: '👥', earned: false, description: 'Help 100 users' },
    { id: 5, name: 'Early Adopter', icon: '🚀', earned: true, description: 'Joined beta' },
    { id: 6, name: 'Premium Member', icon: '⭐', earned: true, description: 'Premium user' },
    { id: 7, name: 'Night Rider', icon: '🌙', earned: false, description: '50 night trips' },
    { id: 8, name: 'Eco Warrior', icon: '🌱', earned: true, description: 'Saved 300kg carbon' }
  ];

  const recentTrips = [
    { id: 1, route: 'Home to Office', date: 'Today', safety: 9.5, duration: '15 min', distance: '5.2 km', mode: 'drive' },
    { id: 2, route: 'CBD to Airport', date: 'Yesterday', safety: 9.2, duration: '45 min', distance: '18.7 km', mode: 'drive' },
    { id: 3, route: 'Westlands to Thika', date: '2 days ago', safety: 8.8, duration: '30 min', distance: '12.3 km', mode: 'drive' },
    { id: 4, route: 'Karen to City', date: '3 days ago', safety: 9.7, duration: '25 min', distance: '8.9 km', mode: 'cycle' }
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        // Save to localStorage
        localStorage.setItem('njiasafe_profile_image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // Load saved profile image
    const savedImage = localStorage.getItem('njiasafe_profile_image');
    if (savedImage) setProfileImage(savedImage);
  }, []);

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
    // Save to localStorage
    localStorage.setItem('njiasafe_user', JSON.stringify(editData));
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'sw', name: 'Swahili', flag: '🇹🇿' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' }
  ];

  const exportData = () => {
    const dataStr = JSON.stringify(userData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `njiasafe_profile_${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">User Profile</h1>
            <p className="text-gray-400 mt-2">Manage your account and view your statistics</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <AnimatedButton variant="outline" onClick={exportData}>
              <FiDownload className="mr-2" />
              Export Data
            </AnimatedButton>
            <AnimatedButton>
              <FiShare2 className="mr-2" />
              Share Profile
            </AnimatedButton>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-premium-card rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-njia-darkblue to-njia-purple p-1">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/10">
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                </div>
                <button onClick={() => fileInputRef.current.click()} className="absolute bottom-4 right-4 p-3 bg-njia-orange rounded-full hover:opacity-90 transition-opacity shadow-lg">
                  <FiCamera className="w-5 h-5" />
                </button>
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                
                <div className="absolute -top-2 -left-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <FiShield className="w-5 h-5" />
                </div>
              </div>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <input type="text" value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange text-xl font-bold" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="email" value={editData.email} onChange={(e) => setEditData({...editData, email: e.target.value})} className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange" placeholder="Email" />
                      <input type="tel" value={editData.phone} onChange={(e) => setEditData({...editData, phone: e.target.value})} className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange" placeholder="Phone" />
                      <input type="text" value={editData.location} onChange={(e) => setEditData({...editData, location: e.target.value})} className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange" placeholder="Location" />
                      <div className="relative">
                        <select value={editData.language} onChange={(e) => setEditData({...editData, language: e.target.value})} className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange appearance-none">
                          {languages.map(lang => (
                            <option key={lang.code} value={lang.code}>{lang.flag} {lang.name}</option>
                          ))}
                        </select>
                        <FiGlobe className="absolute right-3 top-3 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={editData.notifications} onChange={(e) => setEditData({...editData, notifications: e.target.checked})} className="rounded bg-gray-800" />
                        <span>Enable notifications</span>
                      </label>
                    </div>
                    <div className="flex space-x-3">
                      <AnimatedButton onClick={handleSave}><FiCheck className="mr-2" />Save Changes</AnimatedButton>
                      <AnimatedButton variant="outline" onClick={() => setIsEditing(false)}>Cancel</AnimatedButton>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold">{userData.name}</h2>
                        <p className="text-gray-400">{userData.email}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-sm">Premium Member</span>
                          <span className="px-3 py-1 bg-njia-darkblue rounded-full text-sm">Safety Score: {userData.safetyScore}/10</span>
                        </div>
                      </div>
                      <button onClick={() => setIsEditing(true)} className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                        <FiEdit2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-900/50">
                        <FiPhone className="text-njia-orange" />
                        <div>
                          <p className="text-sm text-gray-400">Phone</p>
                          <p className="font-medium">{userData.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-900/50">
                        <FiMapPin className="text-njia-orange" />
                        <div>
                          <p className="text-sm text-gray-400">Location</p>
                          <p className="font-medium">{userData.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-900/50">
                        <FiCalendar className="text-njia-orange" />
                        <div>
                          <p className="text-sm text-gray-400">Member Since</p>
                          <p className="font-medium">{userData.memberSince}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-900/50">
                        <FiGlobe className="text-njia-orange" />
                        <div>
                          <p className="text-sm text-gray-400">Language</p>
                          <p className="font-medium">{languages.find(l => l.code === userData.language)?.name}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-njia-darkblue to-blue-600 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-white/20 rounded-lg"><FiNavigation className="w-6 h-6" /></div>
                <div>
                  <p className="text-3xl font-bold">{userData.tripsCompleted}</p>
                  <p className="text-gray-300">Trips Completed</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-njia-purple to-purple-600 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-white/20 rounded-lg"><FiTarget className="w-6 h-6" /></div>
                <div>
                  <p className="text-3xl font-bold">{userData.distanceTraveled}</p>
                  <p className="text-gray-300">Distance Traveled</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-white/20 rounded-lg"><FiTrendingUp className="w-6 h-6" /></div>
                <div>
                  <p className="text-3xl font-bold">{userData.carbonSaved}</p>
                  <p className="text-gray-300">Carbon Saved</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-njia-orange to-orange-600 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-white/20 rounded-lg"><FiStar className="w-6 h-6" /></div>
                <div>
                  <p className="text-3xl font-bold">{userData.safetyScore}/10</p>
                  <p className="text-gray-300">Safety Rating</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-premium-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-300">Recent Trips</h3>
            <div className="space-y-4">
              {recentTrips.map((trip) => (
                <div key={trip.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-900/50 hover:bg-gray-900 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-njia-darkblue rounded-lg flex items-center justify-center">
                      {trip.mode === 'drive' ? '🚗' : '🚲'}
                    </div>
                    <div>
                      <p className="font-medium">{trip.route}</p>
                      <p className="text-sm text-gray-400">{trip.date} • {trip.distance}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Safety</p>
                      <p className="font-bold text-njia-orange">{trip.safety}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Duration</p>
                      <p className="font-bold">{trip.duration}</p>
                    </div>
                    <button className="px-4 py-2 text-sm bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-premium-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-300">Achievements & Badges</h3>
            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge) => (
                <div key={badge.id} className={`flex flex-col items-center p-4 rounded-lg text-center ${badge.earned ? 'bg-gradient-to-b from-njia-darkblue/20 to-njia-purple/20 border border-njia-purple/50' : 'bg-gray-900/50 opacity-50'}`}>
                  <span className="text-2xl mb-2">{badge.icon}</span>
                  <p className="text-sm font-medium">{badge.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
                  {badge.earned ? (
                    <div className="mt-2 flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-500">Earned</span>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 mt-2">Locked</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-premium-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-300">Preferences</h3>
            <div className="space-y-4">
              {[
                { label: 'Safety Notifications', icon: <FiShield />, enabled: true },
                { label: 'Route Suggestions', icon: <FiNavigation />, enabled: true },
                { label: 'Community Alerts', icon: <FiBell />, enabled: true },
                { label: 'EV Station Updates', icon: '⚡', enabled: false },
                { label: 'Weather Alerts', icon: '🌧️', enabled: true },
                { label: 'Traffic Updates', icon: '🚗', enabled: true },
                { label: 'Language', icon: <FiGlobe />, value: 'English' },
                { label: 'Theme', icon: '🎨', value: 'Dark' }
              ].map((pref, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                      {pref.icon}
                    </div>
                    <span>{pref.label}</span>
                  </div>
                  {pref.value ? (
                    <span className="text-sm text-gray-400">{pref.value}</span>
                  ) : (
                    <div className="relative">
                      <input type="checkbox" className="sr-only" defaultChecked={pref.enabled} />
                      <div className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${pref.enabled ? 'bg-njia-orange' : 'bg-gray-700'}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${pref.enabled ? 'translate-x-7' : 'translate-x-1'}`}></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-njia-darkblue via-njia-purple to-njia-darkblue rounded-xl p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAward className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Member</h3>
              <p className="text-gray-300 mb-4">Access all premium features including advanced routing and priority support</p>
              <div className="text-sm space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subscription:</span>
                  <span className="text-green-500">Active</span>
                </div>
                <div className="flex justify-between">
                  <span>Renews:</span>
                  <span>Jan 15, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span>Plan:</span>
                  <span>Premium Plus</span>
                </div>
              </div>
              <div className="space-y-3">
                <AnimatedButton fullWidth>Manage Subscription</AnimatedButton>
                <AnimatedButton variant="outline" fullWidth>View Usage</AnimatedButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
