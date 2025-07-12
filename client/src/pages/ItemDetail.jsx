import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../styles/ItemDetail.css'
const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/v1/item/${id}`, { withCredentials: true })
      .then((res) => setItem(res.data.item))
      .catch((err) => console.error("Failed to fetch item", err));
  }, [id]);

  if (!item) return <p>Loading item...</p>;

  return (
    <div className="item-detail-container">
      <h2>{item.title}</h2>
      <div className="item-grid">
        <div className="image-gallery">
          {item.images.map((img, index) => (
            <img key={index} src={img.url} alt={`Item image ${index + 1}`} />
          ))}
        </div>
        <div className="product-info">
          <h3>Description</h3>
          <p>{item.description}</p>
          <p><strong>Category:</strong> {item.category}</p>
          <p><strong>Type:</strong> {item.type}</p>
          <p><strong>Size:</strong> {item.size}</p>
          <p><strong>Condition:</strong> {item.condition}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;