import React, { useState } from 'react';
import '../styles/ItemListing.css';

const ItemListing = () => {
  const [productImages, setProductImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setProductImages(prevImages => [...prevImages, ...files]);

      const newPreviews = files.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(newPreviews).then(previews => {
        setImagePreviews(prevPreviews => [...prevPreviews, ...previews]);
      });
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % imagePreviews.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex - 1 + imagePreviews.length) % imagePreviews.length);
  };

  return (
    <div className="item-listing-container">
      <h1>List an Item</h1>
      <div className="item-listing-form">
        <div className="image-upload-section">
          <div className="image-upload-container">
            <label htmlFor="product-image-upload" className="image-upload-label">
              <span>Upload Product Images</span>
            </label>
            <input
              id="product-image-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>
          {imagePreviews.length > 0 && (
            <div className="carousel-container">
              <div className="main-image-container">
                <img src={imagePreviews[currentImageIndex]} alt={`Product Preview ${currentImageIndex + 1}`} className="main-image" />
                {imagePreviews.length > 1 && (
                  <>
                    <button onClick={handlePrevImage} className="prev-button">&#10094;</button>
                    <button onClick={handleNextImage} className="next-button">&#10095;</button>
                  </>
                )}
              </div>
              <div className="thumbnail-container">
                {imagePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Thumbnail ${index + 1}`}
                    className={`thumbnail-image ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="item-details-container">
          <input type="text" placeholder="Enter title" className="item-listing-input" />
          <textarea placeholder="Enter description" className="item-listing-textarea"></textarea>
          <input type="text" placeholder="Enter category" className="item-listing-input" />
          <input type="text" placeholder="Enter type" className="item-listing-input" />
          <input type="text" placeholder="Enter size" className="item-listing-input" />
          <input type="text" placeholder="Enter condition" className="item-listing-input" />
          <input type="text" placeholder="Enter tags" className="item-listing-input" />
          <button className="item-listing-button">List Item</button>
        </div>
      </div>
    </div>
  );
};

export default ItemListing;
