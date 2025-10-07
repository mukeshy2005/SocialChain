// src/pages/ProfilePage.jsx

import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import PostCard from '../components/PostCard'; // We'll reuse our PostCard component!

const ProfilePage = () => {
  // Get the globally available data from our AppLayout
  const { account, posts, contract, signer, contractAddress, reloadPosts } = useOutletContext();

  const shorten = (a) => (a ? `${a.slice(0, 6)}...${a.slice(-4)}` : "—");

  // We use useMemo to efficiently filter and get only the current user's posts
  const myPosts = useMemo(() => {
    if (!account || !posts) return [];
    return posts.filter(post => post.author.toLowerCase() === account.toLowerCase());
  }, [posts, account]);

  return (
    <div className="text-white">
      {/* --- Profile Header --- */}
      <div>
        {/* Banner Image */}
        <div className="h-48 bg-gradient-to-r from-gray-800 to-gray-700"></div>
        
        <div className="p-6">
          {/* Profile Picture & Info */}
          <div className="flex items-end -mt-24">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 border-4 border-[#0B0E11] flex-shrink-0"></div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold">
                {shorten(account)}
              </h1>
              <p className="text-gray-400 text-sm">
                {myPosts.length} Posts
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* --- Tabs for Posts / NFTs etc. --- */}
      <div className="border-b border-gray-700/50 px-6">
        <nav className="flex space-x-4">
          <button className="py-4 px-2 text-white border-b-2 border-purple-500 font-semibold">
            My Posts
          </button>
          <button className="py-4 px-2 text-gray-400 hover:text-white font-semibold">
            NFTs
          </button>
        </nav>
      </div>

      {/* --- User's Post Feed --- */}
      <div className="p-6 space-y-6">
        {myPosts.length > 0 ? (
          myPosts.map(post => (
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
            <p className="text-lg">No posts yet.</p>
            <p>Create your first post from the Home feed!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;