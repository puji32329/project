import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export default function BookedProperty() {
  const [bookedProperties, setBookedProperties] = useState([]);
  const [tenant, setTenant] = useState(null);

  useEffect(() => {
    const fetchBookedProperties = async () => {
      const storedTenant = sessionStorage.getItem('tenant');
      if (storedTenant) {
        const tenantData = JSON.parse(storedTenant);
        setTenant(tenantData);
        try {
          const response = await axios.get(`${config.url}/tenant/bookedproperties/${tenantData.id}`);
          setBookedProperties(response.data);
        } catch (error) {
          console.error('Error fetching booked properties:', error);
        }
      } else {
        alert('Please log in to view your booked properties.');
      }
    };

    fetchBookedProperties();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}>Your Booked Properties</h3>
      {tenant ? (
        <div>
          <table style={{ width: '100%', textAlign: 'center', marginBottom: '30px' }}>
            <thead style={{ backgroundColor: '#f2f2f2' }}>
              <tr>
                <th>Booking ID</th>
                <th>Property Category</th>
                <th>Property Title</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Rental Cost</th>
                <th>Status</th>
                <th>Booking Time</th>
              </tr>
            </thead>
            <tbody>
              {
                bookedProperties.length > 0 ? bookedProperties.map((property, index) => (
                  <tr key={index}>
                    <td>{property.id}</td>
                    <td>{property.property.category}</td>
                    <td>{property.property.title}</td>
                    <td>{property.startdate}</td>
                    <td>{property.enddate}</td>
                    <td>₹{property.rentalcost}</td>
                    <td>{property.status}</td>
                    <td>{new Date(property.bookingtime).toLocaleString()}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="8">No booked properties found.</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading your tenant details...</p>
      )}
    </div>
  );
}
