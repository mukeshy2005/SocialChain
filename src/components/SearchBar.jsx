// import React, { useState } from 'react';

// const SearchBar = ({ className = '' }) => {
//   const [focused, setFocused] = useState(false);
  
//   return (
//     <div className={`relative ${className}`}>
//       <div className={`flex items-center bg-gray-800 rounded-full transition-all ${
//         focused ? 'ring-2 ring-purple-500' : ''
//       }`}>
//         <div className="pl-3 text-gray-400">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//         </div>
//         <input
//           type="text"
//           className="bg-transparent text-white text-sm py-2 pl-2 pr-4 rounded-full focus:outline-none w-full"
//           placeholder="Search"
//           onFocus={() => setFocused(true)}
//           onBlur={() => setFocused(false)}
//         />
//       </div>
//     </div>
//   );
// };

// export default SearchBar;

import React from 'react';

const Sidebar = ({ account }) => {
  const menuItems = [
    { icon: 'home', label: 'Home', active: true },
    { icon: 'explore', label: 'Explore' },
    { icon: 'notifications', label: 'Notifications' },
    { icon: 'message', label: 'Messages' },
    { icon: 'bookmark', label: 'Bookmarks' },
    { icon: 'person', label: 'Profile' },
    { icon: 'settings', label: 'Settings' },
  ];

  return (
    <div className="hidden lg:block w-64 bg-gray-800 h-screen fixed top-0 left-0 pt-16 border-r border-gray-700">
      <div className="p-4">
        {/* User Profile Card */}
        <div className="flex items-center p-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
            {account?.slice(2, 4).toUpperCase()}
          </div>
          <div className="ml-3">
            <p className="font-medium text-white truncate">
              {`${account?.slice(0, 6)}...${account?.slice(-4)}`}
            </p>
            <p className="text-gray-400 text-sm">@user{account?.slice(2, 6)}</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center px-3 py-3 rounded-lg transition-colors ${
                item.active
                  ? 'bg-purple-500 bg-opacity-20 text-purple-400'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="material-symbols-outlined mr-3">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Stats Section */}
        <div className="mt-8 border-t border-gray-700 pt-4">
          <h3 className="text-gray-400 font-medium mb-2">Your Stats</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-gray-700 bg-opacity-50 p-3 rounded-lg">
              <p className="text-gray-400">Posts</p>
              <p className="text-white font-bold text-lg">12</p>
            </div>
            <div className="bg-gray-700 bg-opacity-50 p-3 rounded-lg">
              <p className="text-gray-400">Followers</p>
              <p className="text-white font-bold text-lg">286</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;