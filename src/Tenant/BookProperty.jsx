import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import config from '../config';

export default function BookProperty() 
{
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const propertyId = queryParams.get('propertyid');

  const [tenant, setTenant] = useState(null);
  const [formData, setFormData] = useState({
    startdate: '',
    enddate: '',
    rentalcost: ''
  });

  useEffect(() => {
    const storedTenant = sessionStorage.getItem("tenant");
    if (storedTenant) {
      setTenant(JSON.parse(storedTenant));
    } else {
      alert("Tenant not logged in!");
      navigate('/tenantlogin');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      property: { id: propertyId },
      tenant: { id: tenant.id },
      ...formData,
      status: "PENDING"
    };

    try {
      const response = await fetch(`${config.url}/tenant/bookproperty`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      if (response.ok) {
        alert("Property booked successfully!");
        navigate('/bookedproperties');
      } else {
        alert("Failed to book property.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ textAlign: 'center' }}>Book Property</h3>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: 'auto' }}>
        <div>
          <label>Start Date: </label>
          <input type="date" name="startdate" value={formData.startdate} onChange={handleChange} required />
        </div>
        <div>
          <label>End Date: </label>
          <input type="date" name="enddate" value={formData.enddate} onChange={handleChange} required />
        </div>
        <div>
          <label>Rental Cost: </label>
          <input type="number" name="rentalcost" step="0.01" value={formData.rentalcost} onChange={handleChange} required />
        </div>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button type="submit">Confirm Booking</button>
        </div>
      </form>
    </div>
  );
}
