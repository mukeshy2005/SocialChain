// src/components/PostSkeleton.jsx

import React from 'react';

const PostSkeleton = () => {
  return (
    <div className="bg-[#1A1A1D] border border-gray-700/50 rounded-xl p-6 shadow-md">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-700 animate-pulse"></div>
        <div className="ml-4 flex-1">
          <div className="h-4 w-1/3 rounded bg-gray-700 animate-pulse mb-2"></div>
          <div className="h-3 w-1/4 rounded bg-gray-700 animate-pulse"></div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="h-4 w-full rounded bg-gray-700 animate-pulse"></div>
        <div className="h-4 w-5/6 rounded bg-gray-700 animate-pulse"></div>
      </div>

      <div className="py-3 border-y border-gray-700/50 flex items-center space-x-6">
        <div className="h-5 w-1/4 rounded bg-gray-700 animate-pulse"></div>
        <div className="h-5 w-1/4 rounded bg-gray-700 animate-pulse"></div>
      </div>

      <div className="flex items-center justify-around pt-4">
        <div className="h-6 w-1/5 rounded bg-gray-700 animate-pulse"></div>
        <div className="h-6 w-1/5 rounded bg-gray-700 animate-pulse"></div>
        <div className="h-6 w-1/5 rounded bg-gray-700 animate-pulse"></div>
        <div className="h-10 w-1/4 rounded-full bg-gray-700 animate-pulse"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;