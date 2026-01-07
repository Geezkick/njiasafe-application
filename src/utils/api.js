const API_BASE_URL = 'https://api.njiasafe.com/v1';

export const api = {
  login: async (email, password) => new Promise((resolve) => setTimeout(() => resolve({
    success: true, token: 'premium_user_token', user: { id: 'user_001', name: 'Premium User', email, role: 'premium' }
  }), 1000)),
  register: async (userData) => new Promise((resolve) => setTimeout(() => resolve({
    success: true, token: 'premium_user_token', user: userData
  }), 1500)),
  getRoutes: async (from, to, mode) => new Promise((resolve) => setTimeout(() => resolve({
    routes: [{ id: 'route_001', name: 'Premium Safe Route', duration: '15 min', distance: '8.2 km', safetyScore: 9.8, alerts: [], premium: true }]
  }), 800)),
  getChargingStations: async (location) => new Promise((resolve) => setTimeout(() => resolve({
    stations: [{ id: 'station_001', name: 'Premium Charging Hub', available: true, fastCharging: true }]
  }), 800)),
  getCommunityPosts: async () => new Promise((resolve) => setTimeout(() => resolve({ posts: [] }), 800))
};

export const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('njiasafe_token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const config = { ...options, headers };
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Request failed');
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};
