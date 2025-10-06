import React from 'react';
import { motion } from 'framer-motion';

const NotificationPanel = () => {
  // Mock notifications for demo purposes
  const notifications = [
    { 
      id: 1, 
      type: 'like', 
      message: 'CryptoUser.eth liked your post about NFTs', 
      timestamp: Date.now() - 120000,
      read: false
    },
    { 
      id: 2, 
      type: 'comment', 
      message: '0x1a2b...3c4d commented on your post: "This is revolutionary!"', 
      timestamp: Date.now() - 3600000,
      read: false
    },
    { 
      id: 3, 
      type: 'tip', 
      message: 'You received 0.01 ETH tip from 0x5e6f...7g8h', 
      timestamp: Date.now() - 86400000,
      read: true
    },
    { 
      id: 4, 
      type: 'mention', 
      message: '0xAbFf...123a mentioned you in a post', 
      timestamp: Date.now() - 172800000,
      read: true
    }
  ];

  // Format relative time
  const getRelativeTime = (timestamp) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return `${seconds} seconds ago`;
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  };

  // Get appropriate icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return <span className="text-pink-500 text-xl">❤️</span>;
      case 'comment':
        return <span className="text-cyan-500 text-xl">💬</span>;
      case 'tip':
        return <span className="text-yellow-500 text-xl">💰</span>;
      case 'mention':
        return <span className="text-blue-500 text-xl">@</span>;
      default:
        return <span className="text-gray-500 text-xl">📢</span>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto py-8 px-4"
    >
      <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-3xl backdrop-blur-sm border border-gray-700/50 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-700/50 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Notifications</h2>
          <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
            Mark all as read
          </button>
        </div>
        
        <div className="divide-y divide-gray-700/50">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-5 hover:bg-gray-800/30 transition-colors flex ${!notification.read ? 'bg-gray-800/20' : ''}`}
              >
                <div className="mr-4 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-grow">
                  <p className={`text-sm ${!notification.read ? 'text-white font-medium' : 'text-gray-300'}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {getRelativeTime(notification.timestamp)}
                  </p>
                </div>
                {!notification.read && (
                  <div className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-400">You have no notifications.</p>
            </div>
          )}
        </div>
        
        {notifications.length > 0 && (
          <div className="p-4 bg-gray-800/50 border-t border-gray-700/50 text-center">
            <button className="text-sm text-cyan-400 hover:text-cyan-300">
              Load more
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NotificationPanel;