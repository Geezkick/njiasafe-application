// Simple translation hook that returns English only
export const useTranslation = () => {
  const t = (key, params = {}) => {
    // Return English translations or the key itself
    const translations = {
      'welcome_back': 'Welcome back, {name}!',
      'smart_map': 'Smart Map',
      'interactive_maps': 'Interactive maps & real-time traffic',
      'v2v_connect': 'V2V Connect',
      'vehicle_network': 'Vehicle-to-vehicle network',
      'ev_charging': 'EV Charging',
      'charging_stations': 'Charging stations locator',
      'community': 'Community',
      'user_community': 'User community & alerts',
      'social': 'Social Platform',
      'social_platform': 'Social platform for users',
      'insurance': 'Insurance',
      'gov_coverage': 'Government coverage',
      'total_trips': 'Total Trips',
      'distance_covered': 'Distance Covered',
      'carbon_saved': 'Carbon Saved',
      'charging_sessions': 'Charging Sessions',
      'your_journey_overview': 'Your Journey Overview',
      'quick_actions': 'Quick Actions',
      'view_all_features': 'View All Features',
      'recent_activity': 'Recent Activity',
      'see_all': 'See All',
      'view': 'View',
      'premium_features': 'Premium Features',
      'enhanced_insurance': 'Enhanced Insurance',
      'easy_payments': 'Easy Payments',
      'advanced_analytics': 'Advanced Analytics',
      'pay_now': 'Pay Now',
      'explore': 'Explore',
      'connected': 'Connected',
      'plan': 'PLAN',
      'todays_date': "Today's Date",
      'trip_to_mombasa': 'Nairobi to Mombasa',
      'ev_charging_session': 'EV Charging Session',
      'new_community_post': 'New Community Post',
      'route_alert_resolved': 'Route Alert Resolved',
      'gov_backed_coverage': 'Government-backed coverage',
      'manage_subs': 'Manage subscriptions & bills',
      'detailed_insights': 'Detailed journey insights',
      'dashboard_welcome': "Here's what's happening with your NJIA SAFE experience today.",
    };
    
    let text = translations[key] || key;
    
    // Replace parameters
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    
    return text;
  };

  return {
    t,
    language: 'en',
    setLanguage: () => {}, // Empty function
  };
};
