import React, { useContext } from "react";
import "../styles/UserDashboard.css";
import { Context } from "../main";
// Import images at the top
import denimImg from '../assets/denim.jpg';
import sneakerImg from '../assets/sneaker.jpg';

// Use in your data array
const uploadedItems = [
  {
    name: "Denim Jacket",
    description: "Stylish blue denim jacket.",
    image: denimImg,
  },
  {
    name: "White Sneakers",
    description: "Comfortable shoes for everyday wear.",
    image: sneakerImg,
  },
];

const swaps = [
  {
    item: "Denim Jacket",
    from: { name: "Rajvi", email: "rajvi@example.com" },
    to: { name: "Ayesha", email: "ayesha@swap.com" },
    status: "Ongoing",
  },
  {
    item: "White Sneakers",
    from: { name: "Rajvi", email: "rajvi@example.com" },
    to: { name: "Kabir", email: "kabir@swap.com" },
    status: "Completed",
  },
];

const UserDashboard = () => {
  const { user } = useContext(Context);

  return (
    <div className="dashboard">
      <h2>User Dashboard</h2>

      {user && (
        <div className="profile-section">
          <h3 style={{paddingBottom:10}}>Profile</h3>
          <p>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Points:</strong> {user.points || 0}
          </p>
        </div>
      )}

      <div className="uploads-section">
        <h3>Uploaded Items</h3>
        <div className="upload-grid">
          {uploadedItems.map((item, index) => (
            <div className="upload-card" key={index}>
              <img src={item.image} alt={item.name} />
              <h4>{item.name}</h4>
              <p>{item.description}</p>
            </div>
          ))}
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
            {swaps.map((swap, index) => (
              <tr key={index}>
                <td>{swap.item}</td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
