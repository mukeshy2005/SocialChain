// src/components/CreatePostModal.jsx

import React from 'react';
import CreatePostCard from './CreatePostCard';

const CreatePostModal = ({ isOpen, onClose, contract, reload }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose} // Close modal when clicking the backdrop
    >
      <div
        className="bg-[#1A1A1D] rounded-xl shadow-2xl w-full max-w-xl"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="border-b border-gray-700/50 p-4">
          <button onClick={onClose} className="text-white text-2xl font-bold">
            &times;
          </button>
        </div>
        <div className="p-4">
          {/* We are reusing our existing CreatePostCard here! */}
          <CreatePostCard contract={contract} reload={() => {
            reload();
            onClose(); // Close modal after successful post
          }} />
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;