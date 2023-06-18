import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isAdmin } from './components/utils/authUtils';

import LandingPage from './components/common/landingPage'
import Signup from './components/authentication/signup'
import Login from './components/authentication/login'
import NavbarComponent from './components/common/navbar';
import Footer from './components/common/footer';
import AdminDashboard from './components/admin/adminDashboard';
import ManageUsers from './components/admin/manageusers';
import DashboardContent from './components/admin/dashboardContent';
import ManagePodcasts from './components/admin/managePodcasts';
import PodcastForm from './components/podcast/podcastForm';
import UserForm from './components/user/userForm';
import PodcastPlayer from './components/podcast/podcastPlayer';
import SelectedPodcastContext from './components/podcast/selectedPodcastContext';
import Loader from './components/utils/loader';



function App() {
  const [scrolled, setScrolled] = useState(false);

  const [selectedPodcast, setSelectedPodcast] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY >= 100;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
      <SelectedPodcastContext.Provider value={{ selectedPodcast, setSelectedPodcast }}>
        <Router >
          <NavbarComponent bg={scrolled ? 'dark' : 'transparent'} variant={scrolled ? 'dark' : 'light'} />

          {selectedPodcast && (
            <PodcastPlayer podcast={selectedPodcast} />
          )}

          <Routes >
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login" element={<Login />} />
            <Route path="/admin/dashboard/*" element={isAdmin() ? <AdminDashboard /> : <Login />}>
              <Route index element={<DashboardContent />} />
              <Route path="content" element={<DashboardContent />} />
              <Route path="users" element={<ManageUsers />} >
                <Route path="action" element={<UserForm />} />
              </Route>
              <Route path="podcasts" element={<ManagePodcasts />} >
                <Route path="action" element={<PodcastForm />} />
              </Route>
            </Route>
          </Routes>
          <Footer />
        </Router>
      </SelectedPodcastContext.Provider>
    
  );
}

export default App;
