// This can be called on app initialization to set up a default user
const setupDefaultUser = () => {
  const userData = localStorage.getItem('njiasafe_user');
  if (!userData) {
    const defaultUser = {
      name: 'Brian Kamau',
      email: 'brian@example.com',
      subscription: 'premium',
      profilePic: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      phone: '+254 712 345 678',
      location: 'Nairobi, Kenya',
      joinedDate: '2023-01-15',
      plan: 'PREMIUM',
      status: 'ACTIVE',
      trial: false,
      startedAt: '2026-01-03T14:05:05.334Z',
      expiresAt: '2027-01-03T14:05:05.334Z',
      vehicle: {
        model: 'Tesla Model 3',
        year: '2022',
        licensePlate: 'KCA 123A'
      },
      stats: {
        trips: 24,
        distance: '1,240 km',
        carbonSaved: '45 kg',
        chargingSessions: 12,
        safetyScore: 95,
        communityRating: 4.8
      },
      preferences: {
        language: 'en',
        notifications: true,
        darkMode: true,
        autoRoutePlanning: true
      }
    };
    localStorage.setItem('njiasafe_user', JSON.stringify(defaultUser));
    localStorage.setItem('njiasafe_token', 'demo_token_12345');
    localStorage.setItem('njiasafe_subscription', 'premium');
  }
};

// Get user profile picture
const getUserProfilePic = () => {
  const userData = localStorage.getItem('njiasafe_user');
  if (userData) {
    try {
      const parsedData = JSON.parse(userData);
      return parsedData.profilePic || '';
    } catch (error) {
      console.error('Error parsing user data:', error);
      return '';
    }
  }
  return '';
};

// Update user profile picture
const updateUserProfilePic = (newProfilePic) => {
  const userData = localStorage.getItem('njiasafe_user');
  if (userData) {
    try {
      const parsedData = JSON.parse(userData);
      parsedData.profilePic = newProfilePic;
      localStorage.setItem('njiasafe_user', JSON.stringify(parsedData));
      return true;
    } catch (error) {
      console.error('Error updating profile picture:', error);
      return false;
    }
  }
  return false;
};

// Get user data
const getUserData = () => {
  const userData = localStorage.getItem('njiasafe_user');
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }
  return null;
};

// Update user data
const updateUserData = (updatedData) => {
  const currentData = getUserData();
  if (currentData) {
    const newData = { ...currentData, ...updatedData };
    localStorage.setItem('njiasafe_user', JSON.stringify(newData));
    return true;
  }
  return false;
};

export { 
  setupDefaultUser, 
  getUserProfilePic, 
  updateUserProfilePic,
  getUserData,
  updateUserData 
};
