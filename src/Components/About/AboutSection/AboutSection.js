import React from 'react';
import { Link } from 'react-router-dom';
import about from '../../../assets/about2.png';
import './AboutSection.css';

const AboutSection = () => {
   return (
      <div className="about-section">
         <div className="container">
            <div className="row align-items-end">
               <div className="col-md-6 pe-md-5">
                  <div className="header-text">
                     <span>Delicious Restaurant</span>
                     <h1>OUR SPECIALITY</h1>
                     <p>Cecfoodfolio, the college canteen management website, revolutionizes the dining experience by providing a seamless platform for ordering food online. Whether you're craving a quick snack between classes or planning a hearty meal with friends, Cecfoodfolio offers a diverse selection of dishes to satisfy every palate. With just a few clicks, students can explore the menu, place their orders, and enjoy delicious meals delivered right to their doorstep. Say goodbye to long queues and hello to convenience with Cecfoodfolio.</p>
                  </div>
               </div>
               <div className="col-md-6 ps-md-5">
                  <div className="img-box">
                     <img className="img-fluid" src={about} alt="" />
                  </div>
               </div>
               <div className='btn'>
                  <Link to="/about" className="btn-orange">view more</Link>
                  </div>
            </div>
         </div>
      </div>
   );
};

export default AboutSection;