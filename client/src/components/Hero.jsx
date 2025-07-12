import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../styles/Hero.css";
import { Context } from "../main";
import Hero1 from "../assets/hero-1.jpg";
import Hero2 from "../assets/hero-2.jpg";
import Hero3 from '../assets/hero-3.jpg'

const Hero = () => {
  const { user } = useContext(Context);

  const slides = [
    {
      title: "Start Swapping",
      description: "Exchange your unused clothes with the community.",
      buttonLabel: "Start Swapping",
      image: Hero1,
      path: "/swap",
    },
    {
      title: "Browse Items",
      description: "Explore what others are offering.",
      buttonLabel: "Browse Items",
      image: Hero2,
      path: "/items",
    },
    {
      title: "Browse Categories",
      description: "Find items by category – easy and quick.",
      buttonLabel: "Browse Categories",
      image: Hero3,
      path: "/categories",
    },
  ];

  return (
    <div className="hero-carousel">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="hero-slide">
              <img src={slide.image} alt={slide.title} className="hero-img" />
              <div className="hero-text">
                <h4>Hello, {user ? user.name : "Developer"}</h4>
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
                <Link to={slide.path} className="cta-button">
                  {slide.buttonLabel}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
