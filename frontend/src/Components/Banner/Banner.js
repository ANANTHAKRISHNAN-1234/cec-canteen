import React from "react";
import { useNavigate } from "react-router-dom";
import "./Banner.css";
import carousalimg1 from "../../assets/carousal-img1.jpeg";
import carousalimg2 from "../../assets/carousal-img2.jpeg";
import carousalimg3 from "../../assets/carousal-img3.jpeg";
import carousalimg4 from "../../assets/carousal-img4.jpeg";
import banner_image from "../../assets/pizza.png.png";
function Banner() {
  const navigate = useNavigate();

  const handleViewMenuClick = () => {
    // Navigate to the /menu route
    navigate("/menu");
  };

  const handleOrderClick = () => {
    // Navigate to the /orders route
    navigate("/orders");
  };
  return (
    <div className="container-fluid bg-dark banner-container  text-center pt-5">
      <div className="row p-4 p-md-0 pd-lg-0 mt-4 ">
        <div className="col-lg-6 col-12">
          <h1 className="text-light fs-md-3 banner-title">
            It's not just Food.It's an Experience.
          </h1>
          <div className="row banner-btn-row pt-3 ms-md-5">
            <div className="col-md-4 ms-md-5">
              <button
                className="h-100 text-light fw-4 view_menu-btn w-100   p-2 rounded"
                onClick={handleViewMenuClick}
              >
                View Menu
              </button>
            </div>
            <div className="col-md-4 order-btn-container">
              <button
                className=" order-btn h-100 w-100 p-2 rounded"
                onClick={handleOrderClick}
              >
                Order
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-6  col-12 text-md-center text-center banner-img pb-3">
          <img className=" " src={banner_image} alt="" />
        </div>
      </div>
    </div>
  );
}
export default Banner;
