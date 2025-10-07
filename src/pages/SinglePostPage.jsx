// src/pages/SinglePostPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useOutletContext, Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import CommentList from '../components/CommentList'; // We'll show all comments here

const SinglePostPage = () => {
  const { postId } = useParams(); // Gets the 'postId' from the URL (e.g., "1")
  const { contract, signer, contractAddress, reloadPosts } = useOutletContext();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!contract || !postId) return;
      setLoading(true);
      try {
        const p = await contract.posts(postId);
        setPost({
            id: Number(postId),
            author: p.author,
            content: p.content,
            imageHash: p.imageHash || "",
            likeCount: Number(p.likeCount || 0),
            commentCount: Number(p.commentCount || 0),
            tipAmount: p.tipAmount || 0n,
            boostAmount: p.boostAmount || 0n,
            timestamp: Number(p.timestamp || 0),
        });
      } catch (error) {
        console.error("Failed to fetch post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [contract, postId]);

  return (
    <div className="text-white">
      <div className="p-6 border-b border-gray-700/50 flex items-center space-x-4">
        <Link to="/" className="hover:text-purple-400">← Back</Link>
        <h1 className="text-2xl font-bold">Post Details</h1>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex justify-center mt-10"><LoadingSpinner /></div>
        ) : post ? (
          <div>
            <PostCard 
              post={post}
              contract={contract}
              signer={signer}
              contractAddress={contractAddress}
              reload={reloadPosts}
            />
            <div className="mt-6 border-t border-gray-700/50 pt-6">
              <h2 className="text-xl font-semibold mb-4">Comments</h2>
              <CommentList postId={post.id} contract={contract} />
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">
            <p>Post not found or could not be loaded.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePostPage;