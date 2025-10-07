// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout'; // Import our new layout
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import ExplorePage from './pages/ExplorePage';
import SinglePostPage from './pages/SinglePostPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* This is the parent route that provides the shared layout */}
        <Route path="/" element={<AppLayout />}>
          {/* These are the child routes that will render inside the <Outlet /> */}
          <Route index element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="post/:postId" element={<SinglePostPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;