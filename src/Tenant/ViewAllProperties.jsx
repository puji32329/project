import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import './tenant.css'; // Include the custom CSS

export default function ViewAllProperties() {
  const [properties, setProperties] = useState([]);
  const [searchTerms, setSearchTerms] = useState({
    id: '',
    owner: '',
    company: '',
    category: '',
    title: '',
    description: '',
    size: '',
    cost: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllProperties();
  }, []);

  const fetchAllProperties = async () => {
    try {
      const response = await fetch(`${config.url}/tenant/viewallproperties`);
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleBookClick = (propertyId) => {
    const tenant = JSON.parse(sessionStorage.getItem("tenant"));
    if (!tenant || !tenant.id) {
      alert("Tenant not logged in");
      return;
    }

    navigate(`/bookproperty?propertyid=${propertyId}`);
  };

  const handleSearchChange = (e, field) => {
    setSearchTerms(prev => ({ ...prev, [field]: e.target.value }));
  };

  const filteredProperties = properties.filter(property => {
    return (
      property.id.toString().includes(searchTerms.id) &&
      property.owner.name.toLowerCase().includes(searchTerms.owner.toLowerCase()) &&
      property.owner.company_name.toLowerCase().includes(searchTerms.company.toLowerCase()) &&
      property.category.toLowerCase().includes(searchTerms.category.toLowerCase()) &&
      property.title.toLowerCase().includes(searchTerms.title.toLowerCase()) &&
      property.description.toLowerCase().includes(searchTerms.description.toLowerCase()) &&
      property.size.toString().includes(searchTerms.size) &&
      property.cost.toString().includes(searchTerms.cost)
    );
  });

  return (
    <div className="property-container">
      <h3 className="property-heading">Available Properties</h3>
      <table className="property-table">
        <thead>
          <tr>
            <th>Property ID</th>
            <th>Owner Name</th>
            <th>Company Name</th>
            <th>Category</th>
            <th>Title</th>
            <th>Description</th>
            <th>Size (sq. ft.)</th>
            <th>Cost</th>
            <th>Action</th>
          </tr>
          <tr>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'id')} /></th>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'owner')} /></th>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'company')} /></th>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'category')} /></th>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'title')} /></th>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'description')} /></th>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'size')} /></th>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'cost')} /></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredProperties.length > 0 ? (
            filteredProperties.map(property => (
              <tr key={property.id}>
                <td>{property.id}</td>
                <td>{property.owner.name}</td>
                <td>{property.owner.company_name}</td>
                <td>{property.category}</td>
                <td>{property.title}</td>
                <td>{property.description}</td>
                <td>{property.size}</td>
                <td>₹{property.cost}</td>
                <td>
                  <button className="book-button" onClick={() => handleBookClick(property.id)}>Book</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No matching properties found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
