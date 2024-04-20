import React from "react";
import "./Home.css";
import { Header } from "../../components/Header/Header";
import About from "../../components/About/About";
import ItemsDisplay from "../../components/ItemsDisplay/ItemsDisplay";
import OurBlendsItemsDisplay from "../../components/ItemsDisplay/OurBlendsItemsDisplay";

export const Home = () => {
  return (
    <div>
      <Header />
      <About />
      <ItemsDisplay />
      <OurBlendsItemsDisplay />
    </div>
  );
};
