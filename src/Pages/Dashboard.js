import React from "react";
import AdminSidebar from "../Components/AdminSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import orders from "../assets/orders.png";
import revenue from "../assets/Revenue.png";
import pendimg from "../assets/pending-order.png";
import users from "../assets/users.png";
const Dashboard = () => {
  const [ordersData, setOrdersData] = useState({
    totalProfit: 0,
    ordrerPerMonth: 0,
    pendingOrders: 0,
    users: 0,
  });
  useEffect(() => {
    axios
      .get("http://localhost:7000/adminhome")
      .then((res) => {
        console.log(res.data);
        setOrdersData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div className="admin-home">
      <AdminSidebar />
      <div className="admin-home-content  ">
        <h1 className="text-center admin-home-heading">Admin Dashboard</h1>
        <div className="admin-home-card-container row">
          <div className="admin-home-card box1 p-3 col-md-4 me-2">
            <div className="admin-home-card-box ">
              <img src={orders}></img>

              <h1 className="ms-5"> {ordersData.ordrerPerMonth}</h1>
            </div>
            <hr></hr>
            <p>Monthly orders</p>
          </div>
          <div className="admin-home-card col-md-4 ms-2">
            <div className="admin-home-card-box">
              <img src={revenue}></img>
              <h1>
                {" "}
                {"\u20b9"}
                {ordersData.totalProfit}
              </h1>
            </div>
            <hr></hr>
            <p>Monthly Revenue</p>
          </div>
          <div className="admin-home-card box1 p-3 col-md-4 me-2">
            <div className="admin-home-card-box ">
              <img src={pendimg}></img>

              <h1 className="ms-5"> {ordersData.pendingOrders}</h1>
            </div>
            <hr></hr>
            <p>pendingOrders orders</p>
          </div>
          <div className="admin-home-card box1 p-3 col-md-4 me-2">
            <div className="admin-home-card-box ">
              <img src={users}></img>

              <h1 className="ms-5"> {ordersData.users}</h1>
            </div>
            <hr></hr>
            <p>Total Customers </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
