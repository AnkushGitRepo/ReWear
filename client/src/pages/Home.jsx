import React from "react";
import Hero from "../components/Hero";
import "../styles/Home.css";
// import CategoriesSection from "../components/Categories";
import CategoriesSection from "../components/CategoriesSection";

const Home = () => {
  return (
    <>
      <Hero />
      <CategoriesSection/>
    </>
  );
};

export default Home;