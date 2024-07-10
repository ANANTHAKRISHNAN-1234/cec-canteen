import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../Components/AdminSidebar";
import "./AdminOrder.css";
const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState({});
  const [timetaken, setTimeTaken] = useState("1 min");
  useEffect(() => {
    axios
      .get("http://localhost:7000/adminorders")
      .then((res) => {
        setOrders(res.data.reverse());
        fetchUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const fetchUsers = (orders) => {
    const userIds = orders.map((order) => order.userId);
    axios
      .post("http://localhost:7000/getUserByIds", { userIds }) // Adjust this endpoint based on your server route
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    console.log(users);
  };
  const confirmOrder = (orderId) => {
    axios
      .put(`http://localhost:7000/adminorders/${orderId}/confirm`, {
        makeTime: timetaken,
      })
      .then((res) => {
        // Update the 'confirmed' status in the orders state directly
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? {
                  ...order,
                  confirmation: true,
                  makingTime: res.data.makingTime,
                }
              : order
          )
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="adminorders">
      <AdminSidebar />
      <div className="admin-order-content">
        <h1 className="text-center admin-order-heading">Orders</h1>
        {orders.map((order, index) => (
          <div key={order._id} className="adminorder-list">
            <h4>{index + 1}.</h4>
            <h6>{order.userId}</h6>
            <h6>User: {users[order.userId]}</h6>
            <p>
              {order.name.map((item, index) => (
                <span key={index}>
                  {item} - {order.quantity[index]}
                  {index !== order.name.length - 1 && ", "}
                </span>
              ))}
            </p>
            <p>
              {" "}
              {"\u20b9"}
              {order.price}
            </p>
            <p>{order.currentDate}</p>
            <p>{order.currentTime}</p>
            {order.confirmation ? (
              <h4 className="text-success">
                Food will be ready to serve within {order.makingTime}
              </h4>
            ) : (
              <input
                className=""
                type="text"
                value={timetaken}
                onChange={(e) => setTimeTaken(e.target.value)}
              ></input>
            )}
            {order.confirmation ? (
              <h4 className="text-success">Confirmed</h4>
            ) : (
              <button
                className="bg-success text-light confirm-btn"
                onClick={() => confirmOrder(order._id)}
              >
                Confirm
              </button>
            )}

            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrder;
