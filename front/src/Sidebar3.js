import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/jenkins">Jenkins</NavLink>
        </li>
        <li>
          <NavLink to="/dns">DNS</NavLink>
        </li>
        <li>
          <NavLink to="/vms">VMs</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
