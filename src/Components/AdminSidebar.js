import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const [activeSection, setActiveSection] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("admintoken");
  };

  const setActive = (section) => {
    setActiveSection(section);
  };

  return (
    <div>
      <div className="container-fluid display-table">
        <div className="row display-table-row">
          <div
            className="col-md-2 col-sm-1 hidden-xs display-table-cell v-align box"
            id="navigation"
          >
            <div className="logo">
               <NavLink to="/admin-dashboard">
               <img
                  src="https://i.pinimg.com/originals/c6/49/26/c649264c85dc6ef4cc0cc1dc53ad1d37.png"
                  alt="logo"
                />
               </NavLink>
            </div>
            <div className="navi">
              <ul className="nav-ul">
                <li className={activeSection === "home" ? "active" : ""}>
                  <NavLink to="/admin-dashboard" onClick={() => setActive("home")}>
                    <i className="fa fa-home" aria-hidden="true"></i>
                    <span className="hidden-xs hidden-sm">Home</span>
                  </NavLink>
                </li>
                <li className={activeSection === "Menu" ? "active" : ""}>
                  <NavLink to="/admin-menu" onClick={() => setActive("Menu")}>
                    <i className="fa fa-burger" aria-hidden="true"></i>
                    <span className="hidden-xs hidden-sm">Menu</span>
                  </NavLink>
                </li>
                <li className={activeSection === "orders" ? "active" : ""}>
                  <NavLink to="/admin-order" onClick={() => setActive("orders")}>
                    <i className="fa fa-tasks" aria-hidden="true"></i>
                    <span className="hidden-xs hidden-sm">Orders</span>
                  </NavLink>
                </li>
                <li className={activeSection === "users" ? "active" : ""}>
                  <NavLink to="/users" onClick={() => setActive("users")}>
                    <i className="fa fa-user" aria-hidden="true"></i>
                    <span className="hidden-xs hidden-sm">Users</span>
                  </NavLink>
                </li>
                {/* Add similar logic for other sections */}
                <li>
                  <a href="/adminlogin" onClick={handleLogout}>
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                    <span className="hidden-xs hidden-sm">Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
