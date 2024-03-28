import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UploadHistory.css";

const UploadHistory = ({ onSearchItemClicked }) => {
  const [uploadHistory, setUploadHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const storedToken = localStorage.getItem("jwtToken");

  const fetchUploadHistory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/activity/uploaded",
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      const lastTenItems = response.data.slice(-11).reverse();
      setUploadHistory(lastTenItems);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItemId((prevId) => (prevId === item.id ? null : item.id));
    onSearchItemClicked(item);
  };

  useEffect(() => {
    fetchUploadHistory();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className="upload-history">
        <table className="upload-table">
          <thead>
            <tr>
              <th>CV Email</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {uploadHistory.map((item) => (
              <tr
                key={item.id}
                className={
                  selectedItemId === item.id ? "selected-row" : "upload-item"
                }
                onClick={() => handleItemClick(item)}
              >
                <td>{item.personEmail}</td>
                <td>{new Date(item.createdDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UploadHistory;
