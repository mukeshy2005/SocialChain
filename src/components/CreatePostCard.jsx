import React, { useState } from 'react';
import Button from './Button';
import Avatar from './Avatar';
import { uploadToPinata } from '../utils/uploadToPinta'; 

export default function CreatePostCard({ account, onSubmit, isSubmitting }) {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFocus = () => setIsExpanded(true);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    if (!content.trim() && !selectedImage) return;

    try {
      setUploading(true);

      let imageUrl = null;

      // ✅ Upload image to Pinata before calling parent onSubmit
      if (selectedImage) {
        imageUrl = await uploadToPinata(selectedImage);
        console.log("📸 Uploaded image URL:", imageUrl);
      }

      // Call parent submit handler with content + image URL
      await onSubmit({
        content,
        image: imageUrl,
      });

      // Reset form
      setContent('');
      setSelectedImage(null);
      setImagePreview(null);
      setIsExpanded(false);
    } catch (err) {
      console.error("❌ Error submitting post:", err);
      alert("Error creating post. Check console.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 mb-6 shadow-lg transition-all duration-300">
      <div className="flex space-x-3">
        <Avatar address={account} size="md" />
        
        <div className="flex-1">
          <div 
            className={`bg-gray-700/50 rounded-xl p-3 transition-all ${isExpanded ? 'h-32' : 'h-12'}`}
          >
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={handleFocus}
              placeholder="What's happening in the blockchain world?"
              className="bg-transparent w-full h-full resize-none outline-none text-white placeholder-gray-400"
            ></textarea>
          </div>
          
          {/* Image preview */}
          {imagePreview && (
            <div className="relative mt-3 rounded-lg overflow-hidden">
              <img src={imagePreview} alt="Preview" className="max-h-60 rounded-lg object-contain" />
              <button 
                onClick={removeImage}
                className="absolute top-2 right-2 bg-gray-900/80 text-white rounded-full p-1 hover:bg-red-500/80 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          
          {isExpanded && (
            <div className="flex justify-between mt-3">
              {/* Media upload */}
              <div className="flex space-x-3">
                <label className="cursor-pointer flex items-center text-gray-400 hover:text-orange-400 transition-colors">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Media
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>import React, { useState } from 'react';
import Button from './Button';
import Avatar from './Avatar';

export default function CreatePostCard({ account, onSubmit, isSubmitting }) {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const handleFocus = () => {
    setIsExpanded(true);
  };
  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };
  
  const handleSubmit = () => {
    if (!content.trim() && !selectedImage) return;
    
    onSubmit({ 
      content, 
      image: selectedImage 
    });
    
    // Reset form
    setContent('');
    setSelectedImage(null);
    setImagePreview(null);
    setIsExpanded(false);
  };
  
  return (
    <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 mb-6 shadow-lg transition-all duration-300">
      <div className="flex space-x-3">
        <Avatar address={account} size="md" />
        
        <div className="flex-1">
          <div 
            className={`bg-gray-700/50 rounded-xl p-3 transition-all ${isExpanded ? 'h-32' : 'h-12'}`}
          >
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={handleFocus}
              placeholder="What's happening in the blockchain world?"
              className="bg-transparent w-full h-full resize-none outline-none text-white placeholder-gray-400"
            ></textarea>
          </div>
          
          {/* Image preview */}
          {imagePreview && (
            <div className="relative mt-3 rounded-lg overflow-hidden">
              <img src={imagePreview} alt="Preview" className="max-h-60 rounded-lg object-contain" />
              <button 
                onClick={removeImage}
                className="absolute top-2 right-2 bg-gray-900/80 text-white rounded-full p-1 hover:bg-red-500/80 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          
          {isExpanded && (
            <div className="flex justify-between mt-3">
              {/* Media upload button */}
              <div className="flex space-x-3">
                <label className="cursor-pointer flex items-center text-gray-400 hover:text-orange-400 transition-colors">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Media
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
                
                {/* We could add more buttons here like polls, emoji, etc. */}
              </div>
              
              <Button 
                size="sm" 
                disabled={!content.trim() && !selectedImage}
                isLoading={isSubmitting}
                onClick={handleSubmit}
              >
                Post
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
              
              <Button 
                size="sm" 
                disabled={(!content.trim() && !selectedImage) || uploading}
                isLoading={isSubmitting || uploading}
                onClick={handleSubmit}
              >
                {uploading ? "Uploading..." : "Post"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
