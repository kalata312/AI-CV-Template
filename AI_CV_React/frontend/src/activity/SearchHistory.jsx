import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SearchHistory.css";

const SearchHistory = ({ onSearchItemClicked }) => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const storedToken = localStorage.getItem("jwtToken");

  const fetchSearchHistory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/activity/searched",
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      const lastTenItems = response.data.slice(-11).reverse();
      setSearchHistory(lastTenItems);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchHistory();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItemId((prevId) => (prevId === item.id ? null : item.id));
    onSearchItemClicked(item);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className="search-history">
        <table>
          <thead>
            <tr>
              <th>CV Email</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {searchHistory.map((item) => (
              <tr
                key={item.id}
                className={
                  selectedItemId === item.id ? "selected-row" : "search-item"
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

export default SearchHistory;
