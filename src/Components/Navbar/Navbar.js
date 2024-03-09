import React from "react";
import "./Navbar.css";
import logo from '../../assets/cec-canteen-logo.jpeg'
import cartlogo from '../../assets/cart-logo.jpeg'
function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg  navbar-dark bg-dark bg-body-tertiary p-0 fixed-top">
        <div className="container-fluid bg-dark">
           <img  className="canteen-logo"src={logo} alt="Logo"/>
           <i class="fa-solid fa-cart-shopping cart-mobile"></i>
           <button
            className="navbar-toggler  "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon  text-white"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link navbar-item-color text-light active" aria-current="page" href="#">
                  Home
                </a>
                <div className="nav-link-underline"></div>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="#">
                  Orders
                </a>
              </li>
                <li className="nav-item">
                <a className="nav-link text-light" href="#">
                  Menu
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="#">
                  About Us
                </a>
                </li>
                <li className="nav-item cart-large-item">
                <a className="nav-link text-light " href="#">
                <i class="fa-solid fa-cart-shopping cart-large"></i>
                </a>
                </li>
                <li className="nav-item logout ">
                <a className="nav-link text-light " href="#">
                    LogOut   
                </a>
                </li>
            </ul>
          </div>
        </div>
    </nav>
    </div>
  );
}
export default Navbar;
