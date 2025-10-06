 
import React, { useState } from 'react';
import Button from './Button';
import SearchBar from './SearchBar';

const Navbar = ({ isConnected, account, onConnectWallet, onDisconnect }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <nav className="bg-gray-900 bg-opacity-90 backdrop-filter backdrop-blur-lg border-b border-gray-800 fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                SocialFeed
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink isActive={true}>Home</NavLink>
                <NavLink>Explore</NavLink>
                <NavLink>Notifications</NavLink>
                <NavLink>Messages</NavLink>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center">
            {isConnected && <SearchBar className="mr-4" />}
            
            {isConnected ? (
              <div className="flex items-center">
                <div className="flex items-center space-x-2 mr-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    {account.slice(2, 4).toUpperCase()}
                  </div>
                  <span className="text-gray-300 hidden lg:inline-block">
                    {`${account.slice(0, 6)}...${account.slice(-4)}`}
                  </span>
                </div>
                <Button variant="outline" size="small" onClick={onDisconnect}>
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button onClick={onConnectWallet}>Connect Wallet</Button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {isConnected && (
              <div className="mr-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  {account.slice(2, 4).toUpperCase()}
                </div>
              </div>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 py-3">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink isActive={true}>Home</MobileNavLink>
            <MobileNavLink>Explore</MobileNavLink>
            <MobileNavLink>Notifications</MobileNavLink>
            <MobileNavLink>Messages</MobileNavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="px-5 flex flex-col space-y-3">
              {isConnected ? (
                <>
                  <SearchBar />
                  <Button variant="outline" size="small" onClick={onDisconnect} fullWidth>
                    Disconnect
                  </Button>
                </>
              ) : (
                <Button onClick={onConnectWallet} fullWidth>
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ children, isActive }) => (
  <a
    href="#"
    className={`px-3 py-2 rounded-md text-sm font-medium ${
      isActive
        ? 'bg-gray-800 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`}
  >
    {children}
  </a>
);

const MobileNavLink = ({ children, isActive }) => (
  <a
    href="#"
    className={`block px-3 py-2 rounded-md text-base font-medium ${
      isActive
        ? 'bg-gray-800 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`}
  >
    {children}
  </a>
);

export default Navbar;