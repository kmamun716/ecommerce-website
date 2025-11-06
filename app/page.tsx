'use client'
import React from "react";
import HomeSlider from "@/ui/Home/HomeSlider";
import Banner from "@/ui/Home/Banner";
import FeaturedProducts from "@/ui/FeaturedProducts";
import HomeProducts from "@/ui/Home/HomeProducts";
import NewsLetter from "@/ui/Home/NewsLetter";

const Home = () => {
  return (
    <>
      <div className="px-6 md:px-16 lg:px-32">
        <HomeSlider />
        <HomeProducts />
        <FeaturedProducts />
        <Banner />
        <NewsLetter />
      </div>
    </>
  );
};

export default Home;
