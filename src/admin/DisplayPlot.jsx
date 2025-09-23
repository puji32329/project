import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

const DisplayPlot = () => 
{
  const [plots, setPlots] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [plotDetails, setPlotDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllPlots();
  }, []);

  const fetchAllPlots = async () => {
    try {
      const response = await axios.get(`${config.url}/plot/viewallplots`);
      setPlots(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch plots: ' + err.message);
    }
  };

  const fetchPlotById = async (id) => {
    try {
      const response = await axios.post(`${config.url}/plot/displayplotbyid?pid=${id}`);
      setPlotDetails(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching plot: ' + err.message);
    }
  };

  const handleSelection = (e) => 
  {
    const id = e.target.value;
    setSelectedId(id);
    if (id) 
    {
      fetchPlotById(id);
    } 
    else 
    {
      setPlotDetails(null);
    }
  };

  return (
    <div className="container mt-4">
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Display Plot Details</h3>

      {error && <p className="text-danger text-center">{error}</p>}

      <div className="form-group mb-3">
        <label><strong>Select a Plot:</strong></label>
        <select className="form-control" value={selectedId} onChange={handleSelection}>
          <option value="">-- Select Plot --</option>
          {plots.map(plot => (
            <option key={plot.id} value={plot.id}>
              {plot.name}
            </option>
          ))}
        </select>
      </div>

      {plotDetails && (
        <div className="card mt-3">
          <img
            src={`${config.url}/plot/displayplotimage?id=${plotDetails.id}`}
            className="card-img-top"
            alt="Plot"
            style={{ height: "300px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title">{plotDetails.name}</h5>
            <p className="card-text">
              <strong>Category:</strong> {plotDetails.category}<br />
              <strong>Location:</strong> {plotDetails.location}<br />
              <strong>Size:</strong> {plotDetails.size} sq ft<br />
              <strong>Price:</strong> ₹{plotDetails.price}<br />
              <strong>URL:</strong> <a href={plotDetails.url} target="_blank" rel="noopener noreferrer">Visit</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayPlot;

