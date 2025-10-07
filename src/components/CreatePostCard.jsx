// src/components/CreatePostCard.jsx

import React, { useState } from 'react';
import { uploadToPinata } from '../utils/uploadToPinta'; // Make sure this path is correct
import LoadingSpinner from './LoadingSpinner'; // We'll use this for loading states

const CreatePostCard = ({ contract, reload }) => {
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
  };

  const handleCreatePost = async () => {
    if (!content.trim() && !imageFile) return;
    if (!contract) {
        alert("Contract not available. Please connect your wallet.");
        return;
    }

    setIsSubmitting(true);
    try {
      let ipfsHash = "";
      if (imageFile) {
        console.log("Uploading image to Pinata...");
        const response = await uploadToPinata(imageFile); // Use your Pinata util
        ipfsHash = response || ""; // Assuming your util returns the hash
        if (!ipfsHash) {
          throw new Error("Image upload to Pinata failed.");
        }
        console.log("Image uploaded, IPFS Hash:", ipfsHash);
      }
      
      console.log("Creating post on blockchain...");
      const tx = await contract.createPost(content, ipfsHash);
      await tx.wait();
      console.log("Post created successfully!");

      // Reset form on success
      setContent('');
      setImageFile(null);
      setPreviewUrl(null);
      setIsExpanded(false);
      reload && reload(); // Reload posts from parent
    } catch (err) {
      console.error("Failed to create post:", err);
      alert("Failed to create post: " + (err?.reason || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#1A1A1D] border border-gray-700/50 rounded-xl p-4 shadow-lg mb-8">
      <div className="flex space-x-4">
        {/* Placeholder for Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex-shrink-0"></div>

        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="What's on your mind?"
            className="w-full bg-gray-800 text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            rows={isExpanded ? 4 : 1}
          />

          {previewUrl && (
            <div className="relative mt-3">
              <img src={previewUrl} alt="Preview" className="max-h-72 w-full object-cover rounded-lg" />
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 bg-black bg-opacity-60 text-white rounded-full p-1.5"
              >
                &times;
              </button>
            </div>
          )}

          {isExpanded && (
            <div className="flex items-center justify-between mt-4">
              <label className="cursor-pointer text-gray-400 hover:text-purple-400">
                <span>Add Image</span>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
              <button
                onClick={handleCreatePost}
                disabled={isSubmitting || (!content.trim() && !imageFile)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? <LoadingSpinner size="small" /> : 'Post'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CreatePostCard;