import React from "react";
import "./AdminSidebar.css";
const AdminSidebar = () => {
  return (
    <div>
      <div className="container-fluid display-table">
        <div className="row display-table-row">
          <div
            className="col-md-2 col-sm-1 hidden-xs display-table-cell v-align box"
            id="navigation"
          >
            <div className="logo">
              <a href="home.html">
                <img
                  src="https://i.pinimg.com/originals/c6/49/26/c649264c85dc6ef4cc0cc1dc53ad1d37.png"
                  alt="logo"
                />
              </a>
            </div>
            <div className="navi">
              <ul className="nav-ul">
                <li className="active">
                  <a href="/admin-dashboard">
                    <i className="fa fa-home" aria-hidden="true"></i>
                    <span className="hidden-xs hidden-sm">Home</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-tasks" aria-hidden="true"></i>
                    <span className="hidden-xs hidden-sm">Orders</span>
                  </a>
                </li>
                <li>
                  <a href="/admin-menu">
                    <i className="fa fa-bar-chart" aria-hidden="true"></i>
                    <span className="hidden-xs hidden-sm">Menu</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-user" aria-hidden="true"></i>
                    <span className="hidden-xs hidden-sm">Calender</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                    <span className="hidden-xs hidden-sm">Users</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-cog" aria-hidden="true"></i>
                    <span className="hidden-xs hidden-sm">Setting</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-10 col-sm-11 display-table-cell v-align">
            <div className="row">
              <div className="col-md-7">
                <nav className="navbar-default pull-left">
                  <div className="navbar-header"></div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminSidebar;
