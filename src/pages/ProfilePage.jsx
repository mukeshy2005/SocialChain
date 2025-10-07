// src/pages/ProfilePage.jsx

import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ethers } from 'ethers';
import PostCard from '../components/PostCard';

const ProfilePage = () => {
  const { account, posts, pfp, contract, signer, contractAddress, reloadPosts } = useOutletContext();

  const shorten = (a) => (a ? `${a.slice(0, 6)}...${a.slice(-4)}` : "—");

  const myPosts = useMemo(() => {
    if (!account || !posts) return [];
    return posts.filter(post => post.author.toLowerCase() === account.toLowerCase());
  }, [posts, account]);

  const userStats = useMemo(() => {
    if (!myPosts) return { totalLikes: 0, totalComments: 0, totalTips: '0.0', reputation: 0 };

    const stats = myPosts.reduce((acc, post) => {
      acc.totalLikes += Number(post.likeCount || 0);
      acc.totalComments += Number(post.commentCount || 0);
      // 👇 THE FIX IS HERE: Use the '+' operator for BigInt addition
      acc.totalTips = acc.totalTips + ethers.toBigInt(post.tipAmount || 0);
      return acc;
    }, {
      totalLikes: 0,
      totalComments: 0,
      totalTips: ethers.toBigInt(0),
    });

    const reputation = (stats.totalLikes * 1) + (stats.totalComments * 5);

    return {
      totalLikes: stats.totalLikes,
      totalComments: stats.totalComments,
      totalTips: parseFloat(ethers.formatEther(stats.totalTips)).toFixed(5),
      reputation,
    };
  }, [myPosts]);

  const StatCard = ({ label, value }) => (
    <div className="bg-[#1A1A1D] p-4 rounded-lg border border-gray-700/50">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );

  return (
    <div className="text-white">
      {/* --- Profile Header --- */}
      <div>
        <div className="h-48 bg-gradient-to-r from-gray-800 to-gray-700"></div>
        <div className="p-6">
          <div className="flex items-end -mt-24">
            {pfp ? (
              <img src={pfp} alt="PFP" className="w-32 h-32 rounded-full object-cover border-4 border-[#0B0E11]" />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 border-4 border-[#0B0E11] flex-shrink-0"></div>
            )}
            <div className="ml-4">
              <h1 className="text-2xl font-bold">Your Profile</h1>
              <p className="text-gray-400 text-sm">{shorten(account)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Stats Grid --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 mb-6">
        <StatCard label="Reputation" value={userStats.reputation} />
        <StatCard label="Tips Received" value={`${userStats.totalTips} ETH`} />
        <StatCard label="Likes Received" value={userStats.totalLikes} />
        <StatCard label="Comments Received" value={userStats.totalComments} />
      </div>
      
      {/* --- Tabs for Posts / NFTs etc. --- */}
      <div className="border-y border-gray-700/50 px-6">
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
            <PostCard key={post.id} post={post} contract={contract} signer={signer} contractAddress={contractAddress} reload={reloadPosts} />
          ))
        ) : (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-lg">No posts yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;