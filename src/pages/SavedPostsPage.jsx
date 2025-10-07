// src/pages/SavedPostsPage.jsx

import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import PostCard from '../components/PostCard';

const SavedPostsPage = () => {
  const { posts, savedPosts, contract, signer, contractAddress, reloadPosts, toggleSavePost } = useOutletContext();

  const bookmarkedPosts = useMemo(() => {
    if (!posts || !savedPosts) return [];
    // Filter the main posts array to get only the ones whose ID is in our savedPosts list
    return posts.filter(post => savedPosts.includes(post.id));
  }, [posts, savedPosts]);

  return (
    <div className="text-white">
      <div className="p-6 border-b border-gray-700/50">
        <h1 className="text-2xl font-bold">Saved Posts</h1>
        <p className="text-gray-400">Posts you've saved for later.</p>
      </div>
      
      <div className="p-6 space-y-6">
        {bookmarkedPosts.length > 0 ? (
          bookmarkedPosts.map(post => (
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
            <p className="text-lg">You haven't saved any posts yet.</p>
            <p>Click the bookmark icon on a post to save it for later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPostsPage;