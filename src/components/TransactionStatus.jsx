import React from 'react';

export default function TransactionStatus({ 
  status, // 'pending', 'confirmed', 'failed'
  hash,
  isOpen,
  onClose,
  networkName = 'Ethereum'
}) {
  if (!isOpen) return null;
  
  // Create explorer link
  const getExplorerLink = () => {
    // You'd need to adjust this based on which network you're using
    const baseUrl = networkName.toLowerCase() === 'ethereum' 
      ? 'https://etherscan.io/tx/' 
      : 'https://sepolia.etherscan.io/tx/'; // Example for testnet
    
    return `${baseUrl}${hash}`;
  };
  
  // Status icon
  const renderStatusIcon = () => {
    switch(status) {
      case 'pending':
        return (
          <div className="bg-yellow-500/20 p-4 rounded-full">
            <svg className="animate-spin w-8 h-8 text-yellow-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        );
      case 'confirmed':
        return (
          <div className="bg-green-500/20 p-4 rounded-full">
            <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
          </div>
        );
      case 'failed':
        return (
          <div className="bg-red-500/20 p-4 rounded-full">
            <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };
  
  // Status title
  const getStatusTitle = () => {
    switch(status) {
      case 'pending':
        return 'Transaction Pending';
      case 'confirmed':
        return 'Transaction Confirmed';
      case 'failed':
        return 'Transaction Failed';
      default:
        return 'Transaction';
    }
  };
  
  // Status message
  const getStatusMessage = () => {
    switch(status) {
      case 'pending':
        return 'Your transaction is being processed on the blockchain. This may take a few moments.';
      case 'confirmed':
        return 'Your transaction has been confirmed and is now on the blockchain!';
      case 'failed':
        return 'There was an error processing your transaction. Please try again.';
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md relative animate-fade-in shadow-2xl">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Content */}
        <div className="flex flex-col items-center text-center">
          {renderStatusIcon()}
          
          <h3 className="text-xl font-bold mt-4 mb-2">{getStatusTitle()}</h3>
          
          <p className="text-gray-400 mb-4">{getStatusMessage()}</p>
          
          {/* Transaction ID */}
          <div className="bg-gray-800/50 rounded-lg p-3 w-full mb-4">
            <p className="text-xs text-gray-400 mb-1">Transaction Hash</p>
            <div className="flex items-center justify-between">
              <p className="text-sm font-mono text-gray-300 truncate">
                {hash}
              </p>
              <button 
                onClick={() => navigator.clipboard.writeText(hash)}
                className="text-orange-400 hover:text-orange-300"
                title="Copy to clipboard"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* View on explorer button */}
          <a 
            href={getExplorerLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center w-full"
          >
            View on {networkName} Explorer
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}