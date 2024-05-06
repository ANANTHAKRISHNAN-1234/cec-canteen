import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Orders.css";
import Navbar from "../Components/Navbar/Navbar";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData.uid;
    axios
      .post("http://localhost:7000/userorders", {
        userId: userId,
      })
      .then((res) => {
        setOrders(res.data.reverse());
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="orders">
      <Navbar />
      <div className="order-content text-light">
        <h1 className="text-center bg-light">Orders</h1>
        {orders.map((order, index) => (
          <div key={order._id} className="order-list">
            <h4>{index + 1}.</h4>
            <p>{order._id}</p>
            <p>
              {order.name.map((item, index) => (
                <span key={index}>
                  {item} - {order.quantity[index]}
                  {index !== order.name.length - 1 && ", "}
                </span>
              ))}
            </p>
            <h3>
              {" "}
              {"\u20b9"}
              {order.price}
            </h3>
            <p>{order.currentDate}</p>
            <p>Order Confirmed at: - {order.currentTime}</p>
            {order.confirmation ? (
              <h4 className="text-success">
                Food will be ready to serve within {order.makingTime}
              </h4>
            ) : (
              <div className="text-light">
                <h4 className="text-warning">
                  Your order wil be confirmed when seats are available,Dont take
                  much time!!.
                </h4>
                <h4 className="text-warning">Please Wait..</h4>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
