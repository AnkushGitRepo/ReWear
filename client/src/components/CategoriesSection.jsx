import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CategoriesSection.css';
 
const categories = [
  "T-Shirts",
  "Sweatshirts",
  "Jeans",
  "Shoes",
  "Formals",
  "Sweaters"
];
 
const CategoriesSection = () => {
  return (
    <div className="categories-wrapper">
      <h2 className="categories-heading">Categories</h2>
      <div className="categories-grid">
        {categories.map((item, index) => (
          <Link to={`/category/${item.toLowerCase()}`} key={index} className="category-card">
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
};
 
export default CategoriesSection;
