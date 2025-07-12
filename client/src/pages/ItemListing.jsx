import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ItemListing.css';

const ItemListing = () => {
const [title, setTitle] = useState('Untitled Item');
const [description, setDescription] = useState('No description provided.');
const [category, setCategory] = useState('General');
const [type, setType] = useState('');
const [size, setSize] = useState('');
const [condition, setCondition] = useState('Good');
const [tags, setTags] = useState('');

  const [productImages, setProductImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

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

  const handleListItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('type', type);
    formData.append('size', size);
    formData.append('condition', condition);
    formData.append('tags', tags);

    for (let i = 0; i < productImages.length; i++) {
formData.append('files', productImages[i]); // make sure key matches what multer expects
    }

    try {
      console.log({
        title, description, category, condition, type, size, tags, images: productImages
      });
      for (let pair of formData.entries()) {
  console.log(pair[0] + ': ' + pair[1]);
}

      await axios.post('http://localhost:4000/api/v1/item/new', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Item listed successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error listing item:', error);
      alert('Failed to list item. Please try again.');
    }
  };

  return (
    <div className="item-listing-container">
      <h1>List an Item</h1>
      <form className="item-listing-form" onSubmit={handleListItem}>
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
                    <button type="button" onClick={handlePrevImage} className="prev-button">&#10094;</button>
                    <button type="button" onClick={handleNextImage} className="next-button">&#10095;</button>
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
          <input type="text" placeholder="Enter title" className="item-listing-input" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea placeholder="Enter description" className="item-listing-textarea" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          <input type="text" placeholder="Enter category" className="item-listing-input" value={category} onChange={(e) => setCategory(e.target.value)} />
          <input type="text" placeholder="Enter type" className="item-listing-input" value={type} onChange={(e) => setType(e.target.value)} />
          <input type="text" placeholder="Enter size" className="item-listing-input" value={size} onChange={(e) => setSize(e.target.value)} />
          <input type="text" placeholder="Enter condition" className="item-listing-input" value={condition} onChange={(e) => setCondition(e.target.value)} />
          <input type="text" placeholder="Enter tags" className="item-listing-input" value={tags} onChange={(e) => setTags(e.target.value)} />
          <button type="submit" className="item-listing-button">List Item</button>
        </div>
      </form>
    </div>
  );
};

export default ItemListing;
