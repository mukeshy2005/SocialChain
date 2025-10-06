import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ account, onDisconnect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  // Mock notifications for UI demo
  const notifications = [
    { id: 1, type: 'like', message: 'CryptoUser.eth liked your post', time: '2m ago' },
    { id: 2, type: 'comment', message: '0x1a2b...3c4d commented on your post', time: '15m ago' },
    { id: 3, type: 'tip', message: 'You received 0.01 ETH tip from 0x5e6f...7g8h', time: '1h ago' }
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 fixed top-0 right-0 left-0 ml-20 lg:ml-64 z-10"
    >
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Search Bar */}
        <div className="hidden md:block w-1/3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="search"
              className="pl-10 pr-4 py-2 w-full rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-300 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Search posts, users..."
            />
          </div>
        </div>
        
        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Mobile Search Toggle */}
          <button className="text-gray-400 hover:text-white md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          {/* Notification Bell */}
          <div className="relative">
            <button 
              className="text-gray-400 hover:text-white relative"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-cyan-500 to-pink-500 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
            
            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-700 rounded-xl shadow-xl z-20 overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-gray-800 flex justify-between items-center">
                    <h3 className="font-medium text-white">Notifications</h3>
                    <button className="text-xs text-cyan-400 hover:text-cyan-300">Mark all as read</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map(notification => (
                      <div key={notification.id} className="px-4 py-3 hover:bg-gray-800/50 border-b border-gray-800/50 last:border-0">
                        <div className="flex items-start">
                          <div className="mr-3 mt-1">
                            {notification.type === 'like' && (
                              <span className="text-pink-500">❤️</span>
                            )}
                            {notification.type === 'comment' && (
                              <span className="text-cyan-500">💬</span>
                            )}
                            {notification.type === 'tip' && (
                              <span className="text-yellow-500">💰</span>
                            )}
                          </div>
                          <div>
                            <p className="text-sm text-white">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 bg-gray-800/50 border-t border-gray-700">
                    <button className="w-full text-center text-sm text-cyan-400 hover:text-cyan-300">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* User Profile */}
          <div className="relative">
            <button 
              className="flex items-center text-gray-300 hover:text-white"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 flex items-center justify-center text-white text-sm font-medium">
                {account ? account.slice(2, 4).toUpperCase() : '?'}
              </div>
              <span className="text-gray-300 hidden lg:inline-block ml-2">
                {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Not Connected'}
              </span>
              <svg className="w-5 h-5 ml-1 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-xl shadow-xl z-20"
                >
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-800">
                      View Profile
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-800">
                      Edit Profile
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-800">
                      Wallet Info
                    </a>
                    <hr className="border-gray-700 my-1" />
                    <button 
                      onClick={onDisconnect}
                      className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800"
                    >
                      Disconnect
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;