import React from "react";

export default function LoadingSpinner({ size = "small", color = "white" }) {
  const dims = size === "small" ? "h-4 w-4" : "h-8 w-8";
  return <div className={`${dims} border-2 border-t-2 border-${color} rounded-full animate-spin`} />;
}
