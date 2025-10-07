// src/components/Layout/MainFeed.jsx

import React from 'react';
import PostCard from '../PostCard';
import PostSkeleton from '../PostSkeleton';
import CreatePostCard from '../CreatePostCard'; // Re-import CreatePostCard

const MainFeed = ({ posts, loading, contract, signer, contractAddress, reloadPosts, savedPosts, toggleSavePost }) => {
  return (
    <main className="flex-1">
      <div className="p-6 border-b border-gray-700/50">
        <h1 className="text-xl font-bold text-white">Home</h1>
      </div>
      
      <div className="p-6">
        {/* --- ADD THIS SECTION BACK --- */}
        <div className="mb-8">
          <CreatePostCard contract={contract} reload={reloadPosts} />
        </div>
        {/* --- END OF NEW SECTION --- */}

        <div className="space-y-6">
          {loading && (!posts || posts.length === 0) ? (
            <>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </>
          ) : posts && posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                contract={contract}
                signer={signer}
                contractAddress={contractAddress}
                reload={reloadPosts}
                savedPosts={savedPosts}
                toggleSavePost={toggleSavePost}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 mt-20">
              <p>No posts yet. Be the first to share!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default MainFeed;