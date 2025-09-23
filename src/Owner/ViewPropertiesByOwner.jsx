import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function ViewPropertiesByOwner() {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState('');
  const [ownerId, setOwnerId] = useState(null);

  useEffect(() => {
    const storedOwner = sessionStorage.getItem('owner');
    if (storedOwner) {
      const owner = JSON.parse(storedOwner);
      setOwnerId(owner.id);
      fetchProperties(owner.id);
    }
  }, []);

  const fetchProperties = async (ownerId) => {
    try {
      const response = await axios.get(`${config.url}/owner/viewpropertiesbyowner/${ownerId}`);
      setProperties(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch your properties.');
      setProperties([]);
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>My Properties</h3>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {properties.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No properties added yet.</p>
      ) : (
        <table style={{ margin: '0 auto', width: '90%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Property ID</th>
              <th>Category</th>
              <th>Title</th>
              <th>Description</th>
              <th>Size (sq. ft.)</th>
              <th>Cost</th>
              <th>Owner Name</th>
              <th>Owner Email</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id}>
                <td>{property.id}</td>
                <td>{property.category}</td>
                <td>{property.title}</td>
                <td>{property.description}</td>
                <td>{property.size}</td>
                <td>₹{property.cost}</td>
                <td>{property.owner?.name}</td>
                <td>{property.owner?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
