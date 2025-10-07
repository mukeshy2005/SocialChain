// src/components/Layout/LeftSidebar.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SelectPfpModal from '../SelectPfpModal';

const LeftSidebar = ({ account, onDisconnect, pfp, onPfpSelect, onCreatePostClick, notificationCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPfpModal, setShowPfpModal] = useState(false);

  const shorten = (a) => (a ? `${a.slice(0, 6)}...${a.slice(-4)}` : "—");

  return (
    <>
      <aside className="w-64 p-4 text-white border-r border-gray-700/50 flex flex-col">
        <div>
            <h2 className="text-2xl font-bold mb-8 text-white">onsocial</h2>
            <nav>
                <ul>
                    <li className="mb-4"><Link to="/" className="text-lg font-semibold hover:text-purple-400 p-2 flex">🏠 Home</Link></li>
                    <li className="mb-4"><Link to="/profile" className="text-lg font-semibold hover:text-purple-400 p-2 flex">👤 Profile</Link></li>
                    <li className="mb-4">
                        <Link to="/saved" className="text-lg font-semibold hover:text-purple-400 transition-colors p-2 rounded-md flex items-center">
                            <span className="mr-3">🔖</span> Saved
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/notifications" className="text-lg font-semibold hover:text-purple-400 transition-colors p-2 rounded-md flex items-center relative">
                            <span className="mr-3">🔔</span>
                            Notifications
                            {notificationCount > 0 && (
                                <span className="absolute left-6 top-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                    {notificationCount}
                                </span>
                            )}
                        </Link>
                    </li>
                    <li className="mb-4"><Link to="/explore" className="text-lg font-semibold hover:text-purple-400 p-2 flex">🔍 Explore</Link></li>
                </ul>
            </nav>
            <button 
              onClick={onCreatePostClick}
              className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-full shadow-lg"
            >
                Create Post
            </button>
        </div>

        <div className="mt-auto relative">
          {isMenuOpen && (
            <div className="absolute bottom-full left-0 w-full mb-2 bg-[#1A1A1D] border border-gray-700/50 rounded-lg shadow-xl py-1">
              <button
                onClick={() => { setShowPfpModal(true); setIsMenuOpen(false); }}
                className="w-full text-left px-4 py-2 text-white hover:bg-gray-800/50"
              >
                Change PFP
              </button>
              <button
                onClick={onDisconnect}
                className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800/50"
              >
                Disconnect
              </button>
            </div>
          )}
          
          <div 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="hover:bg-gray-800/50 p-3 rounded-lg transition-colors cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center">
              {pfp ? (
                <img src={pfp} alt="PFP" className="w-10 h-10 rounded-full bg-gray-800 object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex-shrink-0"></div>
              )}
              <div className="ml-3">
                <p className="font-bold text-white text-sm">Profile</p>
                <p className="text-xs text-gray-400">{shorten(account)}</p>
              </div>
            </div>
            <div className="text-gray-400">...</div>
          </div>
        </div>
      </aside>

      {showPfpModal && (
        <SelectPfpModal 
          account={account}
          onClose={() => setShowPfpModal(false)} 
          onPfpSelect={onPfpSelect} 
        />
      )}
    </>
  );
};

export default LeftSidebar;