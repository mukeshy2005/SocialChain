// // src/components/Layout/MainFeed.jsx

// import React from 'react';
// import PostCard from '../PostCard'; // Use our beautiful refactored PostCard
// import CreatePostCard from '../CreatePostCard'; // You already have this component
// import LoadingSpinner from '../LoadingSpinner';

// const MainFeed = ({ contract, posts, loading, reloadPosts, signer, contractAddress }) => {
//   return (
//     <main className="flex-1 max-w-2xl mx-auto py-8 px-4 border-x border-gray-700/50">
//       <h1 className="text-xl font-bold text-white mb-6">Home</h1>
      
//       {/* We will refactor CreatePostCard next, but place it here for now */}
//       <div className="mb-8">
//         <CreatePostCard contract={contract} reload={reloadPosts} />
//       </div>

//       {/* Display Posts */}
//       <div className="space-y-6">
//         {loading && posts.length === 0 ? (
//           <div className="flex justify-center mt-20">
//             <LoadingSpinner />
//           </div>
//         ) : posts.length > 0 ? (
//           posts.map((post) => (
//             <PostCard
//               key={post.id}
//               post={post}
//               contract={contract}
//               signer={signer}
//               contractAddress={contractAddress}
//               reload={reloadPosts}
//             />
//           ))
//         ) : (
//           <div className="text-center text-gray-500 mt-20">
//             <p>No posts yet. Be the first to share!</p>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// };

// export default MainFeed;


// src/components/Layout/MainFeed.jsx

import React from 'react';
import PostCard from '../PostCard';
import CreatePostCard from '../CreatePostCard';
import PostSkeleton from '../PostSkeleton'; // <-- Import the new skeleton

const MainFeed = ({ contract, posts, loading, reloadPosts, signer, contractAddress }) => {
  return (
    <main className="flex-1">
      <div className="p-6 border-b border-gray-700/50">
        <h1 className="text-xl font-bold text-white">Home</h1>
      </div>
      
      <div className="p-6">
        <div className="mb-8">
          <CreatePostCard contract={contract} reload={reloadPosts} />
        </div>

        {/* --- Updated Loading Logic --- */}
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