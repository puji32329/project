import { useState, useEffect } from 'react';

export default function TenantProfile() {
  const [tenant, setTenant] = useState("");

  useEffect(() => {
    const storedTenant = sessionStorage.getItem('tenant');
    if (storedTenant) {
      setTenant(JSON.parse(storedTenant));
    }
  }, []);

  if (!tenant) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        Loading profile...
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ fontSize: '26px', color: '#333', marginBottom: '20px' }}>
        Tenant Profile
      </h2>

      <div
        style={{
          backgroundColor: 'light grey',
          border: '1px solid black',
          borderRadius: '10px',
          padding: '20px',
          width: '350px',
        }}
      >
        <p><strong>Name:</strong> {tenant.name}</p>
        <p><strong>Gender:</strong> {tenant.gender}</p>
        <p><strong>Date of Birth:</strong> {tenant.dob}</p>
        <p><strong>Email:</strong> {tenant.email}</p>
        <p><strong>Username:</strong> {tenant.username}</p>
        <p><strong>Mobile No:</strong> {tenant.mobileno}</p>
        <p><strong>Location:</strong> {tenant.location}</p>
      </div>
    </div>
  );
}
