import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ children, account, onConnect, onDisconnect }) {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-poppins">
      <Navbar account={account} onConnect={onConnect} onDisconnect={onDisconnect} />
      
      <div className="pt-20 pb-10 flex max-w-7xl mx-auto">
        <Sidebar account={account} />
        
        <main className="flex-1 px-4 md:px-6">
          {children}
        </main>
        
        {/* You could add a right sidebar here for notifications or other features */}
      </div>
    </div>
  );
}