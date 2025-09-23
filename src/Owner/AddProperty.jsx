
import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export default function AddProperty() {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    size: '',
    cost: ''
  });

  const [owner, setOwner] = useState("");
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedOwner = sessionStorage.getItem('owner');
    if (storedOwner) {
      setOwner(JSON.parse(storedOwner));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const propertyData = {
      ...formData,
      owner_id: owner.id // from session storage
    };

    try {
      const response = await axios.post(`${config.url}/owner/addproperty`, propertyData);
      if (response.status === 200) {
        setMessage(response.data);
        setError('');
        setFormData({
          category: '',
          title: '',
          description: '',
          size: '',
          cost: ''
        });
      }
    } catch (error) {
      setMessage('');
      if (error.response) {
        setError(error.response.data);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Add New Property</h3>
      {
        message ?
          <p style={{ textAlign: "center", color: "green", fontWeight: "bolder" }}>{message}</p> :
          <p style={{ textAlign: "center", color: "red", fontWeight: "bolder" }}>{error}</p>
      }
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category</label>
          <input type="text" id="category" value={formData.category} onChange={handleChange} required />
        </div>
        <div>
          <label>Title</label>
          <input type="text" id="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Description</label>
          <textarea id="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Size (sq. ft.)</label>
          <input type="number" id="size" value={formData.size} onChange={handleChange} required />
        </div>
        <div>
          <label>Cost</label>
          <input type="number" step="0.01" id="cost" value={formData.cost} onChange={handleChange} required />
        </div>
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
}
