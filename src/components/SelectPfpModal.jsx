// src/components/SelectPfpModal.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

const SelectPfpModal = ({ onClose, account, onPfpSelect }) => {
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!account) return;
      setIsLoading(true);
      const apiKey = import.meta.env.VITE_ALCHEMY_API_KEY;
      const baseURL = `https://eth-sepolia.g.alchemy.com/nft/v2/${apiKey}/getNFTs/`;
      
      try {
        const response = await axios.get(`${baseURL}?owner=${account}`);
        // Filter out NFTs without proper images
        const validNfts = response.data.ownedNfts.filter(nft => 
          nft.media?.[0]?.gateway || nft.rawMetadata?.image
        );
        setNfts(validNfts);
      } catch (error) {
        console.error("Failed to fetch NFTs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNFTs();
  }, [account]);

  const handleSelect = (nft) => {
    const imageUrl = nft.media?.[0]?.gateway || nft.rawMetadata?.image;
    onPfpSelect(imageUrl);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-[#1A1A1D] border border-gray-700/50 rounded-xl p-6 shadow-2xl w-full max-w-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        >
          &times;
        </button>
        
        <h2 className="text-xl font-bold text-white mb-4">Choose Your PFP</h2>
        
        <div className="h-96 overflow-y-auto scrollbar-hide pr-2">
          {isLoading ? (
            <div className="flex justify-center items-center h-full"><LoadingSpinner /></div>
          ) : nfts.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {nfts.map((nft, index) => {
                const imageUrl = nft.media?.[0]?.gateway || nft.rawMetadata?.image;
                return (
                  <button key={index} onClick={() => handleSelect(nft)} className="aspect-square bg-gray-800 rounded-lg overflow-hidden transition-transform hover:scale-105">
                    <img src={imageUrl} alt={nft.title || 'NFT'} className="w-full h-full object-cover" />
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="flex justify-center items-center h-full text-gray-500">No NFTs found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectPfpModal;