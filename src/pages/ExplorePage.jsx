// src/pages/ExplorePage.jsx

import React from 'react';
import { useOutletContext } from 'react-router-dom';
import PostCard from '../components/PostCard'; // Reusing our PostCard again
import LoadingSpinner from '../components/LoadingSpinner';

const ExplorePage = () => {
  // Get the globally available data from our AppLayout
  const { posts, contract, signer, contractAddress, reloadPosts } = useOutletContext();
  
  // In a future version, you could add loading state here if needed
  const isLoading = !posts;

  return (
    <div className="text-white">
      {/* --- Page Header --- */}
      <div className="p-6 border-b border-gray-700/50">
        <h1 className="text-2xl font-bold">Explore</h1>
        <p className="text-gray-400">Discover the latest posts from everyone on the network.</p>
      </div>
      
      {/* --- Global Post Feed --- */}
      <div className="p-6 space-y-6">
        {isLoading ? (
          <div className="flex justify-center mt-10"><LoadingSpinner /></div>
        ) : posts && posts.length > 0 ? (
          posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              contract={contract}
              signer={signer}
              contractAddress={contractAddress}
              reload={reloadPosts}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-lg">It's quiet in here...</p>
            <p>Be the first to create a post!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;