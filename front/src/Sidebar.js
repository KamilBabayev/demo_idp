// Sidebar.js
import React, { useState } from 'react';

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="sidebar">
      <button className="sidebar-toggle" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Close' : 'Open'}
      </button>
      <div className={`sidebar-content ${isExpanded ? 'expanded' : ''}`}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/jenkins">Jenkins</a></li>
          <li><a href="/dns">DNS</a></li>
          <li><a href="/vms">VMs</a></li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;