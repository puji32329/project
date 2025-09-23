import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function ViewPropertyBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [ownerId, setOwnerId] = useState(null);

  useEffect(() => {
    const storedOwner = sessionStorage.getItem('owner');
    if (storedOwner) {
      const owner = JSON.parse(storedOwner);
      setOwnerId(owner.id);
      fetchBookings(owner.id);
    } else {
      setError('Owner not logged in.');
    }
  }, []);

  const fetchBookings = async (ownerId) => {
    try {
      const response = await axios.get(`${config.url}/owner/viewpropertybookings/${ownerId}`);
      setBookings(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch bookings.');
      setBookings([]);
    }
  };

  const updateStatus = async (bookingId, status) => {
    try {
      const response = await axios.get(`${config.url}/owner/updatepropertybookingstatus`, {
        params: {
          id: bookingId,
          status: status
        }
      });
      alert(response.data);
      fetchBookings(ownerId); // Refresh the bookings list
    } catch (err) {
      alert('Failed to update booking status.');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}>Bookings for My Properties</h3>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {bookings.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No bookings available for your properties.</p>
      ) : (
        <table style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th>Booking ID</th>
              <th>Property ID</th>
              <th>Property Title</th>
              <th>Tenant Name</th>
              <th>Tenant Email</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Rental Cost</th>
              <th>Status</th>
              <th>Booking Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.id}</td>
                <td>{booking.property.id}</td>
                <td>{booking.property.title}</td>
                <td>{booking.tenant.name}</td>
                <td>{booking.tenant.email}</td>
                <td>{booking.startdate}</td>
                <td>{booking.enddate}</td>
                <td>₹{booking.rentalcost}</td>
                <td>{booking.status}</td>
                <td>{new Date(booking.bookingtime).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => updateStatus(booking.id, 'ACCEPTED')}
                    style={{ marginRight: '5px', backgroundColor: 'green', color: 'white' }}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus(booking.id, 'REJECTED')}
                    style={{ backgroundColor: 'red', color: 'white' }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
