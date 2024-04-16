// CartPage.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CartPage.css";
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Fetch the current user's cart items based on their username
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.uid;
        console.log(userId);
        const response = await axios.get(
          `http://localhost:7000/api/customer/${userId}`
        );
        const cart = response.data.cart;

        // Fetch corresponding menu items based on the menu IDs in the cart
        const menuItems = await Promise.all(
          cart.map(async (itemId) => {
            const menuResponse = await axios.get(
              `http://localhost:7000/api/menu/${itemId}`
            );
            return menuResponse.data;
          })
        );

        // Set the cart items with their details
        setCartItems(menuItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);
  const removeFromCart = async (itemId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.uid;
      // Remove item from the cart array in the database
      await axios.delete(
        `http://localhost:7000/api/customer/${userId}/cart/${itemId}`
      );

      // Update the cartItems state to reflect the removed item
      setCartItems(cartItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const removeAllFromCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.uid;
      // Remove all items from the cart array in the database
      await axios.delete(`http://localhost:7000/api/customer/${userId}/cart`);

      // Update the cartItems state to reflect the removal of all items
      setCartItems([]);
    } catch (error) {
      console.error("Error removing all items from cart:", error);
    }
  };
  return (
    <div className="cartbody">
      <div className="classbody-heading">
        <h2>The CART</h2>
        <button className="bg-danger text-light" onClick={removeAllFromCart}>
          Remove All
        </button>
      </div>
      {cartItems.map((item) => (
        <div className="cart-box">
          <div className="imgcart-box">
            <img
              className="img-fluid"
              src={require(`../images/${item.image}`)}
              alt={item.name}
            />
            <button className="bg-success text-white">Buy now</button>

            <button
              className="bg-danger text-white"
              onClick={() => removeFromCart(item._id)}
            >
              Remove
            </button>
          </div>
          <li key={item._id}>
            <h5>{item.name}</h5>
            <p className="cart-price">
              {"\u20b9"}
              {item.price}
            </p>
            <label>Qty:</label>
            <input
              type="number"
              min="1"
              defaultValue="1"
              className="qty-input"
            ></input>
            <p>{item.description}</p>
          </li>
        </div>
      ))}
    </div>
  );
};

export default CartPage;
