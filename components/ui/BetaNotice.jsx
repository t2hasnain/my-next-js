'use client';

import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function BetaNotice() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Check if there's a timestamp stored in localStorage
    const lastDismissedTime = localStorage.getItem('betaNoticeDismissed');
    const currentTime = new Date().getTime();
    
    // Show the notice if it was never dismissed or an hour has passed since last dismissal
    if (!lastDismissedTime || currentTime - parseInt(lastDismissedTime) > 60 * 60 * 1000) {
      setIsVisible(true);
    }
  }, []);
  
  const handleDismiss = () => {
    setIsVisible(false);
    // Store current timestamp
    localStorage.setItem('betaNoticeDismissed', new Date().getTime().toString());
  };
  
  if (!isVisible) {
    return null;
  }
  
  return (
    <div className="bg-blue-600 text-white text-center p-2 text-sm relative">
      <span className="font-medium">Beta Version:</span> We're currently in beta testing. Please report any issues you encounter!
      <button 
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 transition-colors"
        aria-label="Dismiss notification"
      >
        <FaTimes />
      </button>
    </div>
  );
} 