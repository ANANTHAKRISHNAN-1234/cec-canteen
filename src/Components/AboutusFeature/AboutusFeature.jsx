import React from "react";
import "./AboutusFeature.css";
export default function AboutusFeature() {
  return (
    <div className="bg-dark">
      <div className="container-fluid bg-dark">
        <h4 className="text-light text-center">FEATURES</h4>
        <h1 className="text-light text-center">Why people choose us?</h1>
        <div className="image-box">
          <img
            className="image-pic"
            src="https://foholic.up2client.com/static/media/food.610cc2ddf203bf8352ae9ffcbeb5b813.svg"
            alt="img"
          />
        </div>
      </div>
      <div className="container-fluid bg-dark">
        <h2 className="text-light text-center">Menu for every taste</h2>
        <p className="text-light text-center">
          Satisfaction of customers is our key and we ensure it
        </p>
        <br />
        <div className="image-box">
          <img
            className="image-pic"
            src="https://foholic.up2client.com/static/media/food-list.b7fb7975d757d2798f6700cc503a2ef0.svg"
            alt="img"
          />
        </div>
      </div>
      <div className="container-fluid bg-dark">
        <h2 className="text-light text-center">Always fresh ingredients</h2>
        <p className="text-light text-center">
          Clean fresh foods are served,No need to worry
        </p>
        <br />
        <div className="image-box">
          <img
            className="image-pic"
            src="https://foholic.up2client.com/static/media/chef.b3e10f12ea045d874ae011fa12fcb235.svg"
            alt="img"
          />
        </div>
      </div>
      <div className="container-fluid bg-dark">
        <h2 className="text-light text-center">Experienced chefs</h2>
        <p className="text-light text-center">
          Professional cooks are brought and versatile foods are prepared
        </p>
        <br />
      </div>
    </div>
  );
}
