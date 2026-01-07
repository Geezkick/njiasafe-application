export const isAuthenticated = () => !!localStorage.getItem('njiasafe_token');
export const logout = () => {
  localStorage.removeItem('njiasafe_token');
  window.location.href = '/login';
};
export const getCurrentUser = () => ({
  id: 'user_001', name: 'Premium User', email: 'premium@njiasafe.com',
  role: 'premium', subscription: 'premium_plus', memberSince: '2023-01-15'
});
