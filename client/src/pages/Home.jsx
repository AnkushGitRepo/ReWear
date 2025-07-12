import React from "react";
import Hero from "../components/Hero";
import "../styles/Home.css";
// import CategoriesSection from "../components/Categories";
import CategoriesSection from "../components/CategoriesSection";
import ProductCarousel from "../components/ProductCarousel";

const Home = () => {
  return (
    <>
      <Hero />
      <CategoriesSection/>
      <ProductCarousel/>
    </>
  );
};

export default Home;