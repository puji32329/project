//import React from 'react';
import './style.css'; 
import './HomePage.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="admin-section">
        <h3>Admin Roles</h3>
        <ul>
          <li>Admin Login</li>
          <li>Add Owner</li>
          <li>View/Delete Owners</li>
          <li>View Tenants</li>
          <li>Delete/Block Tenant</li>
          <li>View All Plots</li>
        </ul>
      </div>
      <div className="owner-section">
        <h3>Owner Roles</h3>
        <ul>
          <li>Owner Login</li>
          <li>View/Update Profile</li>
          <li>Add New Plot</li>
          <li>View Plots</li>
          <li>View Tenant Applications</li>
        </ul>
      </div>
      <div className="tenant-section">
        <h3>Tenant Roles</h3>
        <ul>
          <li>Registration</li>
          <li>Tenant Login</li>
          <li>View/Update Profile</li>
          <li>Apply for a Plot</li>
          <li>View Approved Plots</li>
        </ul>
      </div>
    </div>
  );
}
