import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";
import useMenus from "../UseMenus";
import carousalimg1 from "../../assets/carousal-img1.jpeg";
import carousalimg2 from "../../assets/carousal-img2.jpeg";
import carousalimg3 from "../../assets/carousal-img3.jpeg";
import carousalimg4 from "../../assets/carousal-img4.jpeg";
import banner_image from "../../assets/banner-image.png";
import card_img1 from "../../assets/bowl-of-ice-cream-with-chocolate.jpg";
import card_img2 from "../../assets/coffee-crema.webp";
import card_img3 from "../../assets/pink-macarons.jpg";
import card_img4 from "../../assets/strawberry-milk-splash.jpg";

export default function Card() {
  const [menus] = useMenus();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };
  const handleNewArrivalClick = () => {
    navigate("/menu");
  };

  return (
    <div className="bg-dark p-5">
      <h1 className="text-light text-center p-3">New Arrivals</h1>
      <div className="scrollable-container">
        {menus.slice(0, 10).map((menu, index) => (
          <div className="card-container" key={index}>
            <div
              className={`card m-2 p-0 ${
                selectedImageIndex === index ? "selected" : ""
              }`}
              onClick={() => handleImageClick(index)}
            >
              <img
                src={require(`../../images/${menu.image}`)}
                alt={menu.name}
                className="card-img-top"
                onClick={handleNewArrivalClick}
              />
            </div>
            <div className="card-body p-1 m-2">
              <p className="card-title text-center text-light">{menu.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
