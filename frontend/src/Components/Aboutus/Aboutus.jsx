import React from 'react';
import './Aboutus.css';
import  aboutpic from '../../assets/aboutpic.png'
export default function Aboutus() {
  return (
    <div className="container-fluid bg-dark">
        <div className="row p-5">
            <div className="col-md-6 col-12 p-5">
                  <h1 className="text-light">Welcome to CEC FoodFolio</h1>
                  <p className="text-light"> Sed luctus massa purus, sed dapibus ex condimentum sed. Vestibulum eget imperdiet metus, varius facilisis nisl. Integer et sem eros. Pellentesque ullamcorper imperdiet laoreet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

                    Donec in consectetur sem, quis blandit nulla. Vivamus nulla nibh, dictum nec urna et, tristique elementum mi. Aenean suscipit sem nec neque pharetra, sed pretium leo feugiat. Etiam magna nunc, varius sit amet eleifend sit amet, lobortis nec nulla.</p>
            </div>
            <div className="col-md-6 col-12 img-box">
                 <img className="img-pic" src={aboutpic} alt="img"/>
            </div>
        </div>
        
    </div>
  )
}
