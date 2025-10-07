// src/pages/HomePage.jsx

import React from 'react';
import { useOutletContext } from 'react-router-dom';
import MainFeed from '../components/Layout/MainFeed';

const HomePage = () => {
  // Access all the data passed down from AppLayout's Outlet
  const context = useOutletContext();

  return (
    <div>
      {/* Pass all the context data down to MainFeed */}
      <MainFeed {...context} />
    </div>
  );
};

export default HomePage;