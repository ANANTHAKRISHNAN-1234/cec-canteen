import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Banner from "../Components/Banner/Banner";
import Card from "../Components/Card/Card";
import Footer from "../Components/Footer/Footer";
import Signup from "./Signup";
export default function Home() {
  return (
    <div>
      <Navbar />
      <Banner />
      <Card />
    </div>
  );
}
