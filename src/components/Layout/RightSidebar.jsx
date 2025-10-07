// src/components/Layout/RightSidebar.jsx

import React from 'react';
import { ethers } from 'ethers';

const RightSidebar = ({ topBoostedPosts = [] }) => {
  // Helper functions (shorten, formatEth) remain the same
  const shorten = (a) => (a ? `${a.slice(0, 6)}...${a.slice(-4)}` : "—");
  const formatEth = (v) => {
    try {
      if (!v) return "0.0";
      return parseFloat(ethers.formatEther(BigInt(v))).toFixed(4);
    } catch (e) {
      return "0.0";
    }
  };


  return (
    <aside className="w-80 p-4 text-white border-l border-gray-700/50 hidden lg:block">
      <div className="sticky top-4 space-y-6">
        {/* --- NEW SEARCH BAR --- */}
        <div className="relative">
          <input 
            type="text"
            placeholder="Search users (coming soon)"
            className="w-full bg-[#1A1A1D] border border-gray-700/50 rounded-full py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <svg className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>

        {/* --- TOP BOOSTED PANEL --- */}
        <div className="bg-[#1A1A1D] p-4 rounded-xl border border-gray-700/50">
          <h3 className="font-bold mb-4 text-lg text-white">🚀 Top Boosted</h3>
          {topBoostedPosts.length > 0 ? (
            <ul>
              {topBoostedPosts.map((post, index) => (
                <li key={post.id} className="mb-3 pb-3 border-b border-gray-700/50 last:border-b-0 last:mb-0 last:pb-0">
                  <a href="#" className="hover:bg-gray-800/50 block p-2 rounded-md transition-colors">
                    <p className="text-sm text-gray-300 truncate" title={post.content}>
                      {index + 1}. "{post.content || 'Post with image'}"
                    </p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">by {shorten(post.author)}</span>
                      <span className="text-sm font-bold text-emerald-400">
                        {formatEth(post.boostAmount)} ETH
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No posts have been boosted yet.</p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;