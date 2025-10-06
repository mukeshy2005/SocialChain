import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Dashboard = ({ onConnectWallet }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleConnect = async () => {
    setIsLoading(true);
    await onConnectWallet();
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0d1117] to-gray-900 flex flex-col items-center justify-center px-4">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-500 bg-clip-text text-transparent">
              OnChain Social
            </span>
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl">
            Connect, share, and own your social experience on the blockchain
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50">
            <div className="text-cyan-400 text-3xl mb-2">🔒</div>
            <h3 className="text-xl font-bold text-white mb-2">Self Sovereign</h3>
            <p className="text-gray-400">Own your data and control your social experience</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50">
            <div className="text-orange-400 text-3xl mb-2">⛓️</div>
            <h3 className="text-xl font-bold text-white mb-2">On-Chain</h3>
            <p className="text-gray-400">All content is stored on the blockchain, censorship resistant</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50">
            <div className="text-pink-400 text-3xl mb-2">💰</div>
            <h3 className="text-xl font-bold text-white mb-2">Creator Economy</h3>
            <p className="text-gray-400">Support content creators with direct cryptocurrency tips</p>
          </div>
        </motion.div>

        {/* Connect Button */}
        <motion.button
          onClick={handleConnect}
          disabled={isLoading}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="relative bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold text-xl px-12 py-4 rounded-full shadow-lg hover:shadow-xl disabled:opacity-70 group overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center">
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {isLoading ? 'Connecting...' : 'Connect Wallet'}
          </span>
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 to-cyan-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
        </motion.button>
      </motion.div>

      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.3 + 0.1
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              transition: {
                duration: Math.random() * 30 + 20,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500/10 to-pink-500/10 blur-3xl"
          />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto pb-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} OnChain Social | Decentralized Social Media Platform
      </div>
    </div>
  );
};

export default Dashboard;