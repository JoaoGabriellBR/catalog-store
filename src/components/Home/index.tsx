import React from "react";
import Hero from "./Hero";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";
import BestSeller from "./BestSeller";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <main>
      <Hero />
      <NewArrival />
      <PromoBanner />
      <BestSeller />
      <Testimonials />
    </main>
  );
};

export default Home;
