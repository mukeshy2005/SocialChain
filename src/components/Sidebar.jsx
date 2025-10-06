import React from 'react';
import { motion } from 'framer-motion';

const Sidebar = ({ account, activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'explore', label: 'Explore', icon: '🔍' },
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/80 backdrop-blur-md h-screen w-20 lg:w-64 fixed left-0 top-0 border-r border-gray-800 flex flex-col py-6 px-2 lg:px-4"
    >
      {/* Logo */}
      <div className="mb-10 px-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-500 bg-clip-text text-transparent">
          <span className="hidden lg:block">OnChain Social</span>
          <span className="block lg:hidden">OS</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-cyan-500/20 to-pink-500/20 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                <span className="hidden lg:block font-medium">{item.label}</span>
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 w-1 h-8 bg-gradient-to-b from-cyan-400 to-pink-500 rounded-r-full"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Account */}
      <div className="border-t border-gray-800 pt-4 mt-4">
        <div className="flex items-center px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 flex items-center justify-center text-sm font-bold">
            {account ? account.slice(2, 4).toUpperCase() : '?'}
          </div>
          <div className="ml-3 hidden lg:block">
            {account ? (
              <div className="text-sm">
                <p className="text-white font-medium">
                  {`${account.slice(0, 6)}...${account.slice(-4)}`}
                </p>
                <p className="text-gray-500 text-xs">Connected</p>
              </div>
            ) : (
              <p className="text-gray-400">Not connected</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;