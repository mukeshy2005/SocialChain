import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function UserProfile({ account, contract, posts = [] }) {
  const [reputation, setReputation] = useState(0);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [tipsEth, setTipsEth] = useState("0.0");

  useEffect(() => {
    const load = async () => {
      if (!contract || !account) return;
      try {
        // getReputation is on contract
        const r = await contract.getReputation(account);
        setReputation(Number(r || 0));
        // mapping getters
        const likesReceived = await contract.likesReceived(account);
        const commentsReceived = await contract.commentsReceived(account);
        const tipsReceived = await contract.tipsReceived(account);
        setLikes(Number(likesReceived || 0));
        setComments(Number(commentsReceived || 0));
        setTipsEth(ethers.formatEther(tipsReceived || 0n));
      } catch (err) {
        console.error("profile load", err);
      }
    };
    load();
  }, [contract, account]);

  const myPosts = posts.filter(p => p.author?.toLowerCase() === account?.toLowerCase());

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
        <h2 className="text-2xl font-bold mb-2">Profile</h2>
        <p className="text-gray-300">Address: <span className="text-accent font-mono">{account}</span></p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-gray-900 p-3 rounded">
            <div className="text-sm text-gray-400">Reputation</div>
            <div className="text-lg font-semibold">{reputation}</div>
          </div>
          <div className="bg-gray-900 p-3 rounded">
            <div className="text-sm text-gray-400">Tips Received</div>
            <div className="text-lg font-semibold">{tipsEth} ETH</div>
          </div>
          <div className="bg-gray-900 p-3 rounded">
            <div className="text-sm text-gray-400">Likes Received</div>
            <div className="text-lg font-semibold">{likes}</div>
          </div>
          <div className="bg-gray-900 p-3 rounded">
            <div className="text-sm text-gray-400">Comments Received</div>
            <div className="text-lg font-semibold">{comments}</div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">My Posts</h3>
          {myPosts.length === 0 ? <div className="text-gray-400">No posts yet.</div> : myPosts.map(p => (
            <div key={p.id} className="bg-gray-900 p-3 rounded mb-2">
              <div className="text-sm text-gray-200">{p.content.slice(0, 120)}</div>
              <div className="text-xs text-gray-400">Likes: {p.likeCount} — Comments: {p.commentCount} — Tips: {ethers.formatEther(p.tipAmount || 0n)} ETH</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
