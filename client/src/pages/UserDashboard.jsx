import React, { useContext, useEffect, useState } from "react";
import "../styles/UserDashboard.css";
import { Context } from "../main";
import axios from "axios";
import { Link } from "react-router-dom"; // 👈 Add this

const UserDashboard = () => {
  const { user } = useContext(Context);
  const [uploadedItems, setUploadedItems] = useState([]);
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [itemsRes, swapsRes] = await Promise.all([
          axios.get("/api/v1/user/uploaded-items", { withCredentials: true }),
          axios.get("/api/v1/user/swaps", { withCredentials: true }),
        ]);

        setUploadedItems(itemsRes.data.items || []);
        setSwaps(swapsRes.data.swaps || []);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p className="dashboard">Loading dashboard...</p>;

  return (
    <div className="dashboard">
      <h2>User Dashboard</h2>

      {user && (
        <div className="profile-section">
          <h3 style={{ paddingBottom: 10 }}>Profile</h3>
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Points:</strong> {user.points || 0}</p>
        </div>
      )}

      <div className="uploads-section">
        <h3>Uploaded Items</h3>
        <div className="upload-grid">
          {uploadedItems.length > 0 ? (
            uploadedItems.map((item, index) => (
              <Link
                to={`/item/${item._id}`}  // 👈 Navigates to item detail page
                className="upload-card"
                key={index}
              >
                <img src={item.images[0]?.url} alt={item.title} />
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </Link>
            ))
          ) : (
            <p>No items uploaded yet.</p>
          )}
        </div>
      </div>

      <div className="swaps-section">
        <h3>Swaps</h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {swaps.length > 0 ? (
              swaps.map((swap, index) => (
                <tr key={index}>
                  <td>
                    <Link to={`/item/${swap.item._id}`}>
                      {swap.item.title}
                    </Link>
                  </td>
                  <td>
                    {swap.from.name} <br /> <small>{swap.from.email}</small>
                  </td>
                  <td>
                    {swap.to.name} <br /> <small>{swap.to.email}</small>
                  </td>
                  <td>
                    <span className={`status ${swap.status.toLowerCase()}`}>
                      {swap.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4">No swaps yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
