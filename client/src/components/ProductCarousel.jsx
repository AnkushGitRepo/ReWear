import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
// import './ProductCarousel.css';
import '../styles/ProductCarousel.css'
import tshirt from '../assets/tshirt.jpg'
import denim from '../assets/denim.jpg'
import sneaker from '../assets/sneaker.jpg'
import formal from '../assets/formal.jpg'

const products = [
  {
    name: "Classic T-Shirt",
    description: "Soft cotton t-shirt available in various colors.",
    image: tshirt
  },
  {
    name: "Denim Jeans",
    description: "Stylish and durable jeans for everyday wear.",
    image: denim
  },
  {
    name: "Sneakers",
    description: "Comfortable sneakers perfect for casual walks.",
    image: sneaker
  },
  {
    name: "Formal Shirt",
    description: "Perfect for meetings and formal occasions.",
    image: formal
  },
];

const ProductCarousel = () => {
  return (
    <div className="product-carousel">
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        loop={true}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;
