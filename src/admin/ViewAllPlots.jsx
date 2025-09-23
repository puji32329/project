import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import './admin.css';

const ViewAllPlots = () => {
  const [plots, setPlots] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPlots();
  }, []);

  const fetchPlots = async () => {
    try 
    {
      const response = await axios.get(`${config.url}/plot/viewallplots`);
      setPlots(response.data);
      setError('');
    } 
    catch (err) 
    {
      setError('Failed to fetch plots. ' + err.message);
    }
  };

  return (
    <div className="plot-table-container">
      <h3 className="plot-heading">All Plots</h3>

      <p style={{ textAlign: "center", color: "green", fontWeight: "bolder" }}>{error}</p>

      <div className="table-responsive">
        <table className="plot-table" style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Location</th>
              <th>Size (sq ft)</th>
              <th>Price</th>
              <th>URL</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {plots.map((plot, index) => (
              <tr key={index}>
                <td>{plot.id}</td>
                <td>{plot.name}</td>
                <td>{plot.category}</td>
                <td>{plot.location}</td>
                <td>{plot.size}</td>
                <td>₹{plot.price}</td>
                <td>
                  <a href={plot.url} target="_new" rel="noopener noreferrer">
                    Visit
                  </a>
                </td>
                <td>
                  <img
                    src={`${config.url}/plot/displayplotimage?id=${plot.id}`}
                    alt="Plot"
                    className="table-image"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllPlots;

