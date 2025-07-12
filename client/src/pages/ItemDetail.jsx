import React from 'react';
import '../styles/ItemDetail.css';

const product = {
  title: "Classic Denim Jacket",
  description: "A timeless denim jacket with a comfortable fit.",
  category: "Jackets",
  type: "Clothing",
  size: "M",
  condition: "Gently Used",
  tags: ["denim", "jacket", "casual"],
  available: true,
  images: [
    "https://images.unsplash.com/photo-1602810317166-d0754a3b7ab8",
    "https://images.unsplash.com/photo-1520975698519-59c3c31f3f90"
  ]
};

const ItemDetail = () => {
  return (
    <div className="item-detail-container">
      <h2>Product Detail Page</h2>
      
      <div className="item-grid">
        <div className="image-gallery">
          {product.images.map((img, i) => (
            <img src={img} key={i} alt={`Product ${i}`} />
          ))}
        </div>

        <div className="product-info">
          <h3>{product.title}</h3>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Type:</strong> {product.type}</p>
          <p><strong>Size:</strong> {product.size}</p>
          <p><strong>Condition:</strong> {product.condition}</p>
          <p><strong>Tags:</strong> {product.tags.join(', ')}</p>

          <div className="button-row">
            <button className="swap-btn">Swap Request</button>
            <button className="redeem-btn">Redeem via Points</button>
            <button className={`status-btn ${product.available ? "available" : "unavailable"}`}>
              {product.available ? "Available" : "Not Available"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
