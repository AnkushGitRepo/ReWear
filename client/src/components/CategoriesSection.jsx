import React from 'react';
// import '../styles/CategoriesSection.css';
import '../styles/CategoriesSection.css'


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
          <div key={index} className="category-card">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
