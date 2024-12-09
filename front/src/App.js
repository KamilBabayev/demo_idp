import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Sidebar from './Sidebar3';
import HomePage from './HomePage';
import JenkinsPage from './JenkinsPage';
import DnsPage from './DnsPage';
import VmsPage from './VmsPage';
import Topbar from './Topbar';
import Sidebar from './Sidebar';

function App() {
  return (
    <Router>
      <div>
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jenkins" element={<JenkinsPage />} />
          <Route path="/dns" element={<DnsPage />} />
          <Route path="/vms" element={<VmsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
