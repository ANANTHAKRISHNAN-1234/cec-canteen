import React, { useEffect, useState } from "react";
import axios from "axios";
import './Order.css';
import Navbar from "../Navbar/Navbar";

function OrderPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders");
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-container">
      <Navbar/>
      <h1 className="order-header">Order History</h1>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="order-item">
            <h2>{order.name}</h2>
            <p className="order-status">Status: {order.status}</p>
            <p className="order-date">Ordered on: {new Date(order.created_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );  
}

export default OrderPage;
