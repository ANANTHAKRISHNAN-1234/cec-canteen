import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/cec-canteen-logo.jpeg";
import cartlogo from "../../assets/cart-logo.jpeg";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg  bg-body-tertiary p-0 fixed-top">
        <div className="container-fluid nav-container">
          <img className="canteen-logo" src={logo} alt="Logo" />
          <li className="nav-item cart-large-item">
            <a className="nav-link text-light " href="/cart">
              <i className="fa-solid fa-cart-shopping cart-mobile"></i>
            </a>
          </li>
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
                <Link
                  className="nav-link navbar-item-color text-light active"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
                <div className="nav-link-underline"></div>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="/orders">
                  Orders
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/menu">
                  Menu
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/about">
                  About Us
                </Link>
              </li>
              <li className="nav-item cart-large-item">
                <a className="nav-link text-light " href="/cart">
                  <i className="fa-solid fa-cart-shopping cart-large"></i>
                </a>
              </li>
              <li className="nav-item logout ">
                <Link className="nav-link text-light" onClick={handleLogout}>
                  LogOut
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
