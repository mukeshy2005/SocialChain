import React from "react";

export default function Header({ account, onDisconnect }) {
  const switchToAmoy = async () => {
    if (!window.ethereum) return alert("MetaMask not detected");
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: "0x13882",
          chainName: "Amoy Testnet",
          nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
          rpcUrls: ["https://rpc-amoy.polygon.technology"],
          blockExplorerUrls: ["https://explorer-amoy.polygon.technology"],
        }],
      });
      alert("Switched to Amoy network!");
    } catch (err) {
      console.error("Switch network failed", err);
      alert("Failed to switch network");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-4 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700 z-50">
      <h1 className="text-xl font-bold">Amoy SocialFeed</h1>
      <div className="flex items-center space-x-4">
        {account && (
          <>
            <button onClick={switchToAmoy} className="bg-purple-600 px-3 py-1 rounded-md hover:bg-purple-700">
              Switch to Amoy
            </button>
            <span className="text-gray-300 font-mono">{account.slice(0,6)}...{account.slice(-4)}</span>
            <button onClick={onDisconnect} className="bg-red-600 px-3 py-1 rounded-md hover:bg-red-700">Disconnect</button>
          </>
        )}
      </div>
    </div>
  );
}
