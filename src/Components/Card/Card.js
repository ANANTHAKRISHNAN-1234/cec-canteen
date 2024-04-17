import React, { useState } from "react";
import "./Card.css";
import carousalimg1 from "../../assets/carousal-img1.jpeg";
import carousalimg2 from "../../assets/carousal-img2.jpeg";
import carousalimg3 from "../../assets/carousal-img3.jpeg";
import carousalimg4 from "../../assets/carousal-img4.jpeg";
import card_img1 from "../../assets/bowl-of-ice-cream-with-chocolate.jpg";
import card_img2 from "../../assets/coffee-crema.webp";
import card_img3 from "../../assets/pink-macarons.jpg";
import card_img4 from "../../assets/strawberry-milk-splash.jpg";

export default function Card() {
  const images = [
    { image: carousalimg1, foodName: "Burger" },
    { image: carousalimg2, foodName: "Chocolate cake" },
    { image: card_img1, foodName: "Ice Cream" },
    { image: card_img2, foodName: "Coffee" },
    { image: card_img3, foodName: "Macarons" },
    { image: card_img4, foodName: "Strawberry Milk" },
    { image: carousalimg3, foodName: "Steak" },
    { image: carousalimg4, foodName: "Taco" },
    { image: carousalimg1, foodName: "Burrito" },
    { image: carousalimg3, foodName: "Noodles" },
    { image: carousalimg2, foodName: "Sushi" }
  ];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="bg-dark p-5">
      <h1 className="text-light text-center p-3">New Arrivals</h1>
      <div className="scrollable-container">
        {images.map((item, index) => (
          <div className="card-container" key={index}>
            <div
              className={`card m-2 p-0 ${
                selectedImageIndex === index ? "selected" : ""
              }`}
              onClick={() => handleImageClick(index)}
            >
              <img src={item.image} className="card-img-top" alt="card-img" />
            </div>
            <div className="card-body p-1 m-2">
              <p className="card-title text-center text-light">
                {item.foodName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}