import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCreditCard, FiSmartphone, FiShield, FiCheckCircle, FiLock, FiGlobe, FiDownload, FiShare2, FiClock, FiRepeat, FiArrowRight, FiArrowLeft, FiHelpCircle, FiUser, FiZap, FiStar, FiTool, FiBell } from 'react-icons/fi';
import AnimatedButton from '../components/AnimatedButton';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [phoneNumber, setPhoneNumber] = useState('+254 7');
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [autoRenewal, setAutoRenewal] = useState(true);

  const subscriptionPlans = [
    { 
      id: 'basic', 
      name: 'Basic', 
      price: 'Ksh 299', 
      period: '/month', 
      features: [
        { icon: <FiUser />, text: 'Basic Route Planning' },
        { icon: <FiUser />, text: 'Community Access' },
        { icon: <FiShield />, text: 'Basic Safety Alerts' },
        { icon: <FiClock />, text: 'Standard Support' }
      ], 
      color: 'from-gray-600 to-gray-700',
      billingCycle: 'monthly'
    },
    { 
      id: 'premium', 
      name: 'Premium', 
      price: 'Ksh 899', 
      period: '/month', 
      features: [
        { icon: <FiZap />, text: 'Advanced AI Routing' },
        { icon: <FiSmartphone />, text: 'EV Station Maps' },
        { icon: <FiShield />, text: 'Real-time Police Patrol Data' },
        { icon: <FiStar />, text: 'Priority 24/7 Support' },
        { icon: <FiBell />, text: 'Custom Safety Notifications' }
      ], 
      color: 'from-njia-darkblue to-njia-purple', 
      popular: true,
      billingCycle: 'monthly'
    },
    { 
      id: 'enterprise', 
      name: 'Enterprise', 
      price: 'Ksh 2,499', 
      period: '/month', 
      features: [
        { icon: <FiTool />, text: 'All Premium Features' },
        { icon: <FiGlobe />, text: 'API Access & Webhooks' },
        { icon: <FiTool />, text: 'Custom Integration' },
        { icon: <FiUser />, text: 'Dedicated Account Manager' },
        { icon: <FiStar />, text: 'Advanced Analytics Dashboard' },
        { icon: <FiShare2 />, text: 'Team Management Tools' }
      ], 
      color: 'from-njia-orange to-orange-600',
      billingCycle: 'monthly'
    }
  ];

  const paymentMethods = [
    { id: 'mpesa', name: 'M-Pesa', icon: <FiSmartphone />, description: 'Pay via Safaricom M-Pesa', color: 'from-green-500 to-emerald-600' },
    { id: 'card', name: 'Debit/Credit Card', icon: <FiCreditCard />, description: 'Visa, Mastercard, or Amex', color: 'from-blue-500 to-cyan-600' },
    { id: 'bank', name: 'Bank Transfer', icon: <FiGlobe />, description: 'Direct bank transfer', color: 'from-purple-500 to-pink-600' },
    { id: 'airtel', name: 'Airtel Money', icon: <FiSmartphone />, description: 'Pay via Airtel Money', color: 'from-red-500 to-red-600' }
  ];

  const recentTransactions = [
    { id: 1, type: 'M-Pesa', amount: 'Ksh 899', status: 'Completed', date: 'Today', description: 'Premium Subscription', icon: '🟢' },
    { id: 2, type: 'Card', amount: 'Ksh 299', status: 'Completed', date: '1 week ago', description: 'Basic Subscription', icon: '💳' },
    { id: 3, type: 'M-Pesa', amount: 'Ksh 899', status: 'Completed', date: '1 month ago', description: 'Premium Subscription', icon: '🟢' },
    { id: 4, type: 'Bank', amount: 'Ksh 2,499', status: 'Pending', date: '2 days ago', description: 'Enterprise Upgrade', icon: '🏦' }
  ];

  const securityFeatures = [
    { icon: <FiLock />, text: '256-bit SSL Encryption' },
    { icon: <FiShield />, text: 'PCI DSS Compliant' },
    { icon: <FiCheckCircle />, text: '3D Secure Authentication' },
    { icon: <FiGlobe />, text: 'Secure Cloud Storage' }
  ];

  const handleCardInput = (field, value) => {
    let formattedValue = value;
    
    if (field === 'number') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.substring(0, 19);
    }
    
    if (field === 'expiry') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2, 4);
      }
      if (formattedValue.length > 5) formattedValue = formattedValue.substring(0, 5);
    }
    
    if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 4) formattedValue = formattedValue.substring(0, 4);
    }
    
    setCardDetails(prev => ({ ...prev, [field]: formattedValue }));
  };

  const handleMpesaPayment = () => {
    if (!phoneNumber || phoneNumber.length < 12) {
      alert('Please enter a valid Kenyan phone number (+254 XXX XXX XXX)');
      return;
    }

    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setTransactionSuccess(true);
      
      setTimeout(() => {
        setTransactionSuccess(false);
      }, 5000);
    }, 3000);
  };

  const handleCardPayment = () => {
    const cleanCardNumber = cardDetails.number.replace(/\s/g, '');
    
    if (!cleanCardNumber || cleanCardNumber.length < 16) {
      alert('Please enter a valid 16-digit card number');
      return;
    }
    if (!cardDetails.name.trim()) {
      alert('Please enter cardholder name');
      return;
    }
    if (!cardDetails.expiry || cardDetails.expiry.length < 5) {
      alert('Please enter valid expiry date (MM/YY)');
      return;
    }
    if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
      alert('Please enter valid CVV (3-4 digits)');
      return;
    }

    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setTransactionSuccess(true);
      
      setTimeout(() => {
        setTransactionSuccess(false);
      }, 5000);
    }, 3000);
  };

  const handlePayment = () => {
    if (paymentMethod === 'mpesa') {
      handleMpesaPayment();
    } else if (paymentMethod === 'card') {
      handleCardPayment();
    } else if (paymentMethod === 'airtel') {
      alert('Airtel Money payment coming soon!');
    } else {
      alert('Bank transfer instructions have been sent to your email.');
    }
  };

  const calculateDiscount = (planId) => {
    if (planId === 'premium') return 'Save 20%';
    if (planId === 'enterprise') return 'Save 30%';
    return null;
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-njia-orange bg-clip-text text-transparent">
              Payment & Subscription
            </h1>
            <p className="text-gray-400 mt-2">Manage your payments and unlock premium features</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <AnimatedButton variant="outline">
              <FiDownload className="mr-2" />
              Invoice History
            </AnimatedButton>
            <AnimatedButton>
              <FiShare2 className="mr-2" />
              Share Plan
            </AnimatedButton>
          </div>
        </div>
      </div>

      {transactionSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-8 p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-pulse">
              <FiCheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold">Payment Successful! 🎉</h3>
              <p className="text-gray-300">
                Your payment has been processed successfully. Premium features are now activated.
                A confirmation email has been sent to your registered email address.
              </p>
            </div>
            <button 
              onClick={() => setTransactionSuccess(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-premium-card rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-300">Select Payment Method</h3>
              <div className="flex items-center space-x-2">
                <FiShield className="text-green-500" />
                <span className="text-sm text-gray-400">Secure Payment</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300 ${
                    paymentMethod === method.id
                      ? `border-njia-orange bg-gradient-to-b ${method.color}/10 scale-105`
                      : 'border-gray-800 hover:border-gray-700 hover:bg-gray-900/50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${method.color} flex items-center justify-center mb-3`}>
                    <span className="text-xl text-white">{method.icon}</span>
                  </div>
                  <h4 className="font-bold text-sm mb-1">{method.name}</h4>
                  <p className="text-xs text-gray-400 text-center">{method.description}</p>
                  {paymentMethod === method.id && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-2 w-5 h-5 bg-njia-orange rounded-full flex items-center justify-center"
                    >
                      <FiCheckCircle className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>

            <div className="space-y-6 mb-8">
              {paymentMethod === 'mpesa' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+254 712 345 678"
                        className="w-full px-12 py-4 bg-gray-900/50 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange focus:ring-1 focus:ring-njia-orange/50"
                      />
                      <FiSmartphone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                        🇰🇪 KE
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">Enter your Safaricom M-Pesa registered number</p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <FiHelpCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-green-400">M-Pesa Payment Instructions</p>
                        <ol className="text-sm text-gray-300 mt-2 space-y-2">
                          <li className="flex items-center">
                            <span className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-2">1</span>
                            Enter your phone number above
                          </li>
                          <li className="flex items-center">
                            <span className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-2">2</span>
                            Click "Pay with M-Pesa"
                          </li>
                          <li className="flex items-center">
                            <span className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-2">3</span>
                            Check your phone for M-Pesa prompt
                          </li>
                          <li className="flex items-center">
                            <span className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-2">4</span>
                            Enter your M-Pesa PIN to complete
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardDetails.number}
                        onChange={(e) => handleCardInput('number', e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-12 py-4 bg-gray-900/50 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange focus:ring-1 focus:ring-njia-orange/50"
                      />
                      <FiCreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex space-x-2">
                        <span className="text-gray-400">💳</span>
                        <span className="text-gray-400">💲</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardDetails.name}
                        onChange={(e) => handleCardInput('name', e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange focus:ring-1 focus:ring-njia-orange/50"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiry Date</label>
                        <input
                          type="text"
                          value={cardDetails.expiry}
                          onChange={(e) => handleCardInput('expiry', e.target.value)}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange focus:ring-1 focus:ring-njia-orange/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV</label>
                        <div className="relative">
                          <input
                            type="password"
                            value={cardDetails.cvv}
                            onChange={(e) => handleCardInput('cvv', e.target.value)}
                            placeholder="123"
                            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange focus:ring-1 focus:ring-njia-orange/50"
                          />
                          <FiLock className="absolute right-3 top-3 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FiShield className="text-green-500" />
                      <p className="text-sm text-gray-400">Secure & encrypted payment</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className="text-2xl">🔒</span>
                      <span className="text-2xl">🛡️</span>
                      <span className="text-2xl">✅</span>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <FiGlobe className="text-blue-500" />
                      <h4 className="font-bold text-lg">Bank Transfer Details</h4>
                    </div>
                    <div className="space-y-3">
                      {[
                        ['Bank Name:', 'Equity Bank Kenya', '🏦'],
                        ['Account Name:', 'NJIA SAFE LTD', '🏢'],
                        ['Account Number:', '1234567890', '🔢'],
                        ['Branch Code:', '123', '📍'],
                        ['Swift Code:', 'EQBLKENA', '🌍']
                      ].map(([label, value, emoji]) => (
                        <div key={label} className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-400">{emoji}</span>
                            <span className="text-gray-400">{label}</span>
                          </div>
                          <span className="font-mono font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-3 bg-gray-900/50 rounded-lg">
                      <p className="text-sm text-gray-400">
                        <span className="font-bold text-yellow-500">Important:</span> Use your email as the reference when making the transfer. Processing may take 1-2 business days.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'airtel' && (
                <div className="text-center p-8 space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto">
                    <FiSmartphone className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-xl font-bold">Airtel Money Coming Soon!</h4>
                  <p className="text-gray-400">
                    We're working on integrating Airtel Money payments. In the meantime, please use M-Pesa or other available payment methods.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-800">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
                <div>
                  <p className="text-gray-400">Selected Plan</p>
                  <p className="text-2xl font-bold">Premium Monthly</p>
                  <p className="text-sm text-gray-400 mt-1">Billed monthly, cancel anytime</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">Total Amount</p>
                  <p className="text-3xl font-bold text-njia-orange">Ksh 899</p>
                  <p className="text-sm text-green-500 mt-1">
                    <FiCheckCircle className="inline w-3 h-3 mr-1" />
                    Includes all taxes
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="autoRenewal"
                    checked={autoRenewal}
                    onChange={(e) => setAutoRenewal(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-700 bg-gray-900 text-njia-orange focus:ring-njia-orange"
                  />
                  <label htmlFor="autoRenewal" className="text-gray-300">
                    <span className="font-medium">Enable Auto-Renewal</span>
                    <span className="text-gray-400 text-sm ml-2">(Get 10% discount)</span>
                  </label>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Next billing date</p>
                  <p className="font-medium">Jan 15, 2024</p>
                </div>
              </div>

              <AnimatedButton 
                onClick={handlePayment} 
                loading={isProcessing}
                fullWidth
                size="large"
                disabled={paymentMethod === 'airtel'}
              >
                {isProcessing ? (
                  <>
                    <FiRepeat className="animate-spin mr-2" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    {paymentMethod === 'airtel' ? 'Coming Soon' : `Pay with ${paymentMethod === 'mpesa' ? 'M-Pesa' : paymentMethod === 'card' ? 'Card' : paymentMethod === 'bank' ? 'Bank' : 'Airtel'}`}
                    <FiArrowRight className="ml-2" />
                  </>
                )}
              </AnimatedButton>
              
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
                <div className="flex items-center">
                  <FiLock className="w-3 h-3 mr-1" />
                  <span>Your payment is secure and encrypted</span>
                </div>
                <div className="mt-2 sm:mt-0">
                  <span>By proceeding, you agree to our </span>
                  <a href="#" className="text-njia-orange hover:underline">Terms</a>
                  <span> and </span>
                  <a href="#" className="text-njia-orange hover:underline">Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-premium-card rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-300">Recent Transactions</h3>
              <button className="text-sm text-njia-orange hover:text-orange-400 flex items-center">
                View All
                <FiArrowRight className="ml-1" />
              </button>
            </div>
            
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <motion.div 
                  key={transaction.id}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-900/30 hover:bg-gray-900/50 transition-all border border-gray-800"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                      transaction.type === 'M-Pesa' ? 'bg-green-500/10 text-green-500' :
                      transaction.type === 'Card' ? 'bg-blue-500/10 text-blue-500' :
                      'bg-purple-500/10 text-purple-500'
                    }`}>
                      {transaction.icon}
                    </div>
                    <div>
                      <p className="font-semibold">{transaction.description}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <p className="text-sm text-gray-400 flex items-center">
                          <FiClock className="w-3 h-3 mr-1" />
                          {transaction.date}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          transaction.status === 'Completed' 
                            ? 'bg-green-500/20 text-green-500' 
                            : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{transaction.amount}</p>
                    <p className="text-sm text-gray-400">{transaction.type}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gray-900/30 rounded-lg border border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Spent This Month</p>
                  <p className="text-2xl font-bold">Ksh 1,198</p>
                </div>
                <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-sm">
                  Download Statement
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-premium-card rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-300">Subscription Plans</h3>
              <div className="flex items-center space-x-2">
                <FiStar className="text-yellow-500" />
                <span className="text-sm text-gray-400">Upgrade Anytime</span>
              </div>
            </div>
            
            <div className="space-y-6">
              {subscriptionPlans.map((plan) => (
                <motion.div 
                  key={plan.id}
                  whileHover={{ y: -5 }}
                  className={`relative p-6 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedPlan === plan.id
                      ? 'border-njia-orange bg-gradient-to-b from-gray-900 to-black scale-105'
                      : plan.popular
                      ? 'border-njia-orange/50 bg-gradient-to-b from-gray-900/50 to-black hover:border-njia-orange'
                      : 'border-gray-800 hover:border-gray-700 bg-gray-900/30'
                  } ${selectedPlan === plan.id ? 'ring-2 ring-njia-orange/30' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <span className="px-3 py-1 bg-gradient-to-r from-njia-orange to-red-600 text-xs font-bold rounded-full shadow-lg">
                        🔥 MOST POPULAR
                      </span>
                    </div>
                  )}
                  
                  {calculateDiscount(plan.id) && (
                    <div className="absolute -top-2 right-4">
                      <span className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-xs font-bold rounded-full">
                        {calculateDiscount(plan.id)}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold">{plan.name}</h4>
                      <div className="flex items-baseline mt-2">
                        <span className="text-3xl font-bold">{plan.price}</span>
                        <span className="text-gray-400 ml-2">{plan.period}</span>
                      </div>
                    </div>
                    {selectedPlan === plan.id && (
                      <div className="w-6 h-6 bg-njia-orange rounded-full flex items-center justify-center">
                        <FiCheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center">
                          <span className="text-gray-300">{feature.icon}</span>
                        </div>
                        <span className="text-sm">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    className={`w-full py-3 rounded-lg font-medium transition-all ${
                      selectedPlan === plan.id
                        ? 'bg-gradient-to-r from-njia-orange to-red-600 hover:from-orange-600 hover:to-red-700'
                        : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                    }`}
                  >
                    {selectedPlan === plan.id ? 'Current Plan' : 'Select Plan'}
                  </button>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-800">
              <h4 className="font-semibold mb-4">Billing Frequency</h4>
              <div className="grid grid-cols-2 gap-3">
                {['Monthly', 'Yearly'].map((freq) => (
                  <button
                    key={freq}
                    className={`py-3 rounded-lg border transition-all ${
                      freq === 'Monthly'
                        ? 'border-njia-orange bg-njia-orange/10 text-njia-orange'
                        : 'border-gray-700 hover:border-gray-600 text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    {freq}
                    {freq === 'Yearly' && (
                      <span className="ml-2 text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">
                        Save 25%
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-premium-card rounded-xl p-6 border border-gray-800">
            <h3 className="text-xl font-semibold text-gray-300 mb-6">Security Features</h3>
            <div className="grid grid-cols-2 gap-4">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="p-4 rounded-lg bg-gray-900/30 border border-gray-800">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-3">
                    <span className="text-blue-500">{feature.icon}</span>
                  </div>
                  <p className="text-sm font-medium">{feature.text}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <FiShield className="text-green-500 text-2xl" />
                <div>
                  <p className="font-bold">Your Security is Our Priority</p>
                  <p className="text-sm text-gray-300 mt-1">
                    We use bank-level security and never store your payment details on our servers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-premium-card rounded-xl p-6 border border-gray-800">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Need Help?</h3>
            <p className="text-gray-400 mb-6">
              Our support team is available 24/7 to assist with any payment or subscription issues.
            </p>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-900/30 hover:bg-gray-900/50 border border-gray-800 transition-colors">
                <span>Payment FAQs</span>
                <FiArrowRight className="text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-900/30 hover:bg-gray-900/50 border border-gray-800 transition-colors">
                <span>Contact Support</span>
                <FiArrowRight className="text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-900/30 hover:bg-gray-900/50 border border-gray-800 transition-colors">
                <span>Cancel Subscription</span>
                <FiArrowRight className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
