import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { 
  FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiShield, 
  FiCreditCard, FiSettings, FiEdit2, FiSave, FiCamera, FiUpload,
  FiTruck, FiGlobe, FiTrendingUp, FiBatteryCharging, FiWifi, FiShare2,
  FiDollarSign, FiAlertCircle, FiCheck, FiShuffle, FiPower, FiRefreshCw,
  FiZap, FiWifiOff, FiLock, FiUnlock, FiBell, FiMessageSquare,
  FiMap, FiNavigation, FiX, FiEdit, FiCheckCircle
} from 'react-icons/fi';
import { getUserProfilePic, updateUserProfilePic, getUserData, updateUserData } from '../utils/setupDefaultUser';

const UserProfile = () => {
  const defaultUserData = {
    name: 'Brian Kamau',
    email: 'brian@example.com',
    phone: '+254 712 345 678',
    location: 'Nairobi, Kenya',
    joinedDate: '2023-01-15',
    subscription: 'premium',
    profilePic: '',
    vehicle: {
      model: 'Tesla Model 3',
      year: '2022',
      licensePlate: 'KCA 123A',
      batteryLevel: 85,
      v2vEnabled: true,
      range: '420 km'
    },
    stats: {
      trips: 24,
      distance: '1,240 km',
      carbonSaved: '45 kg',
      chargingSessions: 12,
      safetyScore: 95,
      communityRating: 4.8,
      totalPayments: 12500,
      pendingPayments: 1500,
      v2vConnections: 8
    },
    v2vSettings: {
      enabled: true,
      sharingRange: '5km',
      powerLimit: '5kW',
      autoAccept: false,
      pricePerKwh: 45,
      visibility: 'public',
      emergencyAlerts: true
    }
  };
  
  const [userData, setUserData] = useState(defaultUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedData, setEditedData] = useState(defaultUserData);
  const [tempName, setTempName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [uploadingPic, setUploadingPic] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [activeSection, setActiveSection] = useState('overview');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [v2vStatus, setV2vStatus] = useState('connected');
  const fileInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUserData = getUserData();
    if (savedUserData) {
      const mergedData = {
        ...defaultUserData,
        ...savedUserData,
        vehicle: {
          ...defaultUserData.vehicle,
          ...(savedUserData.vehicle || {})
        },
        stats: {
          ...defaultUserData.stats,
          ...(savedUserData.stats || {})
        },
        v2vSettings: {
          ...defaultUserData.v2vSettings,
          ...(savedUserData.v2vSettings || {})
        }
      };
      setUserData(mergedData);
      setEditedData(mergedData);
      setTempName(mergedData.name || '');
    }

    const pic = getUserProfilePic();
    if (pic) {
      setProfilePic(pic);
      setUserData(prev => ({ ...prev, profilePic: pic }));
      setEditedData(prev => ({ ...prev, profilePic: pic }));
    }
  }, []);

  // Focus name input when editing starts
  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [isEditingName]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...userData });
  };

  const handleSave = () => {
    updateUserData(editedData);
    setUserData(editedData);
    setIsEditing(false);
    
    if (editedData.profilePic !== userData.profilePic && editedData.profilePic) {
      updateUserProfilePic(editedData.profilePic);
      setProfilePic(editedData.profilePic);
      toast.success('Profile picture updated successfully!');
    }
    
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({ ...userData });
  };

  const startEditingName = () => {
    setTempName(userData?.name || '');
    setIsEditingName(true);
  };

  const saveNameEdit = () => {
    if (tempName.trim() === '') {
      toast.error('Name cannot be empty');
      return;
    }
    
    const updatedData = { ...editedData, name: tempName.trim() };
    setEditedData(updatedData);
    setUserData(updatedData);
    updateUserData(updatedData);
    setIsEditingName(false);
    toast.success('Name updated successfully!');
  };

  const cancelNameEdit = () => {
    setIsEditingName(false);
    setTempName(userData?.name || '');
  };

  const handleNameKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveNameEdit();
    } else if (e.key === 'Escape') {
      cancelNameEdit();
    }
  };

  const handleInputChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVehicleChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      vehicle: {
        ...(prev.vehicle || {}),
        [field]: value
      }
    }));
  };

  const handleV2VChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      v2vSettings: {
        ...(prev.v2vSettings || {}),
        [field]: value
      }
    }));
  };

  const handleProfilePicClick = () => {
    setShowUploadModal(true);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.match('image.*')) {
        toast.error('Please select an image file (JPEG, PNG, etc.)');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setImagePreview(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadProfilePic = () => {
    if (!imagePreview) {
      toast.error('Please select an image first');
      return;
    }

    setUploadingPic(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const newProfilePic = imagePreview;
      setProfilePic(newProfilePic);
      setEditedData(prev => ({ ...prev, profilePic: newProfilePic }));
      setUserData(prev => ({ ...prev, profilePic: newProfilePic }));
      updateUserProfilePic(newProfilePic);
      setUploadingPic(false);
      setShowUploadModal(false);
      setImagePreview('');
      toast.success('Profile picture updated successfully!');
    }, 1500);
  };

  const handleRemoveProfilePic = () => {
    setProfilePic('');
    setEditedData(prev => ({ ...prev, profilePic: '' }));
    setUserData(prev => ({ ...prev, profilePic: '' }));
    updateUserProfilePic('');
    setImagePreview('');
    toast.success('Profile picture removed');
  };

  const handleUrlProfilePic = () => {
    const url = prompt('Enter image URL:');
    if (url && url.trim() !== '') {
      setUploadingPic(true);
      setTimeout(() => {
        setProfilePic(url);
        setEditedData(prev => ({ ...prev, profilePic: url }));
        setUserData(prev => ({ ...prev, profilePic: url }));
        updateUserProfilePic(url);
        setUploadingPic(false);
        toast.success('Profile picture updated from URL!');
      }, 1000);
    }
  };

  const handleMakePayment = () => {
    if (paymentAmount && !isNaN(paymentAmount) && parseFloat(paymentAmount) > 0) {
      toast.success(`Processing payment of Ksh ${paymentAmount}...`);
      setPaymentAmount('');
      // In production, integrate with payment gateway
    } else {
      toast.error('Please enter a valid payment amount');
    }
  };

  const handleQuickPayment = (amount) => {
    setPaymentAmount(amount);
    setTimeout(() => {
      toast.success(`Payment of Ksh ${amount} processed successfully!`);
      setPaymentAmount('');
    }, 1000);
  };

  const toggleV2V = () => {
    const newStatus = !editedData.v2vSettings?.enabled;
    handleV2VChange('enabled', newStatus);
    setV2vStatus(newStatus ? 'connected' : 'disconnected');
    toast.success(`V2V ${newStatus ? 'enabled' : 'disabled'}`);
  };

  const initiateV2VTransfer = () => {
    toast.success('Initiating V2V power transfer...\nConnecting to nearby vehicles...');
    // In production, this would open V2V transfer interface
  };

  const navigateToV2VPage = () => {
    navigate('/v2v');
  };

  const navigateToPaymentPage = () => {
    navigate('/payment');
  };

  const getInitials = () => {
    return (userData?.name || 'User')
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const profileStats = [
    { label: 'Total Trips', value: userData?.stats?.trips || 0, icon: <FiTruck className="text-blue-400" />, color: 'bg-blue-500/10', change: '+5%' },
    { label: 'Distance Covered', value: userData?.stats?.distance || '0 km', icon: <FiGlobe className="text-green-400" />, color: 'bg-green-500/10', change: '+12%' },
    { label: 'Carbon Saved', value: userData?.stats?.carbonSaved || '0 kg', icon: <FiTrendingUp className="text-emerald-400" />, color: 'bg-emerald-500/10', change: '+8%' },
    { label: 'V2V Connections', value: userData?.stats?.v2vConnections || 0, icon: <FiWifi className="text-purple-400" />, color: 'bg-purple-500/10', change: '+3' },
  ];

  const quickPaymentAmounts = [500, 1000, 2000, 5000];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 text-white pt-4 px-4 md:px-6 pb-8">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1f36',
            color: '#fff',
            border: '1px solid #3f3f46',
          },
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header with Profile Summary */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center space-x-4">
              {/* Large Circular Profile Picture */}
              <div className="relative group">
                {profilePic ? (
                  <>
                    <img 
                      src={profilePic} 
                      alt={userData?.name || 'User'}
                      className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-gray-800 object-cover shadow-2xl cursor-pointer"
                      onClick={handleProfilePicClick}
                    />
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                      <FiCamera className="text-white text-3xl" />
                    </div>
                  </>
                ) : (
                  <div 
                    className="w-28 h-28 md:w-36 md:h-36 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center border-4 border-gray-800 shadow-2xl cursor-pointer"
                    onClick={handleProfilePicClick}
                  >
                    <span className="text-white font-bold text-4xl md:text-5xl">{getInitials()}</span>
                  </div>
                )}
                
                {/* Upload Progress */}
                {uploadingPic && (
                  <div className="absolute inset-0 bg-black/70 rounded-full flex items-center justify-center">
                    <FiRefreshCw className="text-white text-3xl animate-spin" />
                  </div>
                )}
                
                {/* Change Photo Badge */}
                <div 
                  className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform"
                  onClick={handleProfilePicClick}
                >
                  <FiCamera className="text-white text-xl" />
                </div>
              </div>

              {/* Profile Info with Editable Name */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    {isEditingName ? (
                      <div className="flex items-center space-x-3">
                        <input
                          ref={nameInputRef}
                          type="text"
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          onKeyDown={handleNameKeyDown}
                          className="text-3xl md:text-4xl font-bold bg-gray-800 border-b-2 border-blue-500 focus:outline-none focus:border-blue-400 w-full px-2 py-1 rounded"
                          maxLength={50}
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={saveNameEdit}
                            className="p-2 bg-green-500 hover:bg-green-600 rounded-full transition-colors"
                            title="Save name"
                          >
                            <FiCheckCircle className="text-white" />
                          </button>
                          <button
                            onClick={cancelNameEdit}
                            className="p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                            title="Cancel"
                          >
                            <FiX className="text-white" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <h1 className="text-3xl md:text-4xl font-bold">{userData?.name || 'User'}</h1>
                        <button
                          onClick={startEditingName}
                          className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors group"
                          title="Edit name"
                        >
                          <FiEdit className="text-gray-400 group-hover:text-white" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    (userData?.subscription || 'premium') === 'premium' 
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
                      : (userData?.subscription || 'premium') === 'enterprise'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                  }`}>
                    {(userData?.subscription || 'PREMIUM').toUpperCase()} MEMBER
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-500 to-emerald-500">
                    <FiCheck className="inline mr-1" /> VERIFIED
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    v2vStatus === 'connected' 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                      : 'bg-gradient-to-r from-gray-500 to-gray-600'
                  }`}>
                    <FiWifi className="inline mr-1" /> V2V {v2vStatus.toUpperCase()}
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-gray-400">
                  <div className="flex items-center space-x-1">
                    <FiMail className="text-sm" />
                    <span className="text-sm">{userData?.email || 'No email'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FiPhone className="text-sm" />
                    <span className="text-sm">{userData?.phone || 'No phone'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl font-bold transition-all flex items-center shadow-lg"
                >
                  <FiEdit2 className="mr-2" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl font-bold transition-all flex items-center shadow-lg"
                  >
                    <FiSave className="mr-2" />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 rounded-xl font-bold transition-all shadow-lg"
                  >
                    Cancel
                  </button>
                </div>
              )}
              
              <button
                onClick={navigateToPaymentPage}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl font-bold transition-all flex items-center shadow-lg"
              >
                <FiCreditCard className="mr-2" />
                Make Payment
              </button>
              
              <button
                onClick={navigateToV2VPage}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl font-bold transition-all flex items-center shadow-lg"
              >
                <FiZap className="mr-2" />
                V2V Control
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 border-b border-gray-800 pb-2">
            {['overview', 'vehicle', 'v2v', 'payments', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSection(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                  activeSection === tab
                    ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border-b-2 border-blue-500'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                {tab === 'v2v' ? 'V2V Features' : tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FiTrendingUp className="mr-2 text-green-400" />
                Your Journey Stats
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {profileStats.map((stat, index) => (
                  <div key={index} className={`p-4 rounded-lg ${stat.color} transform hover:scale-105 transition-transform duration-300`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-2xl font-bold">{stat.value}</div>
                      {stat.icon}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                      {stat.change && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          stat.change.startsWith('+') 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {stat.change}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Active Section Content */}
            {activeSection === 'overview' && (
              <>
                {/* Vehicle Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold flex items-center">
                      <FiTruck className="mr-2 text-blue-400" />
                      Vehicle Information
                    </h3>
                    <button className="text-sm text-blue-400 hover:text-blue-300">
                      View Details →
                    </button>
                  </div>
                  
                  {isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Vehicle Model</label>
                        <input
                          type="text"
                          value={editedData?.vehicle?.model || ''}
                          onChange={(e) => handleVehicleChange('model', e.target.value)}
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Year</label>
                        <input
                          type="text"
                          value={editedData?.vehicle?.year || ''}
                          onChange={(e) => handleVehicleChange('year', e.target.value)}
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">License Plate</label>
                        <input
                          type="text"
                          value={editedData?.vehicle?.licensePlate || ''}
                          onChange={(e) => handleVehicleChange('licensePlate', e.target.value)}
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-5">
                        <p className="text-gray-400 text-sm mb-2">Model</p>
                        <div className="flex items-center space-x-2">
                          <FiTruck className="text-blue-500" />
                          <p className="text-xl font-bold">{userData?.vehicle?.model || 'Not set'}</p>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-5">
                        <p className="text-gray-400 text-sm mb-2">Year & Range</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xl font-bold">{userData?.vehicle?.year || 'Not set'}</p>
                            <p className="text-sm text-gray-400">{userData?.vehicle?.range || 'N/A'}</p>
                          </div>
                          <FiBatteryCharging className="text-green-500 text-2xl" />
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-5">
                        <p className="text-gray-400 text-sm mb-2">License Plate</p>
                        <div className="flex items-center space-x-2">
                          <div className="px-3 py-1 bg-gray-800 rounded-lg">
                            <p className="text-xl font-bold font-mono">{userData?.vehicle?.licensePlate || 'Not set'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Personal Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold flex items-center">
                      <FiUser className="mr-2 text-blue-400" />
                      Personal Information
                    </h3>
                    <button 
                      onClick={handleEdit}
                      className="text-sm text-blue-400 hover:text-blue-300 flex items-center"
                    >
                      <FiEdit className="mr-1" />
                      Edit Details
                    </button>
                  </div>
                  
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                          <input
                            type="email"
                            value={editedData?.email || ''}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                          <input
                            type="tel"
                            value={editedData?.phone || ''}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Location</label>
                        <input
                          type="text"
                          value={editedData?.location || ''}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-5">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <FiMail className="text-blue-400" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Email</p>
                            <p className="font-bold">{userData?.email || 'Not set'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-5">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                            <FiPhone className="text-green-400" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Phone</p>
                            <p className="font-bold">{userData?.phone || 'Not set'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-5">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                            <FiMapPin className="text-orange-400" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Location</p>
                            <p className="font-bold">{userData?.location || 'Not set'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </>
            )}

            {activeSection === 'v2v' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold flex items-center">
                    <FiZap className="mr-2 text-purple-400" />
                    Vehicle-to-Vehicle (V2V) Settings
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full animate-pulse ${editedData.v2vSettings?.enabled ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-sm">{editedData.v2vSettings?.enabled ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
                    <div>
                      <p className="font-medium">V2V Power Sharing</p>
                      <p className="text-sm text-gray-400">Share power with other EVs</p>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={editedData.v2vSettings?.enabled || false}
                        onChange={toggleV2V}
                        className="sr-only"
                      />
                      <div 
                        className={`w-14 h-7 rounded-full transition-colors cursor-pointer ${editedData.v2vSettings?.enabled ? 'bg-purple-600' : 'bg-gray-700'}`}
                        onClick={toggleV2V}
                      >
                        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${editedData.v2vSettings?.enabled ? 'translate-x-8' : 'translate-x-1'}`} />
                      </div>
                    </div>
                  </div>

                  {editedData.v2vSettings?.enabled && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-900/50 rounded-lg">
                          <label className="block text-gray-400 text-sm mb-2">Sharing Range</label>
                          <select
                            value={editedData.v2vSettings?.sharingRange || '5km'}
                            onChange={(e) => handleV2VChange('sharingRange', e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                          >
                            <option value="1km">1 km</option>
                            <option value="3km">3 km</option>
                            <option value="5km">5 km</option>
                            <option value="10km">10 km</option>
                          </select>
                        </div>
                        <div className="p-4 bg-gray-900/50 rounded-lg">
                          <label className="block text-gray-400 text-sm mb-2">Power Limit</label>
                          <select
                            value={editedData.v2vSettings?.powerLimit || '5kW'}
                            onChange={(e) => handleV2VChange('powerLimit', e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                          >
                            <option value="1kW">1 kW</option>
                            <option value="3kW">3 kW</option>
                            <option value="5kW">5 kW</option>
                            <option value="10kW">10 kW</option>
                          </select>
                        </div>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg">
                        <div className="flex items-center space-x-3 mb-3">
                          <FiZap className="text-purple-400" />
                          <h4 className="font-bold">Quick Actions</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <button
                            onClick={initiateV2VTransfer}
                            className="flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                          >
                            <FiShare2 />
                            <span>Initiate Power Transfer</span>
                          </button>
                          <button
                            onClick={navigateToV2VPage}
                            className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            <FiMessageSquare />
                            <span>Open V2V Chat</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {activeSection === 'payments' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold flex items-center">
                    <FiDollarSign className="mr-2 text-green-400" />
                    Quick Payments
                  </h3>
                  <button 
                    onClick={navigateToPaymentPage}
                    className="text-sm text-blue-400 hover:text-blue-300 flex items-center"
                  >
                    View Full History →
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Quick Payment Amounts */}
                  <div>
                    <p className="text-gray-400 mb-3">Quick Pay Amounts</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {quickPaymentAmounts.map((amount) => (
                        <button
                          key={amount}
                          onClick={() => handleQuickPayment(amount)}
                          className="p-4 bg-gray-900/50 hover:bg-gray-800/70 rounded-lg transition-colors text-center"
                        >
                          <div className="text-xl font-bold">Ksh {amount.toLocaleString()}</div>
                          <div className="text-xs text-gray-400 mt-1">Click to pay</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Payment */}
                  <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg">
                    <p className="font-medium mb-3">Custom Payment Amount</p>
                    <div className="flex space-x-3">
                      <input
                        type="number"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500"
                      />
                      <button
                        onClick={handleMakePayment}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg font-bold transition-all"
                      >
                        Pay Now
                      </button>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                      <FiShield className="inline mr-1" />
                      Secure payment processing with M-Pesa integration
                    </p>
                  </div>

                  {/* Payment Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-900/50 rounded-lg">
                      <p className="text-gray-400 text-sm">Total Paid</p>
                      <p className="text-2xl font-bold text-green-400">
                        Ksh {(userData?.stats?.totalPayments || 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-900/50 rounded-lg">
                      <p className="text-gray-400 text-sm">Pending</p>
                      <p className="text-2xl font-bold text-yellow-400">
                        Ksh {(userData?.stats?.pendingPayments || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Account Status Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-700/30"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FiShield className="mr-2 text-yellow-400" />
                Account Status
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Subscription</span>
                  <span className="font-bold">{(userData?.subscription || 'premium').toUpperCase()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Safety Score</span>
                  <span className="font-bold text-green-400">{userData?.stats?.safetyScore || 0}/100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Community Rating</span>
                  <span className="font-bold text-yellow-400">{userData?.stats?.communityRating || 0}/5.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Member Since</span>
                  <span className="font-bold">{new Date(userData?.joinedDate || '2023-01-15').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                </div>
                <div className="pt-4 border-t border-gray-700">
                  <button 
                    onClick={navigateToPaymentPage}
                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg font-bold transition-all"
                  >
                    <FiCreditCard className="inline mr-2" />
                    Manage Subscription
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FiSettings className="mr-2 text-gray-400" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/settings')}
                  className="w-full text-left px-4 py-3 bg-gray-900/50 hover:bg-gray-800/70 rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>Account Settings</span>
                  <FiSettings className="text-gray-400" />
                </button>
                <button 
                  onClick={() => navigate('/payment')}
                  className="w-full text-left px-4 py-3 bg-gray-900/50 hover:bg-gray-800/70 rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>Payment Methods</span>
                  <FiCreditCard className="text-gray-400" />
                </button>
                <button 
                  onClick={navigateToV2VPage}
                  className="w-full text-left px-4 py-3 bg-gray-900/50 hover:bg-gray-800/70 rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>V2V Network</span>
                  <FiWifi className="text-gray-400" />
                </button>
                <button 
                  onClick={() => navigate('/notifications')}
                  className="w-full text-left px-4 py-3 bg-gray-900/50 hover:bg-gray-800/70 rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>Notifications</span>
                  <FiBell className="text-gray-400" />
                </button>
              </div>
            </motion.div>

            {/* Profile Completion Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold flex items-center">
                  <FiUser className="mr-2" />
                  Profile Completion
                </h3>
                <span className="text-green-400 font-bold">85%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Complete your profile to unlock all features
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                  <span>Basic Information ✓</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                  <span>Contact Details ✓</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                  <span>Vehicle Information ✓</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                  <span>V2V Settings</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-gray-600 mr-2"></div>
                  <span>Payment Methods</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Profile Picture Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Change Profile Picture</h3>
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setImagePreview('');
                  }}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              {/* Image Preview */}
              <div className="mb-6">
                <div className="flex justify-center">
                  <div className="relative">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-48 h-48 rounded-full object-cover border-4 border-gray-700"
                      />
                    ) : profilePic ? (
                      <img
                        src={profilePic}
                        alt="Current"
                        className="w-48 h-48 rounded-full object-cover border-4 border-gray-700"
                      />
                    ) : (
                      <div className="w-48 h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center border-4 border-gray-700">
                        <span className="text-white font-bold text-4xl">{getInitials()}</span>
                      </div>
                    )}
                    
                    {uploadingPic && (
                      <div className="absolute inset-0 bg-black/70 rounded-full flex items-center justify-center">
                        <FiRefreshCw className="text-white text-4xl animate-spin" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Upload Options */}
              <div className="space-y-4">
                {/* File Upload */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Upload from device</label>
                  <div className="relative">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-700 transition-colors">
                      <div className="flex items-center space-x-3">
                        <FiUpload className="text-gray-400" />
                        <span>Choose an image</span>
                      </div>
                      <span className="text-xs text-gray-400">Max 5MB</span>
                    </div>
                  </div>
                </div>

                {/* URL Input */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Or enter image URL</label>
                  <button
                    onClick={handleUrlProfilePic}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-700 transition-colors"
                  >
                    <FiGlobe />
                    <span>Enter Image URL</span>
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowUploadModal(false);
                      setImagePreview('');
                    }}
                    className="px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUploadProfilePic}
                    disabled={!imagePreview || uploadingPic}
                    className={`px-4 py-3 rounded-lg transition-all font-bold ${
                      !imagePreview || uploadingPic
                        ? 'bg-gray-700 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                    }`}
                  >
                    {uploadingPic ? (
                      <span className="flex items-center justify-center">
                        <FiRefreshCw className="animate-spin mr-2" />
                        Uploading...
                      </span>
                    ) : (
                      'Upload Picture'
                    )}
                  </button>
                </div>

                {/* Remove Picture Button */}
                {profilePic && (
                  <button
                    onClick={handleRemoveProfilePic}
                    className="w-full px-4 py-3 bg-red-900/20 hover:bg-red-900/30 text-red-400 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <FiX />
                    <span>Remove Current Picture</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
