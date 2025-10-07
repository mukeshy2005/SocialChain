// src/components/BoostModal.jsx

import React, { useState } from 'react';
import { ethers } from 'ethers';
import LoadingSpinner from './LoadingSpinner';

const BoostModal = ({ onClose, contract, postId, reload }) => {
  const [amount, setAmount] = useState('');
  const [isBoosting, setIsBoosting] = useState(false);
  const [error, setError] = useState('');

  const handleConfirmBoost = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    setError('');
    setIsBoosting(true);

    try {
      const tx = await contract.boostPost(postId, { value: ethers.parseEther(amount) });
      await tx.wait();
      alert('Boost successful!');
      reload && reload();
      onClose();
    } catch (err) {
      console.error("Boost error", err);
      const reason = err?.reason || err?.message || 'Boost failed. Please check the console.';
      setError(reason);
      alert(reason); // Also alert the user
    } finally {
      setIsBoosting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-[#1A1A1D] border border-gray-700/50 rounded-xl p-6 shadow-2xl w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          &times;
        </button>
        
        <h2 className="text-xl font-bold text-white mb-4">Boost Post</h2>
        <p className="text-gray-400 mb-6">Invest in this post's potential. Your boost increases its visibility and your potential returns.</p>
        
        <div className="mb-4">
          <label htmlFor="boost-amount" className="block text-sm font-medium text-gray-300 mb-2">
            Amount in ETH
          </label>
          <div className="relative">
            <input
              id="boost-amount"
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.05"
              className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        
        <div className="flex justify-end space-x-4">
          <button 
            onClick={onClose} 
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmBoost}
            disabled={isBoosting || !amount}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/50 disabled:bg-gray-500 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isBoosting ? <LoadingSpinner size="small" /> : 'Confirm Boost'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoostModal;