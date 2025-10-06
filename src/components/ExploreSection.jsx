import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ExploreSection = () => {
  const [activeTab, setActiveTab] = useState('trending');
  
  // Mock data for demonstration
  const trendingPosts = [
    {
      id: 1,
      author: "0xAbC...123",
      authorAvatar: "bg-gradient-to-r from-purple-400 to-pink-500",
      content: "Just created my first NFT collection on the blockchain! Check it out: #NFT #Web3",
      likes: 128,
      comments: 32,
      timestamp: Date.now() - 3600000,
      image: "https://via.placeholder.com/600x400/0d1117/ffffff?text=NFT+Collection+Preview"
    },
    {
      id: 2,
      author: "0xDeF...456",
      authorAvatar: "bg-gradient-to-r from-cyan-400 to-blue-500",
      content: "The future of DeFi is looking brighter than ever. Here's why I think 2025 will be the year of decentralized finance. Thread 🧵",
      likes: 94,
      comments: 21,
      timestamp: Date.now() - 7200000
    },
    {
      id: 3,
      author: "0xGhi...789",
      authorAvatar: "bg-gradient-to-r from-orange-400 to-red-500",
      content: "I just deployed a smart contract that automatically distributes ETH to holders. The possibilities with Web3 are endless!",
      likes: 76,
      comments: 17,
      timestamp: Date.now() - 10800000
    }
  ];
  
  const latestPosts = [
    {
      id: 4,
      author: "0xJkL...012",
      authorAvatar: "bg-gradient-to-r from-green-400 to-teal-500",
      content: "Just joined this platform! Excited to connect with fellow blockchain enthusiasts.",
      likes: 5,
      comments: 3,
      timestamp: Date.now() - 900000
    },
    {
      id: 5,
      author: "0xMnO...345",
      authorAvatar: "bg-gradient-to-r from-yellow-400 to-orange-500",
      content: "Anyone else experiencing slow transactions on the network today?",
      likes: 12,
      comments: 8,
      timestamp: Date.now() - 1800000
    },
    {
      id: 6,
      author: "0xPqR...678",
      authorAvatar: "bg-gradient-to-r from-pink-400 to-purple-500",
      content: "Just published my article on the environmental impact of different consensus mechanisms. Link in comments!",
      likes: 18,
      comments: 6,
      timestamp: Date.now() - 2700000
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto py-8 px-4"
    >
      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-1 inline-flex">
          <button 
            onClick={() => setActiveTab('trending')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'trending' 
                ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Trending
          </button>
          <button 
            onClick={() => setActiveTab('latest')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'latest' 
                ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Latest
          </button>
          <button 
            onClick={() => setActiveTab('following')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'following' 
                ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Following
          </button>
        </div>
      </div>

      {/* Content based on active tab */}
      <div className="space-y-6">
        {activeTab === 'trending' && (
          <>
            {trendingPosts.map(post => (
              <div 
                key={post.id} 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 rounded-full ${post.authorAvatar} flex items-center justify-center text-white font-medium`}>
                    {post.author.slice(2, 4)}
                  </div>
                  <div className="ml-3">
                    <p className="text-white font-medium">{post.author}</p>
                    <p className="text-gray-400 text-sm">{getRelativeTime(post.timestamp)}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-white">{post.content}</p>
                </div>
                
                {post.image && (
                  <div className="mb-4 rounded-xl overflow-hidden">
                    <img src={post.image} alt="Post content" className="w-full h-auto" />
                  </div>
                )}
                
                <div className="flex items-center space-x-6 text-sm">
                  <button className="flex items-center text-gray-400 hover:text-pink-500 transition-colors">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {post.likes}
                  </button>
                  <button className="flex items-center text-gray-400 hover:text-cyan-500 transition-colors">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {post.comments}
                  </button>
                  <button className="flex items-center text-gray-400 hover:text-yellow-500 transition-colors">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Tip
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
        
        {activeTab === 'latest' && (
          <>
            {latestPosts.map(post => (
              <div 
                key={post.id} 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 rounded-full ${post.authorAvatar} flex items-center justify-center text-white font-medium`}>
                    {post.author.slice(2, 4)}
                  </div>
                  <div className="ml-3">
                    <p className="text-white font-medium">{post.author}</p>
                    <p className="text-gray-400 text-sm">{getRelativeTime(post.timestamp)}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-white">{post.content}</p>
                </div>
                
                {post.image && (
                  <div className="mb-4 rounded-xl overflow-hidden">
                    <img src={post.image} alt="Post content" className="w-full h-auto" />
                  </div>
                )}
                
                <div className="flex items-center space-x-6 text-sm">
                  <button className="flex items-center text-gray-400 hover:text-pink-500 transition-colors">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {post.likes}
                  </button>
                  <button className="flex items-center text-gray-400 hover:text-cyan-500 transition-colors">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {post.comments}
                  </button>
                  <button className="flex items-center text-gray-400 hover:text-yellow-500 transition-colors">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Tip
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
        
        {activeTab === 'following' && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 text-center">
            <p className="text-gray-400 mb-4">You're not following anyone yet.</p>
            <button className="bg-gradient-to-r from-cyan-500 to-pink-500 px-6 py-2 rounded-lg text-white font-medium">
              Discover users to follow
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ExploreSection;