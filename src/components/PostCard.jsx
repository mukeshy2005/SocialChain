// src/components/PostCard.jsx

import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'; // Import Link for navigation
import { ethers } from "ethers";
import TipModal from "./TipModal";
import BoostModal from "./BoostModal";
import CommentList from "./CommentList";
import LoadingSpinner from "./LoadingSpinner";

// SVG Icons (self-contained for simplicity)
const CommentIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>;
const LikeIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z"></path></svg>;
const TipIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1m0-1V4m0 2.01M12 14v4m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 14c1.657 0 3-.895 3-2s-1.343-2-3-2m0 8c-1.11 0-2.08.402-2.599-1M12 14c-1.657 0-3 .895-3 2s1.343 2 3 2m0-8c1.11 0 2.08.402 2.599 1"></path></svg>;

const PostCard = ({ post, contract, signer, contractAddress, reload }) => {
  const [showComments, setShowComments] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  const [showBoostModal, setShowBoostModal] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);

  useEffect(() => {
    setLikeCount(post.likeCount || 0);
  }, [post.likeCount]);

  const formatEth = (v) => {
    try {
      if (!v) return "0.0";
      return parseFloat(ethers.formatEther(BigInt(v))).toFixed(4);
    } catch (e) {
      return "0.0";
    }
  };

  const handleLike = async (e) => {
    e.stopPropagation(); // Prevent navigation when liking
    if (!contract) return;
    setIsLiking(true);
    try {
      const tx = await contract.likePost(post.id);
      await tx.wait();
      setLikeCount((p) => p + 1);
    } catch (err) {
      console.error("like error", err);
      alert(err?.reason || "Like failed");
    } finally {
      setIsLiking(false);
      reload && reload();
    }
  };

  const handleComment = async () => {
    if (!commentText.trim() || !contract) return;
    setIsCommenting(true);
    try {
      const tx = await contract.commentOnPost(post.id, commentText);
      await tx.wait();
      setCommentText("");
    } catch (err) {
      console.error("comment error", err);
      alert(err?.reason || "Comment failed");
    } finally {
      setIsCommenting(false);
      reload && reload();
    }
  };
  
  // Stop propagation for button clicks to prevent navigating
  const onButtonClick = (e, action) => {
    e.stopPropagation();
    action();
  }

  const formattedDate = new Date(Number(post.timestamp) * 1000).toLocaleString();
  const shorten = (a) => (a ? `${a.slice(0, 6)}...${a.slice(-4)}` : "—");

  return (
    <>
      <div className="bg-[#1A1A1D] border border-gray-700/50 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:border-purple-600/50 cursor-pointer">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
            {post.author?.slice(2, 4).toUpperCase()}
          </div>
          <div className="ml-4">
            <div className="text-white font-semibold">{shorten(post.author)}</div>
            <div className="text-xs text-gray-400">{formattedDate}</div>
          </div>
        </div>

        <Link to={`/post/${post.id}`}>
          <div className="mb-4">
            <p className="text-gray-200 whitespace-pre-wrap">{post.content}</p>
            {post.imageHash && (
              <div className="mt-4">
                <img src={`https://gateway.pinata.cloud/ipfs/${post.imageHash}`} alt="Post content" className="rounded-lg w-full object-cover max-h-96" />
              </div>
            )}
          </div>
        </Link>
        
        <div className="py-3 border-y border-gray-700/50 flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-emerald-400">{formatEth(post.boostAmount || 0n)} ETH</span>
            <span className="text-gray-400">Boosted</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white">{String(post.commentCount || 0)}</span>
            <span className="text-gray-400">Comments</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white">{likeCount}</span>
            <span className="text-gray-400">Likes</span>
          </div>
        </div>

        <div className="flex items-center justify-around pt-4 text-gray-300">
          <button onClick={(e) => onButtonClick(e, () => setShowComments(s => !s))} className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
            <CommentIcon /> <span>Comment</span>
          </button>
          <button onClick={handleLike} disabled={isLiking} className="flex items-center space-x-2 hover:text-pink-400 transition-colors disabled:opacity-50">
            {isLiking ? <LoadingSpinner size="small" /> : <LikeIcon />}
            <span>Like</span>
          </button>
          <button onClick={(e) => onButtonClick(e, () => setShowTipModal(true))} disabled={!contract} className="flex items-center space-x-2 hover:text-green-400 transition-colors">
            <TipIcon /> <span>Tip</span>
          </button>
          <button onClick={(e) => onButtonClick(e, () => setShowBoostModal(true))} disabled={!contract} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-200 shadow-lg hover:shadow-purple-500/50 disabled:bg-gray-500 disabled:shadow-none">
            🚀 Boost
          </button>
        </div>

        {showComments && (
          <div className="mt-4 pt-4 border-t border-gray-700/50" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3">
              <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write a comment..." className="w-full bg-gray-800 rounded-md p-2 text-sm text-white resize-none" rows={2} />
              <div className="flex justify-end mt-2">
                <button onClick={handleComment} disabled={isCommenting || !commentText.trim() || !contract} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg disabled:opacity-50 text-white font-semibold text-sm">
                  {isCommenting ? <LoadingSpinner size="small" /> : "Submit Comment"}
                </button>
              </div>
            </div>
            <CommentList postId={post.id} contract={contract} />
          </div>
        )}
      </div>

      {showTipModal && (
        <TipModal postId={post.id} contract={contract} signer={signer} contractAddress={contractAddress} onClose={() => setShowTipModal(false)} onTipped={() => { reload && reload(); setShowTipModal(false); }} />
      )}
      
      {showBoostModal && (
        <BoostModal postId={post.id} contract={contract} onClose={() => setShowBoostModal(false)} reload={reload} />
      )}
    </>
  );
};

export default PostCard;