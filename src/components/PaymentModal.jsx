import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCreditCard, FiSmartphone, FiLock, FiCheck } from 'react-icons/fi';
import AnimatedButton from './AnimatedButton';

const PaymentModal = ({ isOpen, onClose, amount, description }) => {
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });

  const handlePayment = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 2000);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-premium-card rounded-2xl max-w-md w-full overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Complete Payment</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">✕</button>
            </div>
            <div className="mt-4">
              <p className="text-gray-400">{description}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-3xl font-bold text-njia-orange">KES {amount.toLocaleString()}</span>
                <div className="flex items-center space-x-2"><FiLock className="text-green-500" /><span className="text-sm text-gray-400">Secure Payment</span></div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              <div onClick={() => setPaymentMethod('mpesa')} className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'mpesa' ? 'border-njia-orange bg-njia-orange/10' : 'border-gray-800 hover:border-gray-700'}`}>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${paymentMethod === 'mpesa' ? 'bg-njia-orange' : 'bg-gray-800'}`}><FiSmartphone className="w-6 h-6" /></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center"><h3 className="font-semibold">M-Pesa</h3>{paymentMethod === 'mpesa' && <FiCheck className="text-njia-orange" />}</div>
                    <p className="text-sm text-gray-400">Pay via M-Pesa</p>
                  </div>
                </div>
                {paymentMethod === 'mpesa' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
                    <label className="block text-sm text-gray-400 mb-2">Enter M-Pesa Number</label>
                    <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="07XX XXX XXX" className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-orange" />
                    <p className="text-xs text-gray-500 mt-2">You will receive a prompt on your phone to complete the payment</p>
                  </motion.div>
                )}
              </div>

              <div onClick={() => setPaymentMethod('card')} className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-njia-purple bg-njia-purple/10' : 'border-gray-800 hover:border-gray-700'}`}>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${paymentMethod === 'card' ? 'bg-njia-purple' : 'bg-gray-800'}`}><FiCreditCard className="w-6 h-6" /></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center"><h3 className="font-semibold">Debit/Credit Card</h3>{paymentMethod === 'card' && <FiCheck className="text-njia-purple" />}</div>
                    <p className="text-sm text-gray-400">Pay with card</p>
                  </div>
                </div>
                {paymentMethod === 'card' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 space-y-3">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Card Number</label>
                      <input type="text" value={cardDetails.number} onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})} placeholder="1234 5678 9012 3456" className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-purple" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Expiry Date</label>
                        <input type="text" value={cardDetails.expiry} onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})} placeholder="MM/YY" className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-purple" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">CVV</label>
                        <input type="text" value={cardDetails.cvv} onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})} placeholder="123" className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-njia-purple" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="mt-8">
              {isSuccess ? (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><FiCheck className="w-8 h-8 text-green-500" /></div>
                  <h3 className="text-xl font-bold text-green-500">Payment Successful!</h3>
                  <p className="text-gray-400 mt-2">Your premium access has been activated</p>
                </div>
              ) : (
                <AnimatedButton onClick={handlePayment} loading={isProcessing} disabled={isProcessing || (paymentMethod === 'mpesa' && !phoneNumber) || (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv))} fullWidth size="large">
                  {isProcessing ? 'Processing Payment...' : `Pay KES ${amount.toLocaleString()}`}
                </AnimatedButton>
              )}
              <p className="text-center text-xs text-gray-500 mt-4">Your payment is secure and encrypted</p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default PaymentModal;
