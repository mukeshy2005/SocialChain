// src/pages/NotificationsPage.jsx

import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { ethers } from 'ethers';

const NotificationsPage = () => {
  const { notifications } = useOutletContext();
  const shorten = (a) => (a ? `${a.slice(0, 6)}...${a.slice(-4)}` : "—");

  const getNotificationMessage = (notif) => {
    switch(notif.type) {
      case 'like':
        return <>liked your post.</>;
      case 'comment':
        return <>commented on your post.</>;
      case 'tip':
        const amount = parseFloat(ethers.formatEther(notif.amount)).toFixed(4);
        return <>tipped you {amount} ETH on your post.</>;
      default:
        return 'interacted with your post.';
    }
  };
  
  return (
    <div className="text-white">
      <div className="p-6 border-b border-gray-700/50">
        <h1 className="text-2xl font-bold">Notifications</h1>
      </div>
      
      <div>
        {notifications && notifications.length > 0 ? (
          <ul>
            {notifications.map((notif, index) => (
              <li key={index} className="border-b border-gray-700/50">
                <Link to={`/post/${notif.postId}`} className="block p-6 hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">
                      {notif.type === 'like' && '❤️'}
                      {notif.type === 'comment' && '💬'}
                      {notif.type === 'tip' && '💰'}
                    </span>
                    <div>
                      <p className="text-gray-200">
                        <span className="font-bold">{shorten(notif.from)}</span> {getNotificationMessage(notif)}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500 mt-20 p-6">
            <p className="text-lg">No new notifications.</p>
            <p>Interactions from other users on your posts will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;