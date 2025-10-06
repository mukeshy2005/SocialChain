import React from 'react';

export default function Avatar({ address, src, size = "md", className = "" }) {
  // Sizes mapping
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-14 w-14",
    xl: "h-20 w-20"
  };
  
  // Generate color based on address
  const generateColor = (address) => {
    if (!address) return { background: "#614CB6" };
    
    // Create a simple hash from the address
    const hash = address.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    // Generate HSL color with fixed saturation and lightness
    const h = Math.abs(hash % 360);
    return { background: `hsl(${h}, 70%, 60%)` };
  };
  
  // Get initials from address
  const getInitials = (address) => {
    if (!address) return "?";
    return `${address[2]}${address[address.length - 1]}`.toUpperCase();
  };
  
  // If src is provided, show image, otherwise show colored circle with initials
  return (
    <div 
      className={`rounded-full flex items-center justify-center overflow-hidden ${sizes[size]} ${className}`}
      style={!src ? generateColor(address) : {}}
    >
      {src ? (
        <img src={src} alt="Avatar" className="h-full w-full object-cover" />
      ) : (
        <span className="text-white font-semibold">
          {getInitials(address)}
        </span>
      )}
    </div>
  );
}