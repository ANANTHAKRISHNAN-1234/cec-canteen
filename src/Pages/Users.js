import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../Components/AdminSidebar";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserOrders, setSelectedUserOrders] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:7000/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserOrders = async (userId) => {
    try {
      const url = `http://localhost:7000/ordersbu?userId=${userId}`;
      const response = await axios.get(url);
      setSelectedUserOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleUserOrders = async (userId) => {
    if (selectedUserId === userId) {
      setSelectedUserId(null);
    } else {
      setSelectedUserId(userId);
      await fetchUserOrders(userId);
    }
  };

  return (
    <div className="users">
      <AdminSidebar />
      <h1 className="text-center">Users</h1>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user._id}>
            <div className="user-item">
              <div>
                <h4 className="user-name">{user.username}</h4>
                <p className="email">Email: {user.email}</p>
              </div>
              {selectedUserId === user._id ? (
                <div className="user-orders">
                  {selectedUserOrders.map((order) => (
                    <div key={order._id} className="order-item">
                      <h5 className="order-id">Order ID: {order._id}</h5>
                      <p className="order-total">Total: ${order.total}</p>
                    </div>
                  ))}
                  <button className="hideorder" onClick={() => toggleUserOrders(user._id)}>Hide Orders</button>
                </div>
              ) : (
                <button className="vieworder" onClick={() => toggleUserOrders(user._id)}>View Orders</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
