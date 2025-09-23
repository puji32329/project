import { useState, useEffect } from 'react';

export default function OwnerProfile() {
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    const storedOwner = sessionStorage.getItem('owner');
    if (storedOwner) {
      setOwner(JSON.parse(storedOwner));
    }
  }, []);

  if (!owner) {
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
        Owner Profile
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
        <p><strong>Name:</strong> {owner.name}</p>
        <p><strong>Gender:</strong> {owner.gender}</p>
        <p><strong>Date of Birth:</strong> {owner.dob}</p>
        <p><strong>Email:</strong> {owner.email}</p>
        <p><strong>Username:</strong> {owner.username}</p>
        <p><strong>Mobile No:</strong> {owner.mobileno}</p>
        <p><strong>Company Name:</strong> {owner.company_name}</p>
        <p><strong>Company Location:</strong> {owner.company_location}</p>
      </div>
    </div>
  );
}
