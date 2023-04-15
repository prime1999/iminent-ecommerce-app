import React from "react";
import TopSection from "../Components/TopSection";
import ProductsSection from "../Components/ProductsSection";
import WideCard from "../Components/WideCard";

const Explore = () => {
  return (
    <div className="w-full mb-8">
      <main className="mb-8">
        <TopSection />
        <ProductsSection />
        <WideCard />
      </main>
    </div>
  );
};

export default Explore;
